export class SearchBarService {
    
    /*constructor(srchStr) {
        this{._srchStr = srchStr;
    }*/
    constructor() {
        this._filters = [{}];
        //this._retrieveFromSession();
    }

    get srchStr() {
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
        }
    }

    get categoryfilters() {
        return this._categoryfilters;
    }

    set categoryfilters(newcategoryfilters) {
        if (newcategoryfilters) {
            this._categoryfilters = newcategoryfilters;
            sessionStorage.categoryfilters = angular.toJson(this._categoryfilters);
            //console.log("Back in " ,sessionStorage.categoryfilters , this._categoryfilters);
        }
    }

    get backBottonPressed(){
        return this._backBottonPressed;
    }

    set backBottonPressed(flag){
        this._backBottonPressed = flag;
    }

    _clearSession(){
        console.log("Back in clear",  sessionStorage.categoryfilters);
         delete sessionStorage.srchStr;
         delete sessionStorage.productLine;
         delete sessionStorage.categoryfilters;
         delete sessionStorage.productCategory;
         delete SearchBarService.backBottonPressed;
         console.log("Back in clear 1", sessionStorage.categoryfilters);
    }

    _saveToSession() {
        sessionStorage.srchStr = this._srchStr;
        sessionStorage.productLine = this._productLine;
        sessionStorage.productCategory = this._productCategory;
        sessionStorage.categoryfilters = this._categoryfilters;
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
        this._categoryfilters =  angular.fromJson(sessionStorage.categoryfilters);
        console.log("Back in _retrieveFromSession" ,sessionStorage.productLine);
       /* this._productLine = sessionStorage.productLine;
        this._productCategory = sessionStorage.productCategory;
        this._typeId = sessionStorage.typeId;
        this._filters = sessionStorage.filters;*/
    }
}