export class BreadCrumbService {

    constructor() {
        this._status = angular.fromJson(sessionStorage.breadCrumbBBStatus);
        this._fromSrch = angular.fromJson(sessionStorage.breadCrumbFromSrch);
        //this._retrieveFromSession();
    }

    get searchToResults() {
        this._status = angular.fromJson(sessionStorage.breadCrumbBBStatus);
        return this._status;
    }

    set searchToResults(status) {
        this._status = status;
        sessionStorage.breadCrumbBBStatus = angular.toJson(this._status);
    }

    get showOnlyTree() {
        this._showOnlyTree = angular.fromJson(sessionStorage.showOnlyTree);
        return this._showOnlyTree;
    }

    set showOnlyTree(status) {
        this._showOnlyTree = status;
        sessionStorage.showOnlyTree = angular.toJson(this._showOnlyTree);
    }

    get cats() {
        this._cats = angular.fromJson(sessionStorage.cats);
        return this._cats;
    }

    set cats(cats) {
        this._cats = cats;
        sessionStorage.cats = angular.toJson(this._cats);
    }

    get showAll() {
        this._showAll = angular.fromJson(sessionStorage.showAll);
        return this._showAll;
    }

    set showAll(bool) {
        this._showAll = bool;
        sessionStorage.showAll = angular.toJson(this._showAll);
    }

}