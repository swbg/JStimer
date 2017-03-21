function TimerWrapper(display, button, sound, recentlyUsedDisplay) {
    this.timer = new Timer(display, button, sound, this);
    this.getRunning = function() { return this.timer.running; };
    this.getFinished = function() { return this.timer.finished; };
    this.formatInput = function() { this.timer.formatInput(); };
    this.start = function() {
        if(this.timer.finished && !this.timer.running) {
            memory.add(display.value);
            memory.redraw();
        }
        this.timer.start();
    };
    this.pause = function() { this.timer.pause(); };
    this.reset = function() {
        button.innerHTML = "Start";
        this.timer.reset();
    };
    this.signal = function() {
        button.innerHTML = "OK";
        sound.play();
    };
    this.setValue = function(value) {
        display.value = value;
    };

    var memory = new Memory("timer", recentlyUsedDisplay, 3, this);
}
