function TabataWrapper(toggleButton) {
    this.timerList = [];
    this.cycles = 6;
    this.finished = false;
    this.running = false;
    this.started = false;

    var currentTimer = 0,
        currentCycle = 1;

    this.reset = function() {
        applyToAll.bind(this)(function(timer) { timer.reset(); });
        this.started = false;
        this.finished = false;
        currentTimer = 0;
        currentCycle = 1;
    };
    this.start = function() {
        console.log(this);
        if(!this.running) {
            if(!this.started) {
                applyToAll.bind(this)(function(timer) { timer.fixInput(); });
                this.started = true;
                currentCycle = 1;
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
            this.timerList[currentTimer].start();
        }
        else {
            if(this.cycles > currentCycle) {
                currentCycle++;
                currentTimer = 0;
                this.running = false;
                this.start();
            }
            else {
                this.finished = true;
                this.running = false;
                toggleButton.innerHTML = "OK";
            }
        }
    };

    function applyToAll(func) {
        for(var i = 0; i < this.timerList.length; i++) {
            func(this.timerList[i]);
        }
    }
}
