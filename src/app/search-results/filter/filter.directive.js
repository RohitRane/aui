export function FilterDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/filter/filter.html',
        scope: {
            list: '='
        },
        controller: FilterDirectiveController,
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
}

class FilterDirectiveController{ 
    constructor($log, SearchBarService, dataServices, $rootScope){
         'ngInject';
         let vm = this;
         vm.DI = () => ({ $log, SearchBarService, dataServices, $rootScope });
         vm.prestine = {};
         vm.viewLimitName = "View all";
         vm.reset();
    }   
    
    reset(){ 
        let vm = this;
        for (let x of vm.list) {
            if(x.type == 'STRING'){
                vm.prestine[x.name] = {
                collapsed: false,
                changed: false,
                select: false,
                viewLimit: 4,
                viewLimitName: "View all",
                toggle: false,
                viewSelect: "Select All",
                toggleView: true,
                options: x.buckets
                };
                angular.forEach(x.buckets, function(obj){
                    obj.select = false;
                });
            }
            if(x.type == 'NUMERIC'){
                let xVals = x.buckets.map(function(val) { return val.count; });
                vm.prestine[x.name] = {
                minValue: Math.min(...xVals),
                maxValue: Math.max(...xVals),
                options: {
                    floor: Math.min(...xVals),
                    ceil:  Math.max(...xVals),
                    step: 1,
                    id: x.name,
                    onChange: function(/*sliderId, modelValue, highValue*/){
                       vm.apicall();
                    }
                }
                };
                 
            }
        }
    }
    
    toggleselectAll(arr, id){
         let vm = this;
        if(vm.prestine[id].toggleView){
            vm.prestine[id].viewSelect = "Un-select";
            angular.forEach(arr, function(obj){
                obj.select = true;
            });
        }else{
            vm.prestine[id].viewSelect = "Select All";
            angular.forEach(arr, function(obj){
                obj.select = false;
            });
        }
        vm.apicall();
        vm.prestine[id].toggleView = !vm.prestine[id].toggleView;
    }
    
    toggleviewLimit(id){
        let vm = this;
      if(vm.prestine[id].toggle){
        vm.prestine[id].viewLimitName = "View all";
        vm.prestine[id].viewLimit = 4;
      }
      else{
        vm.prestine[id].viewLimitName = "Collapse";
        vm.prestine[id].viewLimit = vm.prestine[id].options.length;
      }
      vm.prestine[id].toggle = !vm.prestine[id].toggle;
    }
    
    apicall(){
        let vm = this;
        let { $log, SearchBarService } = vm.DI();
         $log.debug("call");
         let filterObjectArray = [];
         for (let x of this.list) {
             let filterArray = [];
             let filterObject = {};
             /*angular.forEach(x.buckets, function(obj){
               if(x.type == "STRING"){
                   filterArray.push(obj.key);
                   $log.debug(x.name,  obj.key, obj.select);
               }else{
                   filterArray.push(vm.prestine[x.name].minValue);
                   filterArray.push(vm.prestine[x.name].maxValue);
                   $log.debug(x.name, vm.prestine[x.name].minValue, vm.prestine[x.name].maxValue);
               }
             });*/
              for(let obj=0; obj < x.buckets.length; obj++){
                 if(x.type == "STRING"){
                   x.buckets[obj].select ? filterArray.push(x.buckets[obj].key) : "";
                   $log.debug(x.name,  x.buckets[obj].key, x.buckets[obj].select);
                }else{
                    filterArray.push(vm.prestine[x.name].minValue);
                    filterArray.push(vm.prestine[x.name].maxValue);
                    $log.debug(x.name, vm.prestine[x.name].minValue, vm.prestine[x.name].maxValue);
                    break;
                }
             }
             //filterObject[x.name].name = x.name;
             //filterObject[x.name].type = x.type;
            // filterObject[x.name].values = filterArray;
            if(filterArray.length){
                filterObject[x.name] = {
                name: x.name,
                type: x.type,
                values: filterArray
                };
                filterObjectArray.push(filterObject);
            }
         }
         $log.debug("filterObjectArray", filterObjectArray);
         let payload = {
	  			"q": SearchBarService.srchStr,
                "cid": "1",
                "from":0,
                "size":10,
                "cat1":SearchBarService.productLine,
                "filter": filterObjectArray
	    };
         //$rootScope.$emit("searchLaunched", [1,2]);
         $log.debug("payload", payload);
    }
    
    /*
        reset(){ console.log("super", this.list);
        for (let x of this.list) {
            if(x.type == 'string'){
                this.prestine[x.id] = {
                collapsed: false,
                changed: false,
                select: false,
                viewLimit: 4,
                viewLimitName: "View all",
                toggle: false,
                viewSelect: "Select All",
                toggleView: true,
                options: x.options
                };
            }
            if(x.type == 'number'){
                this.prestine[x.id] = {
                minValue: Math.min(...x.options),
                maxValue: Math.max(...x.options),
                options: {
                    floor: Math.min(...x.options),
                    ceil:  Math.max(...x.options),
                    step: 1
                }
                };
            }
        }
    }
    
    toggleselectAll(arr, id){
        if(this.prestine[id].toggleView){
            this.prestine[id].viewSelect = "Un-select";
            angular.forEach(arr, function(obj){
                obj.select = true;
            });
        }else{
            this.prestine[id].viewSelect = "Select All";
            angular.forEach(arr, function(obj){
                obj.select = false;
            });
        }
        this.prestine[id].toggleView = !this.prestine[id].toggleView;
    }
    
    toggleviewLimit(id){
      if(this.prestine[id].toggle){
        this.prestine[id].viewLimitName = "View all";
        this.prestine[id].viewLimit = 4;
      }
      else{
        this.prestine[id].viewLimitName = "Collapse";
        console.log(this.prestine[id].options);
        this.prestine[id].viewLimit = this.prestine[id].options.length;
      }
      this.prestine[id].toggle = !this.prestine[id].toggle;
    }*/
}