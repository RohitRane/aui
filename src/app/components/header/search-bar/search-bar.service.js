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
            this._saveToSession();
        }
    }

    get productLine() {
        return this._productLine;
    }

    set productLine(newSrchStr) {
        if (newSrchStr) {
            this._productLine = newSrchStr;
            this._saveToSession();
        }
    }

    get productCategory() {
        return this._productCategory;
    }

    set productCategory(newProductCategory) {
        this._productCategory = newProductCategory;
        this._saveToSession();
    }

    get typeId() {
        return this._typeId;
    }

    set typeId(newTypeId) {
        if (newTypeId) {
            this._typeId = newTypeId;
            this._saveToSession();
        }
    }

    get filters() {
        return this._filters;
    }

    set filters(newfilters) {
        if (newfilters) {
            this._filters = newfilters;
            this._saveToSession();
        }
    }

    _saveToSession() {
        sessionStorage.srchStr = this._srchStr;
        sessionStorage.productLine = this._productLine;
        sessionStorage.productCategory = this._productCategory;
        sessionStorage.typeId = this._typeId;
        sessionStorage.filters = this._filters;
    }

    _retrieveFromSession() {
        this._srchStr = sessionStorage.srchStr;
        this._productLine = sessionStorage.productLine;
        this._productCategory = sessionStorage.productCategory;
        this._typeId = sessionStorage.typeId;
        this._filters = sessionStorage.filters;
    }
}