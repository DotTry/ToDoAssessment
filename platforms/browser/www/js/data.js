itemService = (function () {

    var findById = function (id) {
            var deferred = $.Deferred();
            var obj = null;
            var l = items.length;
            for (var i = 0; i < l; i++) {
                if (items[i].id == id) {
                    obj = items[i];
                    break;
                }
            }
            deferred.resolve(obj);
            return deferred.promise();
        },
        editById = function (id, title) {
            var deferred = $.Deferred();
            var obj = null;
            var l = items.length;
            for (var i = 0; i < l; i++) {
                if (items[i].id == id) {
                    items[i].title = title;
                    obj = items[i];
                    break;
                }
            }
            localStorage.setItem('items', JSON.stringify(items));
            deferred.resolve(obj);
            return deferred.promise();
        },
        removeById = function (id, title) {
            var deferred = $.Deferred();
            var obj = null;
            var l = items.length;
            for (var i = 0; i < l; i++) {
                if (items[i].id == id) {
                    items.splice(i, 1);
                    break;
                }
            }
            localStorage.setItem('items', JSON.stringify(items));
            deferred.resolve(obj);
            return deferred.promise();
        },

        findByName = function (searchKey) {
          //items.splice(0,1);
            var deferred = $.Deferred();
            var results = items.filter(function (element) {
                var fullName = element.title;
                return fullName.toLowerCase().indexOf(searchKey.toLowerCase()) > -1;
            });
            deferred.resolve(results);
            return deferred.promise();
        },

        findByManager = function (managerId) {
            var deferred = $.Deferred();
            var results = items.filter(function (element) {
                return managerId === element.managerId;
            });
            deferred.resolve(results);
            return deferred.promise();
        },
        addItem = function(title){
          var obj = {"id":items[items.length-1].id+1, "title": title}
          items.push(obj);
          localStorage.setItem('items', JSON.stringify(items));
          console.log(JSON.stringify(items));
        },

        items = (localStorage.getItem('items')===null) ?
        [   {"id": 1, "title": "President and CEO"},
            {"id": 2, "title": "VP of Marketing"},
            {"id": 3, "title": "CFO"},
            {"id": 4, "title": "VP of Engineering"}] : JSON.parse(localStorage.getItem('items')),
        /*items = [
            {"id": 1, "title": "President and CEO"},
            {"id": 2, "title": "VP of Marketing"},
            {"id": 3, "title": "CFO"},
            {"id": 4, "title": "VP of Engineering"}
          ],*/

        continueAddText = localStorage.getItem('continue');
        lastPageRouter = (localStorage.getItem('lastPage')===null) ? " " : localStorage.getItem('lastPage');

    // The public API
    return {
        findById: findById,
        editById: editById,
        findByName: findByName,
        findByManager: findByManager,
        lastPageRouter: lastPageRouter,
        items: items,
        continueAddText: continueAddText,
        addItem: addItem,
        removeById: removeById
    };

}());
