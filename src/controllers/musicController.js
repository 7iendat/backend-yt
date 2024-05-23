const { where } = require("sequelize");
const db = require("../models");

const addMusic = async (req, res) => {
  const { videoId, channelId, title, description, thumbnails, channelTitle } = req.body;
  try {
    const musicExist = await db.Music.findOne({
      where: {
        videoId: videoId,
      },
    });
    if (musicExist) {
      return res.json(musicExist);
    } else {
      const music = await db.Music.create({
        videoId: videoId,
        channelId: channelId,
        title: title,
        description:description,
        thumbnails: thumbnails,
        channelTitle: channelTitle,
      });
      return res.json(music);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error addMusic" });
  }
};

const getAllMusics = async (req, res) => {
  try {
    const musics = await db.Music.findAll({
      where: {
        isDelete: 0,
      },
    });
    return res.json(musics);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error getAllMusics" });
  }
};

const getMusic = async (req, res) => {
  const songId = req.params.id;
  try {
    const music = await db.Music.findOne({
      where: {
        id: songId,
        isDelete: 0,
      },
    });
    if (!music) {
      return res
        .status(400)
        .json({ error: `Muisc ID ${req.params.id} not found` });
    }
    return res.json(music);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "getMusic" });
  }
};

const updateMusic = async (req, res) => {
  const songId = req.params.id;
  const isDelete = req.body.isDelete;
  try {
    const music = await db.Music.findOne({
      where: { id: songId },
    });
    if (!music) {
      return res
        .status(400)
        .json({ error: `Muisc ID ${req.params.id} not found` });
    }
    await db.Music.update(
      {
        isDelete: isDelete,
      },
      {
        where: {
          id: songId,
        },
      }
    );

    const musicUpdated = await db.Music.findOne({
      where: { id: songId },
    });

    return res.json(musicUpdated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error updateMusic" });
  }
};

const deleteMuisc = async (req, res) => {
  const songId = req.params.id;
  try {
    const music = await db.Music.findOne({
      where: { id: songId },
    });
    if (!music) {
      return res
        .status(400)
        .json({ error: `Muisc ID ${req.params.id} not found` });
    }
    await db.Music.destroy({
      where: {
        id: songId,
      },
    });
    return res.json({ message: "Music deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error deleteMusic" });
  }
};

module.exports = {
  addMusic,
  getAllMusics,
  getMusic,
  updateMusic,
  deleteMuisc,
};
