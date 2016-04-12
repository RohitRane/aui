/*Author:Rohit Rane*/
export class PartController {
    constructor($log,$document) {
        'ngInject';
        
        let vm = this;
        vm.DI = () =>({$log,$document});
       
    }
    enlarge(event){
        let vm = this;
        let {$log,$document} = vm.DI();
        $log.debug("mouse over :", event.clientY);
        let lens = $document[0].getElementById("lens");
        let lensElement = angular.element(lens);
        $log.debug("lens :",lensElement);
        let lensCenterY = event.clientY-150;
        let lensCenterX = event.clientX;
        lensElement.css("top",lensCenterY+'px');
        lensElement.css("left",lensCenterX+'px');
        $log.debug("top :",lensElement.css("top"));
        
        let zoom = $document[0].getElementById("zoom");
        let zoomElement = angular.element(zoom);
        $log.debug("zoom :",zoomElement);
        let a = -lensCenterX*5;
        let b = -(lensCenterY)*5;
        let bg = "url("+"assets/images/home.png"+") "+a+"px"+" "+b+"px/2000px 1125px no-repeat";
        zoomElement.css("background",bg);
    }
}