var url = new URL(window.location.href);
var notPlayed = true;

var display = document.getElementById('eq_display'),
    modules = document.getElementById('list_modules'),
    levelElem = document.getElementById('equals_num');

//standard settings of a 4x4
var gElements = 4,
    gNumber = 4,
    gLevels = 10;

//competitive settings
var pts_win = 2000,
    pts_lose = -500,
    time_penalty = 10,  //subtracted every second after penalty start
    penalty_after = 10000, //ms after start
    gamestart = 0;

var level = window.sessionStorage.getItem("level"),
    gl_score = window.sessionStorage.getItem("score")
    gamemode = url.searchParams.get("gm");
if (gl_score == null) {
    gl_score = 0
} else {
    gl_score = parseInt(gl_score)
}
if (gamemode == null) {
    url.searchParams.set("gm", "4x4")
    gamemode = "4x4"
}

// Create Game
var gamemodes = {};
$.getJSON("res/gamemodes.json", function (data) {
    gamemodes = data;

    document.getElementById("title").innerHTML = gamemodes[gamemode].title
    document.getElementById("headline").innerHTML = gamemodes[gamemode].title

    //Configure game settings
    gElements = gamemodes[gamemode].elements
    gNumber = gamemodes[gamemode].number
    gLevels = gamemodes[gamemode].levels

    console.log(gNumber)

    //Create Game Cards
    for (let index = 0; index < gElements; index++) {
        var newCard = document.createElement("div")
        newCard.classList.add("card")
        newCard.classList.add("ignore-elements")
        newCard.setAttribute("data-math", gNumber)
        newCard.setAttribute("data-number", true)
        newCard.innerText = gNumber

        document.getElementById("eq_display").append(newCard)
    }

    console.log(gamemodes[gamemode].title)
})

//handles no game parameter or change of parameter
if (window.sessionStorage.getItem("gamemode") == null) {
    window.sessionStorage.setItem("gamemode", gamemode)
}
if (level == null || gamemode != window.sessionStorage.getItem("gamemode")) {
    level = 0;
    gl_score = 0;
    console.log(level)
}
levelElem.innerHTML = level;
window.sessionStorage.setItem('gamemode', gamemode) //set gamemode in cookie 

// List of number cards
new Sortable(display, {
    group: {
        name: 'shared',
    },
    filter: ".ignore-elements",
    animation: 150
});

// List of operator cards
new Sortable(modules, {
    group: {
        name: 'shared',
        pull: 'clone'
    },
    animation: 150,
    sort: false, // To disable sorting: set sort to false

    onAdd: function (evt) {
        evt.item.parentNode.removeChild(evt.item)
    }
});
gamestart = new Date()
/*
Game constructed.
*/

function stopTime() {
    var timeDiff = new Date() - gamestart
    return timeDiff
}

function setScore(newScore) {
    gl_score = newScore
    window.sessionStorage.setItem("score", newScore)
}

function evalScore(timeDiff) {
    var penalty = 0;
    document.getElementById("timecount").innerText = timeDiff/1000
    pen_time = Math.floor((timeDiff - penalty_after)/1000)

    if (pen_time >= 1) {
        penalty = pen_time * time_penalty
        console.log("penalty: " + penalty)

        document.getElementById("timepen").innerHTML = 'Du hast zuviel Zeit gebraucht. Deswegen wurden dir <span style="color: red;">' + penalty + ' Punkte</span> abgezogen.'
    }
    console.log(gl_score)
    console.log(pts_win)
    console.log(penalty)
    console.log(gl_score + pts_win - penalty)
    var newGlobScore = gl_score + pts_win - penalty;
    
    document.getElementById("score").innerText = newGlobScore
    setScore(newGlobScore)
}

function calc() {
    var equation = "";
    var isNum = false;
    try {
        //assemble equation string
        Array.prototype.slice.call(display.getElementsByClassName("card"), 0)
            .forEach(module => {

                // check for multible digit numbers
                var modAttr = module.getAttribute('data-number');
                if (modAttr) {
                    if (isNum === true) {
                        throw 400;
                    }
                    isNum = true;
                } else {
                    isNum = false;
                }
                equation += module.getAttribute('data-math');

            });
        console.log(eval(equation))

        if (eval(equation) == level) {
            //right answer
            $('#modal_nextLevel').modal('toggle')
            if (notPlayed) {
                evalScore(stopTime())
            }            
            notPlayed = false;
        } else {
            //false answer
            setScore(gl_score + pts_lose)
            $('#modal_fail').modal('toggle')
        }
    } catch (err) {
        //wrong syntax
        $('#modal_err').modal('toggle')
    }
}

function setLevel(newLevel) {
    window.sessionStorage.setItem("level", newLevel)
    level = newLevel
}

function restartAlert() {
    $('#modal_restart').modal('toggle')
  }

function resetDisplay() {
    levelElem.innerHTML = level;
    window.sessionStorage.setItem('level', level)
    location.reload();
}

function resetLevel() {
    setScore(gl_score + pts_lose)
    resetDisplay()
}

function resetGame() {
    setLevel(0)
    setScore(0)
    resetDisplay()
}

function changeLevel(next) {
    if (next) {
        level++;
        if (level > gLevels - 1) {
            $('#modal_final').modal('toggle')
            console.log(gl_score)
            document.getElementById("fnscore").innerHTML = gl_score
            setScore(0)
        } else {
            resetDisplay()
        }
    } else {
        level = 0;
        levelElem.innerHTML = level;
        window.sessionStorage.setItem('level', level)
        console.log('level 0')
        location.reload();
    }
}
