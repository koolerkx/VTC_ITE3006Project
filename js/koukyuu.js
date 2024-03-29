 //Scrolling Effect
 //When the mouse scrolling, the photo will move
 var layer1 = document.getElementById('layer1')
 scroll = window.pageYOffset;
 document.addEventListener('scroll', function (e) {
     var offset = window.pageYOffset;
     scroll = offset;
     console.log(scroll);
     //Increase the width and right %
     layer1.style.width = (100 + scroll / 5) + '%';
     layer1.style.right = scroll / 50 + '%';
 });

 var layer2 = document.getElementById('layer2')
 scroll = window.pageYOffset;
 document.addEventListener('scroll', function (e) {
     var offset = window.pageYOffset;
     scroll = offset;
     //Increase the width and top %
     layer2.style.width = (100 + scroll / 10) + '%';
     layer2.style.top = scroll / 50 + '%';
 });

 var layer3 = document.getElementById('layer3')
 scroll = window.pageYOffset;
 document.addEventListener('scroll', function (e) {
     var offset = window.pageYOffset;
     scroll = offset;
     //Increase the width and left %
     layer3.style.width = (100 + scroll / 5) + '%';
     layer3.style.left = scroll / 50 + '%';
 });

 //Scrolling Effect2
 //When the mouse scrolling, the photo will move
 var kaminari_left = document.getElementById('kaminari_left')
 scroll = window.pageYOffset;
 document.addEventListener('scroll', function (e) {
     var offset = window.pageYOffset;
     scroll = offset;
     scroll -= 1000;
     //Increase the width and right %
     //  layer1.style.width = (100 + scroll / 5) + '%';
     kaminari_left.style.right = scroll / 50 + '%';
 });

 var kaminari_right = document.getElementById('kaminari_right')
 scroll = window.pageYOffset;
 document.addEventListener('scroll', function (e) {
     var offset = window.pageYOffset;
     scroll = offset;
     scroll -= 1000;    //value form test
     //Increase the width and left %
     //  layer3.style.width = (100 + scroll / 5) + '%';
     kaminari_right.style.left = scroll / 50 + '%';
 });

 // Detect request animation frame
 var scroll_img = window.requestAnimationFrame ||
     // IE Fallback
     function (callback) {
         window.setTimeout(callback, 1000 / 60)
     };
    //  get all need to scroll
 var elementsToShow = document.querySelectorAll('.show-on-scroll');

//  keep tracking if the object is in the screen or not
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
//  check the element can see or not
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

 // window.onload = function() {
 //     this.document.getElementById("zoom").style.height = window.innerHeight + "px";
 // }