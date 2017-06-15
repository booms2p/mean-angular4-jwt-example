var config = require('config.json');
var _ = require('lodash');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');
var Q = require('q');
var mongo = require('mongoskin');
var db = mongo.db(config.connectionString, { native_parser: true });
db.bind('items');

var mongoose = require('mongoose'),
    Items = mongoose.model('items');

var service = {};

// service.authenticate = authenticate;
// service.getAll = getAll;
service.getAllItems = getAllItems;
service.getById = getById;
service.createNewItem = createNewItem;
service.updateItem = updateItem;
service.deleteItem = _delete;

module.exports = service;

function getAllItems() {
    var deferred = Q.defer();

    Items.find({}, function(err, items) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        // return users (without hashed passwords)
        items = _.map(items, function(item) {
            return _.omit(item, 'hash');
        });

        deferred.resolve(items);
    });

    return deferred.promise;
}

function createNewItem(item) {
    var deferred = Q.defer();

    // validation
    Items.findOne({ itemNo: item.itemNo },
        function(err, data) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            if (data) {
                // username already exists
                deferred.reject('Item No "' + data.itemNo + '" is already taken');
            } else {
                createItem();
            }
        });

    function createItem() {

        var newItem = new Items(item);

        newItem.save(function(err, result) {
            if (err) deferred.reject(err.name + ': ' + err.message);

            deferred.resolve({ status: "succesful", message: 'ItemNo: ' + item.itemNo + ', Title: ' + item.title + ' has been created' });
        });
    }

    return deferred.promise;
}

function updateItem(_id, itemParam) {
    var deferred = Q.defer();

    Items.findOneAndUpdate({ _id: _id }, itemParam, { new: true }, function(err, result) {
        if (err) {
            deferred.reject(err.name + ': ' + err.message);
        } else if (result == null) {
            deferred.resolve({ status: 'unsuccesful', message: 'Can not item from id ' + _id + ' for update.' })
        } else {
            deferred.resolve({ status: 'succesful', message: 'Item id:' + _id + ', title:' + itemParam.title + ' has been updated' });
        }
    });

    return deferred.promise;
}

function getById(_id) {
    var deferred = Q.defer();

    db.users.findById(_id, function(err, user) {
        if (err) deferred.reject(err.name + ': ' + err.message);

        if (user) {
            // return user (without hashed password)
            deferred.resolve(_.omit(user, 'hash'));
        } else {
            // user not found
            deferred.resolve();
        }
    });

    return deferred.promise;
}

function _delete(_id) {
    var deferred = Q.defer();

    Items.findOneAndRemove({ _id: mongo.helper.toObjectID(_id) },
        function(err, result) {
            if (err) deferred.reject(err.name + ': ' + err.message);
            else if (!result) deferred.reject({ status: 'unsuccesful', message: 'Can not find id  ' + _id + ' for delete.' })
            else deferred.resolve({ status: 'succesful', message: 'Item id ' + _id + ' successfully deleted' });
        });

    return deferred.promise;
}