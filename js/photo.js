var dropzone = document.getElementById("dropzone");

// Drag and drop
var upload = function (input) {
    canvasLoadImg(input);
}

dropzone.ondrop = function (e) {
    e.preventDefault();
    this.className = 'dropzone';
    upload(e.dataTransfer);
}

dropzone.ondragover = function () {
    this.className = 'dropzone dragover';
    return false;
}

dropzone.ondragleave = function () {
    this.className = 'dropzone';
    return false;
}

// Canvas
var canvas = document.getElementById('canvas');
var context = canvas.getContext('2d');
// context.fillStyle = "gray";
// context.fillRect(0, 0, canvas.width, canvas.height);

var img = new Image();
var imgHeight = 600;
var imgWidth = 600;

function canvasLoadImg(input) {
    var file = input.files[0];

    var src = URL.createObjectURL(file)

    img.src = src;

    // load the image to canvas and resize the image
    img.onload = function () {
        imgWidth = img.width;
        imgHeight = img.height;
        ratio = imgWidth / imgHeight;

        console.log(imgWidth, imgHeight, ratio)
        // not accept image ratio too high
        if (ratio >= 2) {
            alert("The Ration need to be smaller than 2 of width:height");
            reset();
            return;
        }
        // set the long side equal to canvas width and resize image with ratio
        if (ratio < 1) {
            imgHeight = canvas.height;
            imgWidth = ratio * imgHeight;
            console.log(imgWidth, imgHeight)
        }
        if (ratio > 1) {
            imgWidth = canvas.width;
            imgHeight = imgWidth / ratio;
            console.log(imgWidth, imgHeight)
        }

        // load into canvas
        canvas.height = imgHeight;
        canvas.width = imgWidth;
        context.drawImage(this, 0, 0, imgWidth, imgHeight);
        reOffset();

        dropzone.style.display = "none";
        canvas.style.display = "flex";
    }
}

// Button download the photo
function saveFile() {
    var link = document.getElementById("download")
    link.download = "image.png";
    link.href = canvas.toDataURL("image/png")
    link.click();
}

// Reset the environment
function reset() {
    canvas.height = 600;
    canvas.width = 600;

    dropzone.style.height = canvas.height + "px";
    dropzone.style.width = canvas.width + "px";
    dropzone.style.fontSize = (canvas.width / 17) + "px";

    canvas.style.display = "none";
    dropzone.style.display = "flex";

    document.getElementById("posXInputRange")

    // context.fillStyle = "gray";
    // context.fillRect(0, 0, canvas.width, canvas.height);
    reOffset();
    drawAll();

    shapes = [];

    console.log("Reset -ed")
}

// Reset on start
// window.onload = function () {
//     this.reset();
// }

// accodiation
var acc = document.getElementsByClassName("accordion");

for (var i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
        // add the class "active" onclick
        this.classList.toggle("active");

        // setting the status
        var panel = this.nextElementSibling;    //returns the element immediately following the specified element, in the same tree level.
        if (panel.style.maxHeight) {
            // panel.style.display = "none";
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = panel.scrollHeight + "px";
        }
    })
}



// Canvas Detect Click and drag process
// Edit From: https://riptutorial.com/zh-TW/html5-canvas/example/18918/%E5%9C%A8-%E7%95%AB%E5%B8%83-%E5%91%A8%E5%9C%8D%E6%8B%96%E5%8B%95%E5%9C%93%E5%BD%A2%E5%92%8C%E7%9F%A9%E5%BD%A2

// save relevant info about shapes drawn on the canvas
var shapes = [];
// shapes.push({ x: 50, y: 500, radius: 15, color: 'blue' });   //circle
// shapes.push({ x: 400, y: 200, width: 50, height: 35, color: 'red' });    //rectangle or text


// used to calc canvas position relative to window
function reOffset() {
    var BB = canvas.getBoundingClientRect();
    offsetX = BB.left;
    offsetY = BB.top;
}

var offsetX, offsetY;
reOffset();
window.onscroll = function (e) { this.reOffset(); };
window.onresize = function (e) { this.reOffset(); };
window.onresize = function (e) { this.reOffset(); };


// drag related vars
var isDragging = false;
var startX, startY;

// hold the index of the shape being dragged
var selectedShapeIndex;

// drawAll();

// listen for mouse event
canvas.onmousedown = handleMouseDown;
canvas.onmousemove = handleMouseMove;
canvas.onmouseup = handleMouseUp;
canvas.onmouseout = handleMouseOut;

