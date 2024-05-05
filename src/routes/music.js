// const express = require('express');
// const router = express.Router();
// const musicController = require('../controllers/musicController')

// router.route('/music')
//     .post(musicController.addMusic);

// router.route('/musics')
//     .get(musicController.getAllMusics);


router.route('/music/:id')
    .get(musicController.getMusic)
    .put(musicController.updateMusic)
    .delete(musicController.deleteMuisc);


// module.exports = router;
