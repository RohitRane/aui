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
            searchScope : 'All',
            results : [
                'ujoint',
                'ujoint-A',
                'ujoint-B',
                'ujoint-C',
                'ujoint-D',
                'ujoint-E',
                'ujoint-1',
                'ujoint-2',
                'ujoint-3',
                'ujoint-4',
                'ujoint-5',
                'steer-axle-1',
                'steer-axle-2',
                'steer-axle-3',
                'steer-axle-4',
                'steer-axle-5'                
            ]
        };
    }
    
    textTyped(){
        
        this.logger.debug("change fired.",this.search.searchString);
    }
}