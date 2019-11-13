const express = require('express');
const router = express.Router();

const AreaController = require('../controllers/areas');
const checkAuth = require('../middleware/check-auth');

router.get('/', AreaController.areas_get_all);

router.get('/:areaId', AreaController.areas_get_area);

router.post('/', AreaController.areas_create_area);

router.patch('/:areaId', AreaController.areas_update_area);

router.delete('/:areaId', AreaController.areas_delete_area);

module.exports = router;