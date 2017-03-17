function TimerWrapper(display, button, sound) {
    this.timer = new Timer(display, button, sound, this);
    this.running = function() { console.log(this.timer.running); return this.timer.running; };
    this.finished = function() { return this.timer.finished; };
    this.formatInput = function() { this.timer.formatInput(); };
    this.start = function() { this.timer.start(); };
    this.pause = function() { this.timer.pause(); };
    this.reset = function() { this.timer.reset(); };
    this.signal = function() {
        button.innerHTML = "OK";
        sound.play();
    };
}
