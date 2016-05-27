export class AppInfoService {

    constructor($interval) {
        'ngInject';
    }

    get appInfo() {
        return this._info;
    }

    set appInfo(info) {
        this._info = info;
    }

    getCat1(id) {
        let retObj = { 'id': null };
        angular.forEach(this._info.cats, (cat) => {
            console.log("cat in loop:", cat);
            if (cat.id == id) {
                console.log("Bingo !!");
                retObj = cat;
            }
        });
        return retObj;
    }

    getCat2(id1, id2) {
        let retObj = { 'id': null };
        let cat1 = this.getCat1(id1);
        angular.forEach(cat1.children, (cat) => {
            console.log("cat in loop:", cat);
            if (cat.id == id2) {
                console.log("Bingo !!");
                retObj = cat;
            }
        });
        return retObj;
    }

    getCat3(id1, id2, id3) {
        let retObj = { 'id': null };
        let cat1 = this.getCat1(id1);
        let cat2 = this.getCat2(id1, id2);
        angular.forEach(cat2.children, (cat) => {
            console.log("cat in loop:", cat);
            if (cat.id == id3) {
                console.log("Bingo !!");
                retObj = cat;
            }
        });
        return retObj;
    }

}