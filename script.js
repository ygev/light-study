var box = document.getElementById("box")
// Make the DIV element draggable:
dragElement(document.getElementById("js-light-source"));

function dragElement(sun) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(sun.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(sun.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    sun.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    sun.style.top = (sun.offsetTop - pos2) + "px";
    sun.style.left = (sun.offsetLeft - pos1) + "px";
    // Sun Center
    var sunTop = (sun.offsetTop - pos2)
    var sunLeft = (sun.offsetLeft - pos1)
    var sunCenterX= (sunLeft + (sun.offsetWidth/2))
    var sunCenterY = (sunTop + (sun.offsetHeight/2)) 
    // Box Center
    var boxTop = box.offsetTop;
    var boxLeft = box.offsetLeft;
    var boxCenterX= (boxLeft + (box.offsetWidth/2))
    var boxCenterY = (boxTop + (box.offsetHeight/2)) 

    // TODO yana: set #box css to have shadow based off sun.style.left, sun.style.top


    var x = -(sunCenterX-boxCenterX)/2;
    var y = -(sunCenterY-boxCenterY)/2;
    var blur = (Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2)))*.75;
    var deg; 
    var boxShadow = "box-shadow:" +  x + "px " + y + "px " + blur + "px rgba(117, 129, 171, 0.5);";
    var gradient = "background: linear-gradient(" + deg + "deg, #FFFFFF 50%%, #E4E7F3 100%); ";
    var newStyles = boxShadow + gradient

    console.log(blur)
    // console.log("Sun offsets are " + sun.offsetTop +  " top and " + sun.offsetLeft + " left " + sun.offsetWidth + " width " + sun.offsetHeight + " height ")
    // console.log("Box offsets are " + box.offsetTop +  " top and " + box.offsetLeft + " left " + box.offsetWidth + " width " + box.offsetHeight + " height ")
    // console.log("Sun center is (" + sunCenterX + ", " + sunCenterY + ")" );
    // console.log("Box center is (" + boxCenterX + ", " + boxCenterY + ")" );
    document.querySelector("#box").style = newStyles;
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}