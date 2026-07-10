import React, {useState} from "react";

type Op = '+' | '-' | '*' | '/' | null

export const Calc: React.FC = () => {
    const [display, setDisplay] = useState<string>('0')
    const [prevValue, setPrevValue] = useState<number | null >(null)
    const [operator, setOperator] = useState<Op>(null)
    const [isFinished, setIsFinished] = useState<boolean>(false)
    const [history, setHistory] = useState<string>('')

    const handleNumber = (num: string) => {
        if(display === '0' || isFinished) {
            setDisplay(num === '.' ? '0.' : num)
            setIsFinished(false)
        } else {
            if(num === '.' && display.includes('.')) return
            setDisplay(display + num)
        }
    }

    const handleOp = (nextOp: Op) => {
        const inputValue = parseFloat(display)

        if(prevValue === null) {
            setPrevValue(inputValue)
            setHistory(`${inputValue} ${nextOp}`)
        } else if (operator && !isFinished) {
            const res = calculate(prevValue, inputValue, operator)
            setPrevValue(res)
            setDisplay(String(res))
            setHistory(`${res} ${nextOp}`)
        } else {
            setHistory(`${inputValue} ${nextOp}`)
        }

        setOperator(nextOp)
        setIsFinished(true)
    }

    const calculate = (first: number, second: number, op: Op): number => {
        switch(op) {
            case '+': return first + second;
            case '-': return first - second;
            case '*': return first * second;
            case '/': return second !== 0 ? first / second : 0;
            default: return second;
        }
    }

    const handleEqual = () => {
        if(!operator || prevValue === null) return

        const inputValue = parseFloat(display)
        const res = calculate(prevValue, inputValue, operator)

        setHistory(`${prevValue} ${operator} ${inputValue} =`)
        setDisplay(String(res))
        setPrevValue(null)
        setOperator(null)
        setIsFinished(true)
    }

    const handleClear = () => {
        setDisplay('0')
        setPrevValue(null)
        setOperator(null)
        setHistory('')
        setIsFinished(false)
    }

    const handleBackspace = () => {
        if(isFinished) {
            handleClear()
            return
        }
        if(display.length > 1){
            setDisplay(display.slice(0, -1))
        } else {
            setDisplay('0')
        }
    }

    const getButtonClass = (type: 'num' | 'op' | 'action') => {
        const base = "p-5 text-xl font-bold rounded-2xl";
        if (type === 'num') return `${base} bg-gray-800/80 text-white hover:bg-gray-700`;
        if (type === 'op') return `${base} bg-amber-500/80 text-white hover:bg-amber-600`;
        return `${base} bg-gray-300/80 text-gray-800 hover:bg-gray-400`;
    }

    return (
        <div className="flex h-full flex-col items-center justify-center p-4 rounded-b-xl">
            <div className="w-[350px] rounded-3xl p-6">
            
                <div className="flex flex-col h-28 px-2 text-right">
                    <span className="text-gray-500 text-[14px] font-medium h-6 overflow-hidden">
                        {history}
                    </span>
                    <span className="text-white text-5xl font-light truncate w-full mt-2">
                        {display}
                    </span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                    <button onClick={handleClear} className={getButtonClass('action')}>AC</button>
                    <button onClick={handleBackspace} className={getButtonClass('action')}>⌫</button>
                    <button onClick={() => handleOp('/')} className={getButtonClass('op')}>÷</button>
                    <button onClick={() => handleOp('*')} className={getButtonClass('op')}>×</button>

                    <button onClick={() => handleNumber('7')} className={getButtonClass('num')}>7</button>
                    <button onClick={() => handleNumber('8')} className={getButtonClass('num')}>8</button>
                    <button onClick={() => handleNumber('9')} className={getButtonClass('num')}>9</button>
                    <button onClick={() => handleOp('-')} className={getButtonClass('op')}>-</button>

                    <button onClick={() => handleNumber('4')} className={getButtonClass('num')}>4</button>
                    <button onClick={() => handleNumber('5')} className={getButtonClass('num')}>5</button>
                    <button onClick={() => handleNumber('6')} className={getButtonClass('num')}>6</button>
                    <button onClick={() => handleOp('+')} className={getButtonClass('op')}>+</button>

                    <button onClick={() => handleNumber('1')} className={getButtonClass('num')}>1</button>
                    <button onClick={() => handleNumber('2')} className={getButtonClass('num')}>2</button>
                    <button onClick={() => handleNumber('3')} className={getButtonClass('num')}>3</button>
                    <button onClick={handleEqual} className="row-span-2 p-4 text-xl font-semibold rounded-2xl bg-amber-500 text-white hover:bg-amber-600 flex items-center justify-center ">=</button>

                    <button onClick={() => handleNumber('0')} className="col-span-2 p-4 text-xl font-semibold rounded-2xl bg-gray-800 text-white hover:bg-gray-700 text-left pl-7 ">0</button>
                    <button onClick={() => handleNumber('.')} className={getButtonClass('num')}>.</button>
                </div>
            </div>
        </div>
    )
}
