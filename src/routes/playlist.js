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

router
  .route("/playlists/playlistItem/:id")
  .get(playlistController.getPlaylistItemMusic);

module.exports = router;
module.exports = router;
