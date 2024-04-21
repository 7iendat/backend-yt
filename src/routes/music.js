const express = require('express');
const router = express.Router();
const musicController = require('../controllers/musicController')

router.route('/music').post(musicController.addNewMusic);
router.route('/musics/').get(musicController.getAllMusics);
router.route('/music/:id').get(musicController.getMusic);
router.route('/music/:id').put(musicController.updateMusic);
router.route('/music/:id').delete(musicController.deteteMuisc);

module.exports = router;
