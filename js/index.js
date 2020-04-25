var box = document.getElementById("background");
// var enableMouseMove = false;

// window.scrollTo(0, 0);

// Object Moving when mouse move
window.onmousemove = function(e){
    // if(this.enableMouseMove){
        var my = e.pageY;   //mouse Y pos
        var ratio = my / window.innerHeight;

        // var top = ((50 - ratio * 50) * -1) + "%";
        var top = (ratio * 75)* -1 + "%";

        this.box.style.top = top;
    // }
}


