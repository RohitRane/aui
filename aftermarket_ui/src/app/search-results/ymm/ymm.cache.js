
export class ymmCacheFactory {

  /*@ngInject*/
    constructor($cacheFactory) {
        this.$cacheFactory = $cacheFactory;

    }
     getYMMCache() {
        return this.$cacheFactory('cached');
    }

}









