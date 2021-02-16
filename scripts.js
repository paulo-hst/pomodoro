const timer = document.querySelector('#timer')
const startButton = document.querySelector('#startButton')
const pauseButton = document.querySelector('#pauseButton')
const resetButton = document.querySelector('#resetButton')
let type = 'Work'

startButton.addEventListener('click', () => {
    toggleClock()
})

pauseButton.addEventListener('click', () => {
    toggleClock()
})

resetButton.addEventListener('click', () => {
    toggleClock(true)
})

let isClockRunning = false
let workSessionDuration = 1500
let currentTimeLeftInSession = 1500
let breakSessionDuration = 300

const toggleClock = reset => {
    if(reset){
        stopClock()
    }
    else if(isClockRunning === true){
        clearInterval(clockTimer)
        isClockRunning = false
    }
    else{
        isClockRunning = true

        clockTimer = setInterval(() => {
            currentTimeLeftInSession--
            displayCurrentTimeLeftInSession()
            notifyMe(currentTimeLeftInSession)
        }, 1000)
    }
}

const displayCurrentTimeLeftInSession = () => {
    const secondsLeft = currentTimeLeftInSession
    let result = ''
    const seconds = secondsLeft % 60
    const minutes = parseInt(secondsLeft / 60) % 60
    let hours = parseInt(secondsLeft / 3600)

    function addLeadingZeroes(time){
        return time < 10 ? `0${time}` : time
    }

    if(hours > 0) result += `${hours}`
    result += `${addLeadingZeroes(minutes)}:${addLeadingZeroes(seconds)}`

    timer.innerHTML = result.toString()
}

const stopClock = () => {
    clearInterval(clockTimer)
    isClockRunning = false
    currentTimeLeftInSession = workSessionDuration
    displayCurrentTimeLeftInSession()
}

function notifyMe(time) {

    if (!("Notification" in window)) {
      alert("Este browser não suporta notificações de Desktop");
    }
    else if (Notification.permission === 'granted') {
        if(time === 300){
            let firstWarning = new Notification('Faltam 5 minutos')
        }else if(time === 1){
            let finalWarning = new Notification('Tempo encerrado!')
        }
    }  
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted") {
            if(time === 300){
                let firstWarning = new Notification('Faltam 5 minutos')
            }else if(time === 1){
                let finalWarning = new Notification('Tempo encerrado!')
            }
        }
      });
    }
}