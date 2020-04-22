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
    introContentCurrent(n-1);
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

// Back to top Button function
/* Ref: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp */
backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopBtn.style.display = "block";
    // backToTopBtn.style.opacity = 1;
  } else {
    backToTopBtn.style.display = "none";
    // backToTopBtn.style.opacity = 0;
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
  }