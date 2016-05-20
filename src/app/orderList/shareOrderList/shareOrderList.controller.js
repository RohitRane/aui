/*Author : Shaifali Jaiswal*/
export class ShareOrderlistController {
    constructor($uibModalInstance, items) {
        'ngInject';
        let vm = this;

        vm.DI = () => ({$uibModalInstance});

        // vm.items = items;
        /*vm.selected = {
            item: vm.items[0]
        }*/


    }
    /*ok() {
      let vm = this,
      {$uibModalInstance} = vm.DI();
        $uibModalInstance.close();
      }
    }*/

    cancel() {
      let vm = this,
      {$uibModalInstance} = vm.DI();
        $uibModalInstance.close();
    }
}
