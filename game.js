var url = new URL(window.location.href);

var display = document.getElementById('eq_display'),
    modules = document.getElementById('list_modules'),
    levelElem = document.getElementById('equals_num');

//standard settings of a 4x4
var gElements = 4,
    gNumber = 4,
    gLevels = 10;

var level = window.sessionStorage.getItem("level"),
    gamemode = url.searchParams.get("gm");

if (gamemode == null) {
    url.searchParams.set("gm", "4x4")
    gamemode = "4x4"
}

// Create Game
var gamemodes = {};
$.getJSON("/res/gamemodes.json", function (data) {
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

//handles no gameparameter or change of parameter
if (window.sessionStorage.getItem("gamemode") == null) {
    window.sessionStorage.setItem("gamemode", gamemode)
}
if (level == null || gamemode != window.sessionStorage.getItem("gamemode")) {
    level = 0;
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
        } else {
            //false answer
            $('#modal_fail').modal('toggle')
        }
    } catch (err) {
        //wrong syntax
        $('#modal_err').modal('toggle')
    }
}

function resetDisplay() {
    levelElem.innerHTML = level;
    window.sessionStorage.setItem('level', level)
    location.reload();
}

function changeLevel(next) {
    if (next) {
        level++;
        if (level > gLevels - 1) {
            $('#modal_final').modal('toggle')

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
