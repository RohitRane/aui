export class SearchBarService {
    
    /*constructor(srchStr) {
        this{._srchStr = srchStr;
    }*/
    constructor() {
        this._filters = [{}];
        this._retrieveFromSession();
    }

    get srchStr() {
        return this._srchStr;        
    }

    set srchStr(newSrchStr) {
        if (newSrchStr) {
            this._srchStr = newSrchStr;
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
        }
    }

    get productCategory() {
        return this._productCategory;
    }

    set productCategory(newProductCategory) {
        this._productCategory = newProductCategory;
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

    get backBottonPressed(){
        return this._backBottonPressed;
    }

    set backBottonPressed(flag){
        this._backBottonPressed = flag;
    }

    _clearSession(){
        delete sessionStorage.srchStr;
    }

    _saveToSession() {
        sessionStorage.srchStr = this._srchStr;
        /*sessionStorage.productLine = this._productLine;
        sessionStorage.productCategory = this._productCategory;
        sessionStorage.typeId = this._typeId;
        sessionStorage.filters = this._filters;*/
    }

    _retrieveFromSession() {
        this._srchStr = sessionStorage.srchStr;
       /* this._productLine = sessionStorage.productLine;
        this._productCategory = sessionStorage.productCategory;
        this._typeId = sessionStorage.typeId;
        this._filters = sessionStorage.filters;*/
    }
}