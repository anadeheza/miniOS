export function getSystemInfo() {
    const userAg = navigator.userAgent
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const resol = `${window.screen.width} x ${window.screen.height}`

    let browser = "no idea, srry :/"
    if(userAg.includes("Chrome")) browser = "Chrome 📚"
    else if(userAg.includes("Safari")) browser = "Safari 🌀"
    else if(userAg.includes("Firefox")) browser = "Firefox 🦊"

    let os = "no idea, srry :/"
    if(userAg.includes("Win")) os = "Windows 💠 "
    else if(userAg.includes("Mac")) os = "MacOS 🍎"
    else if(userAg.includes("Linux")) os = "Linux 🐧"

    return { browser, os, timezone, resol}
}