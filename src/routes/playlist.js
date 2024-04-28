const express = require('express');
const router = express.Router();
const playlistController = require('../controllers/playlistController')
const playlistMusicController = require("../controllers/playlistMusicController")

router.route('/playlist')
    .post(playlistController.addPlaylist);
router.route('/playlists')  .get(playlistController.getAllPlaylist) ;
router.route('/playlists/playlistItem/:id')  .get(playlistController.getPlaylistItemMusic) ;
router.route('/playlist/:id')
    .get(playlistController.getPlaylist)
    .put(playlistController.updatePlaylist)
    .delete(playlistController.detetePlaylist);
router.route('/playlistItems')
    .post(playlistMusicController.addPlaylistMusic);
router.route('/playlistItems')  .get(playlistMusicController.getAllPlaylistMusic) ;
router.route('/playlistItems/:id')
    .get(playlistMusicController.getPlaylistMusic)
    .put(playlistMusicController.updatePlaylistMusic)
    .delete(playlistMusicController.detetePlaylistMusic);
module.exports = router;
