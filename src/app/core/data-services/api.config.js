//var apiBaseUrl = 'http://54.215.153.111:8080/search-web/api';
var apiBaseUrl = 'http://52.8.125.250:8080/search-web/api';



//company ID
var cId = 1;

export let apiConfig = {
    'PART_SEARCH': {
        //'url': '/assets/data/sample-search.json',
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/result?q=' + param + '&cid='+cId+'&from=0&size=10';
        },
        'method': 'GET',
        'data': {}
    },
    'AUTO_SEARCH': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/suggest?q=' + param + '&cid='+cId;
        },
        'method': 'GET',
        'data': {}
    }
}
