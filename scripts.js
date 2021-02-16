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