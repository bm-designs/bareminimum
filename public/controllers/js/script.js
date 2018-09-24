
function loadReviews(reviews) {
	debugger;
	var toBeLoaded = document.getElementById("reviews");
	var reviewBox = document.createElement("div");
	reviewBox.className += "reviewBox";
	var reviewee = document.createElement("h3");
	reviewee.appendChild(document.createTextNode("Carl Laskey"));
	reviewee.className += "reviewee";
	var review = document.createElement("p");
	review.appendChild(document.createTextNode("This is a review!"));
	var starRating = document.createElement("img");
	starRating.src = "public/resources/imgs/reviewStar4.png";
	starRating.className = "rating";
	reviewBox.appendChild(reviewee);
	reviewBox.appendChild(review);
	reviewBox.appendChild(starRating);
	toBeLoaded.appendChild(reviewBox);

}
function validate(evt) {
  var theEvent = evt || window.event;

  // Handle paste
  if (theEvent.type === 'paste') {
      key = event.clipboardData.getData('text/plain');
  } else {
  // Handle key press
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode(key);
  }
  var regex = /[0-9]|\./;
  if( !regex.test(key) ) {
    theEvent.returnValue = false;
    if(theEvent.preventDefault) theEvent.preventDefault();
  }
}

function validateDate(evt) {
	var inputText = document.getElementById("date").value;

	if (inputText.length == 1 && evt.keyCode !== 8) {
		var newInput = "0" + inputText + "/";
		document.getElementById("date").value = newInput;
 	} 
 	if (inputText.length == 2 && evt.keyCode!== 8) {
 		var newInput = inputText + "/";
 		document.getElementById("date").value = newInput;
 	}
 	if (inputText.length>1){
 		return
 	}
 	
}

function insertReview() {
	var name = document.getElementsByName("revieweeName").value;
	var review = document.getElementsByName("addReview").value;
	var rating = document.getElementsByName("rating").value;

	debugger;
}
