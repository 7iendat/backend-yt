const { where, Op } = require("sequelize");
const db = require("../models");
const { raw } = require("body-parser");

const addPlaylist = async (req, res) => {
  const { title, userId, isPublic } = req.body;
  try {
    const playlist = await db.Playlist.create({
      title: title,
      userId: userId,
      isPublic: isPublic,
    });
    return res.json(playlist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error addNewPlaylist" });
  }
};

const getAllPlaylist = async (req, res) => {
  try {
    const playlist = await db.Playlist.findAll(
      {
        where: {
          isDelete: 0
        }
      }
    );
    return res.json(playlist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error getAllPlaylists" });
  }
};

const getPlaylist = async (req, res) => {
  const reqId = req.params.id;
  try {
    const playlist = await db.Playlist.findOne({
      where: {
        id: reqId,
        isDelete: 0,
      },
    });
    if (!playlist) {
      return res
        .status(400)
        .json({ error: `Playlist ID ${req.params.id} not found` });
    }
    return res.json(playlist);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "getPlaylist" });
  }
};

const getPlaylistByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { count, rows } = await db.Playlist.findAndCountAll({
      where: {
        userId: userId,
        isDelete: 0,
        title: {
          [Op.ne]: "Nhạc yêu thích",
        }
      },
    });
    if (count <= 0) {
      return res
        .status(400)
        .json({
          error: `No playlists for userId ${req.params.id} were found.`,
        });
    }
    return res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error getPlaylistByUserId" });
  }
};

const updatePlaylist = async (req, res) => {
  const playlistId = req.params.id;
  const { title, isPublic, isDelete } = req.body;
  try {
    const music = await db.Playlist.findOne({
      where: { id: playlistId, isDelete: 0 },
    });
    if (!music) {
      return res
        .status(400)
        .json({ error: `Playlist ID ${req.params.id} not found` });
    }
    await db.Playlist.update(
      {
        title: title,
        isPublic: isPublic,
        isDelete: isDelete,
      },
      {
        where: {
          id: playlistId,
        },
      }
    );

    const playlistUpdated = await db.Playlist.findOne({
      where: { id: playlistId },
    });

    return res.json(playlistUpdated);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error updatePlaylist" });
  }
};

const deletePlaylist = async (req, res) => {
  const playlistId = req.params.id;
  try {
    const playlist = await db.Playlist.findOne({
      where: { id: playlistId },
    });
    if (!playlist) {
      return res
        .status(400)
        .json({ error: `Playlist ID ${req.params.id} not found` });
    }
    await db.Playlist.update(
      {
    
        isDelete: 1,
      },
      {
        where: {
          id: playlistId,
        },
      }
    );
    return res.json({ message: "Playlist deleted!" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error detetePlaylist" });
  }
};

const getPlaylistItemMusic = async (req, res) => {
  const playlistId = req.params.id;
  try {
    const playlist = await db.Playlist.findOne({
      where: { id: playlistId },
    });
    if (!playlist) {
      return res
        .status(400)
        .json({ error: `Playlist ID ${req.params.id} not found` });
    } else {
      try {
        const itemPlaylist = await db.Playlist_Music.findAll({
          where: { playlistId: playlistId },
          include: [
            {
              model: db.Music,
              as: "music",
            },
          ],
          raw: true,
          nest: true,
        });
        return res.json(itemPlaylist);
      } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Error get Item Musics" });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "getPlaylist By ID" });
  }
};

const getLikedPlaylist = async (req, res) => {
  const userId = req.params.userId;
  try {
    const { count, rows } = await db.Playlist.findAndCountAll({
      where: {
        userId: userId,
        isDelete: 0,
        title: {
          [Op.eq]: "Nhạc yêu thích",
        }
      },
    });
    if (count <= 0) {
      return res
        .status(400)
        .json({
          error: `No playlists for userId ${req.params.id} were found.`,
        });
    }
    return res.json(rows);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Error getLikedPlaylist" });
  }
};

module.exports = {
  addPlaylist,
  getPlaylist,
  updatePlaylist,
  deletePlaylist,
  getAllPlaylist,
  getPlaylistItemMusic,
  getPlaylistByUserId,
  getLikedPlaylist,
};
