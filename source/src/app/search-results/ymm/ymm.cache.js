
export class ymmCacheFactory {

  /*@ngInject*/
    constructor($cacheFactory) {
        this.$cacheFactory = $cacheFactory;

    }
     getYMMCache() {
        console.log('Getting a new Thing...');
        return this.$cacheFactory('cached');
    }

}









