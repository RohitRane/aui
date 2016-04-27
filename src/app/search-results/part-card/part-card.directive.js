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
       /* link: function(scope) {
            $timeout(function(){
                if(angular.isDefined(scope.part) && scope.part.attrs != null){
                    $log.debug("if");
                    scope.part.attrList = Object.keys(scope.part.attrs);
                }else{ 
                    $log.debug("else");
                    scope.part.attrList =[];
                }
            }); 
            
         },*/
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
          
         /* if(this.part.attrs != null){this.dI.log.debug("if");
              this.part.attrList = Object.keys(this.part.attrs);
          }else{ this.dI.log.debug("else");
              this.part.attrList =[];
          }*/
         
         this.specLimit = 4; 
         this.toggle = false;
         this.specToggleName = "Expand";
    }
    
    toggleSpecs(){
      
      if(this.toggle){
        this.specToggleName = "Expand";
        this.specLimit = 4;
      }
      else{
        this.specToggleName = "Collapse";
        this.specLimit = this.part.attrList.length;
      }
      this.toggle = !this.toggle;
    }
}


