$(function(){

	//$('#keyboard li').ca
	if(!$('#nextQues').length > 0){
		$('#keyboard li').mousedown(function(event){

			event.preventDefault();

			var foc = $(":focus");

			var character = $(this).text(); 
			var sel = document.getSelection();
			var start = foc.prop("selectionStart")?foc.prop("selectionStart"):sel.anchorOffset;
			var end = foc.prop("selectionEnd")?foc.prop("selectionEnd"):sel.focusOffset;
			console.log(sel,start,end)
			$val = foc.val()? foc.val():start==end?foc.text():sel.anchorNode.data;
			if ($(this).hasClass('delete')) { 
				character = "";	
				start=Math.max(0,start-(start==end?1:0));
				console.log(start)
			}
			if ($(this).hasClass('enter')) { 
				character = "";	
				 okbtner(foc)
			}

		   if(foc.val()) {
			   foc.val($val.slice(0,start) + character + $val.slice(end));
				foc.prop("selectionStart" , start+character.length);
				foc.prop("selectionEnd" , start+character.length);
		   }else{
			   foc.text($val.slice(0,start) + character + $val.slice(end))
			   var range = document.createRange();
				range.setStart(foc.first()[0].firstChild, start+character.length);
				//range.setEnd(foc[0], start+character.length);
			   var sel = document.getSelection();
				sel.removeAllRanges();
				sel.addRange(range);
		   }

		});
	}

});