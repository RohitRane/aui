/*Author : Shaifali Jaiswal*/
export class ShareOrderlistController {
    constructor($uibModalInstance, $scope, $uibModal, $timeout, $location, items, dataServices, SearchBarService, OrderListService, OrderlistModalFactory, $translate) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({
            $uibModalInstance, $scope, $timeout, $location, dataServices, OrderListService, OrderlistModalFactory
        });
        console.log("OrderListService.orderList ", OrderListService.orderList);
        vm.orderId = OrderListService.orderId;
        vm.date = new Date();
        $scope.emails=null;
        $scope.isThisDisabled = () => { OrderListService.orderList.length>0?true:false}

        if (sessionStorage.userService !== undefined) {
            var data = angular.fromJson(sessionStorage.userService);
            $scope.fName = data.fName;
            $scope.lName = data.lName;
            $scope.fEmail = data.fEmail;
            $scope.descText = data.descText;
            $scope.phoneNumber = data.phoneNumber;
        }

    }

    cancel() {
        let vm = this,
            {
                $uibModalInstance
            } = vm.DI();
        $uibModalInstance.close();
    }

    shareOrderList(flag) {
        let vm = this,
            {
                $location, $scope, $uibModalInstance, dataServices, SearchBarService, OrderListService, OrderlistModalFactory, $timeout
            } = vm.DI();
        console.log(OrderListService.orderList);
        sessionStorage.orderList = OrderListService.orderList;
        let temp = OrderListService.orderList;

        /* let orderList = temp.map(function (list) {
        return {
            "partNumber": list.partNumber,
            "quantity": list.qty,
            "partCategory": list.LOB,
            "partName": list.partDesc
        }
      });*/
        let tempOrd = OrderListService.orderId.toString();
        let payload = {
            "uuid": tempOrd,
            "fromFirstName": $scope.fName,
            "fromLastName": $scope.lName,
            "fromEmail": $scope.fEmail,
            "fromPhoneNumber":$scope.phoneNumber,
            "customerCallbackRequired":$scope.callback,
            "description": $scope.descText,
            "sendTo": $scope.emails.split(","),
            "sharedURL": location.host + "/" + "sharedOrderList",
            "orderParts": OrderListService.orderList,
            "createdOn": new Date().toJSON()
        };


        var model = {
            fName: $scope.fName,
            lName: $scope.lName,
            fEmail: $scope.fEmail,
            text: $scope.descText,
            phoneNumber: $scope.phoneNumber
        };


        sessionStorage.userService = angular.toJson(model);
        //hi

        //var temp = angular.toJson(payload);
        let promise = dataServices.shareList(payload).then(function(response) {
            console.log("payload ", payload);
            OrderListService.orderId = response;
        }, function(error) {
            console.log('error in the call for orderList');
        });

        /* Once orderlist changed we should get new orderlist */
        //create 
        promise.then(() => {
            dataServices.orderList().then(function(response) {
                OrderListService.orderId = response;
                sessionStorage.orderId = angular.toJson(response);
                OrderListService.orderList = [];
            }, function(error) {});

        });

        $uibModalInstance.close();
        // vm.open($uibModalInstance);

        //let urlModalInstance = $timeout(OrderlistModalFactory.open("lg"), 2000);
        let urlModalInstance = null;
        if (flag !== true) {
            urlModalInstance = $timeout(OrderlistModalFactory.open("lg", "app/orderList/ShareGetUrl/getUrl.html", "CopyOrderListURLController", "copyUrl"), 2000);
        } else {
            urlModalInstance = $timeout(OrderlistModalFactory.open("lg", "app/orderList/ShareConfirmation/shareConfirmation.html", "ShareConfirmationController", "shareConfirm"), 2000);
        }

    }
  }

