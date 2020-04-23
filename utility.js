


// Back to top Button function
/* Ref: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp */
backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction()
};

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

//right side Navbar appear or disappear
const navSlide = () => {
    const smallNav = document.querySelector('.smallNav');
    const nav = document.querySelector('.nav-links');



    smallNav.addEventListener('click', () => {
        //Toggle Nav
        nav.classList.toggle('nav-active');

    });

}
navSlide();

