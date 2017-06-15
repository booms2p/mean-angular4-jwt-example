var config = require('config.json');
var express = require('express');
var router = express.Router();
var itemsService = require('services/items.service');

// routes
// router.post('/authenticate', authenticate);
router.post('/createNewItem', createNewItem);
router.get('/', getAll);
router.get('/all', getAllItems);
router.get('/current', getCurrent);
router.put('/:_id', updateItem);
router.delete('/:_id', _delete);

module.exports = router;

function getAllItems(req, res) {
    itemsService.getAllItems()
        .then(function(users) {
            res.send(users);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function createNewItem(req, res) {
    itemsService.createNewItem(req.body)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getAll(req, res) {
    itemsService.getAll()
        .then(function(users) {
            res.send(users);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function getCurrent(req, res) {
    itemsService.getById(req.user.sub)
        .then(function(result) {
            if (result) {
                res.send(result);
            } else {
                res.sendStatus(404);
            }
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function updateItem(req, res) {
    itemsService.updateItem(req.params._id, req.body)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}

function _delete(req, res) {
    itemsService.deleteItem(req.params._id)
        .then(function(result) {
            res.send(result);
        })
        .catch(function(err) {
            res.status(400).send(err);
        });
}