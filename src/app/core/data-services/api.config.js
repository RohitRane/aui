
var devServer = "http://52.8.125.250:8080",
    qaServer =  "http://54.183.226.9",
    activeAPIBase = devServer,
    //activeAPIBase = qaServer,
    apiBaseUrl = activeAPIBase+'/search-service/api';



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
            this.url = apiBaseUrl + '/suggest';
            this.data = {
              "q": param,
              "cats":[category]
            }
        },
        'method': 'POST',
        'data': {}
    },
    'CAT_SEARCH': {
        'url': '',
        'setUrl': function (param, scope, from, size, productCategory, filterObjectArray) {
           this.url = apiBaseUrl + '/result';
                this.data = {
                    "q": param,
                    "cid": "1",
                    "from":from,
                    "size":size,
                    "cats":[scope, null ,productCategory],
                    "filter":filterObjectArray
           }
        },
        'method': 'POST',
        'data': {}
    },
    'PART': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/part/' + param;
        },
        'method': 'GET',
        'data': {}
    },
    'APPINFO':{
        'url': apiBaseUrl + '/appInfo',
        'method':'GET'
    }
}
