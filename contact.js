// form value
var fname = document.getElementById("fname");
var lname = document.getElementById("lname");
var email = document.getElementById("mail");
var emailCheck = document.getElementById("mailCheck");
var phone = document.getElementById("phone");
var content = document.getElementById("content");

function resetForm() {
    fname.value = "";
    fname.setCustomValidity("");
    lname.value = "";
    lname.setCustomValidity("");
    email.value = "";
    email.setCustomValidity("");
    emailCheck.value = "";
    emailCheck.setCustomValidity("");
    phone.value = "";
    phone.setCustomValidity("");
    title.value = "";
    title.setCustomValidity("");
    content.value = "";
    content.setCustomValidity("");
}

function submitForm() {
    var invalid = false;
    if (isInvalid("fname")) {
        fname.setCustomValidity("Invalid field.");
        invalid = true;
    } else {
        fname.setCustomValidity("");
    }

    if (isInvalid("lname")) {
        lname.setCustomValidity("It can not blank or contain number");
        invalid = true;
    } else {
        lname.setCustomValidity("");
    }
    if (isInvalid("email")) {
        email.setCustomValidity("Invalid field.")
        invalid = true;
    } else {
        email.setCustomValidity("");
    }
    if (!(email.value == emailCheck.value) || emailCheck.value == "") {
        emailCheck.setCustomValidity("Invalid field")
        invalid = true;
    } else {
        emailCheck.setCustomValidity("");
    }

    if (isInvalid("phone")) {
        phone.setCustomValidity("Invalid field.")
        invalid = true;
    } else {
        phone.setCustomValidity("");
    }
    if (isInvalid("title")) {
        title.setCustomValidity("Invalid field.")
        invalid = true;
    } else {
        title.setCustomValidity("");
    }
    if (isInvalid("content")) {
        content.setCustomValidity("Invalid field.")
        invalid = true;
    } else {
        content.setCustomValidity("");
    }
    
    if(!invalid){
        receive();
        saveContent();
    }

}

function isInvalid(type) {
    var hasNumber = /\d/
    if (type == "fname") {
        return hasNumber.test(fname.value) || fname.value == "";
    } else if (type == "lname") {
        return hasNumber.test(lname.value) || lname.value == "";
    } else if (type == "email") {
        var isEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !isEmail.test(email.value);
    } else if (type == "phone") {
        var onlyNumber = (/^[0-9]+$/);
        return !onlyNumber.test(phone.value) || phone.value.length != 8;
    } else if (type == "title") {
        return title.value == "";
    } else if (type == "content") {
        return content.value == "";
    }
}

function receive() {
    var defaultOutput = "We Receive, Please wait for our reply!";

    var output = fname.value + " " + lname.value + "<br>";
    output += "phone number : " + phone.value + "<br>";
    output += "email : " + email.value + "<br>";
    output += defaultOutput;

    var form = document.getElementById("form")
    var receiveBlock = document.getElementById("receive");
    receiveBlock.innerHTML = output;
    receiveBlock.style.display = "block";
    form.style.display = "none";
}

// save content to cookie
function saveContent() {
    setCookie("fname", fname.value, 30);
    setCookie("lname", lname.value, 30);
    setCookie("mail", mail.value, 30);
    setCookie("phone", phone.value, 30);
}

// From W3school
function setCookie(cname, cvalue, exdays) {
    document.cookie = "";
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}