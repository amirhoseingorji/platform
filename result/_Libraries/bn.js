$(function(){
	var validTime , startValidTime , endValidTime ;
	$("#date").persianDatepicker({
    	onSelect: function () {
            validTime = $('#date').data("gdate");
        }
    });

    $("#start_time").persianDatepicker({
    	onSelect: function () {
             startValidTime = $('#start_time').data("gdate");
        }
    });
    $("#end_time").persianDatepicker({
    	onSelect: function () {
             endValidTime = $('#start_time').data("gdate");
        }
    });
    
    $('#examSelect').on('change' , function(){
    	var data = $(this).val();
    	if(data != 0){
    		$("#start_time").hide();
    		$("#end_time").hide();
    	}else{
    		$("#start_time").show();
    		$("#end_time").show();
    	}
    })

    $('form#fupForm').on('submit', function(event) {
    	event.preventDefault();
	    var formData = new FormData(this);
	    $('.lightBox').fadeIn();
	    $('#result').html('لطفا صبر کنید...');
    	$.ajax({
    		url  : window.location+'?mode=save',
    		dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
    		processData: false, // NEEDED, DON'T OMIT THIS
    		type : 'POST',
    		data : formData,
    	}).done(function(r) {
    		$('.lightBox').fadeOut();
    		$('#result').html(r);
    	}).fail(function() {
    		console.log("error");
    	});
    });

    $('form#examSelectForm').on('submit', function(event) {
    	event.preventDefault();
	    var formData = new FormData(this);
	    formData.append('startValidTime' , startValidTime);
	    formData.append('endValidTime' , endValidTime);
	    $('.lightBox').fadeIn();
	    $('#result').html('لطفا صبر کنید...');
    	$.ajax({
    		url  : window.location+'?mode=saveExam',
    		dataType: 'text',  // what to expect back from the PHP script, if anything
	        cache: false,
	        contentType: false,
	        processData: false,
    		type : 'POST',
    		data : formData,
    	}).done(function(r) {
    		$('.lightBox').fadeOut();
    		$('#result').html(r);
    	}).fail(function() {
    		$('#result').html("erro!!!");
    	});
    });
});