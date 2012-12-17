var a_task = {
    // Application Constructor
	
    initData: function() {
		var userId = window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
		var html 	= 	'<tr class="tableHeaderRow"><td>Task</td><td>Earn</td></tr>';
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/available_task.php",
		   cache: false,
		   dataType: "json",
		   data: {user_id:userId},
		   success: function(data){			
			
			for( var i = 0 ; i < data.data.length ; i++ )
			{
				/*html = html + '<input type="hidden" class="hiddenJobId" value='+data.data[i].job_id+'/>'+
							  '<div class="ui-grid-a">'+
								'<div class="ui-block-a jobDetails">'+data.data[i].title+'</div>'+
								'<div class="ui-block-b">'+data.data[i].earn+'</div>'+									
							  '</div>'+
							  
							  '<div class="clear:both"></div>' ;*/
				if(i%2 == 0){
					tr_class = 'tablerow_alt';
				}
				else{
					tr_class = 'tablerow';
				}
				html = html + '<input type="hidden" class="hiddenJobId" value='+data.data[i].job_id+'/>'+
							  '<tr class="'+tr_class+'">'+
								'<td class="jobDetails">'+data.data[i].title+'</td>'+
								'<td>'+data.data[i].earn+'</td>'+								
							  '</tr>';
			}
			
			$('#tabbody').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   $('.jobDetails').live('click', function(){
			var hid = $(this).parent().prev().val() ;
			console.log(hid) ;
    		window.localStorage.setItem("hiddenJID", hid ) ;
    		$.mobile.changePage('job_details.html');
    	});
    }
};