var register = {
    // Application Constructor
	
    initData: function() {
    	var baseUrl	=	window.localStorage.getItem('baseUrl') ;
		var html = '';
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/country_list.php",
		   cache: false,
		   dataType: "json",
		   data: {},
		   success: function(data){			
			console.log(data);
			for( var i = 0 ; i < data.data.length ; i++ )
			{
				html = html + '<option value="'+data.data[i].value+'">'+data.data[i].sel_text+'</option>' ;
			}
			console.log(html) ;
			$('#select-choice-0').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   $('#btnRegister').live('click', function(){
    		var uemail 		= $('#registerPage').find('#txtEmail').val() ;
			var upass 		= $('#registerPage').find('#txtPass').val() ;
			var ufname 		= $('#registerPage').find('#txtName').val() ;
			var ucountry 	= $('#registerPage').find('#select-choice-0').val() ;
			var urefc 		= window.localStorage.getItem('urefcode') ;
			var baseUrl	=	window.localStorage.getItem('baseUrl') ;
                $.ajax({
                   type: "POST",
                   url: baseUrl+"/web_services/register_user.php",
                   cache: false,
                   dataType: "json",
                   data: {u_email:uemail, u_pass:upass, u_country:ucountry, u_fname:ufname, u_ref_code:urefc},
                   success: function(data){
					
					console.log(data);
					if(data.data.res === "Success")
					{
						window.localStorage.setItem('userid',data.data.uid) ;
						alert('Your Account is Created!. Please check email and then Login') ;
						$.mobile.changePage('index.html');
					}
					else
					{
						alert('User Exists') ;
					}
				   },
                   error: function(){
						alert('Err on Ajax..!') ;
				   }
               });

               return false;
    	});
    }
};

var withDraw = {
	initData: function() {
		var finalAmount = window.localStorage.getItem("final_amt") ;
		$('.maxAmnt').html(finalAmount) ;
	}
};