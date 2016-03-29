export class SearchResultsController{
    constructor($log) {
        'ngInject';
        
        this.filters = [            
            {
                "name": "Radio",
                "id": "u1",
                "type": "list",
                "multiSelect": false,
                "options": ["yes", "no"]
            },
            {
                "name": "Check Box",
                "id": "t1",
                "type": "list",
                "multiSelect": true,
                "options": ["HR Style", "BP Style", "OSR Style"]
            },
            {
                "name": "Scale",
                "id": "s1",
                "type": "scale"
            },
            {
                "name": "Search",
                "id": "sr1",
                "type": "search",
                "options": ["HR Style", "BP Style", "OSR Style"]
            }
        ];
        
        this.filter = [
          {
              name: "abhi"
          },
          {
              name: "teju"
          }  
        ];
       this.resultCard = [
          {
              name: "E-10021",
              imageURL: "http://placehold.it/160x160",
              table:[
                  {
                      name: "GAWR",
                      value: 1000
                  },
                  {
                      name: "Center Drop",
                      value: "10.4 inches"
                  }
              ]
          },
          {
              name: "G-10051",
              imageURL: "http://placehold.it/160x160",
              table:[
                  {
                      name: "GAWR",
                      value: 4000
                  },
                  {
                      name: "Center Drop",
                      value: "12.4 inches"
                  },
                  {
                      name: "width",
                      value: "5.5 cm"
                  }
              ]
          }
         ];
    }
}