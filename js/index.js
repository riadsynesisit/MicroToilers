var app = {
    // Application Constructor
    initialize: function() {
    	
    	this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
    	
    	document.addEventListener('deviceready', this.onDeviceReady, false);
    	//this.onDeviceReady();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
    	window.localStorage.setItem('baseUrl','http://yougitize.com') ;
    	document.addEventListener("backbutton", backOverRide, false);
    	//app.receivedEvent('deviceready');
    	$('#camp_details').live('pageinit', function(){		
		
    		v_campDetails.initData() ;
    	});
		
    	$('#jobDetails').live('pageinit', function(){
    		
    		j_details.initData() ;
    	});
		
		$('#task_completion').live('pageinit', function(){
    		
    		t_complt.initData() ;
    	});
		
		$('#registerPage').live('pageinit', function(){
    		
    		register.initData() ;
    	});
		
		$('#profilePage').live('pageinit', function(){
    		
    		profile_view.initData() ;
    	});
		
		$('#profileEditPage').live('pageinit', function(){
    		
    		profile_edit.initData() ;
    	});
		
		$('#depositPage').live('pageinit', function(){
    		
    		deposit_main.initData() ;
    	});
		
		$('#notifyPaypalPage').live('pageinit', function(){
    		
    		notifyPaypal.initData() ;
    	});
		
		$('#affiliatePage').live('pageinit', function(){
    		
    		affliate.initData() ; // written in profile.js
    	});
		
		$('#myMicroTask').live('pageinit', function(){
    		
    		my_m_task.initData() ;
    	});
		
		$('#available_task').live('pageinit', function(){
			
    		a_task.initData() ;
    	});
		
		$('#redirectDepositPaypal').live('pageinit', function(){
			
    		depositPaypal.initData() ;
    	});
		
		$('#redirectDepositAlert').live('pageinit', function(){
			
    		depositAlert.initData() ;
    	});
		
		$('#withdrawPage').live('pageinit', function(){
			
    		withDraw.initData() ;
    	});
		
		$('#my_task').live('pageinit', function(){
			
    		my_task.initData() ;
    	});
		
		$('#campaignPage').live('pageinit', function(){
			
    		campaigns.initData() ;
    	});
		
		$('#campDetailsPage').live('pageinit', function(){
			
    		campDetails.initData() ;
    	});
		
		$('#btnLogin').live( 'click', function(){	
			var uname = $('#loginPage').find('#txtEmail').val() ;
			var upass = $('#loginPage').find('#txtPass').val() ;
			var baseUrl	=	window.localStorage.getItem('baseUrl') ;
			
                $.ajax({
                   type: "POST",
                   url: baseUrl+"/web_services/validate_login.php",
                   cache: false,
                   dataType: "json",
                   data: {uname:uname, upass:upass},
                   beforeSend : function(){
					$.mobile.showPageLoadingMsg();
				   },
				   success: function(data){
					$.mobile.hidePageLoadingMsg();
					console.log(data);
					if(data.data.res === "Success")
					{
						window.localStorage.setItem('userid',data.data.uid) ;
						window.localStorage.setItem('userpass',upass) ;
						window.localStorage.setItem('final_amt',data.data.final_amt) ;
						window.localStorage.setItem('workerid',data.data.wid) ;
						window.localStorage.setItem('urefcode',data.data.user_ref_code) ;
						console.log(window.localStorage.getItem("workerid")+'==refcode='+data.data.user_ref_code );
						$.mobile.changePage('home.html');
					}
					else
					{
						alert('Invalid Mail or pass..!') ;
					}
				   },
                   error: function(){
						alert('Err on Ajax..!') ;
				   }
               });

               return false;
		}) ;
		
		$('#btnLogout').live('click', function(){
			$.mobile.changePage('index.html') ;
		}) ;
    },
	
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
	
};

var backOverRide = function(e){
		e.preventDefault();
		var currentPageId = $.mobile.activePage.attr('id');
		
		  if(currentPageId == 'indexPage') {
			  navigator.notification.confirm(
						'Are you sure to close the app?', 
						function(buttonIndex){
							if(buttonIndex == 2){
								navigator.app.exitApp();
							}
						},             
						'Confirm!',           
						'No,Yes'         
					);
		  }
		 
		  else {
			  window.history.back();
		  }
};