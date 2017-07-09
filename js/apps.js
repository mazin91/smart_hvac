
var module = angular.module('wholeApp', ['onsen']);
//--------------------------------------------------------
var API,ID;
module.controller('login', function($scope, $http) {
	$scope.login = function(){
		
		var id =$('#id').val();
		var password = $('#password').val();
		var passhash = CryptoJS.MD5(password).toString();
			ID=id;
		var postData = 'id='+id+'&password='+passhash;
		
		$http({
			method : 'POST',
			url : 'http://192.168.1.101:8081/getapi', 
			data: postData,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
			if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
			else if(res==-2)        	$scope.getapi_error='System error!';
			else if(res==0)            	$scope.getapi_error='This user id is invalid!';
			else                                 
			{
				$scope.apikey = res ;
				API=res;
				navi.pushPage('HousePageDetails', { animation : 'slide' } );
			}
		}).error(function(error){
			console.log(error);
		});  
	};
	
});

module.controller('AdminPage', function($scope, $http) {

$scope.Register = function(){
        navi.pushPage('RegisterPage', { animation : 'slide' } );     
};

$scope.Update = function(){
        navi.pushPage('UpdatePage', { animation : 'slide' } );     
};

$scope.Delete = function(){
        navi.pushPage('DeleteStuff', { animation : 'slide' } );     
};

});

module.controller('DeleteStuff', function($scope, $http) {

$scope.deleteHouse = function(){
        navi.pushPage('DeleteHouse', { animation : 'slide' } );     
};

$scope.flushPriv = function(){
        navi.pushPage('FlushPrivileges', { animation : 'slide' } );     
};

});

module.controller('FlushPrivileges', function($scope, $http) {

$scope.flushPrivFunction = function(){
        var user_id = $('#UserID').val();
		var priv_type = $('#privType').val();
		var secret = $('#secret').val();
		
		//curl -d id=2 -d type=state -d privilege=7c1ca47eaa0e20539bee1c28e643f114-rashid http://localhost:8081/remove-privilege
		var postData = 'id='+user_id+'&type='+priv_type+'&secret='+secret;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/remove-privilege', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("Pivilege is flushed successfully!");
			$('#UserID').val("");
			$('#privType').val("");
			$('#API').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
		
};
});

module.controller('DeleteHouse', function($scope, $http) {

$scope.deleteHouseFunction = function(){
		var user_id = $('#UserID').val();
		var house_id = $('#HouseID').val();
		var api = $('#API').val();
		
		//curl -d id=2 -d hid=5 -d api=7c1ca47eaa0e20539bee1c28e643f114-rashid  http://localhost:8081/remove-ownership
		//http://localhost:8081/update-user
		var postData = 'id='+user_id+'&hid='+house_id+'&api='+api;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/remove-ownership', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("House is deleted successfully!");
			$('#UserID').val("");
			$('#HouseID').val("");
			$('#API').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
		

	  
};

});

module.controller('RegisterPage', function($scope, $http) {

	$scope.RegisterHouse = function(){
			navi.pushPage('RegisterHouse', { animation : 'slide' } );     
	};

	$scope.RegisterUser = function(){
			navi.pushPage('RegisterUser', { animation : 'slide' } );     
	};
	
	$scope.UpdateUser = function(){
			navi.pushPage('UpdateUser', { animation : 'slide' } );     
	};
	
	$scope.AddPrivilege = function(){
			navi.pushPage('AddPrivilege', { animation : 'slide' } );     
	};

});

module.controller('UpdatePage', function($scope, $http) {

	$scope.UpdateUser = function(){   
		navi.pushPage('UpdateUser', { animation : 'slide' } ); 
	};


});

module.controller('AddPrivilege', function($scope, $http) {

$scope.AddPrivilegeFunction = function(){
		var user_id = $('#UserID').val();
		var privilege_level = $('#PrivilegeLevel').val();
		var privilege_domain = $('#PrivilegeDomain').val();
		var Sec_key = $('#TopSecretKey').val();
		
		//curl -d id=2 -d type=state -d privilege=Dubai -d secret=123 http://localhost:8081/add-privilege
		var postData = 'id='+user_id+'&type='+privilege_level+'&privilege='+privilege_domain+'&secret='+Sec_key;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/add-privilege', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("Privilege is added successfully!");
			$('#UserID').val("");
			$('#PrivilegeLevel').val("");
			$('#PrivilegeDomain').val("");
			$('#TopSecretKey').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
	};
});

