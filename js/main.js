// ===== nav =====

var selectStopwatchButton = document.getElementById("stopwatchSelect"),
    selectTimerButton = document.getElementById("timerSelect"),
    selectTabataButton = document.getElementById("tabataSelect"),
    stopwatchContainer = document.getElementById("stopwatchContainer"),
    timerContainer = document.getElementById("timerContainer"),
    tabataContainer = document.getElementById("tabataContainer");

selectStopwatchButton.addEventListener("click", function() {
    stopwatchContainer.className = "container";
    timerContainer.className = "container-hidden";
    tabataContainer.className = "container-hidden";
    selectStopwatchButton.className = "navControlActive";
    selectTimerButton.className = "navControl";
    selectTabataButton.className = "navControl";
});

selectTimerButton.addEventListener("click", function() {
    stopwatchContainer.className = "container-hidden";
    timerContainer.className = "container";
    tabataContainer.className = "container-hidden";
    selectStopwatchButton.className = "navControl";
    selectTimerButton.className = "navControlActive";
    selectTabataButton.className = "navControl";
});

selectTabataButton.addEventListener("click", function() {
    stopwatchContainer.className = "container-hidden";
    timerContainer.className = "container-hidden";
    tabataContainer.className = "container";
    selectStopwatchButton.className = "navControl";
    selectTimerButton.className = "navControl";
    selectTabataButton.className = "navControlActive";
});

// ===== all input forms =====

function addSelectAllOnFocus(inputForm) {
    inputForm.addEventListener("focus", function() {
        inputForm.select();
    });
}

// ===== stopwatch =====

var stopwatchDisplay = document.getElementById("stopwatchDisplay"),
    stopwatchToggleButton = document.getElementById("stopwatchToggle"),
    stopwatchResetButton = document.getElementById("stopwatchReset"),
    stopwatchLapButton = document.getElementById("stopwatchLap"),
    stopwatchLapDisplay = document.getElementById("stopwatchLapsHidden"),
    stopwatchObject = new Stopwatch(stopwatchDisplay, stopwatchLapDisplay);

stopwatchToggleButton.addEventListener("click", function() {
    if(stopwatchObject.running) {
        stopwatchObject.pause();
        stopwatchToggleButton.innerHTML = "Resume";
    }
    else {
        stopwatchObject.start();
        stopwatchLapDisplay.id = "stopwatchLaps";
        stopwatchToggleButton.innerHTML = "Pause";
    }
});

stopwatchResetButton.addEventListener("click", function() {
    if(!stopwatchObject.running) {
        stopwatchObject.reset();
        stopwatchLapDisplay.id = "stopwatchLapsHidden";
        stopwatchToggleButton.innerHTML = "Start";
    }
});

stopwatchLapButton.addEventListener("click", function() {
    if(stopwatchObject.running) {
        stopwatchObject.lap();
    }
});

// ===== timer =====

var timerInput = document.getElementById("timerInput");
var timerToggleButton = document.getElementById("timerToggle");
var timerResetButton = document.getElementById("timerReset");
var timerObject = new TimerWrapper(timerInput, timerToggleButton, document.getElementById("audiotag2"), document.getElementById("timerRecentlyUsed"));

addSelectAllOnFocus(timerInput);

timerInput.addEventListener("input", function() {
    if(!(timerObject.getFinished() && !timerObject.getRunning())) {
        var tmpvalue = this.value;
        timerObject.reset();
        this.value = tmpvalue;
    }
    timerObject.formatInput();
});
timerToggleButton.addEventListener("click", function() {
    if(!timerObject.getRunning()) {
        timerObject.start();
        timerToggleButton.innerHTML = "Pause";
    }
    else if(timerObject.getFinished()) {
        timerObject.reset();
    }
    else {
        timerObject.pause();
        timerToggleButton.innerHTML = "Resume";
    }

});
timerResetButton.addEventListener("click", function() {
    if(!timerObject.getRunning()) {
        timerObject.reset();
    }
});

// ===== tabata =====

var tabataSlotsForm = document.getElementById("tabataSlots"),
    tabataCyclesForm = document.getElementById("tabataCycles"),
    tabataToggleButton = document.getElementById("tabataToggle"),
    tabataResetButton = document.getElementById("tabataReset"),
    tabataInput = document.getElementById("ti1"),
    tabataDisplayContainer = document.getElementById("tabataDisplayContainer"),
    tabataObject = new TabataWrapper(tabataToggleButton, tabataDisplayContainer, document.getElementById("tabataRecentlyUsed"), tabataSlotsForm, tabataCyclesForm, document.getElementById("audiotag0"), document.getElementById("audiotag1"), document.getElementById("audiotag2"), document.getElementById("cycleCountInactive"));

tabataObject.timerList.push(new Timer(tabataInput, tabataToggleButton, document.getElementById("audiotag1"), tabataObject));
tabataObject.cycles = 6;
addSelectAllOnFocus(tabataInput);
tabataInput.addEventListener("input", function() {
    tabataObject.timerList[0].formatInput();
});

tabataSlotsForm.addEventListener("input", function() {
    tabataObject.reset();
    while(tabataSlotsForm.value > tabataObject.timerList.length) {
        tabataObject.addInput("00:00");
    }
    while(tabataSlotsForm.value < tabataObject.timerList.length) {
        tabataObject.removeInput();
    }
});
tabataCyclesForm.addEventListener("input", function() {
    tabataObject.cycles = parseInt(tabataCyclesForm.value, 10);
});
tabataToggleButton.addEventListener("click", function() {
    if(!tabataObject.getRunning()) {
        tabataObject.start();
        tabataToggleButton.innerHTML = "Pause";
    }
    else if(tabataObject.getFinished()) {
        tabataReset();
    }
    else {
        tabataObject.pause();
        tabataToggleButton.innerHTML = "Resume";
    }

});
tabataResetButton.addEventListener("click", function() {
    if(!tabataObject.getRunning() || tabataObject.getFinished()) {
        tabataReset();
        tabataToggleButton.innerHTML = "Start";
    }
});

function tabataReset() {
    tabataObject.reset();
    tabataToggleButton.innerHTML = "Start";
}
