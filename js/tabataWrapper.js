function TabataWrapper(toggleButton, displayContainer, recentlyUsedDisplay, slotsInput, cyclesInput, notifySound, cycleSound, finishedSound, cycleCount) {
    // finished && !running     --> initial state
    // !finished && running     --> timer running
    // !finished && !running    --> timer paused
    // finished && running      --> timer finished

    this.timerList = [];
    this.cycles = 6;
    this.finished = true;
    this.running = false;

    var currentTimer = 0,
        currentCycle = 1,
        thisTabataWrapperObject = this,
        memory = new Memory("tabata", recentlyUsedDisplay, 3, this);

    this.getRunning = function() { return this.running; };
    this.getFinished = function() { return this.finished; };
    this.reset = function() {
        applyToAll.bind(this)(function(timer) { timer.reset(); });
        this.running = false;
        this.finished = true;
        currentTimer = 0;
        currentCycle = 1;
        cycleCount.id = "cycleCountInactive";
    };
    this.start = function() {
        if(!this.running) {
            if(this.finished) {
                applyToAll.bind(this)(function(timer) { timer.fixInput(); });
                this.finished = false;
                currentCycle = 1;
                cycleCount.lastChild.value = this.cycles;
                cycleCount.id = "cycleCount";

                var memoryString = "" + this.cycles + "x";
                for(var i = 0; i < this.timerList.length; i++) {
                    memoryString += " " + document.getElementById("ti" + (i+1)).value;
                }
                memory.add(memoryString);
                memory.redraw();
            }
            this.running = true;
            this.timerList[currentTimer].start();
        }
    };
    this.pause = function() {
        if(this.running) {
            this.running = false;
            applyToAll.bind(this)(function(timer) { timer.pause(); });
        }
    };
    this.signal = function() {
        this.timerList[currentTimer].reset();
        currentTimer++;
        if(currentTimer < this.timerList.length) {
            notifySound.play();
            this.timerList[currentTimer].start();
        }
        else {
            cycleCount.lastChild.value--;
            if(this.cycles > currentCycle) {
                cycleSound.play();
                currentCycle++;
                currentTimer = 0;
                this.running = false;
                this.start();
            }
            else {
                finishedSound.play();
                this.finished = true;
                this.running = true;
                toggleButton.innerHTML = "OK";
            }
        }
    };
    this.setValue = function(value) {
        var values = value.split(" ");
        this.cycles = values[0].substring(0, values[0].length-1);
        slotsInput.value = values.length - 1;
        cyclesInput.value = this.cycles;
        while (displayContainer.hasChildNodes()) {
            displayContainer.removeChild(displayContainer.firstChild);
            this.timerList = [];
        }
        for(var i = 1; i < values.length; i++) {
            this.addInput(values[i]);
        }
    };
    this.addInput = function(value) {
        var newInput = document.createElement("input");
        newInput.className = "timeDisplay tabataInput";
        newInput.id = "ti" + (this.timerList.length+1);
        newInput.setAttribute("type", "text");
        newInput.setAttribute("value", value);
        newInput.setAttribute("autocomplete", "off");
        displayContainer.appendChild(newInput);
        newInput.addEventListener("focus", function() {
            this.select();
        });
        var newTimer = new Timer(newInput, toggleButton, document.getElementById("audiotag1"), this);
        newTimer.fixInput();
        this.timerList.push(newTimer);
        newInput.addEventListener("input", function() {
            thisTabataWrapperObject.timerList[this.id.substring(2)-1].formatInput();
        });
    };
    this.removeInput = function() {
        displayContainer.removeChild(displayContainer.lastChild)
        this.timerList.pop();
    }

    function applyToAll(func) {
        for(var i = 0; i < this.timerList.length; i++) {
            func(this.timerList[i]);
        }
    }
}
