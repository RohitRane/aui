export class YmmService {
    
    /*constructor(srchStr) {
        this{._srchStr = srchStr;
    }*/
    constructor() {
        this._yearSelected ;
        this._makeSelected;
        this._modelSelected;
    }

   
/*
    get yearSelected() {
        return this._productCategory;
    }

    set yearSelected(year) {
        this._yearSelected = year;
        this._saveToSession();
    }

  
     get makeSelected() {
        return this._makeSelected;
    }

    set yearSelected(make) {
        this._makeSelected = make;
        this._saveToSession();
    }

     get modelSelected() {
        return this._modelSelected;
    }

    set modelSelected(model) {
        this._modelSelected = model;
        this._saveToSession();
    }

    get ymmData(){
        return this._ymmObject;
    }

    set ymmData(){
        this._ymmObject = new ymmObject(this._yearSelected,this._makeSelected,this._modelSelected);
    }

    ymmObject(year,make,model){
        this.year = year;
        this.make = make;
        this.model = model;
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
    }*/
}