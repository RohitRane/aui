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

    getCat(id) {
        console.log("Ctid", id);
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

}