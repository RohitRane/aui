export class SearchBarService{
    
    /*constructor(srchStr) {
        this._srchStr = srchStr;
    }*/
     
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
    
     get typeId() {
        return this._typeId;
    }
 
    set typeId(newTypeId){
        if(newTypeId){ 
            this._typeId = newTypeId;
        }
    }
}