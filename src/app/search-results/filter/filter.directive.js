export function FilterDirective() {
    'ngInject';
    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/filter/filter.html',
        scope: {
            list: '=',
            category: '='
        },
        controller: FilterDirectiveController,
        controllerAs: 'vm',
        bindToController: true
    };
    return directive;
}

class FilterDirectiveController{ 
    constructor($log, SearchBarService, dataServices, $scope, $rootScope){
         'ngInject';
         let vm = this;
         vm.DI = () => ({ $log, SearchBarService, dataServices, $scope, $rootScope });
         vm.listPristine = [];
         vm.listPreviousFilter = [];
         vm.categoryPristine = [];
         $scope.$watch(function(){  
             return vm.category;
         },function(){ 
             vm.resetCategory();
         });
        
         $scope.$watch(function(){  
             return vm.list;
         },function(){ 
             vm.resetList();
             if(vm.listPreviousFilter.length > 1){
                 for(let x of vm.listPristine){
                     x.priority = 2;
                     for(let y of vm.listPreviousFilter){
                         if(x.name == y.name){
                             if(y.bucketChanged){
                                Object.assign(x, y);
                                x.priority = 1;
                             }
                             break;
                         }
                     }
                 }
             }
             vm.listPreviousFilter = [];
         });
    } 
    
    resetCategory(){
      let vm = this;
      let { SearchBarService } = vm.DI();
      if(SearchBarService.typeId == 4){
          vm.categoryPristine = [];
      }
      if(vm.category.length > 0){
            vm.categoryPristine = vm.category;
            vm.categoryPristine = vm.categoryPristine.map(function(name){
                return {
                    name:name,
                    select:false
                };
            });
      }
    }
    
    categoryFilter(selectedCategory){  
        let vm = this;
        let { SearchBarService, $scope } = vm.DI();
        vm.count = true;
        angular.forEach(vm.categoryPristine, function(obj){ 
            obj.select = false;
        });
        selectedCategory.select = true;
        SearchBarService.productCategory = selectedCategory.name;
        vm.listPreviousFilter = [];
        $scope.$emit("searchLaunched");
    }
    
    pushCheckboxData(x){
        let vm = this;
        let obj = {};
        vm.tempBuckets = [];
         if(x.type == "STRING" || x.type == "NUMERIC"){ 
             angular.forEach(x.buckets, function(obj){
                vm.tempBuckets.push({
                key : obj.key,
                count : obj.count,
                select : false
                });
            });
         }else if(x.type == "NUMERIC_RANGE"){
             angular.forEach(x.buckets, function(obj){
                 console.log("start", obj.start);
                vm.tempBuckets.push({
                start: obj.start,
                end: obj.end,
                select : false
                });
            });
         }
        
        obj = {
            name: x.name,
            type: x.type,
            buckets: vm.tempBuckets,
            viewSelect: x.buckets.length > 1 ? "Select All": '',
            toggleSelect: false,
            viewLimitName: "View all",
            toggleView: false,
            viewLimit: 4
        };
        return obj;
    }
    
    resetList(){ 
      let vm = this;
      let {  } = vm.DI();
      vm.listPristine = [];
      for(let x of vm.list){
        if(x.type == "STRING"){
            vm.listPristine.push (vm.pushCheckboxData(x));
        }else if(x.type == "NUMERIC_RANGE"){
             vm.listPristine.push (vm.pushCheckboxData(x));
        }else if(x.type == "NUMERIC"){
             vm.listPristine.push (vm.pushCheckboxData(x));
            /*if(x.buckets.length == 1){
                vm.listPristine.push (vm.pushCheckboxData(x));
            }else{
                let xVals = x.buckets.map(function(val) { return parseFloat(val.key) * 1000; });
                vm.listPristine.push({
                    name: x.name,
                    type: x.type,
                    singleObject: false,
                    minValue: Math.floor(Math.min(...xVals)/1000),
                    maxValue: Math.ceil(Math.max(...xVals)/1000),
                    options: {
                        floor: Math.floor(Math.min(...xVals) / 1000),
                        ceil:  Math.ceil(Math.max(...xVals) / 1000),
                        step: 1,
                        id: x.name,
                        onChange: function(sliderId, modelValue, highValue){
                         vm.apicall().then(()=>{
                                angular.noop();
                            });
                        }
                    }
                });
            }*/
        }
      }  
    }
    
    toggleselect(list){
        let vm = this;
        if(list.toggleSelect){
            list.viewSelect = "Select All";
            angular.forEach(list.buckets, function(obj){
                obj.select = false
            });
        }else{
            list.viewSelect = "Unselect";
            angular.forEach(list.buckets, function(obj){
                obj.select = true
            });
        }
        list.toggleSelect = !list.toggleSelect;
        vm.apicall();
    }
    
    toggleview(list){
        if(list.toggleView){
            list.viewLimitName = "View all"
            list.viewLimit = 4;
        }else{
            list.viewLimitName = "View less"
            list.viewLimit = list.buckets.length;
        }
        list.toggleView = !list.toggleView;
    }
    
    apicall(){
        let prms = () => new Promise((resolve) => {
        let vm = this;
        let { $scope } = vm.DI();
         let filterObjectArray = [];
         for (let x of vm.listPristine) {
             let filterArray = [];
             let filterObject = {};
                 if(x.type == "STRING" || x.type == "NUMERIC"){
                     for(let obj=0; obj < x.buckets.length; obj++){
                         x.buckets[obj].select ? filterArray.push(x.buckets[obj].key) : "";
                     }
                }else{
                   /* if(x.singleObject){
                        x.buckets[0].select ? filterArray.push(x.buckets[0].key) : "";
                    }else{
                       if(x.minValue > x.options.floor
                       || x.maxValue < x.options.ceil){
                           filterArray.push(x.minValue);
                           filterArray.push(x.maxValue);
                       }
                    }*/
                }
            if(filterArray.length){
                filterObject = {
                name: x.name,
                type: x.type,
                values: filterArray
                };
                filterObjectArray.push(filterObject);
                x.bucketChanged = true;
            }else{
                x.bucketChanged = false;
            }
         }
        vm.listPreviousFilter = vm.listPristine;
        $scope.$emit("searchLaunched", filterObjectArray);
        resolve();
        });
        return prms();
    }
}

