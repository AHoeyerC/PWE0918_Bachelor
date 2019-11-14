const express = require('express');
const router = express.Router();

const DataAggregateController = require('../controllers/dataAggregate');

router.get('/', DataAggregateController.dataAggregate_get);

router.post('/', DataAggregateController.dataAggregate_create);

router.get('/:dataId', DataAggregateController.dataAggregate_get_one);

router.patch('/:dataId', DataAggregateController.dataAggregate_update);

module.exports = router;