function handleclick() {
	var donate = $(".toShow").css('visibility', 'visible');
}
function closedonate() {
	var dom = $(".toShow").css("visibility", "hidden");
}
function viewComments(evt){
	var id = evt.id
	var data = {'id':id}
	$.post('/comments',data, function(result, e){
		console.log(result)
		$('#marker').attr('value',result.pastcomments[0].question);
		$('.comments').css('visibility', 'visible');
		for (var i = 0; i <= result.pastcomments.length; i++) {
			var data = result.pastcomments[i];
			$('#comments').append($('<p></p>').text(data.comment));
			
		}
		
	})
}
function closeComments() {
	$(".comments").css("visibility", "hidden")
	$("#comments").html('')
}
$("#commentbox").ready(function(){
	$("#marker").text($("#commentbox").attr('value'));
})
