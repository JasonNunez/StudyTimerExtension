const timeElement = document.getElementById("time")
const timerElement = document.getElementById("timer")
const nameElement = document.getElementById("name")
const startBtn = document.getElementById("start")
const stopBtn = document.getElementById("stop")
const restartBtn = document.getElementById("restart")


function updateTimeElments() {
    const currentTime = new Date().toLocaleTimeString() ?? 0
    timeElement.textContent = `The time is: ${currentTime}`

    chrome.storage.local.get(["timer"], (res) =>{
        const timer = res.timer ?? 0
        timerElement.textContent = `Timer is at ${timer} seconds`
    })
}

updateTimeElments()
setInterval(updateTimeElments, 1000)

chrome.storage.sync.get(["name"], (res) => {
    const name = res.name ?? "???"
    nameElement.textContent =  `Your name is ${name}`
})

startBtn.addEventListener("click", () => {
    void chrome.storage.local.set({
        isRunning: true
    })
})

stopBtn.addEventListener("click", () => {
    void chrome.storage.local.set({
        isRunning: false
    })
})

restartBtn.addEventListener("click", () => {
    void chrome.storage.local.set({
        timer: 0,
        isRunning: false
    })
})