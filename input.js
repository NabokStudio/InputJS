var Input = {
    keyboard: {
        up: [],
        down: [],
        now: [],
        list: {
            "LEFT" : 37,
            "RIGHT" : 39,
            "UP" : 38,
            "DOWN" : 40,
            "SPACE" : 32,
            "CTRL" : 17,
            "SHIFT" : 16,
            "ALT" : 18,
            "ESC" : 27,
            "ENTER" : 13,
            "MINUS" : 189,
            "PLUS" : 187,
            "CAPS_LOCK" : 20,
            "BACKSPACE" : 8,
            "TAB" : 9,
            "Q" : 81,
            "W" : 87,
            "E" : 69,
            "R" : 82,
            "T" : 84,
            "Y" : 89,
            "U" : 85,
            "I" : 73,
            "O" : 79,
            "P" : 80,
            "A" : 65,
            "S" : 83,
            "D" : 68,
            "F" : 70,
            "G" : 71,
            "H" : 72,
            "J" : 74,
            "K" : 75,
            "L" : 76,
            "Z" : 90,
            "X" : 88,
            "V" : 86,
            "B" : 66,
            "N" : 78,
            "M" : 77,
            "0" : 48,
            "1" : 49,
            "2" : 50,
            "3" : 51,
            "4" : 52,
            "5" : 53,
            "6" : 54,
            "7" : 55,
            "8" : 56,
            "C" : 67,
            "9" : 57,
            "F1" : 112,
            "F2" : 113,
            "F3" : 114,
            "F4" : 115,
            "F5" : 116,
            "F6" : 117,
            "F7" : 118,
            "F8" : 119,
            "F9" : 120,
            "F10" : 121,
            "F11" : 122,
            "F12" : 123,
            "NUMPAD0": 96,
            "NUMPAD1": 97,
            "NUMPAD2": 98,
            "NUMPAD3": 99,
            "NUMPAD4": 100,
            "NUMPAD5": 101,
            "NUMPAD6": 102,
            "NUMPAD7": 103,
            "NUMPAD8": 104,
            "NUMPAD9": 105,
            "NUMLOCK": 144,
            "NUMPAD_DIVIDE": 111,
            "NUMPAD_MULTIPLY": 106,
            "NUMPAD_SUBSTRACT": 109,
            "NUMPAD_ADD": 107,
            "NUMPAD_ENTER": 13
        },
        ignored: []
    },
    mouse: {
        x: undefined,
        y: undefined,

        down: undefined,
        up: undefined,
        isDown: undefined,
        isUp: undefined,

        isctxdown: undefined,
        isctxup: undefined,
        getctxdown: undefined,
        getctxup: undefined,

        ignore: undefined
    },
    axis: {
        Vertical: {
            value: 0,
            positive: "S",
            negative: "W"
        },
        Horizontal: {
            value: 0,
            positive: "D",
            negative: "A"
        },
        Arrows: {
            value: 0,
            positive: "RIGHT",
            negative: "LEFT"
        }
    },

    GetButton: function(button) {
        return Input.keyboard.now[Input.GetKeyCode(button)];
    },
    GetButtonDown: function(button) {
        return Input.keyboard.down[Input.GetKeyCode(button)];
    },
    GetButtonUp: function(button) {
        return Input.keyboard.up[Input.GetKeyCode(button)];
    },
    GetKeyCode: function(code) {
        if (typeof code == "number") return code;
        return Input.keyboard.list[code];
    },
    IgnoreKeys: function() {
        for (var i in arguments) {
            Input.keyboard.ignored.push(Input.GetKeyCode(arguments[i]));
        }
    },
    StopIgnoreKeys: function() {
        for (var i in arguments) 
            for (var j in Input.keyboard.ignored) {
                if (Input.GetKeyCode(Input.keyboard.ignored[j]) == Input.GetKeyCode(arguments[i])) Input.keyboard.ignored.splice(j, 1);
            }
    },

    GetMousePosition: function() {
        return {
            x: Input.mouse.x,
            y: Input.mouse.y
        }
    },
    GetMouseButton: function() {
        return Input.mouse.isDown;
    },
    GetMouseUp: function() {
        return Input.mouse.isUp;
    },
    GetMouseButtonDown: function() {
        return Input.mouse.down;
    },
    GetMouseButtonUp: function() {
        return Input.mouse.up;
    },
    GetCtxMenu: function() {
        return Input.mouse.isctxdown;
    },
    GetCtxUp: function() {
        return Input.mouse.isctxup;
    },
    GetCtxMenuDown: function() {
        return Input.mouse.getctxdown;
    },
    GetCtxMenuUp: function() {
        return Input.mouse.getctxup;
    },
    SetCursorStyle: function(style) {
        if (style.indexOf(".") !== -1 ||
            style.indexOf("/") !== -1) {
            document.body.style.cursor = "url(" + style + ")";
        } else {
            document.body.style.cursor = style;
        }
    },
    IgnoreMouse: function() {
        mouse.ignore = true;       
    },
    StopIgnoreMouse: function() {
        mouse.ignore = false;
    },
    HideCursor: function() {
        Input.SetCursorStyle("none");
    },
    UnHideCursor: function(style) {
        if (!style) style = "default";

        Input.SetCursorStyle(style);
    },

    GetAxis: function(name) {
        if (Input.axis[name].value) return Input.axis[name].value;
    },
    CreateNewAxis: function(name, positive, negative) {
            Input.axis[name] = {
                value: 0,
                positive: positive,
                negative: negative
            }
    },
    RemoveAxis: function(name) {
        if (Input.axis[name]) delete Input.axis[name];
    }
}