module.controller('RegisterHouse', function($scope, $http) {
	
	$scope.AddHouseFunction = function()
	{
		var user_id = $('#UserID').val();
		var house_id = $('#HouseID').val();
		var house_api = $('#HouseAPI').val();
		var house_name = $('#HouseName').val();
		var house_type = $('#HouseType').val();
 
		var postData = 'id='+user_id+'&hid='+house_id+'&api='+house_api+'&name='+house_name+'&type='+house_type;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/register-house', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("House is added successfully!");
			$('#UserID').val("");
			$('#HouseID').val("");
			$('#HouseAPI').val("");
			$('#HouseName').val("");
			$('#HouseType').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
	};
	
});

module.controller('RegisterUser', function($scope, $http) {
	$scope.AddUserFunction = function()
	{
		var user_id = $('#UserID').val();
		var user_name = $('#UserName').val();
		var password = $('#Password').val();
		var passhash = CryptoJS.MD5(password).toString();
		
		//curl -d id=2 -d name=rashid -d password=202cb962ac59075b964b07152d234b70 http://localhost:8081/register-user
		var postData = 'id='+user_id+'&name='+user_name+'&password='+passhash;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/register-user', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("User is added successfully!");
			$('#UserID').val("");
			$('#UserName').val("");
			$('#Password').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
	};
});

module.controller('UpdateUser', function($scope, $http) {
	$scope.UpdateUserFunction = function()
	{
		var user_id = $('#UserID').val();
		var new_user_name = $('#newUserName').val();
		var new_password = $('#newPassword').val();
		var old_password = $('#oldPassword').val();
		
		var new_passhash = CryptoJS.MD5(new_password).toString();
		var old_passhash = CryptoJS.MD5(old_password).toString();
		
		//curl -d id=2 -d n_name=nname -d n_password=202cb962ac59075b964b07152d234b70 -d o_password=202cb962ac59075b964b07152d234b70
		//http://localhost:8081/update-user
		var postData = 'id='+user_id+'&n_name='+new_user_name+'&n_password='+new_passhash+'&o_password='+old_passhash;
		console.log(postData);
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/update-user', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("User is Updated successfully!");
			$('#UserID').val("");
			$('#newUserName').val("");
			$('#newPassword').val("");
			$('#oldPassword').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
	};
});

module.controller('countryGraphs', function($scope, $http) {

});

module.controller('cityGraphs', function($scope, $http) {

});
module.controller('communityGraphs', function($scope, $http) {

});

module.controller('HomeOwnerGraphs', function($scope, $http) {

});


module.controller('BillCont', function($scope, $http) {
	
	$scope.viewBills = function(){
		navi.pushPage('BillsPage', { animation : 'slide' } );
	};
});

module.controller('BillsPage', function($scope, $http, HindexSharingService) {
		
		$scope.H_id = HindexSharingService.get();
		var postData = 'hid='+$scope.H_id+'&api='+API;
		$scope.stat="";
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/getbill', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			$scope.billJSON = res;
			console.log(res);
			if(res.status==1)
			{
			$("#pay_btn").hide();
			$scope.stat="Bill is Paid";
			}
			console.log($scope.state);
		}
		}).error(function(error){
			console.log(error);
		}); 
		
		
		$scope.payBill = function(){
			var date=new Date();
			var year=date.getFullYear();
			var month=date.getMonth()+1;
			
			var postData = 'hid='+$scope.H_id+'&month='+month+'&year='+year;
		
			$http({
			method : 'POST',
			url : 'http://192.168.1.101:8081/pay_bill', 
			data: postData,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
			}).success(function(res){
			if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
			else if(res==-2)        	$scope.getapi_error='System error!';
			else if(res==0)            	$scope.getapi_error='This user id is invalid!';
			else                                 
			{
				alert("Bill is payed successfully!");
			}
			}).error(function(error){
				console.log(error);
			}); 
		
		};
});

module.controller('HousePageDetails', function($scope, $http, HidsSharingService, HnamesSharingService) {

	var postData = 'id='+ID+'&api='+API;
	var Privilage;
	var api;
	$scope.api = API;
	
	$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/privilege', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
	}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			//var SortedPriv[];
			$scope.Privilage = res;
		}
	}).error(function(error){
		console.log(error);
	}); 


	$scope.DevicesControlHousePageDetails = function(){
	
			var postData = 'id='+ID+'&api='+API;
			
			
			$http({
				method : 'POST',
				url : 'http://192.168.1.101:8081/ownership',
				data: postData,
				headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
			}).success(function(res){
				if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
				else if(res==-2)        	$scope.getapi_error='System error!';
				else if(res==0)            	$scope.getapi_error='This user id is invalid!';
				else                                 
				{
					//alert("successful ownership req");
					//alert(res);
					
					var k=0;
					var arrHouseIDs=[];
					var arrHouseNames=[];
				    res.forEach(function(value){
						arrHouseIDs[k]=value.id;
						arrHouseNames[k]=value.name;
						k++;
						//$scope.houses= res;
						//Houses = res;
						//alert($scope.houses);
					});
					//alert(arrHouseNames);
					//Houses = res;
					HidsSharingService.set(arrHouseIDs);
					HnamesSharingService.set(res);
				 
					navi.pushPage('ListOfHouses', { animation : 'slide' } );
			
						
				}
			}).error(function(error){
				console.log(error);
			});
			
			
			//$scope.houses = arrHouseIDs;

};

