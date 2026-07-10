import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { db } from './db'

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

const DURATION = 1000 * 60 * 60 * 24 * 7 


interface AuthReq extends express.Request {
    userId?: string
}


function createSess(userId: string) {
    const token = crypto.randomBytes(32).toString('hex')
    const expiration = Date.now() + DURATION
    db.prepare('INSERT INTO sessions (token, user_id, expires_at) VALUES (?, ?, ?)').run(token, userId, expiration)
    return {
        token,
        expiration
    }
}

function setCookkies(res: express.Response, token: string, expiration: number) {
    res.cookie('session', token, {
        httpOnly: true,
        secure: false,
        expires: new Date(expiration)
    })
}

function requireAuth (req: AuthReq, res: express.Response, next: express.NextFunction) {
    const token = req.cookies.session
    if(!token) return res.status(400).json({ message: 'no account'})
   

    const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token) as
        | { token: string; user_id: string; expires_at: number }
        | undefined

    if(!session || session.expires_at < Date.now()) {
        return res.status(400).json({ message: 'session expired, login again please :)'})
    }

    req.userId = session.user_id
    next()
}

app.post('/signup', async (req, res) => {
    const {email, password, name } = req.body

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'complete all fields pls' })
    }

    if(password.length < 8) {
        return res.status(400).json({ message: 'password too short, need 8 chars at least'})
    }

    const signedup = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
    if (signedup) {
        return res.status(400).json({ message: 'already in use, login or change email :)'})
    }

    const pswHash = await bcrypt.hash(password, 12)
    const id = crypto.randomUUID()
    db.prepare('INSERT INTO users (id, email, password_hash, name) VALUES (?, ?, ?, ?)').run(id, email, pswHash, name)

    const { token, expiration} = createSess(id)
    setCookkies(res, token, expiration)

    res.json({user: {id, email, name}})
})

app.post('/login', async(req, res) => {
    const {email, password} = req.body

    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email) as
        | { id: string; email: string; password_hash: string; name: string }
        | undefined

    if(!user) {
        return res.status(400).json({message: 'sorry... those credentials are invalid :/'})
    }

    const valid = await bcrypt.compare(password, user.password_hash)
    if(!valid) {
        return res.status(400).json({message: 'sorry... those credentials are invalid :/'})
    }

    const { token, expiration} = createSess(user.id)
    setCookkies(res, token, expiration)

    res.json({user: { id: user.id, email: user.email, name: user.name}})
})


app.get('/me', requireAuth, (req: AuthReq, res) => {
    const user = db.prepare('SELECT id, email, name FROM users WHERE id = ?').get(req.userId)
    res.json({ user})
})

app.post('/logout', requireAuth, (req: AuthReq, res) => {
    const token = req.cookies.session
    db.prepare('DELETE FROM sessions WHERE token = ?').run(token)
    res.clearCookie('session')
    res.json({ success: true })
})

app.listen(3000, () => {
    console.log('running on http://localhost:3000')
})
