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
    constructor($log, dataServices, $rootScope){
         'ngInject';
         let vm = this;
         vm.DI = () => ({ $log, dataServices, $rootScope });
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
            vm.prestine[id].viewSelect = "Unselect";
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
        vm.prestine[id].viewLimitName = "Collapse view";
        vm.prestine[id].viewLimit = vm.prestine[id].options.length;
      }
      vm.prestine[id].toggle = !vm.prestine[id].toggle;
    }
    
    apicall(){
        let vm = this;
        let { $log } = vm.DI();
         $log.debug("call");
         for (let x of this.list) {
             angular.forEach(x.buckets, function(obj){
               if(x.type == "STRING"){
                  $log.debug("STRING", x.name,  obj.key, obj.select);
               }else{
                  $log.debug("NUMERIC", x.name, vm.prestine[x.name].minValue, vm.prestine[x.name].maxValue);
               }
             });
         }
         //$rootScope.$emit("searchLaunched", [1,2]);
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
            this.prestine[id].viewSelect = "Unselect";
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
        this.prestine[id].viewLimitName = "Collapse view";
        console.log(this.prestine[id].options);
        this.prestine[id].viewLimit = this.prestine[id].options.length;
      }
      this.prestine[id].toggle = !this.prestine[id].toggle;
    }*/
}