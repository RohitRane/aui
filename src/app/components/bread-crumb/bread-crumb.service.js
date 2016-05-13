export class BreadCrumbService {

    constructor() {
        this._status = angular.fromJson(sessionStorage.breadCrumbBBStatus);
        this._fromSrch = angular.fromJson(sessionStorage.breadCrumbFromSrch);
        //this._retrieveFromSession();
    }

    get searchToResults() {
        this._status = angular.fromJson(sessionStorage.breadCrumbBBStatus);
        console.log("BCrumb :::::::::", this._status);
        return this._status;
    }

    set searchToResults(status) {
        console.log("Set BCrumb ::::::::::::::", status);
        this._status = status;
        sessionStorage.breadCrumbBBStatus = angular.toJson(this._status);
    }    
    
    get fromSearchBar() {
        this._fromSrch = angular.fromJson(sessionStorage.breadCrumbFromSrch);
        console.log("BCrumb :::::::::", this._fromSrch);
        return this._fromSrch;
    }

    set fromSearchBar(status) {
        console.log("Set BCrumb ::::::::::::::", status);
        this._fromSrch = status;
        sessionStorage.breadCrumbFromSrch = angular.toJson(this._fromSrch);
    }


}