export class SearchBarService{
    
    /*constructor(srchStr) {
        this{._srchStr = srchStr;
    }*/
    constructor(){
        this._filters = [{}];
    }
     
    get srchStr() {
        return this._srchStr;
    }
 
    set srchStr(newSrchStr){
        if(newSrchStr){ 
            this._srchStr = newSrchStr;
        }
    }
    
    get productLine() {
        return this._productLine;
    }
 
    set productLine(newSrchStr){
        if(newSrchStr){ 
            this._productLine = newSrchStr;
        }
    }
    
    get productCategory() {
        return this._productCategory;
    }
 
    set productCategory(newProductCategory){
            this._productCategory = newProductCategory;
    }
    
     get typeId() {
        return this._typeId;
    }
 
    set typeId(newTypeId){
        if(newTypeId){ 
            this._typeId = newTypeId;
        }
    }
    
    get filters() {
        return this._filters;
    }
 
    set filters(newfilters){
        if(newfilters){ 
            this._filters = newfilters;
        }
    }
}