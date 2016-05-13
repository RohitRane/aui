
var devServer = "http://52.8.125.250:8080",
    qaServer =  "http://54.183.226.9:8080",

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

    'YMM_SEARCH': {
        'url': '',
        'setUrl': function (param, category) {
            this.url = apiBaseUrl + '/ymmList';
            this.data = {
              "q": param,
              "cats":[category]
            }
        },
        'method': 'POST',
        'data': {}
    },


     'YMM_SEARCH_YEAR': {
        'url': '',
        'setUrl': function (param, category,year) {
            this.url = apiBaseUrl + '/ymmList';
            this.data = {
              "q": param,
              "cats":[category],
              "year":year
            }
        },
        'method': 'POST',
        'data': {}
    },


     'YMM_SEARCH_MAKE': {
        'url': '',
        'setUrl': function (param, category,year,make) {
            this.url = apiBaseUrl + '/ymmList';
            this.data = {
              "q": param,
              "cats":[category],
              "year":year,
              "make":make

            }
        },
        'method': 'POST',
        'data': {}
    },

    'YMM_SEARCH_MODEL': {
        'url': '',
        'setUrl': function (param, category,year,make,model) {
            this.url = apiBaseUrl + '/ymmList';
            this.data = {
              "q": param,
              "cats":[category],
              "year":year,
              "make":make,
              "model":model


            }
        },
        'method': 'POST',
        'data': {}
    },


    'YMM_FULL_SEARCH': {
        'url': '',
        'setUrl': function (param, from,size,category,year,make,model) {
            this.url = apiBaseUrl + '/ymmList';
            this.data = {
              "q": param,
              "from":from,
              "size":size,
              "cats":[category],
              "year":year,
              "make":make,
              "model":model


            }
        },
        'method': 'POST',
        'data': {}
    },



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
           scope == "All" && productCategory ?  ( scope = productCategory, productCategory = null) : '';
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
    'PART_BY_PNUM': {
        'url': '',
        'setUrl': function (param) {
            console.log("PARAM :::::",param);
            this.url = apiBaseUrl + '/part/partnumber/' + param;
        },
        'method': 'GET',
        'data': {}
    },
    'APPINFO':{
        'url': apiBaseUrl + '/appInfo',
        'method':'GET'
    }
}
