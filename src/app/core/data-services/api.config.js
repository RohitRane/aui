var apiBaseUrl = 'http://54.215.153.111:8080';
//company ID
var cId = 1;

export let apiConfig = {
    'PART_SEARCH': {
        'url': apiBaseUrl + '/assets/data/sample-search.json',
        'method': 'GET',
        'data': {}
    },
    'AUTO_SEARCH': {
        'url': '',
        'setUrl': function (param) {
            this.url = apiBaseUrl + '/search-web/api/suggest?q=' + param + '&cid='+cId;
        },
        'method': 'GET',
        'data': {}
    }
}
