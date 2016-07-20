export class OrderListService {

    constructor() {
        this._orderList = [];
        this._orderId = 0;
    }

    get orderList() {
        //this._orderList = sessionStorage.orderList ;
        return this._orderList;
    }

    set orderList(newList) {
        console.log("hebbal servic");
        this._orderList = newList;
        sessionStorage.orderList = angular.toJson(this._orderList);
    }

    get orderId() {
        //this._orderId = angular.fromJson(sessionStorage.orderId);
        return this._orderId;
    }

    set orderId(newId) {
        this._orderId = newId;
        sessionStorage.orderId = angular.toJson(this._orderId);
    }
}



       
        