// given mouse X&Y (mx, my) and shape object
// return true/false whether mouse is inside the shape
function isMouseInShape(mx, my, shape) {
    reOffset();
    if (shape.radius) {
        // this is a circle
        var dx = mx - shape.x;
        var dy = my - shape.y;
        // math test to see if mouse is inside circle
        if (dx * dx + dy * dy < shape.radius * shape.radius) {
            // yes, mouse is inside this circle
            return (true);
        }
    } else if (shape.width) {
        // this is a rectangle
        var rLeft = shape.x;
        var rRight = shape.x + shape.width;
        var rTop = shape.y;
        var rBott = shape.y + shape.height;
        // Math test to see if mouse in inside rectangle
        if (mx > rLeft && mx < rRight && my > rTop && my < rBott) {
            return (true);
        }
    } else if (shape.content) {
        var tLeft = shape.x;
        var tRight = parseInt(shape.x + (shape.fontSize * shape.content.length));
        var tTop = shape.y - parseInt(shape.fontSize);
        var tBott = shape.y;
        console.log("mouse", mx, my)
        console.log("t", tLeft, tRight, tTop, tBott)
        if (mx > tLeft && mx < tRight && my > tTop && my < tBott) {
            return (true);
        }
    }
    return (false);
}

// set the select index and tell is Dragging
function handleMouseDown(e) {
    reOffset();
    // tell the browser we're handling this event
    e.preventDefault()
    e.stopPropagation();

    // calc the current mouse pos
    startX = parseInt(e.clientX - offsetX);
    startY = parseInt(e.clientY - offsetY);
    // test mouse position against all shapes
    // post result if mouse is ina shape
    for (var i = 0; i < shapes.length; i++) {
        if (isMouseInShape(startX, startY, shapes[i])) {
            // the mouse is inside this shape
            // select this shape
            selectedShapeIndex = i;

            rePara();

            // set the is Dragging Flag
            isDragging = true;
            // and return (==stop looking for)
            // futher shapes under the mouse 
            return;
        }
    }
}

// turn dragging off when not clicking 
function handleMouseUp(e) {
    reOffset();
    // return if we're not dragging 
    if (!isDragging) { return; }

    // tell browser we're handling this event
    e.preventDefault();
    e.stopPropagation();

    // the drag is over -- clear isDraging flag
    isDragging = false;
}

function handleMouseOut(e) {
    reOffset();
    // return if we're not dragging
    if (!isDragging) { return; }

    // tell the browser we're handling this event
    e.preventDefault;
    e.stopPropagation;

    // drag off
    isDragging = false;
}

function handleMouseMove(e) {
    // return if we're not dragging
    if (!isDragging) { return; }


    reOffset();
    // return if we're handling this event
    e.preventDefault();
    e.stopPropagation();

    // calc the current mouse position
    mouseX = parseInt(e.clientX - offsetX);
    mouseY = parseInt(e.clientY - offsetY);

    // how far has the mosue dragged from its previous mousemove position?
    var dx = mouseX - startX;
    var dy = mouseY - startY;

    // move the selected shape by the drag distance
    var selectedShape = shapes[selectedShapeIndex];
    console.log("shapex", typeof(selectedShape.x),"shapey", typeof(selectedShape.y),"dx",typeof(dx), "dy",typeof(dy))
    selectedShape.x += dx;
    selectedShape.y += dy;

    // clear the canvas and redraw all shapes
    drawAll();

    // update the starting drag pos
    startX = mouseX;
    startY = mouseY;
}

// the font for canvas componet
var fontList = [
    "Comic Sans MS",
    "Arial Black",
    "Lucida Sans Unicode",
    "Courier New",
    "Seto",
    "yuShi",
    "Tetai",
    "Hannari"
]

// clear the canvas and redraw all shapes
function drawAll() {
    // clear all
    context.clearRect(0, 0, canvas.width, canvas.height);

    // load imgs into canvas
    canvas.height = imgHeight;
    canvas.width = imgWidth;
    context.drawImage(img, 0, 0, imgWidth, imgHeight);

    for (var i = 0; i < shapes.length; i++) {
        var shape = shapes[i];
        if (shape.type == "circle") {
            // it's a circle
            context.beginPath();
            context.arc(shape.x, shape.y, shape.radius, 0, Math.PI * 2);
            context.fillStyle = shape.color;
            context.fill();
        } else if (shape.type == "rect") {
            // It's a rectangle 
            context.rotate(shape.degree * Math.PI / 180);

            context.fillStyle = shape.color;
            context.fillRect(shape.x, shape.y, shape.width, shape.height);
            context.rotate(0);
        } else if (shape.type == "text") {
            //It's a text
            context.font = shape.fontSize + "px " + fontList[shape.font];
            console.log(shape.font);
            context.rotate(shape.degree * Math.PI / 180);
            context.fillStyle = shape.color;
            context.textAlign = shape.align;
            context.fillText(shape.content, shape.x, shape.y);
            context.rotate(0);
        }

    }
    rePara();
}

