var level = 0;
var display = document.getElementById('eq_display'),
    modules = document.getElementById('list_modules'),
    levelElem = document.getElementById('equals_num');

levelElem.innerHTML = level;


// Example 2 - Shared lists
new Sortable(display, {
    group: {
        name: 'shared',
    },
    filter: ".ignore-elements",
    animation: 150,

    onAdd: function (evt) {
        var equation = "";
        var is4 = false;
        try {
            Array.prototype.slice.call(display.getElementsByClassName("card"), 0)
                .forEach(module => {

                    var modAttr = module.getAttribute('data-math');
                    if (modAttr === "4") {
                        if (is4 === true) {
                            throw 400;
                        }
                        is4 = true;
                    } else {
                        is4 = false;
                    }
                    equation += module.getAttribute('data-math');

                });
            console.log(eval(equation))
            if (eval(equation) === level) {
                console.log(true)
                level++;
                levelElem.innerHTML = level;
            }
        } catch (err) {
            console.log("nope")
        }
    },
    onRemove: function (evt) {
        var equation = "";
        var is4 = false;
        try {
            Array.prototype.slice.call(display.getElementsByClassName("card"), 0)
                .forEach(module => {

                    var modAttr = module.getAttribute('data-math');
                    if (modAttr === "4") {
                        if (is4 === true) {
                            throw 400;
                        }
                        is4 = true;
                    } else {
                        is4 = false;
                    }
                    equation += module.getAttribute('data-math');

                });
            console.log(eval(equation))
            if (eval(equation) === level) {
                console.log(true)
                level++;
                levelElem.innerHTML = level;
            }
        } catch (err) {
            console.log("nope")
        }
    }
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