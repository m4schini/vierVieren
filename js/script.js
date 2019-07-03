function createCookie(name, value, expirationDate) {
    var expires;
    if (expirationDate) {
        //var date = new Date();
        //date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        //expires = "; expires=" + date.toGMTString();
        var date = new Date();
        date.setTime(new Date(expirationDate).getTime());
        expires = "; expires=" + date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=");
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1;
            c_end = document.cookie.indexOf(";", c_start);
            if (c_end == -1) {
                c_end = document.cookie.length;
            }
            return unescape(document.cookie.substring(c_start, c_end));
        }
    }
    return "";
}

//function input(e) {
//    var tbInput = document.getElementById("display");
//    tbInput.innerHTML += e.value;
//}

function del() {
    var tbInput = document.getElementById("display");
    tbInput.innerHTML = tbInput.innerHTML.substr(0, tbInput.innerHTML.length - 1);
}

function write(key) {
    document.getElementsByClassName("mDisplay")[0].innerHTML = key;
}

function clear() {
    document.getElementById("display").innerHTML = "";
}