var my_task = {
    // Application Constructor
	
    initData: function() {
		var userId = window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
		var html 	= 	'<tr><td>My Task</td><td>Payout</td><td>Proof</td></tr>';
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/my_task.php",
		   cache: false,
		   dataType: "json",
		   data: {user_id:userId},
		   success: function(data){			
			
			for( var i = 0 ; i < data.data.length ; i++ )
			{
				html = html + '<tr>'+
								'<td class="">'+data.data[i].title+'</td>'+
								'<td>'+data.data.earn[i]+'</td>'+
								'<td>'+data.data[i].work_proof+'</td>'+
							  '</tr>';
			}
			//console.log(html) ;
			$('#myFinishedTask').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   $('.taskDetails').live('click', function(){
    		
    		$.mobile.changePage('task_details.html');
    	});
    }
};