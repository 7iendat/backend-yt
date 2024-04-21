const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController')

router.route('/playlist').post(playlistController.addPlaylist);
router.route('/playlist/:id').get(playlistController.getPlaylist);
router.route('/playlist/:id').put(playlistController.updatePlaylist);
router.route('/playlist/:id').delete(playlistController.detetePlaylist);

module.exports = router;
