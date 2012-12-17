var depositPaypal = {
    // Application Constructor
	
    initData: function() {
		var html = '';
		var damount	=	window.localStorage.getItem("amount") ;
		var userid	=	window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/deposit.php",
		   cache: false,
		   dataType: "json",
		   data: {},
		   success: function(data){
			console.log(data);
			$('input[name="business"]').val(data.data.admin_email) ;
			$('input[name="amount"]').val(damount) ;
			$('input[name="return"]').val('/mt_mobile/notify_paypal.html') ;
			$('input[name="cancel_return"]').val('/mt_mobile/home.html') ;
			$('input[name="notify_url"]').val('/mt_mobile/home.html') ;
			$('input[name="shopping_url"]').val('/mt_mobile/home.html') ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   return setTimeout('fnSubmit()', 3000);
    }
};

var depositAlert = {
    // Application Constructor
	
    initData: function() {
		var html = '';
		var damount	=	window.localStorage.getItem("amount") ;
		var userid	=	window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/deposit.php",
		   cache: false,
		   dataType: "json",
		   data: {},
		   success: function(data){
			console.log(data);
				$('input[name="ap_merchant"]').val(data.data.admin_email) ;
				$('input[name="ap_amount"]').val(damount) ;
				$('input[name="ap_returnurl"]').val('/mt_mobile/notify_paypal.html') ;
				$('input[name="ap_cancelurl"]').val('/mt_mobile/home.html') ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   return setTimeout('fnSubmit()', 3000);
    }
};

function fnSubmit() {
 window.document.frm_paypal.submit();
  return;
}

var deposit_main = {
	initData: function() {
		$('.divPaypal a').live( 'click', function(){
			var amount = $(this).text() ;
			amount.replace('$','') ;
			window.localStorage.setItem("amount",amount) ;
			$.mobile.changePage('redirect_deposit_paypal.html') ;
		});
		
		$('.divAlertPay a').live( 'click', function(){
			var amount = $(this).text() ;
			amount.replace('$','') ;
			window.localStorage.setItem("amount",amount) ;
			$.mobile.changePage('redirect_deposit_alertpay.html') ;
		});
		
	}
} ;

var notifyPaypal = {
    // Application Constructor
	
    initData: function() {
		var html = '';
		var damount	=	window.localStorage.getItem("amount") ;
		var userid	=	window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/notify_paypal.php",
		   cache: false,
		   dataType: "json",
		   data: {amount:damount, user_id:userid},
		   success: function(data){
			console.log(data);
				$.mobile.changePage('home.html') ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   return setTimeout('fnSubmit()', 3000);
    }
};