$scope.HomeGraphs= function(index){
        navi.pushPage('HomeOwnerGraphs', { animation : 'slide' } );     
};


$scope.DoSome= function(element){

	if(element.item.type=="admin")
	{
		navi.pushPage('AdminPage', { animation : 'slide' } );    
	} 
	else if(element.item.type=="community")
	{
		//alert("community graphs");
		navi.pushPage('communityGraphs', { animation : 'slide' } );    
	} 
	else if(element.item.type=="city")
	{
		//alert("city graphs");
		navi.pushPage('cityGraphs', { animation : 'slide' } );    
	} 
	else if(element.item.type=="country")
	{
		//alert("country graphs");
		navi.pushPage('countryGraphs', { animation : 'slide' } );    
	} 
};

});

module.factory('HidsSharingService', function() {
 
 var savedData = [];
 
 function set(arrHouseIDs) {
   savedData = arrHouseIDs;
 }
 function get() {
  return savedData;
 }

   return {
  set: set,
  get: get
 }

});

module.factory('HnamesSharingService', function() {
 
 var savedData = [];
 
 function set(arrHouseNames) {
   savedData = arrHouseNames;
 }
 function get() {
  return savedData;
 }

   return {
  set: set,
  get: get
 }

});

module.controller('ListOfHouses', function($scope, $http, HidsSharingService, HnamesSharingService, hidS, DevicesIDsSharingService, DevicesModelsSharingService, HindexSharingService) {

var ids=[];
var Hnames=[];

$scope.ids = HidsSharingService.get();
$scope.Hnames = HnamesSharingService.get();

$scope.showDevices = function(index) 
{
	var postData = 'hid='+$scope.ids[index]+'&api='+API;
	var H_index = $scope.ids[index];
	//alert(H_index);
	var hid=  $scope.ids[index];
	hidS.set(hid);
	
	$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/device',
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
	}).success(function(res){
		if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else if((res==-1)||(res==-2))
		{
			alert("You don't have devices!");
			navi.pushPage('ListOfDevices', { animation : 'slide' } );
		}
		else                                 
		{
			var k=0;
			var arrDeviceModels=[];
			var arrDeviceIDs=[];
			
			res.forEach(function(value){
				arrDeviceIDs[k]=value.id;
				arrDeviceModels[k]=value.model;
				k++;
			});
			
			DevicesIDsSharingService.set(arrDeviceIDs);
			DevicesModelsSharingService.set(arrDeviceModels);
			HindexSharingService.set(H_index);
				
			navi.pushPage('ListOfDevices', { animation : 'slide' } );		
				
		}
	}).error(function(error){
		console.log(error);
	});
};
});

module.factory('HindexSharingService', function() {
 
 var savedData ;
 
 function set(H_index) {
   savedData = H_index;
 }
 function get() {
  return savedData;
 }

   return {
  set: set,
  get: get
 }

});

module.factory('hidS', function() {
 
 var savedData ;
 
 function set(hid) {
   savedData = hid;
 }
 function get() {
  return savedData;
 }

   return {
  set: set,
  get: get
 }

});

module.factory('DevicesIDsSharingService', function() {
 
 var savedData = [];
 
 function set(arrDeviceIDs) {
   savedData = arrDeviceIDs;
 }
 function get() {
  return savedData;
 }

   return {
  set: set,
  get: get
 }

});

module.factory('DevicesModelsSharingService', function() {
 
 var savedData = [];
 
 function set(arrDeviceModels) {
   savedData = arrDeviceModels;
 }
 function get() {
  return savedData;
 }

   return {
  set: set,
  get: get
 }

});

