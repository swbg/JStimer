function Stopwatch(timeDisplay, lapDisplay) {
    this.running = false;
    this.lap = function() {
        var element = document.createElement("p");
        element.appendChild(document.createTextNode(formatTime(time)));
        time = 0;
        update();
        lapDisplay.appendChild(element);
    };
    this.start = function() {
        if(!this.running) {
            this.running = true;
            offset = Date.now();
            interval = window.setInterval(update.bind(this), 10);
        }
    };
    this.pause = function() {
        if(this.running) {
            this.running = false;
            window.clearInterval(interval);
        }
    };
    this.reset = function() {
        var id = lapDisplay.firstChild.id;
        while (lapDisplay.lastChild.id !== id) {
            lapDisplay.removeChild(lapDisplay.lastChild);
        }
        time = 0;
        update();
    };

    var time = 0,
        interval,
        offset;
    function update() {
        if(this.running) {
            var currentTime = Date.now();
            time += currentTime - offset;
            offset = currentTime;
        }
        timeDisplay.value = formatTime(time);
    }
    function formatTime(timeInMilliseconds) {
        var time = new Date(timeInMilliseconds);
        var min = time.getMinutes().toString(),
            sec = time.getSeconds().toString(),
            ms = time.getMilliseconds().toString();
        min = (min.length < 2) ? "0" + min : min;
        sec = (sec.length < 2) ? "0" + sec : sec;
        ms = (ms.length < 2) ? "00" + ms : (ms.length < 3) ? "0" + ms : ms;
        return min + ":" + sec + ":" + ms;
    }
}
