// function shuffle the array
function shuffle(array) {
    for (var i = 0; i < array.length - 1; i++) {
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var textList = document.getElementsByClassName("textBlock");
var gridItem = [];
var grid = document.getElementsByClassName("grid");

var data = [];  //arrary to save the grid item

for (var i = 0; i < textList.length; i++) {
    data.push({
        textBlock: textList[i].innerHTML,
        src: document.getElementsByClassName("grid-item-" + (i + 1))[0].src
    })
    // console.log(data[i].textBlock, data[i].src);
}

// make it in random order
for (let i = 0; i < 10000; i++) {
    shuffle(data);
}

// modal pciture form w3school
// var bigPicture = document.getElementById("bigPicture");
// var bigPictureImg = document.getElementById("bigPictureImg");
// var bigPictureText = document.getElementById("bigPictureText");

// assign back to the web also assign modal
for (var i = 0; i < textList.length; i++) {
    textList[i].innerHTML = data[i].textBlock;
    gridItem[i] = document.getElementsByClassName("grid-item-" + (i + 1))[0];
    gridItem[i].src = data[i].src;
}

// var span = document.getElementById("bigPictureClose");

// span.onclick = function () {
//     modal.style.display = "none";
// }

