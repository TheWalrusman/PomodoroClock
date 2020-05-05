let workDefaultTime = 1500;
let breakDefaultTime = 300;
let workCurrentTime = 1500;
let breakCurrentTime = 300;
let localWorkTime = workCurrentTime;
let localBreakTime = breakCurrentTime;
let workTimeTextElement = document.getElementById(`workTimerText`);
let workTimerBackgroundElement = document.getElementById(`workTimerFlexBox`);
let breakTimerBackgroundElement = document.getElementById(`breakTimerFlexBox`);
let breakTimeTextElement = document.getElementById(`breakTimerText`);
let workTimeMinuteLength = Math.floor(workCurrentTime/60).toString().length;
let breakTimeMinuteLength = Math.floor(breakCurrentTime/60).toString().length;
let timerCurrentlyRunning = false;
let globalTimerObject = null;
let watchTimerRunning = false;
let breakTimerRunning = false;

function resetTimerDisplay() {
  if (localWorkTime !== 0)
  {
    let newWorkMinutes = Math.floor(localWorkTime / 60).toString();
    let newWorkSeconds = (localWorkTime % 60).toString();
    if (newWorkMinutes.length < workTimeMinuteLength)
    {
      for (let i = 0; i < workTimeMinuteLength - newWorkMinutes.length; i++)
      {
        newWorkMinutes = `0` + newWorkMinutes;
      }
    }
    if (newWorkSeconds.length < 2)
    {
      newWorkSeconds = `0` + newWorkSeconds;
    }
    workTimeTextElement.innerText = `${newWorkMinutes}:${newWorkSeconds}`;
  }
  if (localBreakTime !== 0)
  {
    let newBreakMinutes = Math.floor(localBreakTime / 60).toString();
    let newBreakSeconds = (localBreakTime % 60).toString();
    if (newBreakMinutes.length < breakTimeMinuteLength)
    {
      for (let i = 0; i < breakTimeMinuteLength - newBreakMinutes.length; i++)
      {
        newBreakMinutes = `0` + newBreakMinutes;
      }
    }
    if (newBreakSeconds.length < 2)
    {
      newBreakSeconds = `0` + newBreakSeconds;
    }
    breakTimeTextElement.innerText = `${newBreakMinutes}:${newBreakSeconds}`;
  }
}