// Canvas Objectpara Input

// Side bar and Text Input
var slider = [
    document.getElementById("degreeInputRange"),
    document.getElementById("bear"),
    document.getElementById("posXInputRange"),
    document.getElementById("posYInputRange"),
    document.getElementById("widthInputRange"),
    document.getElementById("heightInputRange"),
    document.getElementById("radiusInputRange"),
    document.getElementById("fzInputRange"),
    document.getElementById("bear"),
    document.getElementById("bear")
]

var text = [
    document.getElementById("degreeInputText"),
    document.getElementById("colorInputColor"),
    document.getElementById("posXInputText"),
    document.getElementById("posYInputText"),
    document.getElementById("widthInputText"),
    document.getElementById("heightInputText"),
    document.getElementById("radiusInputText"),
    document.getElementById("fzInputText"),
    document.getElementById("fontInputSelect"),
    document.getElementById("contentInputText")
]



/* #region Para On Click On change Main  */

//BETTER with usingArrat
// function degreeOnInputRange() {
//     text[0].value = slider[0].value;
//     // change shape
//     var shape = shapes[selectedShapeIndex];
//     shape.degree = parseInt(text[0].value);
//     drawAll();
// }
// function degreeOnChangeText() {
//     if (text[0].value > text[0].max) {
//         text[0].value = text[0].max;
//     } else if (text[0].value < text[0].min) {
//         text[0].value = text[0].min;
//     }
//     slider[0].value = text[0].value;

//     // change shape
//     var shape = shapes[selectedShapeIndex];
//     shape.degree = parseInt(text[0].value);
//     drawAll();
// }

function colorOnChangeText() {
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.color = text[1].value;
    drawAll();
}
function colorOnInputText() {
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.color = text[1].value;
    drawAll();
}

function posXOnInputRange() {
    text[2].value = slider[2].value;
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.x = parseInt(text[2].value);
    drawAll();
}
function posXOnChangeText() {
    if (text[2].value > text[2].max) {
        text[2].value = text[2].max;
    } else if (text[2].value < text[2].min) {
        text[2].value = text[2].min;
    }
    slider[2].value = text[2].value;

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.x = parseInt(text[2].value);
    drawAll();
}

function posYOnInputRange() {
    text[3].value = slider[3].value;

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.y = parseInt(text[3].value);
    drawAll();
}
function posYOnChangeText() {
    if (text[3].value > text[3].max) {
        text[3].value = text[3].max;
    } else if (text[3].value < text[3].min) {
        text[3].value = text[3].min;
    }
    slider[3].value = text[3].value;

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.y = parseInt(text[3].value);
    drawAll();
}

function widthOnInputRange() {
    text[4].value = slider[4].value;
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.width = text[4].value;
    drawAll();
}
function widthOnChangeText() {
    if (text[4].value > text[4].max) {
        text[4].value = text[4].max;
    } else if (text[4].value < text[4].min) {
        text[4].value = text[4].min;
    }
    slider[4].value = parseInt(text[4].value);

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.width = text[4].value;
    drawAll();
}

function heightOnInputRange() {
    text[5].value = slider[5].value;
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.height = parseInt(text[5].value);
    drawAll();
}
function heightOnChangeText() {
    if (text[5].value > text[5].max) {
        text[5].value = text[5].max;
    } else if (text[5].value < text[5].min) {
        text[5].value = text[5].min;
    }
    slider[5].value = text[5].value;

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.height = parseInt(text[5].value);
    drawAll();
}

function radiusOnInputRange() {
    text[6].value = slider[6].value;
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.radius = parseInt(text[6].value);
    drawAll();
}
function radiusOnChangeText() {
    if (text[6].value > text[6].max) {
        text[6].value = text[6].max;
    } else if (text[6].value < text[6].min) {
        text[6].value = text[6].min;
    }
    slider[6].value = text[6].value;

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.radius = parseInt(text[6].value);
    drawAll();
}

