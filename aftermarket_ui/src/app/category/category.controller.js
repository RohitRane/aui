/*Author:Rohit Rane*/
export class CategoryController {
    constructor($log,$stateParams) {
        'ngInject';
        
        let vm = this;
        
        vm.categoryName = $stateParams.catName;
    }
}