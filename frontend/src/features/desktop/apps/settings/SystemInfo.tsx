export function getSystemInfo() {
    const userAg = navigator.userAgent
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const resol = `${window.screen.width} x ${window.screen.height}`

    let browser = "no idea, srry :/"
    if(userAg.includes("Chrome")) browser = "Chrome 🌈"
    if(userAg.includes("Safari")) browser = "Safari 🌀"
    if(userAg.includes("Firefox")) browser = "Firefox 🦊"

    let os = "no idea, srry :/"
    if(userAg.includes("Win")) browser = "Windows 🌈"
    if(userAg.includes("Mac")) browser = "MacOS 🍎"
    if(userAg.includes("Linux")) browser = "Linux 🐧"

    return { browser, os, timezone, resol}
}