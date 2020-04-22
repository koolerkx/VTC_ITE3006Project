//slider
var slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
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

// text content of character info
contentIndex = 0;
var content = [
  "intro_murada",
  "intro_ozaki",
  "intro_kanao",
  "intro_chutaro"
]

// Text Content Change

//change current content 
function introContentAdd(n) {
  contentIndex += n;

  if (contentIndex >= content.length) {
    contentIndex = 0;
  } else if (contentIndex < 0) {
    contentIndex = content.length - 1;
  }

  showContent(contentIndex);
}

//change current content
function introContentCurrent(n) {
  showContent(n);
}

function showContent(n) {
  for (var i = 0; i < content.length; i++) {
    document.getElementById(content[i]).style.display = "none";
  }
  document.getElementById(content[n]).style.display = "block"
}