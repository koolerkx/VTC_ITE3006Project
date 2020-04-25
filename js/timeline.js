// Detect request animation frame
var scroll_img = window.requestAnimationFrame ||
    // IE Fallback
    function (callback) {
        window.setTimeout(callback, 1000 / 60)
    };
var elementsToShow = document.querySelectorAll('.show-on-scroll');
console.log(elementsToShow);

// keep tracking the element on screen or not
// look koukyuu.js for more
function loop() {

    elementsToShow.forEach(function (element) {
        if (isElementInViewport(element)) {
            element.classList.add('is-visible');
        } else {
            element.classList.remove('is-visible');
        }
    });

    scroll_img(loop);
}

// Call the loop for the first time
loop();

// Helper function from: http://stackoverflow.com/a/7557433/274826
function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
        (rect.top <= 0 &&
            rect.bottom >= 0) ||
        (rect.bottom >= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.top <= (window.innerHeight || document.documentElement.clientHeight)) ||
        (rect.top >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight))
    );
}