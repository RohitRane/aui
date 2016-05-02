export function FilterDirective($log, SearchBarService) {
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
         vm.categoryPristine = [];
         //vm.resetList();
        // vm.resetCategory();
         
         $scope.$watch(function(){
             return vm.category;
         },function(n, o){
             vm.resetCategory();
         });
         vm.count = true;
         $scope.$watch(function(){
             return vm.list;
         },function(n, o){
             $log.debug("old :",o);
             $log.debug("new :",n);
             $log.debug("vm.list :",vm.list.length);
             if(vm.list.length == 0){
                 vm.count = true;
             }
             if(vm.count){
                 vm.resetList();
                 vm.count = false;
             }
             
            /* n = n.map(function(item){
                 angular.forEach(o,function(){
                     if(n.name === o.name){
                         Object.assign(n,o);
                     }
                 });
             });*/
         });
    } 
    
    resetCategory(){
      let vm = this;
      let { $log } = vm.DI();
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
        let { $log, SearchBarService, $scope } = vm.DI();
        vm.count = true;
        angular.forEach(vm.categoryPristine, function(obj){ 
            obj.select = false;
        });
        selectedCategory.select = true;
        SearchBarService.productCategory = selectedCategory.name;
        //vm.listPristine = [];
        $scope.$emit("searchLaunched");
        vm.resetList();
    }
    
    resetList(){ 
      let vm = this;
      let { $log } = vm.DI();
      vm.listPristine = [];
      $log.debug("resetList ", vm.list);
      for(let x of vm.list){
        if(x.type == "STRING"){
            vm.tempBuckets = [];
            angular.forEach(x.buckets, function(obj){
              vm.tempBuckets.push({
                key : obj.key,
                count : obj.count,
                select : false
              });
            });
            vm.listPristine.push ({
                name: x.name,
                type: x.type,
                buckets: vm.tempBuckets,
                viewSelect: x.buckets.length > 1 ? "Select All": '',
                toggleSelect: false,
                viewLimitName: "View all",
                toggleView: false,
                viewLimit: 4
            });
        }
        else if(x.type == "NUMERIC"){
            if(x.buckets.length == 1){
                vm.listPristine.push ({
                name: x.name,
                type: x.type,
                buckets: x.buckets,
                singleObject: true,
                viewSelect: x.buckets.length > 1 ? "Select All": '',
                toggleSelect: false,
                viewLimitName: "View all",
                toggleView: false,
                viewLimit: 4
            });
            }else{
                let xVals = x.buckets.map(function(val) { return parseInt(val.key); });
                vm.listPristine.push({
                    name: x.name,
                    type: x.type,
                    singleObject: false,
                    minValue: Math.min(...xVals),
                    maxValue: Math.ceil(Math.max(...xVals)),
                    options: {
                        floor: Math.min(...xVals),
                        ceil:  Math.max(...xVals),
                        step: 1,
                        id: x.name,
                        onChange: function(/*sliderId, modelValue, highValue*/){
                         vm.apicall().then(()=>{
                                angular.noop();
                            });
                        }
                    }
                });
            }
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
        let vm = this;
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
        let { $log, SearchBarService, $scope, $rootScope } = vm.DI();
         let filterObjectArray = [];
         for (let x of vm.listPristine) {
             let filterArray = [];
             let filterObject = {};
              
                 if(x.type == "STRING"){
                     for(let obj=0; obj < x.buckets.length; obj++){
                         x.buckets[obj].select ? filterArray.push(x.buckets[obj].key) : "";
                     }
                }else{
                    if(x.singleObject){
                        x.buckets[0].select ? filterArray.push(x.buckets[0].key) : "";
                    }else{
                       if(x.minValue > x.options.floor
                       || x.maxValue < x.options.ceil){
                           filterArray.push(x.minValue);
                           filterArray.push(x.maxValue);
                       }
                    }
                }
             
            if(filterArray.length){
                filterObject = {
                name: x.name,
                type: x.type,
                values: filterArray
                };
                filterObjectArray.push(filterObject);
            }
         }
        $log.debug("payload", filterObjectArray);
        $scope.$emit("searchLaunched", filterObjectArray);
        resolve();
        });
        return prms();
    }
}

