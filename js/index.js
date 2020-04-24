var box = document.getElementById("background");

window.onmousemove = function(e){
    var my = e.pageY;   //mouse Y pos
    var ratio = my / window.innerHeight;

    // var top = ((50 - ratio * 50) * -1) + "%";
    var top = (ratio * 75)* -1 + "%";

    this.box.style.top = top;
}