document.body.addEventListener("keydown", function(e) {

    for (var j in Input.keyboard.ignored) {
        if (Input.keyboard.ignored[j] == e.keyCode) return;
    }

    Input.keyboard.now[e.keyCode] = true;
    Input.keyboard.down[e.keyCode] = true;

    setTimeout(function() {
        Input.keyboard.down[e.keyCode] = false;
    }, 25);

    for (var i in Input.axis) {
        if (e.keyCode == Input.GetKeyCode(Input.axis[i].positive)) Input.axis[i].value = 1;
        if (e.keyCode == Input.GetKeyCode(Input.axis[i].negative)) Input.axis[i].value = -1;
    }
})
document.body.addEventListener("keyup", function(e) {

    for (var j in Input.keyboard.ignored) {
        if (Input.keyboard.ignored[j] == e.keyCode) return;
    }

    Input.keyboard.now[e.keyCode] = false;
    Input.keyboard.down[e.keyCode] = false;
    Input.keyboard.up[e.keyCode] = true;

    setTimeout(function() {
        Input.keyboard.up[e.keyCode] = false;
    }, 25);

    for (var i in Input.axis) {
        if (e.keyCode == Input.GetKeyCode(Input.axis[i].positive) || e.keyCode == Input.GetKeyCode(Input.axis[i].negative)) Input.axis[i].value = 0;
    }
})
document.body.addEventListener("mousemove", function(e) {

    if (mouse.ignore) return;

    Input.mouse.x = e.clientX;
    Input.mouse.y = e.clientY;
})
document.body.addEventListener("mousedown", function(e) {

    if (mouse.ignore) return;

    if (e.which == 3) {
        Input.mouse.isctxup = false;
        Input.mouse.isctxdown = true;

        Input.mouse.getctxdown = true;

        setTimeout(function() {
            Input.mouse.getctxdown = false;
        }, 25)
    }

    Input.mouse.isDown = true;
    Input.mouse.isUp = false;

    Input.mouse.down = true;

    setTimeout(function() {
        Input.mouse.down = false;
    }, 25)
})
document.body.addEventListener("mouseup", function(e) {

    if (mouse.ignore) return;

    if (e.which == 3) {
        Input.mouse.isctxdown = false;
        Input.mouse.isctxup = true;

        Input.mouse.getctxup = true;

        setTimeout(function() {
            Input.mouse.getctxup = false;
        }, 25)
    }

    Input.mouse.isDown = false;
    Input.mouse.isUp = true;

    Input.mouse.up = true;

    setTimeout(function() {
        Input.mouse.up = false;
    }, 25)
})
