export class OrderListService {

    constructor() {
        this._orderList = [];
    }

    get orderList() {
        return this._orderList;
    }

    set orderList(newList) {
            this._orderList = newList;
    }

}