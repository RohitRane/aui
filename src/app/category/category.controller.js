/*Author:Rohit Rane*/
export class CategoryController {
    constructor($log,$stateParams) {
        'ngInject';
        
        let vm = this;
        
        $log.debug("Cat Name :",$stateParams.catName);
        this.categoryName = $stateParams.catName;
    }
}