var j_details = {
    // Application Constructor
	
    initData: function() {
		var jobId = window.localStorage.getItem("hiddenJID") ;
		console.log(jobId);
		var html = '';
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/job_details.php",
		   cache: false,
		   dataType: "json",
		   data: {job_id:jobId},
		   success: function(data1){			
			
			var i = 0 ;
			html = '<div class="expectedTasks"><b>Expected MicroTask:</b><br/>'+data1.data[i].expected+'<div class="clear:both"></div></div>';
			html = html + '<div class="proofReqTasks"><b>Required Proof Of Completed Task:</b><br/>'+data1.data[i].proof+'<div class="clear:both"></div></div>';
			$('#ajax_job_dtls').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   $('#btnJobAcceptID').live( 'click', function(){
			$.mobile.changePage('task_completion.html');
	   }) ;	 
    }
};