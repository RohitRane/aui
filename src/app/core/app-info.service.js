export class AppInfoService {

    constructor() {
    }

    get appInfo() {
        return this._info;
    }

    set appInfo(info) {
        this._info = info;
    }

}