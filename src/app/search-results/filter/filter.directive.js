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
          this.prestine = {};
          this.viewLimitName = "View all";
          this.reset();
          this.slider = {
            minValue: 20,
            maxValue: 90,
            options: {
                floor: 0,
                ceil: 100,
                step: 1
            }
        };
    }   
    
    reset(){
        for (let x of this.list) {
            if(x.type == 'STRING'){
                this.prestine[x.name] = {
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
                this.prestine[x.name] = {
                minValue: Math.min(...xVals),
                maxValue: Math.max(...xVals),
                options: {
                    floor: Math.min(...xVals),
                    ceil:  Math.max(...xVals),
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
        this.apicall();
        this.prestine[id].toggleView = !this.prestine[id].toggleView;
    }
    
    toggleviewLimit(id){
      if(this.prestine[id].toggle){
        this.prestine[id].viewLimitName = "View all";
        this.prestine[id].viewLimit = 4;
      }
      else{
        this.prestine[id].viewLimitName = "Collapse view";
        this.prestine[id].viewLimit = this.prestine[id].options.length;
      }
      this.prestine[id].toggle = !this.prestine[id].toggle;
    }
    
    apicall(){
        let vm = this;
        let { $log, dataServices, $rootScope } = vm.DI();
         for (let x of this.list) {
             angular.forEach(x.buckets, function(obj){
                 $log.debug(obj.key+" "+obj.select);
             });
         }
         $rootScope.$emit("searchLaunched", [1,2]);
    }
    
    onSliderChange(){
         alert("hello");
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


