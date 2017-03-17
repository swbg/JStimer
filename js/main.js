// ===== nav =====

var selectStopwatchButton = document.getElementById("stopwatchSelect"),
    selectTimerButton = document.getElementById("timerSelect"),
    selectTabataButton = document.getElementById("tabataSelect"),
    stopwatchContainer = document.getElementById("stopwatchContainer"),
    timerContainer = document.getElementById("timerContainer"),
    tabataContainer = document.getElementById("tabataContainer");

selectStopwatchButton.addEventListener("click", function() {
    stopwatchContainer.className = "container stopwatchElement";
    timerContainer.className = "container-hidden timerElement";
    tabataContainer.className = "container-hidden tabataElement";
});

selectTimerButton.addEventListener("click", function() {
    stopwatchContainer.className = "container-hidden stopwatchElement";
    timerContainer.className = "container timerElement";
    tabataContainer.className = "container-hidden tabataElement";
});

selectTabataButton.addEventListener("click", function() {
    stopwatchContainer.className = "container-hidden stopwatchElement";
    timerContainer.className = "container-hidden timerElement";
    tabataContainer.className = "container tabataElement";
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
    stopwatchObject = new Stopwatch(stopwatchDisplay);

stopwatchToggleButton.addEventListener("click", function() {
    if(stopwatchObject.running) {
        stopwatchObject.pause();
        stopwatchToggleButton.innerHTML = "Resume";
    }
    else {
        stopwatchObject.start();
        stopwatchToggleButton.innerHTML = "Pause";
    }
});

stopwatchResetButton.addEventListener("click", function() {
    if(!stopwatchObject.running) {
        stopwatchObject.reset();
        stopwatchToggleButton.innerHTML = "Start";
    }
});

// ===== timer =====

var timerInput = document.getElementById("timerInput");
var timerToggleButton = document.getElementById("timerToggle");
var timerResetButton = document.getElementById("timerReset");
var timerObject = new TimerWrapper(timerInput, timerToggleButton, document.getElementById("audiotag1"));

addSelectAllOnFocus(timerInput);

timerInput.addEventListener("input", function() {
    timerObject.formatInput();
});
timerToggleButton.addEventListener("click", function() {
    if(!timerObject.running()) {
        timerObject.start();
        timerToggleButton.innerHTML = "Pause";
    }
    else if(timerObject.finished()) {
        timerReset();
    }
    else {
        timerObject.pause();
        timerToggleButton.innerHTML = "Resume";
    }

});
timerResetButton.addEventListener("click", function() {
    if(!timerObject.running()) {
        timerReset();
    }
});

function timerReset() {
    timerObject.reset();
    timerToggleButton.innerHTML = "Start";
}

// ===== tabata =====

var tabataSlotsForm = document.getElementById("tabataSlots"),
    tabataCyclesForm = document.getElementById("tabataCycles"),
    tabataToggleButton = document.getElementById("tabataToggle"),
    tabataResetButton = document.getElementById("tabataReset"),
    tabataInput = document.getElementById("ti1"),
    tabataDisplayContainer = document.getElementById("tabataDisplayContainer"),
    inputCount = 1,
    tabataObject = new TabataWrapper(tabataToggleButton);

tabataObject.timerList.push(new Timer(tabataInput, tabataToggleButton, document.getElementById("audiotag1"), tabataObject));
tabataObject.cycles = 6;
addSelectAllOnFocus(tabataInput);
tabataInput.addEventListener("input", function() {
    tabataObject.timerList[0].formatInput();
});

function addTabataInput() {
    inputCount++;
    var newInput = document.createElement("input");
    newInput.className = "timeDisplay tabataInput";
    newInput.id = "ti" + inputCount;
    newInput.setAttribute("type", "text");
    newInput.setAttribute("value", "00:00");
    newInput.setAttribute("autocomplete", "off");
    tabataDisplayContainer.appendChild(newInput);
    addSelectAllOnFocus(newInput);
    tabataObject.timerList.push(new Timer(newInput,tabataToggleButton, document.getElementById("audiotag1"), tabataObject));
    newInput.addEventListener("input", function() {
        tabataObject.timerList[newInput.id.substring(2)-1].formatInput();
    });
}

function removeTabataInput() {
    inputCount--;
    tabataDisplayContainer.removeChild(tabataDisplayContainer.childNodes[inputCount])
    tabataObject.timerList.pop();
}

tabataSlotsForm.addEventListener("input", function() {
    var nr = tabataSlotsForm.value;
    if(tabataSlotsForm.value > inputCount) {
        for(var i = 0; inputCount+i < nr; i++) {
            tabataObject.reset();
            addTabataInput();
        }
    }
    else if (tabataSlotsForm.value < inputCount) {
        for(var i = 0; inputCount-i > nr; i++) {
            tabataObject.reset();
            removeTabataInput();
        }
    }
});
tabataCyclesForm.addEventListener("input", function() {
    tabataObject.cycles = parseInt(tabataCyclesForm.value, 10);
});
tabataToggleButton.addEventListener("click", function() {
    if(tabataObject.finished) {
        tabataReset();
    }
    else if(!tabataObject.running) {
        tabataObject.start();
        tabataToggleButton.innerHTML = "Pause";
    }
    else {
        tabataObject.pause();
        tabataToggleButton.innerHTML = "Resume";
    }

});
tabataResetButton.addEventListener("click", function() {
    if(!tabataObject.running) {
        tabataReset();
        tabataToggleButton.innerHTML = "Start";
    }
});

function tabataReset() {
    tabataObject.reset();
    tabataToggleButton.innerHTML = "Start";
}
