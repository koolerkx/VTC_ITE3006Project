var box = document.getElementById("background");
// var enableMouseMove = false;

// window.scrollTo(0, 0);

// Object Moving when mouse move
// the background will move the Y on the contrary 
window.onmousemove = function(e){
    // if(this.enableMouseMove){
        var my = e.pageY;   //mouse Y pos
        var ratio = my / window.innerHeight;

        //top form -0% to -75%
        //fomula custom for the background photo
        // notice that if change background need to change the fomula
        // var top = ((50 - ratio * 50) * -1) + "%";
        var top = (ratio * 75)* -1 + "%";   

        this.box.style.top = top;
    // }
}


