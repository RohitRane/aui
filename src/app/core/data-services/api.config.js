//var apiBaseUrl = 'http://54.215.153.111:8080/search-web/api';
var apiBaseUrl = 'http://52.8.125.250:8080/search-web/api';



//company ID
var cId = 1;

export let apiConfig = {
    /*'PART_SEARCH': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/result?q=' + param + '&cid=' + cId + '&from=0&size=10';
        },
        'method': 'GET',
        'data': {}
    },*/
    'AUTO_SEARCH': {
        'url': '',
        'setUrl': function (param, category) {
            this.url = apiBaseUrl + '/suggest?q=' + param + '&cat1=' +category;
        },
        'method': 'GET',
        'data': {}
    },
    'CAT_SEARCH': {
        'url': '',
        'setUrl': function (param, scope, from, size, productCategory, filterObjectArray) {
           this.url = apiBaseUrl + '/result';
           if(filterObjectArray){ console.log("AAAAAAAAAAAAAAAAAA", filterObjectArray);
                this.data = {
                    "q": param,
                    "cid": "1",
                    "from":from,
                    "size":size,
                    "cat1":scope,
                    "cat3":productCategory,
                    "filter":filterObjectArray
                 }
           }else if(productCategory){
               this.data = {
                    "q": param,
                    "cid": "1",
                    "from":from,
                    "size":size,
                    "cat1":scope,
                    "cat3":productCategory
                 }
           }else{ console.log("normal");
               this.data = {
                    "q": param,
                    "cid": "1",
                    "from":from,
                    "size":size,
                    "cat1":scope
                 }
           }
        },
        'method': 'POST',
        'data': {}
    },
    'PART': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/part?q=' + param;
        },
        'method': 'GET',
        'data': {}
    }
}
