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
         
         vm.DI = () => ({ $log, SearchBarService, dataServices, $rootScope });
         vm.prestine = {};
         vm.viewLimitName = "View all";
         vm.reset();
         
         $scope.$watch(function(){
             return vm.list;
         },function(n, o){
             $log.debug("Service list :",SearchBarService.filters);
             $log.debug("old :",o);
             $log.debug("new :",n);
             Object.assign(n,o);
         });
    } 
    
    _filterInit(filterObj){
        
        let obj = {
            collapsed: false,
                changed: false,
                select: false,
                viewLimit: 4,
                viewLimitName: "View all",
                toggle: false,
                viewSelect: "Select All",
                toggleView: true,
                options: x.buckets
            }
            Object.assign(filterObj,obj);
            return filterObj;
    }
    
    reset(){ 
        let vm = this;
        let { $log, SearchBarService } = vm.DI();
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
                //console.log("x.buckets.length", x.name, x.buckets,  x.buckets.length);
                if(x.buckets.length == 1){
                    vm.prestine[x.name] = {
                    singleObject: true,
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
                }else{
                    vm.prestine[x.name] = {
                    singleObject: false,
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
        vm.prestine[id].viewLimitName = "View less";
        vm.prestine[id].viewLimit = vm.prestine[id].options.length;
      }
      vm.prestine[id].toggle = !vm.prestine[id].toggle;
    }
    
    apicall(){
        let vm = this;
        let { $log, SearchBarService, $rootScope } = vm.DI();
         $log.debug("call");
         let filterObjectArray = [];
         for (let x of this.list) {
             let filterArray = [];
             let filterObject = {};
             
              for(let obj=0; obj < x.buckets.length; obj++){
                 if(x.type == "STRING"){
                   x.buckets[obj].select ? filterArray.push(x.buckets[obj].key) : "";
                   $log.debug(x.name,  x.buckets[obj].key, x.buckets[obj].select);
                   
                }else{
                    if(vm.prestine[x.name].singleObject){
                        $log.debug("vm.prestine[x.name].singleObject", x.name,  x.buckets[0].key);
                        x.buckets[0].select ? filterArray.push(x.buckets[0].key) : "";
                    }else{
                        $log.debug(x.name, vm.prestine[x.name].minValue, vm.prestine[x.name].maxValue);
                        filterArray.push(vm.prestine[x.name].minValue);
                        filterArray.push(vm.prestine[x.name].maxValue);
                    }
                    break;
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
        // $log.debug("filterObjectArray", filterObjectArray);
        console.log("vm.prestine ", vm.list);
        SearchBarService.filters = vm.list;
        $log.debug("payload", filterObjectArray);
        $rootScope.$emit("searchLaunched", filterObjectArray);
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

