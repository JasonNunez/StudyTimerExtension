chrome.alarms.create({
    periodInMinutes: 1 / 60
})

chrome.alarms.onAlarm.addListener(() =>{
    chrome.storage.local.get(["timer", "isRunning"], (res) =>{
        const time = res.timer ?? 0
        const isRunning = res.isRunning ?? true
        if(!isRunning){
            return
        }
        void chrome.storage.local.set({
            timer: time + 1
        })
        void chrome.action.setBadgeText({
            text : `${time + 1}`
        })
        chrome.storage.sync.get(["time"], (res) => {
            const notificationTime = res.time ?? 0
            if (time % notificationTime === 0){
                void this.registration.showNotification("Chrome Timer Extension",{
                    body: `${notificationTime} second has passed!`,
                    icon: "icon.png"
                })
            }
        })
    })
})