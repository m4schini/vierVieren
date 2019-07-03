function calc() {
  var disHTML = $("#display").html()

  //TODO: replace ^ with result of Math.pow()
  if (disHTML.includes("^")) {
    
  }


  var result = eval(disHTML);
  if (result >= 0 && result < 10) {
    success(result);
    $("#display").html("");
  } else {
    console.log(result)

  }
}

function power(x, y) {

}