function TimerRun( )
{
  if (localWorkTime !== 0)
  {
    workTimerBackgroundElement.style.backgroundColor = `darkgreen`;
    breakTimerBackgroundElement.style.backgroundColor = `darkblue`;
    watchTimerRunning = true;
    breakTimerRunning = false;
    localWorkTime -= 1;
    let newWorkMinutes = Math.floor(localWorkTime / 60).toString();
    let newWorkSeconds = (localWorkTime % 60).toString();
    if (newWorkMinutes.length < workTimeMinuteLength)
    {
      for (let i = 0; i < workTimeMinuteLength - newWorkMinutes.length; i++)
      {
        newWorkMinutes = `0` + newWorkMinutes;
      }
    }
    if (newWorkSeconds.length < 2)
    {
      newWorkSeconds = `0` + newWorkSeconds;
    }
    workTimeTextElement.innerText = `${newWorkMinutes}:${newWorkSeconds}`;

  }else if (localBreakTime !== 0)
  {
    workTimerBackgroundElement.style.backgroundColor = `darkblue`;
    breakTimerBackgroundElement.style.backgroundColor = `darkgreen`;
    watchTimerRunning = false;
    breakTimerRunning = true;
    localBreakTime -= 1;
    let newBreakMinutes = Math.floor(localBreakTime / 60).toString();
    let newBreakSeconds = (localBreakTime % 60).toString();
    if (newBreakMinutes.length < breakTimeMinuteLength)
    {
      for (let i = 0; i < breakTimeMinuteLength - newBreakMinutes.length; i++)
      {
        newBreakMinutes = `0` + newBreakMinutes;
      }
    }
    if (newBreakSeconds.length < 2)
    {
      newBreakSeconds = `0` + newBreakSeconds;
    }
    breakTimeTextElement.innerText = `${newBreakMinutes}:${newBreakSeconds}`;

  }else
  {
    workTimerBackgroundElement.style.backgroundColor = `darkgreen`;
    breakTimerBackgroundElement.style.backgroundColor = `darkblue`;
    localWorkTime = workCurrentTime;
    localBreakTime = breakCurrentTime;
    resetTimerDisplay();
    clearInterval(globalTimerObject);
    timerCurrentlyRunning = false;
    startTimer();
  }
}
function startTimer() {
  if (!timerCurrentlyRunning)
  {
    globalTimerObject = setInterval(TimerRun,1000);
    timerCurrentlyRunning = true;
    let valueElements = Array.from(document.getElementsByClassName(`timerOptions`));
    valueElements.forEach(box => box.style.visibility = `hidden`);
  }
}
function pauseTimer() {
  clearInterval(globalTimerObject);
  timerCurrentlyRunning = false;
}
function resetTimer() {
  clearInterval(globalTimerObject);
  localWorkTime = workDefaultTime;
  localBreakTime = breakDefaultTime;
  workCurrentTime = workDefaultTime;
  breakCurrentTime = breakDefaultTime;
  workTimeTextElement.innerText = `${Math.floor(localWorkTime / 60)}:00`;
  breakTimeTextElement.innerText = `${Math.floor(localBreakTime / 60)}:00`;
  timerCurrentlyRunning = false;
  let valueElements = Array.from(document.getElementsByClassName(`timerOptions`));
  valueElements.forEach(box => box.style.visibility = `visible`);
}
function stopTimer() {
  clearInterval(globalTimerObject);
  localWorkTime = workCurrentTime;
  localBreakTime = breakCurrentTime;
  workTimeTextElement.innerText = `${Math.floor(localWorkTime / 60)}:00`;
  breakTimeTextElement.innerText = `${Math.floor(localBreakTime / 60)}:00`;
  timerCurrentlyRunning = false;
  let valueElements = Array.from(document.getElementsByClassName(`timerOptions`));
  valueElements.forEach(box => box.style.visibility = `visible`);
  workTimerBackgroundElement.style.backgroundColor = `darkblue`;
  breakTimerBackgroundElement.style.backgroundColor = `darkblue`;
}
function timerOptionsAction(operation) {
  switch (operation) {
    case `workTimerIncrease`:
        workCurrentTime += 60;
        localWorkTime = workCurrentTime;
      break;
    case  `workTimerDecrease`:
      if (workCurrentTime > 60)
      {
        workCurrentTime -= 60;
        localWorkTime = workCurrentTime;
      }
      break;
    case  `breakTimerIncrease`:
      breakCurrentTime += 60;
      localBreakTime = breakCurrentTime;
      break;
    case  `breakTimerDecrease`:
      if (breakCurrentTime > 60)
      {
        breakCurrentTime -= 60;
        localBreakTime = breakCurrentTime;
      }
      break;
  }
  workTimeMinuteLength = Math.floor(workCurrentTime/60).toString().length;
  breakTimeMinuteLength = Math.floor(breakCurrentTime/60).toString().length;
  resetTimerDisplay();
}
document.getElementById(`pauseButton`).addEventListener(`mouseup`, pauseTimer);
document.getElementById(`playButton`).addEventListener(`mouseup`, startTimer);
document.getElementById(`stopButton`).addEventListener(`mouseup`, stopTimer);
document.getElementById(`resetButton`).addEventListener(`mouseup`, resetTimer);
document.getElementById(`workTimerIncrease`).addEventListener
(`mouseup`, function(e){ timerOptionsAction.call(this, `workTimerIncrease`) },true  );
document.getElementById(`workTimerDecrease`).addEventListener
(`mouseup`, function(e){ timerOptionsAction.call(this, `workTimerDecrease`) },true  );
document.getElementById(`breakTimerIncrease`).addEventListener
(`mouseup`, function(e){ timerOptionsAction.call(this, `breakTimerIncrease`) },true  );
document.getElementById(`breakTimerDecrease`).addEventListener
(`mouseup`, function(e){ timerOptionsAction.call(this, `breakTimerDecrease`) },true  );




