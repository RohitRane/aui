export class SearchBarController {
    constructor($log) {
        'ngInject';
        
        //Add all the 
        this.logger = $log;
        
        this.categories = [
            'Commercial Vehicles',
            'Light Vehicles',
            'Off-Highway',
            'High Performance',
            'Military/Defence',
            'Industrial'
        ];

        this.search = {
            searchScope : 'All'
        };
    }
    
    textTyped(){
        
        this.logger.debug("change fired.",this.search.searchString);
    }
}