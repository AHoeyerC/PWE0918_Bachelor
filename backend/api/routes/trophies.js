const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const TrophyController = require('../controllers/trophies');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/trophies/');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/svg+xml' || file.mimetype === 'application/json') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage, 
    limits: {
        fileSize: 1024 * 1024 * 5 //5MB
    },
    fileFilter: fileFilter
});

router.get('/', TrophyController.trophy_get_trophies);

router.post('/', upload.array('trophyVisuals', 3), TrophyController.trophy_create_trophy);

router.get('/:trophyId', TrophyController.trophy_get_trophy);

router.patch('/:trophyId', TrophyController.trophy_update_trophy);

router.delete('/:trophyId', TrophyController.trophy_delete_trophy);

module.exports = router;