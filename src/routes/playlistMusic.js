const express = require('express');
const router = express.Router();

const playlistMusicController = require("../controllers/playlistMusicController")

router.route('/playlistItems')
    .post(playlistMusicController.addPlaylistMusic);
router.route('/playlistItems')
    .get(playlistMusicController.getAllPlaylistMusic) ;
router.route('/playlistItems/:id')
    .get(playlistMusicController.getPlaylistMusic)
    .delete(playlistMusicController.detetePlaylistMusic);
router.route('/playlistDelete/:id').delete(playlistMusicController.deleteAllPlaylistMusic)
router.route('/api/playlists/:playlistId/music/:musicId').delete(playlistMusicController.deleteMucicsInPlaylist)
// router.route('/playlistDeletes/:musicId&:idplaylistId').delete(playlistMusicController.deleteMucicsInPlaylist)
router.route('/playlistItems/:playlistId/:musicId').put(playlistMusicController.updatePlaylistMusic)
module.exports = router