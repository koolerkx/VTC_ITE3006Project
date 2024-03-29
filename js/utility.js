// most of the here .style need to add try catch block
// prevent the missing part of differnt

//loader start
var loader = document.getElementById("loader_blackFade");

// Back to top Button function
/* Ref: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp */
backToTopBtn = document.getElementById("backToTopBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
    scrollFunction();
};

// backtotop button, not showing if already in top
function scrollFunction() {
    try {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            backToTopBtn.style.display = "block";
            // backToTopBtn.style.opacity = 1;
        } else {
            backToTopBtn.style.display = "none";
            // backToTopBtn.style.opacity = 0;
        }
    } catch (err) {
        console.log(err);
    }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

// open sidebar for responsive layout
function openNav() {
    document.getElementById("mySidebar").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
}

// close side bar
/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("mySidebar").style.width = "0";
    document.getElementById("main").style.marginLeft = "0";
}

//right side Navbar appear or disappear
const navSlide = () => {
    const smallNav = document.querySelector(".sideNav");
    const nav = document.querySelector(".nav-links");

    try {
        smallNav.addEventListener("click", () => {
            //Toggle Nav
            nav.classList.toggle("nav-active");
        });
    } catch (err) {
        console.log(err);
    }
};
navSlide();

function toCharacterPage(index) {
    localStorage.setItem("characterIndex", index);
    // console.log(localStorage.getItem("characterIndex"));
    document.location.href = "./character.html";
}

// finish loading
try {
    loader.style.opacity = 0;
    this.setTimeout(() => {
        loader.style.display = "none";
    }, 1000);
} catch (err) {
    console.log(err);
}


