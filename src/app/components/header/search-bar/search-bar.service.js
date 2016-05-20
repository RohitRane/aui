export class SearchBarService {
    
    /*constructor(srchStr) {
        this{._srchStr = srchStr;
    }*/
    constructor() {
        this._filters = [{}];
        //this._retrieveFromSession();
    }

    get srchStr() {
        this._srchStr = sessionStorage.srchStr;
        return this._srchStr;

    }

    set srchStr(newSrchStr) {
        if (newSrchStr) {
            this._srchStr = newSrchStr;
            sessionStorage.srchStr = this._srchStr;
            //this._saveToSession();
        }
    }

    get srchTempStr() {
        return this._srchTempStr;
    }

    set srchTempStr(newSrchTempStr) {
        if (newSrchTempStr) {
            this._srchTempStr = newSrchTempStr;
        }
    }


    get productLine() {
       // this._productLine = sessionStorage.productLine;
        return this._productLine;
    }

    set productLine(newSrchStr) {
        if (newSrchStr) {
            this._productLine = newSrchStr;
            sessionStorage.productLine = this._productLine;
            //this._saveToSession();
        }
    }

    get productCategory() {
        //this._productCategory = sessionStorage.productCategory;
        return this._productCategory;
    }

    set productCategory(newProductCategory) {
        this._productCategory = newProductCategory;
        sessionStorage.productCategory = this._productCategory;
    }

    get typeId() {
        return this._typeId;
    }

    set typeId(newTypeId) {
        if (newTypeId) {
            this._typeId = newTypeId;
        }
    }

    get filters() {
        return this._filters;
    }

    set filters(newfilters) {
        if (newfilters) {
            this._filters = newfilters;
            sessionStorage.filters = angular.toJson(this._filters);
        }
    }

    get selectdeFilters() {
        return this._selectdeFilters;
    }

    set selectdeFilters(newselectdefilters) {
        if (newselectdefilters) {
            this._selectdeFilters = newselectdefilters;
            sessionStorage.selectdeFilters = angular.toJson(this._selectdeFilters);
        }
    }

    get categoryfilters() {
        return this._categoryfilters;
    }

    set categoryfilters(newcategoryfilters) {
        if (newcategoryfilters) {
            this._categoryfilters = newcategoryfilters;
            sessionStorage.categoryfilters = angular.toJson(this._categoryfilters);
        }
    }

    get backBottonPressed() {
        return this._backBottonPressed;
    }

    set backBottonPressed(flag) {
        this._backBottonPressed = flag;
    }

    get autoSuggestItem() {
        this._autoSuggestItem = angular.fromJson(sessionStorage.autoSuggestItem);
        return this._autoSuggestItem;
    }

    set autoSuggestItem(obj) {
        this._autoSuggestItem = obj;
        sessionStorage.autoSuggestItem = angular.toJson(this._autoSuggestItem);
    }

    clearSession() {
        console.log("Back in clear", sessionStorage.categoryfilters);
        delete sessionStorage.srchStr;
        delete sessionStorage.productLine;
        delete sessionStorage.categoryfilters;
        delete sessionStorage.productCategory;
        delete sessionStorage.filters;
        delete sessionStorage.selectdeFilters;
        delete SearchBarService.backBottonPressed;
        delete sessionStorage.autoSuggestItem;
        console.log("Back in clear 1", sessionStorage.categoryfilters);
    }

    _saveToSession() {
        sessionStorage.srchStr = this._srchStr;
        sessionStorage.productLine = this._productLine;
        sessionStorage.productCategory = this._productCategory;
        sessionStorage.categoryfilters = this._categoryfilters;
        sessionStorage.filters = this._filters;
        sessionStorage.selectdeFilters = this._selectdeFilters;
        //console.log("Back in service Save ",sessionStorage.categoryfilters);
        /*sessionStorage.productLine = this._productLine;
        sessionStorage.productCategory = this._productCategory;
        sessionStorage.typeId = this._typeId;
        sessionStorage.filters = this._filters;*/
    }

    _retrieveFromSession() {
        //  console.log("Back in _retrieveFromSession",  sessionStorage.categoryfilters);
        this._srchStr = sessionStorage.srchStr;
        this._productLine = sessionStorage.productLine;
        this._productCategory = sessionStorage.productCategory;
        this._categoryfilters = angular.fromJson(sessionStorage.categoryfilters);
        this._filters = angular.fromJson(sessionStorage.filters);
        this._selectdeFilters = angular.fromJson(sessionStorage.selectdeFilters);
        console.log("Back in _retrieveFromSession", sessionStorage.productLine);
        /* this._productLine = sessionStorage.productLine;
         this._productCategory = sessionStorage.productCategory;
         this._typeId = sessionStorage.typeId;
         this._filters = sessionStorage.filters;*/
    }
}