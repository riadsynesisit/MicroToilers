var t_complt = {
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
		   success: function(data){			
			
			html = '<div class="expectedTasks"><b>Expected MicroTask:</b><br/>'+data.data[0].expected+'<div class="clear:both"></div></div>';
			html = html + '<div class="proofReqTasks"><b>Required Proof Of Completed Task:</b><br/>'+data.data[0].proof+'<div class="clear:both"></div></div>';
			$('#ajax_job_dtls_c').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	  
	   $('.btnConfirmTask').live( 'click', function(){
			var workerid   =  window.localStorage.getItem("workerid") ;
			var userid     =  window.localStorage.getItem("userid") ;
			var workproof =  $('#task_completion').find('#txtProof').val() ;
			var baseUrl	=	window.localStorage.getItem('baseUrl') ;
			//console.log(jobId+'->'+workerid+'->'+userid+'=>'+workproof) ;
			$.ajax({
			   type: "POST",
			   url: baseUrl+"/web_services/work_done.php",
			   cache: false,
			   dataType: "json",
			   data: {job_id:jobId, worker_id:workerid, work_proof:workproof, user_id:userid},
			   success: function(data){			
					console.log(data);
					if(data.data.res == 'Success'){
						$.mobile.changePage('available_micro_task.html') ;
					}
			   },
			   error: function(){
					alert('Err on Ajax..!') ;
			   }
		   });
	   });
	 
    }
};