var campaigns = {
    // Application Constructor
	
    initData: function() {
		var html 	= 	'<tr class="tableHeaderRow"><td>Campaign</td><td>Cost</td><td>Done</td></tr>';
		var userid	=	window.localStorage.getItem("userid") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/campaigns.php",
		   cache: false,
		   dataType: "json",
		   data: {user_id:userid},
		   success: function(data){	
			
			for( var i = 0 ; i < data.data.arrJob.length ; i++){
				if(i%2 == 0){
					tr_class = 'tablerow_alt';
				}
				else{
					tr_class = 'tablerow';
				}
				html = html + '<tr class="'+tr_class+'">'+
								'<td class="campaignDetails"><input type="hidden" class="hiddenCmpId" value='+data.data.arrJob[i]+'/>'+data.data.arrTitle[i]+'</td>'+
								'<td>'+data.data.arrEarn[i]+'</td>'+
								'<td>'+data.data.arrWorkers[i]+'/'+data.data.arrTotalWorker[i]+'</td>'+
							  '</tr>';
			}
			
			$('#employerTable').html(html) ;
		   
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });
	   
	   $('.campaignDetails').live('click', function(){
			var hid = $(this).children(':eq(0)').val() ;
			//console.log('CmpId='+hid) ;
    		window.localStorage.setItem("hiddenCmpId", hid ) ;
    		$.mobile.changePage('campaign_details.html');
	   }) ;
	   
	   $('#btnCreateTask').live('click', function(){
    		$.mobile.changePage('create_campaign.html');
	   }) ;
	   
	   $('#createCampPage').live('pageinit', function(){
			var html = '' ;
			var baseUrl	=	window.localStorage.getItem('baseUrl') ;
			$.ajax({
			   type: "POST",
			   url: baseUrl+"/web_services/arr_category.php",
			   cache: false,
			   dataType: "json",
			   data: {},
			   success: function(data){	
					console.log(data);
					for( var i = 0 ; i < data.data.length ; i++){
						html = html + '<option value="'+data.data[i].cat_id+'">'+data.data[i].cat_value+'</option>';
					
					}
					$('#select-choice-0').html(html) ;
				},
			   error: function(){
					alert('Err on Ajax..!') ;
			   }
		   });
		   
		   $('.inputTextCalculate').bind('change',calculation) ;
		   
		   $('#select-choice-0').bind('change',function(){
				var html = '' ;
				var catid = $('#select-choice-0').val() ;
				var baseUrl	=	window.localStorage.getItem('baseUrl') ;
				$.ajax({
				   type: "POST",
				   url: baseUrl+"/web_services/arr_sub_category.php",
				   cache: false,
				   dataType: "json",
				   data: {cat_id:catid},
				   success: function(data){	
						console.log(data);
						for( var i = 0 ; i < data.data.length ; i++){
							html = html + '<option value="'+data.data[i].cat_id+'">'+data.data[i].cat_value+'</option>';
						
						}
						$('#select-choice-1').html(html) ;
					},
				   error: function(){
						alert('Err on Ajax..!') ;
				   }
			   });
		   }) ;
		   
		   $('#btnCampaignCreate').live('click', function(){
				var userId		= window.localStorage.getItem("userid") ;
				var t_title 	= $('#txtTitle').val() ;
				var t_speed 	= $('#txtSpeed').val() ;
				var t_cost 		= $('#spnTotalCost').html() ;
				var t_cat 		= $('#select-choice-0').val() ;
				var t_subcat 	= $('#select-choice-1').val() ;
				var t_expected 	= $('#txtExpected').val() ;
				var t_proof 	= $('#txtProof').val() ;
				var t_time		= $('#txtTaskTime').val() ;
				var t_pos		= $('#txtTaskPos').val() ;
				var t_earn		= $('#txtTaskEarn').val() ;
				var baseUrl	=	window.localStorage.getItem('baseUrl') ;
				
				if( !t_title || !t_speed || !t_subcat || !t_expected || !t_proof || !t_time || !t_earn || !t_pos)
				{
					alert('Please fill up every field!') ;
					return false;
				}
				$.ajax({
				   type: "POST",
				   url: baseUrl+"/web_services/create_campaign.php",
				   cache: false,
				   dataType: "json",
				   data: {title:t_title, speed:t_speed, cost: t_cost, cat_id:t_cat, sub_cat_id:t_subcat, expected: t_expected, proof: t_proof, time:t_time, pos:t_pos, earn:t_earn, user_id:userId},
				   success: function(data){	
						console.log(data);
						if(data.data.res === "Success")
						{
							alert('Successfully Created') ;
							$.mobile.changePage('home.html') ;
						}
					},
				   error: function(){
						alert('Err on Ajax..!') ;
				   }
			   });
				
		   }) ;
		   
		   function calculation(){
				var xfee = 8;
				var xapproval_fee = 0.25;
				var Available_positions= $('#txtTaskPos').val();
				var Payment_per_task= $('#txtTaskEarn').val();
				Available_positions=Math.abs(parseFloat(Available_positions).toFixed(2));
				Payment_per_task=Math.abs(parseFloat(Payment_per_task).toFixed(2));
				
				var xTotal_cost = parseFloat(Available_positions * Payment_per_task)*(1+xfee/100) + xapproval_fee;
				//alert(xTotal_cost);
				$('#spnTotalCost').html(xTotal_cost) ;
			}
	   }) ;
	   
	   
    }
};


var campDetails = {
    // Application Constructor
	
    initData: function() {
		var html 	= 	'';
		var campID	=	window.localStorage.getItem("hiddenCmpId") ;
		campID		=	campID.replace("/","") ;
		var baseUrl	=	window.localStorage.getItem('baseUrl') ;
    	$.ajax({
		   type: "POST",
		   url: baseUrl+"/web_services/campaignDetails.php",
		   cache: false,
		   dataType: "json",
		   data: {camp_id:campID},
		   success: function(data){	
				$('#campStatus').html('This campaign is <b>'+data.data.status+'</b>');
				html = html + '<tr><td>Job ID</td><td>'+campID+'</td></tr>'+
						'<tr><td>Title</td><td>'+data.data.title+'</td></tr>'+
						'<tr><td>Minute</td><td>'+data.data.mins+'</td></tr>'+
						'<tr><td>Speeds</td><td>'+data.data.speeds+'</td></tr>'+
						'<tr><td>Workers</td><td>'+data.data.wdone+'</td></tr>';
						console.log(html);
			$('#campDetailsTable').html(html) ;
			$('#campExpected').html('<u>What is Expected:</u><br/>'+data.data.cexpected) ;
			$('#campProof').html('<u>Proof of Task:</u><br/>'+data.data.proof) ;
		   },
		   error: function(){
				alert('Err on Ajax..!') ;
		   }
	   });	   
	  
    }
};


