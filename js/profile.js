var profile_view = {
    // Application Constructor
	
    initData: function() {
		var html = '';
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
		var userid	=	window.localStorage.getItem("userid") ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/profile_view.php",
		   cache: false,
		   dataType: "json",
		   data: {user_id:userid},
		   success: function(data){			
			console.log(data);
			$('.txtfName').html(data.data.u_fname) ;
			$('.txtfAdd').html('&nbsp;'+data.data.u_fadd) ;
			$('.txtZip').html('&nbsp;'+data.data.u_zip) ;
			$('.txtState').html('&nbsp;'+data.data.u_state) ;
			$('.txtCity').html('&nbsp;'+data.data.u_city) ;
			$('.txtCountry').html('&nbsp;'+data.data.u_country) ;
			window.localStorage.setItem("u_fname", data.data.u_fname) ;
			window.localStorage.setItem("u_fadd", data.data.u_fadd) ;
			window.localStorage.setItem("u_zip", data.data.u_zip) ;
			window.localStorage.setItem("u_state", data.data.u_state) ;
			window.localStorage.setItem("u_city", data.data.u_city) ;
			window.localStorage.setItem("u_country", data.data.u_country) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   $('#btnEditProfile').live('click', function(){
    		
			$.mobile.changePage('profile_edit.html');
		});
    }
};

var profile_edit = {
    // Application Constructor
	
    initData: function() {
    	
		var html = '';
		var userid	=	window.localStorage.getItem("userid") ;
		var u_fname =   window.localStorage.getItem("u_fname") ;
		var u_fadd	=	window.localStorage.getItem("u_fadd") ;
		var u_zip	=	window.localStorage.getItem("u_zip") ;
		var u_state	=	window.localStorage.getItem("u_state") ;
		var u_city	=	window.localStorage.getItem("u_city") ;
		var u_country=	window.localStorage.getItem("u_country") ;
		console.log(userid) ;
    	
		$('#txtfName').val(u_fname) ;
		$('#txtfAdd').val(u_fadd) ;
		$('#txtZip').val(u_zip) ;
		$('#txtState').val(u_state) ;
		$('#txtCity').val(u_city) ;
		$('#txtCountry').val(u_country) ;
			
		
	   $('#btnConfirmProfile').live('click', function(){
			var ufname = $('#txtfName').val() ;
			var ufadd  = $('#txtfAdd').val() ;
			var uzip   = $('#txtZip').val() ;
			var ustate = $('#txtState').val() ;
			var ucity  = $('#txtCity').val() ;
			var uopass = $('#txtopass').val() ;
			var unpass = $('#txtnpass').val() ;
			var urpass = window.localStorage.getItem("userpass") ;
			//var ucountry = $('#txtCountry').val() ;
			if( uopass != '' && urpass != uopass)
			{
				alert("Old password not matched!") ;
				return false ;
			}
			else if( uopass != '' && unpass == '')
			{
				alert("Please enter new Password!") ;
				return false ;
			}
			else if( unpass != '' && uopass == '')
			{
				alert("Please enter Old Password!") ;
				return false ;
			}
			else if( unpass == '' && uopass == '')
			{
				unpass = urpass ;
			}
			var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    		$.ajax({
				   type: "POST",
				   url: baseUrl+"/web_services/profile_edit.php",
				   cache: false,
				   dataType: "json",
				   data: {user_id:userid,u_fname:ufname,u_zip:uzip,u_city:ucity,u_fadd:ufadd, u_pass:unpass},
				   success: function(data){			
						console.log(data);
					
				   },
				   error: function(){
						alert('Err on Ajax..!') ;
				   }
			   });
			//$.mobile.changePage('home.html');
		});
    }
};

var affliate = {
    // Application Constructor
	
    initData: function() {
		var urefc = window.localStorage.getItem('urefcode') ;
		console.log('refcode='+urefc) ;
		var serial = 1 ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
		var html = '<tr><td>Serial</td><td>Refferar Name</td><td>Ref Login Date</td></tr>' ;
		$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/affiliate.php",
		   cache: false,
		   dataType: "json",
		   data: {ref_user_id:urefc},
		   success: function(data){			
				console.log(data);
				for( var i = 0 ; i < data.data.ufnames.length ; i++ ){
				    if(data.data.ufnames[i] != ''){
						html = html + '<tr>'+
										'<td>'+
										  serial +
										'</td>'+
										'<td>&nbsp;'+
										  data.data.ufnames[i]+
										'</td>'+
										'<td>&nbsp;'+
										  data.data.urefdates[i]+
										'</td>'+
									  '</tr>';
						serial = serial+1 ;
					}
				}
				//alert(html);
				$('#affiliateTable').html(html) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	}
};