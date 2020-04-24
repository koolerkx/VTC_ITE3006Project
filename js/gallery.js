var loader_gallery = document.getElementById("loader_gallery");


function shuffle(array){
    for( var i=0; i<array.length-1; i++){
        var j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

var textList = document.getElementsByClassName("textBlock");

var data = [];
var info = {
    textBlock: "",
    src: "",
}

for(var i=0; i<textList.length; i++) {
    data.push({
        textBlock: textList[i].innerHTML,
        src: document.getElementsByClassName("grid-item-" + (i+1))[0].src
    })
    // console.log(data[i].textBlock, data[i].src);
}

for (let i = 0; i < 10000; i++) {
    shuffle(data);
}

for(var i=0; i<textList.length; i++) {
    textList[i].innerHTML = data[i].textBlock;
    document.getElementsByClassName("grid-item-" + (i+1))[0].src = data[i].src;
}

loader_gallery.style.opacity = 0; 
    this.setTimeout(() => {
        loader_gallery.style.display = "none";
    }, 1000);


