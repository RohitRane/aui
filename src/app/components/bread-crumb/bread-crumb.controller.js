/*Author:Rohit Rane*/

export class BreadCrumbController {
  constructor($log, $timeout, $rootScope) {
    'ngInject';

    let vm = this;

    let deregistrationCallback = $rootScope.$on("categoryFilterApplied", function (evt, selectedCategory) {
      $log.debug("Cat Fill :", selectedCategory);
      vm.selectedCategory = selectedCategory;
    });
    $rootScope.$on('$destroy', deregistrationCallback);
  }
}