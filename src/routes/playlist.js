const express = require("express");
const router = express.Router();
const playlistController = require("../controllers/playlistController");

router.route("/playlist").post(playlistController.addPlaylist);

router.route("/playlists").get(playlistController.getAllPlaylist);

router
  .route("/playlist/:id")
  .get(playlistController.getPlaylist)
  .put(playlistController.updatePlaylist)
  .delete(playlistController.deletePlaylist);

router.route("/playlists/:userId").get(playlistController.getPlaylistByUserId);
router.route("/playlists/liked/:userId").get(playlistController.getLikedPlaylist);

router
  .route("/playlists/playlistItem/:id")
  .get(playlistController.getPlaylistItemMusic);

router.route("/playlists/playlistItem/:playlistId/:videoId").get(playlistController.getSongFromPlaylist);

module.exports = router;
