export class SearchNavigationService {

    constructor($state, $location, $stateParams) {
        'ngInject';

        let vm = this;
        vm.DI = () => ({ $state, $location, $stateParams });
    }

    /*gotoResultsPage(cat1 = "", cat2 = "", cat3 = "", srchStr = "", filters = "", filterObject = "") {
        let vm = this, {$state, $location} = vm.DI();
        let url = '/search?';
        srchStr ? url = url + 'str=' + srchStr : angular.noop();
        filters ? url = url + '&' + 'filters=' + filters : angular.noop();
        filterObject ? url = url + '&' + 'filterObject=' + filterObject : angular.noop();
        cat1 ? url = url + '&' + 'cat1=' + cat1.id.toString() : angular.noop();
        cat2 ? url = url + '&' + 'cat2=' + cat2.id.toString() : angular.noop();
        cat3 ? url = url + '&' + 'cat3=' + cat3.id.toString() : angular.noop();
        $location.url(url);
    }*/

    gotoResultsPage(cat1 = "", cat2 = "", cat3 = "", from = "", srchStr = "", filters = "", filterObject = "", year = "", make = "", model = "", sort = "") {
        let vm = this, {$state, $stateParams} = vm.DI();
        let paramObj = { "str": srchStr, 'filters': filters, 'filterObject': filterObject, from: from, 'cat1': cat1 ? cat1.id.toString() : "", "cat2": cat2 ? cat2.id.toString() : "", "cat3": cat3 ? cat3.id.toString() : "", "y": year, "mk": make, "md": model, "sort": sort };
        if($stateParams.ics) {
            paramObj.ics = "";
        }
        $state.go("searchResults", paramObj,{ reload: true });
    }

}