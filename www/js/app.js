angular.module('pharmacyapp', ['ionic', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: 'templates/home.html',
      controller: 'HomeTabCtrl'
    })
	.state('refill', {
      url: '/refill',
      templateUrl: 'templates/refill.html',
	  controller: 'RefillCtrl'
    })
	.state('instagram', {
      url: '/instagram',
      templateUrl: 'templates/instagram.html'
    })
	.state('facebook', {
      url: '/facebook',
      templateUrl: 'templates/facebook.html',
	  controller: 'FacebookCtrl'
    })
	.state('more', {
      url: '/more',
      templateUrl: 'templates/more.html'    
    })
	.state('map', {
		url: '/map',
		templateUrl: 'templates/map.html',
		controller: 'MapController'
    })
	.state('twitter', {
		url: '/twitter',
		templateUrl: 'templates/twitter.html'		
    })
	.state('loyalty', {
		url: '/loyalty',
		templateUrl: 'templates/loyalty.html'
    })
	.state('coupons', {
		url: '/coupons',
		templateUrl: 'templates/coupons.html'
    })
	.state('contactus', {
		url: '/contactus',
		templateUrl: 'templates/contactus.html'
    });
   $urlRouterProvider.otherwise('/home');
})

.controller('HomeTabCtrl', function($scope, $ionicModal) {  
	/*$ionicModal.fromTemplateUrl('templates/mylongform.html', {
		scope: $scope,
		animation: 'slide-in-up'
	}).then(function(modal) {
		$scope.modal = modal;
	});
	$scope.openModal = function(){
		$scope.modal.show();
	}
	$scope.closeModal = function(){
		$scope.modal.hide();
	}*/
})

.controller('FacebookCtrl', function($scope) {
		/*$scope.login = function() {
        $cordovaOauth.facebook("129095060772168", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            $location.path("/facebook");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };*/

})
.controller('MapController', function($scope, $ionicLoading, $compile) {
	$scope.initialize = function() {
		var myLatlng = new google.maps.LatLng(40.6124859,-73.990433);

		var mapOptions = {
			center: myLatlng,
			zoom: 14,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var map = new google.maps.Map(document.getElementById("map"), mapOptions);
		var marker = new google.maps.Marker({
			position: myLatlng,
			map: map,
			title: 'Uluru (Ayers Rock)'
		});
		var contentString = '<h5>Quick Stop Pharmacy</h5><h6>7210 20th Avenue Brooklyn, NY 11204 USA</h6>';
		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});
		infowindow.open(map,marker);
		$scope.map = map;
	}  
})
.controller('RefillCtrl', function($scope, $cordovaToast, $http, ) {	
    $scope.submit = function(){			
		var request = $http({
            method: 'post',
            url: 'http://web.proweaverlinks.com/tech/saferideapi/onlineforms/refill.php',
            crossDomain : true,
            data: {
				'name' : $scope.Name, 
				'email': $scope.Email, 
				'phone': $scope.Phone, 
				'rxnumber': $scope.RX_Number, 
				'rxnumber2': $scope.RX_Number_2, 
				'rxnumber3': $scope.RX_Number_3, 
				'rxnumber4': $scope.RX_Number_4
			},
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		});			
		request.success(function(data) {			
			if(data == "1"){			
			$cordovaToast.showShortTop('Refill successfully submitted.').then(function(success) {
				alert('success');
			  }, function (error) {
				// error
			  });
			}
			if(data == "2"){
			 $scope.responseMessage = "Oops! Error occured while submitting your refill.";
			}			
		});
    };
	
})
;