

var display = document.getElementById('eq_display'),
    modules = document.getElementById('list_modules'),
    levelElem = document.getElementById('equals_num');

var gElements = 4,
    gNumber = 4,
    gLevels = 10;

var level = window.sessionStorage.getItem("level"),
    gamemode = window.sessionStorage.getItem("gamemode");

// Create Game
var gamemodes = {};
$.getJSON( "./gamemodes.json", function( data ) {
    gamemodes = data;
    if (gamemode == null) {
        level = 0;
        gamemode = "5x9";
        window.sessionStorage.setItem('gamemode', gamemode)
        
        console.log(gamemode)
    }

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
        newCard.innerText = gNumber

        document.getElementById("eq_display").append(newCard)
    }

    console.log(gamemodes[gamemode].title)
})


if (level == null) {
    level = 0;
    console.log(level)
}
levelElem.innerHTML = level;



// Shared lists
new Sortable(display, {
    group: {
        name: 'shared',
    },
    filter: ".ignore-elements",
    animation: 150
});

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
        Array.prototype.slice.call(display.getElementsByClassName("card"), 0)
            .forEach(module => {

                var modAttr = module.getAttribute('data-math');
                if (modAttr === "4" || modAttr === "5") {
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
            console.log(true)
            levelSuc();
        }
    } catch (err) {
        console.log("nope")
    }
}

function levelSuc() {
    $('#modal_nextLevel').modal('toggle')
}

function changeLevel(next) {
    if (next) {
        level++;
        if (level > gLevels-1) {
            $('#modal_final').modal('toggle')

        } else {
            levelElem.innerHTML = level;
            window.sessionStorage.setItem('level', level)
            console.log('next level')
            location.reload();
        }
    } else {
        level = 0;
        levelElem.innerHTML = level;
        window.sessionStorage.setItem('level', level)
        console.log('level 0')
        location.reload();
    }
}
