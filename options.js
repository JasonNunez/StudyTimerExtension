const nameInput = document.getElementById("name-input")
const saveBtn = document.getElementById("save-btn")
const timeInput = document.getElementById("time-input")

saveBtn.addEventListener("click", ()=> {
    const name = nameInput.value
    const time = timeInput.value
    chrome.storage.sync.set({
        name,
        time
    }, () => {
        console.log(`Name is set to ${name}`)
    })
})

chrome.storage.sync.get(["name", "time"], (res) => {
    nameInput.value = res.name ?? "???"
    timeInput.value = res.time ?? 1000
})