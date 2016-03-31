export function PartCardDirective() {
    'ngInject';

    let directive = {
        restrict: 'E',
        templateUrl: 'app/search-results/part-card/part-card.html',
        scope: {
            part: '='
        },
        controller: SearchResultDirectiveController,
        controllerAs: 'partCard',
        bindToController: true
    };
    return directive;
}

class SearchResultDirectiveController{
    constructor($log, $scope){
         'ngInject';
          this.dI = {
            log : $log,
            scope: $scope
          };
         this.part.attrList = Object.keys(this.part.attrs);
         this.specLimit = 4; 
         this.toggle = false;
         this.specToggleName = "View all specs";
    }
    
    toggleSpecs(){
      
      if(this.toggle){
        this.specToggleName = "View all specs";
        this.specLimit = 4;
      }
      else{
        this.specToggleName = "Collapse view";
        this.specLimit = this.part.attrList.length;
      }
      this.toggle = !this.toggle;
    }
    
}


