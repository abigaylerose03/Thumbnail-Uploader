/**
 * @author Abby
 * @version 0.1
 * @since 0.3
 * 
 * This program deals with the functionality of the DOM using JQuery, like click, drag, and drop events
 * Additionally, it loads the image thumbnail using the class Filereader and desings the display of the uploaded photo 
 * using the Canvas class 
 */

function main() {
	jQuery(function($) {
	var fileDiv = document.getElementById("upload"); 		 // stores the upload button as a variable to be accessed later
	var fileInput = document.getElementById("upload-image"); // stores file input as a variable to be accessed later
	console.log(fileInput);
	
	fileInput.addEventListener("change", function(e) { 		// when accessing a file, add event listenter to change and show it's thumbnail image 
															   																							
	  var files = this.files;
	  showThumbnail(files);
	}, false);
	
	fileDiv.addEventListener("click", function(e) {			// when 'Upload Image' button is clicked, show popup screen and hides when finished 
															   
	  $(fileInput).show().focus().click().hide();
	  e.preventDefault();
	}, false);
	
	fileDiv.addEventListener("dragenter", function(e) {      // stops default operations for the upload button for drag + enter events 
	  e.stopPropagation();
	  e.preventDefault();
	}, false);
	
	fileDiv.addEventListener("dragover", function(e) {     // stops default operations for the upload button for drag events 
	  e.stopPropagation();
	  e.preventDefault();

	}, false);
	 
	fileDiv.addEventListener("drop", function(e) {		  // stops default operations for the upload button for drop events 
	  e.stopPropagation();
	  e.preventDefault();
	  
	  var dt = e.dataTransfer;														// gets all the files from the data transfer class after storing vaiable 'dt'
	  var files = dt.files;
	
	  showThumbnail(files);
	}, false);

	// function that shows the thumbnail of the file that took in the data from e.dataTransfer
	function showThumbnail(files) {
  
  	for(var i = 0; i < files.length; i++) {
    	var file = files[i];
    	var imageType = /image.*/;				// regex that takes images
    	
    	if(!file.type.match(imageType)) {							/* if the file isn't an image, 
																										log this message to the console and continue the for-loop finding all the image ONLY files */
      		console.log("Not an Image");
      		continue;
    	}
		
		// gets each file for the image element and appends it to the thumbnail
    var image = document.createElement("img");
    // image.classList.add("")
    var thumbnail = document.getElementById("thumbnail");
    image.file = file;
    thumbnail.appendChild(image);

		// creates class FileReader to scan the image-file type and loads it to the client-side 
    var reader = new FileReader();
    reader.onload = (function(aImg) {
      return function(e) {
        aImg.src = e.target.result;
      };
    }(image));
    
		// reads the file directly and stores in a variable as well as the canvas element and the 2d context stores in 'ctx'
    var ret = reader.readAsDataURL(file);
    var canvas = document.createElement("canvas");
    var ctx = getContext("2d");
    
    
    
		// displays the thumbnail 100x100
    image.onload= function() {
      ctx.drawImage(image, 100, 100);
    };
  }
}			});
}

$(document).ready(main);
console.log(main);