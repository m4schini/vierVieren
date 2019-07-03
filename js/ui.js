//Overcomplicated waste of time:
//{
//    revert : function(event, ui) {
//        // on older version of jQuery use "draggable"
//        // $(this).data("draggable")
//        // on 2.x versions of jQuery use "ui-draggable"
//        // $(this).data("ui-draggable")
//        $(this).data("uiDraggable").originalPosition = {
//            top : 0,
//            left : 0
//        };
//        // return boolean
//        return !event;
//        // that evaluate like this:
//        // return event !== false ? false : true;
//    }     
//}        
// Do this ⬇ instead
$(".drag").draggable({
    revert: true,
});

$("#display").droppable({
    drop: function (event, ui) {
        $(this)
            .html($(this).html() + ui.draggable.attr("value"));
            
    }
});

function success(id) {
    $("#displ_" + id).css("background-color", "red");
}

//TODO remove duplication
function add(obj) {
    $("#display").html($("#display").html() + obj.innerHTML);
}   