module.controller('ListOfDevices', function($scope, $http, HindexSharingService, DevicesIDsSharingService, DevicesModelsSharingService) {
	var D_ids=[];
	var D_models=[];
	var D_status=[];
	var H_index;
	var s=[];
	var status=[];
	var k=0;
	var postData;
	var json=[];
	var Json=[];
	var toggles=[];
	var state;
	
	$scope.D_ids = DevicesIDsSharingService.get();
	$scope.D_models = DevicesModelsSharingService.get();
	$scope.H_index = HindexSharingService.get();
	
	//console.log($scope.D_ids);
	
	$scope.D_ids.forEach(function(value){
	
		postData = 'hid='+$scope.H_index+'&device='+value+'&api='+API;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/device_stat',
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else                                 
		{
			if(res==-2) res=0;
			s[k]=res;
			var val={'id':$scope.D_ids[k],'model':$scope.D_models[k],'status':s[k]==1?'true':'false'};
			json.push(val);
			k++;
		}
		}).error(function(error){
		console.log(error);
		});
		
	});
	$scope.Json=json;
	//DevicesList.set(Json);
	
	$scope.control = function(element,deviceID) {
		//hid=1 -d user=1 -d api=smarthvac123  -d device=1 -d state=0 
		//console.trace(element);
		//console.log(element.confirmed);
		postData = 'hid='+$scope.H_index+'&user='+ID+'&device='+deviceID+'&api='+API+'&state='+(element.confirmed?1:0);
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/control',
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else                                 
		{	
			console.log(res);
		}
		}).error(function(error){
		console.log(error);
		});
		
	};

	  $scope.alert = function(material) {
    ons.notification.alert({
      message: 'An error has occurred!',
      modifier: material ? 'material' : undefined
    });
  }

  $scope.confirm = function(material) {
    var mod = material ? 'material' : undefined;
    
    ons.notification.confirm({
      message: 'Are you sure you want to continue?',
      modifier: mod,
      callback: function(idx) {
        switch (idx) {
          case 0:
            ons.notification.alert({
              message: 'You pressed "Cancel".',
              modifier: mod
            });
            break;
          case 1:
            ons.notification.alert({
              message: 'You pressed "OK".',
              modifier: mod
            });
            break;
        }
      }
    });
  }

  $scope.prompt = function(material) {
    //var mod = material ? 'material' : undefined;
	console.trace(material.item.id);
	
    ons.notification.prompt({
      message: "Are you sure?\nType Yes to delete",
     // modifier: mod,
      callback: function(msg) {
		if(msg=="Yes")
		{
			//curl -d device=2 -d hid=5 -d api=7c1ca47eaa0e20539bee1c28e643f114-rashid http://localhost:8081/remove-device
			postData = 'device='+material.item.id+'&hid='+$scope.H_index+'&api='+API;
		
			$http({
			method : 'POST',
			url : 'http://192.168.1.101:8081/remove-device',
			data: postData,
			headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
			}).success(function(res){
			if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
			else if(res==-2)        	$scope.getapi_error='System error!';
			else                                 
			{	
				ons.notification.alert({
				  message: 'Device ' + material.item.model + ' is removed'
				});
			}
			}).error(function(error){
			console.log(error);
			});
			
			
		}
      }
    });
  }
});

module.controller('AddDeviceCont', function($scope, $http) {
	$scope.addDevice = function() {
		navi.pushPage('RegisterDevice', { animation : 'slide' } );  
	};	
	
	$scope.removeDevice = function() {
		navi.pushPage('NotificationController', { animation : 'none' });  
	};
});

module.controller('RegisterDevice', function($scope, $http, HindexSharingService, hidS) {
	$scope.AddDeviceFunction = function() {
		var device_id = $('#deviceID').val();
		var manuf = $('#manufacturer').val();
		var type = $('#type').val();
		var model = $('#model').val();
		
		$scope.H = hidS.get();
		console.log($scope.H);
		//curl -d device=2 -d hid=5 -d manf=Philips -d type=AC -d model=AC101 http://localhost:8081/register-device
		var postData = 'device='+device_id+'&hid='+$scope.H+'&manf='+manuf+'&type='+type+'&model='+model;
		
		$http({
		method : 'POST',
		url : 'http://192.168.1.101:8081/register-device', 
		data: postData,
		headers : {'Content-Type': 'application/x-www-form-urlencoded'}  
		}).success(function(res){
		if(res==-1)                 $scope.getapi_error='Your password is incorrect!';
		else if(res==-2)        	$scope.getapi_error='System error!';
		else if(res==0)            	$scope.getapi_error='This user id is invalid!';
		else                                 
		{
			alert("Device is added successfully!");
			$('#deviceID').val("");
			$('#houseID').val("");
			$('#manufacturer').val("");
			$('#type').val("");
			$('#model').val("");
		}
		}).error(function(error){
			console.log(error);
		}); 
	};
});