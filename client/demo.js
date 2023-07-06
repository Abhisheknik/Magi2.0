<script src="./fabric.min.js"></script>

// Select the canvas an make it accesible for all the snippets of this article
let canvas = new fabric.Canvas('tshirt-canvas');

/**
 * Method that defines a picture as background image of the canvas.
 * 
 * @param {String} imageUrl      The server URL of the image that you want to load on the T-Shirt.
 *
 * @return {void} Return value description.
 */
function updateTshirtImage(imageURL){
    // If the user doesn't pick an option of the select, clear the canvas
    if(!imageURL){
        canvas.clear();
    }

    // Create a new image that can be used in Fabric with the URL
    fabric.Image.fromURL(imageURL, function(img) {
        // Define the image as background image of the Canvas
        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
            // Scale the image to the canvas size
            scaleX: canvas.width / img.width,
            scaleY: canvas.height / img.height
        });
    });
}

// 1. When the T-Shirt color select changes:
// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-color").addEventListener("change", function(){
  document.getElementById("tshirt-div").style.backgroundColor = this.value;
}, false);

// 2. When the user picks a design:
// Update the TShirt background image according to the selected image by the user
document.getElementById("tshirt-design").addEventListener("change", function(){

  // Call the updateTshirtImage method providing as first argument the URL
  // of the image provided by the select
  updateTshirtImage(this.value);
}, false);

// Select the canvas an make it accesible for all the snippets of this article
let Canvas = new fabric.Canvas('tshirt-canvas');

/**
 * Method that adds an image to the T-Shirt canvas from a web URL.
 * 
 * @param {String} imageUrl      The server URL of the image that you want to load on the T-Shirt.
 *
 * @return {void} Return value description.
 */
function updateTshirtImage(imageURL){
    fabric.Image.fromURL(imageURL, function(img) {                   
        img.scaleToHeight(300);
        img.scaleToWidth(300); 
        canvas.centerObject(img);
        canvas.add(img);
        canvas.renderAll();
    });
}

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-color").addEventListener("change", function(){
  document.getElementById("tshirt-div").style.backgroundColor = this.value;
}, false);

// Update the TShirt color according to the selected color by the user
document.getElementById("tshirt-design").addEventListener("change", function(){

  // Call the updateTshirtImage method providing as first argument the URL
  // of the image provided by the select
  updateTshirtImage(this.value);
}, false);

// When the user clicks on upload a custom picture
document.getElementById('tshirt-custompicture').addEventListener("change", function(e){
  var reader = new FileReader();
  
  reader.onload = function (event){
      var imgObj = new Image();
      imgObj.src = event.target.result;

      // When the picture loads, create the image in Fabric.js
      imgObj.onload = function () {
          var img = new fabric.Image(imgObj);

          img.scaleToHeight(300);
          img.scaleToWidth(300); 
          canvas.centerObject(img);
          canvas.add(img);
          canvas.renderAll();
      };
  };

  // If the user selected a picture, load it
  if(e.target.files[0]){
      reader.readAsDataURL(e.target.files[0]);
  }
}, false);

// When the user selects a picture that has been added and press the DEL key
// The object will be removed !
document.addEventListener("keydown", function(e) {
  var keyCode = e.keyCode;

  if(keyCode == 46){
      console.log("Removing selected element on Fabric.js on DELETE key !");
      canvas.remove(canvas.getActiveObject());
  }
}, false);