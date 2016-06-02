export class YmmService {

    /*constructor(srchStr) {
        this{._srchStr = srchStr;
    }*/

    constructor($http, $q, SearchBarService, apiConfig) {
        'ngInject';
        let vm = this;
        vm.DI = () => ({
            $http,
            $q,
            SearchBarService
        });
        this._yearSelected;
        this._makeSelected;
        this._modelSelected;
        this.$http = $http;
        this.$q = $q;
        this.ymmURL = apiConfig.BASEURL;
        //this.ymmURL = 'http://52.8.125.250:8080';//DEV
        //this.ymmURL = 'http://52.53.236.6';//QA
        this.method = 'POST';
        this.params = "";
        this.currYMMOrder = [];
        this.level = [];

    }

    getYearData(q, cats, lvl1, lvl2, lvl3, from, size) {
        let vm = this;
        let {
            $http,
            $q,
            SearchBarService
        } = vm.DI();

        let deferred = this.$q.defer();

        let tempCatId = "";
        if (SearchBarService.productCategory == undefined) {
            tempCatId = null;
        } else {

            tempCatId = SearchBarService.productCategory.id;
        }


        return this.$http({
            url: this.ymmURL+"/search-service/api/ymmList",
            method: 'POST',
            data: {
                "q": SearchBarService.srchStr,
                "cats": [SearchBarService.productLine.id, null, tempCatId],
                "lvl1": this.level[1],
                'lvl2': this.level[2],
                "lvl3": (this.level[3]==undefined)?(null):(this.level[3]),
                "from": from,
                "size": size
            }
        })
    }


    getAPIConfigDataForYMM(q, cats, year, make, model, from, size) {
        let vm = this;
        let {
            $http,
            $q,
            SearchBarService
        } = vm.DI();

        let deferred = this.$q.defer();
        return this.$http({
            url:  this.ymmURL+"/search-service/api/configData",
            method: 'GET'
        })
    }

    setLevelData(param, data) {
        this.level[param + 1] = data;
        //this.level.push(data);
    }

    emptyLevelData() {
        this.level = [];

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