function fzOnInputRange() {
    text[7].value = slider[7].value;
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.fontSize = parseInt(text[7].value);
    drawAll();
}
function fzOnChangeText() {
    if (text[7].value > text[7].max) {
        text[7].value = text[7].max;
    } else if (text[7].value < text[7].min) {
        text[7].value = text[7].min;
    }
    slider[7].value = text[7].value;

    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.fontSize = parseInt(text[7].value);
    drawAll();
}

function fontOnChangeText() {
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.font = parseInt(text[8].selectedIndex);
    drawAll();
    text[8].selectedIndex = shape.font;
}

function contentOnChangeText() {
    // change shape
    var shape = shapes[selectedShapeIndex];
    shape.content = text[9].value;
    drawAll();
}

/* #endregion */


// Refresh para value
function rePara() {
    console.log(selectedShapeIndex == undefined);
    if (selectedShapeIndex == undefined) {
        for (var i = 1; i < text.length; i++) {
            text[i].disabled = true;
            slider[i].disabled = true;
        }
        return;
    }

    var shape = shapes[selectedShapeIndex];

    // Degree
    // if (shape.degree != undefined) {
    //     slider[0].disabled = false;
    //     text[0].disabled = false;
    //     slider[0].value = shape.degree;
    //     text[0].value = shape.degree;
    // } else {
    //     slider[0].disabled = true;
    //     text[0].disabled = true;
    // }
    // Color
    if (shape.color != undefined) {
        text[1].disabled = false;
        text[1].value = shape.color;
    } else {
        text[1].disabled = true;
    }
    // posX
    if (shape.x != undefined) {
        slider[2].disabled = false;
        text[2].disabled = false;
        slider[2].value = shape.x;
        text[2].value = shape.x;
    } else {
        slider[2].disabled = true;
        text[2].disabled = true;
    }
    // posY
    if (shape.y != undefined) {
        slider[3].disabled = false;
        text[3].disabled = false;
        slider[3].value = shape.y;
        text[3].value = shape.y;
    } else {
        slider[3].disabled = true;
        text[3].disabled = true;
    }
    // Width
    if (shape.width != undefined) {
        slider[4].disabled = false;
        text[4].disabled = false;
        slider[4].value = shape.width;
        text[4].value = shape.width;
    } else {
        slider[4].disabled = true;
        text[4].disabled = true;
    }
    // Height
    if (shape.height != undefined) {
        slider[5].disabled = false;
        text[5].disabled = false;
        slider[5].value = shape.height;
        text[5].value = shape.height;
    } else {
        slider[5].disabled = true;
        text[5].disabled = true;
    }
    // Radius
    if (shape.radius != undefined) {
        slider[6].disabled = false;
        text[6].disabled = false;
        slider[6].value = shape.radius;
        text[6].value = shape.radius;
    } else {
        slider[6].disabled = true;
        text[6].disabled = true;
    }
    // Font Size
    if (shape.fontSize != undefined) {
        slider[7].disabled = false;
        text[7].disabled = false;
        slider[7].value = shape.fontSize;
        text[7].value = shape.fontSize;
    } else {
        slider[7].disabled = true;
        text[7].disabled = true;
    }
    // font
    if (shape.font != undefined) {
        text[8].disabled = false;
        text[8].selectedIndex = shape.font;
    } else {
        text[8].disabled = true;
    }
    // content
    if (shape.content != undefined) {
        text[9].disabled = false;
        text[9].value = shape.content;
    } else {
        text[9].value = "";
        text[9].disabled = true;
    }
}

// Componet Add button, onclick
function rectAdd() {
    shapes.push({ type: "rect", x: 50, y: 50, width: 200, height: 200, degree: 0, color: "#FFFFFF" })
    drawAll();
}

function circleAdd() {
    shapes.push({ type: "circle", x: 50, y: 50, radius: 100, color: "#FFFFFF" })
    drawAll();
}

function textAdd() {
    var content = document.getElementById("addText_textToAdd").value;
    shapes.push({ type: "text", x: 50, y: 50, degree: 0, content: content, align: "left", fontSize: "30", font: 0, color: "#FFFFFF" })
    drawAll();
}

function remove() {
    shapes.splice(selectedShapeIndex, 1);
    selectedShapeIndex = undefined;
    drawAll();
}

// Reset all before start 
reset();


