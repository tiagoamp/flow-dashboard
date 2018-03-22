class Item {

    constructor() {
        this._statusHistory = [];  // stack
    }


    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }

    set status(status) {
        this._status = status;
    }
    get status() {
        return this._status;
    }

    set description(description) {
        this._description = description;
    }
    get description() {
        return this._description;
    }

    set points(points) {
        this._points = points;        
    }
    get points() {
        return this._points;
    }

    set percent(percent) {
        this._percent = percent;
    }
    get percent() {
        return this._percent;
    }

    get statusHistory() {
        return this._statusHistory;
    }


    addStatusHistory(statusHistory) {
        this._statusHistory.push(statusHistory);        
    }

}

module.exports = Item;