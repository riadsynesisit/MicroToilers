var my_m_task = {
    // Application Constructor
	
    initData: function() {
		var userId = window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
		var tr_class = '';
		var html 	= 	'<tr class="tableHeaderRow"><td>My Task</td><td>Payout</td><td>Proof</td></tr>';
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/my_task.php",
		   cache: false,
		   dataType: "json",
		   data: {user_id:userId},
		   success: function(data){			
			
			for( var i = 0 ; i < data.data.length ; i++ )
			{
				if(i%2 == 0){
					tr_class = 'tablerow_alt';
				}
				else{
					tr_class = 'tablerow';
				}
				html = html + '<tr class="'+tr_class+'">'+
								'<td class="">'+data.data[i].title+'</td>'+
								'<td>'+data.data[i].earn+'</td>'+
								'<td>&nbsp;'+data.data[i].work_proof+'</td>'+
							  '</tr>';
			}
			
			$('#myFinishedTask').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	  
    }
};