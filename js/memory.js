// type: a string identifying which cookies are saved (stopwatch, timer, tabata)

function Memory(type, recentlyUsedDisplay, nrSlots, parent) {
    var list = [],
        thisMemoryObject = this,
        parent = parent;

    function readCookie() {
        list = [];
        var cookies = document.cookie.split(/; */);
        for(var i = 0; i < cookies.length; i++) {
            if(cookies[i].startsWith(type)) {
                list.push(cookies[i].split("=")[1]);
            }
        }
    }
    function writeCookie() {
        for(var i = 0; i < nrSlots; i++) {
            document.cookie = type + i + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        }
        var expDate = new Date();
        expDate.setDate(expDate.getDate() + 100);   // expires in 100 days
        expDate = expDate.toUTCString();
        for(var i = 0; i < list.length; i++) {
            document.cookie = type + i + "=" + list[i] + "; expires=" + expDate + "; path=/;";
        }
    }
    this.clear = function() {
        list = [];
        writeCookie();
        thisMemoryObject.redraw();
    }
    this.add = function(input) {                    // input should be a correctly formatted string
        var index = list.indexOf(input);
        if(index == -1) {
            list.unshift(input);
            while(list.length > nrSlots) {
                list.pop();
            }
        }
        else if(index > 0) {
            list.splice(index, 1);
            list.unshift(input);
        }
        writeCookie();
    };
    this.redraw = function() {
        while (recentlyUsedDisplay.hasChildNodes()) {
            recentlyUsedDisplay.removeChild(recentlyUsedDisplay.firstChild);
        }
        for(var i = 0; i < list.length; i++) {
            var element = document.createElement("button");
            element.appendChild(document.createTextNode(list[i]));
            element.className = "recentlyUsedButton";
            recentlyUsedDisplay.appendChild(element);
            element.addEventListener("click", function() {
                if(!parent.getRunning()) {
                    parent.reset();
                    parent.setValue(this.textContent);
                }
            });
        }
        if(list.length > 0) {
            var clearButton = document.createElement("button");
            clearButton.appendChild(document.createTextNode("clear"));
            clearButton.className = "clearButton";
            recentlyUsedDisplay.appendChild(clearButton);
            clearButton.addEventListener("click", function() {
                thisMemoryObject.clear();
            });
        }
    };

    readCookie();
    this.redraw();
}
