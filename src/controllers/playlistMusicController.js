const { where } = require("sequelize");
const db = require("../models");

const addPlaylistMusic = async (req, res) => {
    const { playlistId,musicId } = req.body;
    try{
        const playlistMusic = await db.Playlist_Music.create({
            playlistId: playlistId,
            musicId: musicId
        });
        return res.json(playlistMusic);
    }catch (err){
        console.log(err);
        return res.status(500).json({error: 'Error addNewPlaylistMusic'});
    }
}

const getAllPlaylistMusic = async (req, res) => {
    try{
        const playlistMusic = await db.Playlist_Music.findAll();
        return res.json(playlistMusic);
    }catch (err){
        console.log(err);
        return res.status(500).json({error: 'Error getAllPlaylistMusic'});
    }
}

const getPlaylistMusic = async (req, res) => {
    const reqId = req.params.id;
    try{
        const playlistMusic = await db.Playlist_Music.findOne({
            where: {
                id: reqId
            }
        });
        if(!playlistMusic){
            return res.status(400).json({error: `Playlist ID ${req.params.id} not found` });
        }
        return res.json(playlistMusic);
    }catch (err){
        console.log(err);
        return res.status(500).json({error: 'getPlaylistMusic'});
    }
}

const updatePlaylistMusic = async (req, res) => {
    const playlistMusicId = req.params.id;
    const { playlistId,musicId, isDelete } = req.body;
    try{
        const playlistMusic = await db.Playlist_Music.findOne({
            where: { id: playlistMusicId }
        });
        if(!playlistMusic){
            return res.status(400).json({error: `Playlist ID ${req.params.id} not found` });
        }
        await db.Playlist_Music.update({
            playlistId: playlistId,
            musicId: musicId,
            isDelete: isDelete
        },{
            where: {
                id: playlistMusicId
            },
        },);

        const playlistUpdated = await db.Playlist_Music.findOne({
            where: { id: playlistMusicId }
        });

        return res.json(playlistUpdated);
    }catch (err){
        console.log(err);
        return res.status(500).json({ error: 'Error updatePlaylistMusic' });
    }
}

const detetePlaylistMusic = async (req, res) => {
    const playlistMusicId = req.params.id;
    try{
        const playlistMusic = await db.Playlist_Music.findOne({
            where: { id: playlistMusicId }
        });
        if(!playlistMusic){
            return res.status(400).json({error: `Playlist ID ${req.params.id} not found` });
        }
        await db.Playlist_Music.destroy({
            where: {
                id: playlistMusicId
            },
        });
        return res.json({ message: 'Playlist Music deleted!'});
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error detetePlaylistMusic' });
    }
}

module.exports = {
    addPlaylistMusic,
    getPlaylistMusic,
    updatePlaylistMusic,
    detetePlaylistMusic,
    getAllPlaylistMusic
};
