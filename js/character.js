// SlideShow JS Start
//slider
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
    introContentAdd(n)
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
    introContentCurrent(n - 1);
}

function showSlides(n) {
    var i;
    var slides = document.getElementsByClassName("character_img");
    var dots = document.getElementsByClassName("slides_dot");
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}
// SlideShow JS END

// text content of character info
contentIndex = 0;
var content = [
    "intro_murada",
    "intro_ozaki",
    "intro_kanao",
    "intro_chutaro"
]
showContent(0)

function introContentAdd(n) {
    contentIndex += n;

    if (contentIndex >= content.length) {
        contentIndex = 0;
    } else if (contentIndex < 0) {
        contentIndex = content.length - 1;
    }

    showContent(contentIndex);
}

function introContentCurrent(n) {
    contentIndex = n;
    showContent(contentIndex);
}

function showContent(n) {
    for (var i = 0; i < content.length; i++) {
        document.getElementById(content[i]).style.display = "none";
        document.getElementById(content[i]).style.opacity = 0;
    }

    document.getElementById(content[n]).style.display = "block"
    document.getElementById(content[n]).style.opacity = 1;
}


window.onload = function() {
    Loading_animation();
}

//Loading animation
function Loading_animation() {
    window.scrollTo(0, 0);
    var perloader = document.getElementById('loader');
    var topNav = document.getElementById("topNav");
    topNav.className = "";
    // topNav.style.display = "none"; 
    setTimeout(() => { 
        perloader.style.display = 'none'; 
        topNav.className = "topNav"
        topNav.style.display = "block"; 
    }, 2000);
}
