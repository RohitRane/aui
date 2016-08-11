export class advncdSrchController {
    constructor($state, $rootScope, $timeout, SearchBarService) {
        'ngInject';
        let vm = this;

        vm.interChange = {
            submit: function (valid, formText) {
                if (valid) {
                    vm.interChange.errMsg = "";
                    let paramObj = {
                        from: 0,
                        'str': formText,
                        'ics': true,
                        cat1: 0
                    };
                    $rootScope.$emit("showAll", true);
                    SearchBarService.srchStr = formText;
                    $timeout(() => {
                        $state.go("searchResults", paramObj);
                    });
                }
                else {
                    vm.interChange.errMsg = "Please enter a valid part number.";
                }
            },
            errMsg: ""
        }

        vm.advancedMenu = [
            {
                'name': 'automotive',
                'displayName': 'Automotive by Year - Make - Model',
                'templateUrl': 'app/components/header/menus/advanced-search/selectors/automotive.html',
                'classNme': 'active'
            }, {
                'name': 'interchange',
                'displayName': 'Interchange',
                'templateUrl': 'app/components/header/menus/advanced-search/selectors/interchange.html',
                'classNme': ''
            }
        ];
        vm.activeSearch = vm.advancedMenu[0];
        
		/*$rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
            vm.activeSearch = vm.advancedMenu[0];
        });*/
        
        $rootScope.$on('$resetAdvancedSearch', function (event, toState, toParams, fromState, fromParams) {
            vm.changeAdvancedSearch(0,vm.advancedMenu[0]);
        });
        
        
    }
    
    changeAdvancedSearch(index,menuOption) {
        let vm = this;
        vm.activeSearch = menuOption;
        angular.forEach(vm.advancedMenu, (advancedMenu, index, compArr) => {
            advancedMenu.classNme = '';
        });
        vm.advancedMenu[index].classNme = 'active';
    }

    interChangeSearch() {

    }

}