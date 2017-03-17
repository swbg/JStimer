function Timer(display, button, sound, parent) {
    // finished && !running     --> initial state
    // !finished && running     --> timer running
    // !finished && !running    --> timer paused
    // finished && running      --> timer finished

    this.running = false;
    this.finished = true;

    this.fixInput = function() {
        originalInput = display.value;
    };
    this.formatInput = function() {
        var inputTime = getInput();
        var min = inputTime[0], sec = inputTime[1];
        min = (min.length < 2) ? "0" + min : min;
        sec = (sec.length < 2) ? "0" + sec : sec;
        display.value = min + ":" + sec;
    };
    this.start = function() {
        if(!this.running) {
            display.setAttribute("disabled", "disabled");
            this.running = true;
            if(this.finished) {
                originalInput = display.value;
                this.finished = false;
            }
            display.className = "timeDisplayActive";
            var inputTime = getInput();
            time = (parseInt(inputTime[0], 10) * 60 + parseInt(inputTime[1], 10)) * 1000;              // calculate time in ms
            offset = Date.now();
            interval = window.setInterval(countDown.bind(this), 100);
        }
    };
    this.pause = function() {
        if(this.running && !this.finished) {
            display.removeAttribute("disabled");
            this.running = false;
            window.clearInterval(interval);
        }
    };
    this.reset = function() {
        this.running = false;
        this.finished = true;
        display.removeAttribute("disabled");
        display.className = "timeDisplay";
        display.value = originalInput;
        display.className = "timeDisplay";
    };

    var time = 0,
        originalInput = "00:00",                                                       // time user entered before pressing start
        interval,
        offset;

    function getInput() {
        var input = "0000" + display.value.replace(/\D/g, "");
        input = input.substring(input.length-4, input.length);
        var sec = input.substring(input.length-2, input.length),
            min = input.substring(0, input.length-2);
        return [min, sec];
    }
    function countDown() {
        if(this.running && !this.finished) {
            var currentTime = Date.now();
            time -= currentTime - offset;
            offset = currentTime;
            if(time <= 0) {
                this.finished = true;
                this.running = true;
                window.clearInterval(interval);
                display.className = "timeDisplayFinished";
                parent.signal();
            }
            else {
                var min = Math.floor((time/1000)/60).toString(),
                    sec = Math.floor((time/1000)%60).toString();
                min = (min.length < 2) ? "0" + min : min;
                sec = (sec.length < 2) ? "0" + sec : sec;
                display.value = min + ":" + sec;
            }
        }
    }
}
