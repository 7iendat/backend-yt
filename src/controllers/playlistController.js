const { where } = require("sequelize");
const db = require("../models");

const addPlaylist = async (req, res) => {
    const { title, userId, isPublic } = req.body;
    try{
        const playlist = await db.Playlist.create({
            title: title,
            userId: userId,
            isPublic: isPublic
        });
        return res.json(playlist);
    }catch (err){
        console.log(err);
        return res.status(500).json({error: 'Error addNewPlaylist'});
    }
}

const getPlaylist = async (req, res) => {
    const reqId = req.params.id;
    try{
        const playlist = await db.Playlist.findOne({
            where: {
                id: reqId
            }
        });
        if(!playlist){
            return res.status(400).json({error: `Playlist ID ${req.params.id} not found` });
        }
        return res.json(playlist);
    }catch (err){
        console.log(err);
        return res.status(500).json({error: 'getPlaylist'});
    }
}

const updatePlaylist = async (req, res) => {
    const playlistId = req.params.id;
    const { title, isPublic, isDelete } = req.body;
    try{
        const music = await db.Playlist.findOne({
            where: { id: playlistId }
        });
        if(!music){
            return res.status(400).json({error: `Playlist ID ${req.params.id} not found` });
        }
        await db.Playlist.update({
            title: title,
            isPublic: isPublic,
            isDelete: isDelete
        },{
            where: {
                id: playlistId
            },
        },);

        const playlistUpdated = await db.Playlist.findOne({
            where: { id: playlistId }
        });

        return res.json(playlistUpdated);
    }catch (err){
        console.log(err);
        return res.status(500).json({ error: 'Error updatePlaylist' });
    }
}

const detetePlaylist = async (req, res) => {
    const playlistId = req.params.id;
    try{
        const playlist = await db.Playlist.findOne({
            where: { id: playlistId }
        });
        if(!playlist){
            return res.status(400).json({error: `Playlist ID ${req.params.id} not found` });
        }
        await db.Playlist.destroy({
            where: {
                id: playlistId
            },
        });
        return res.json({ message: 'Playlist deleted!'});
    }catch(err){
        console.log(err);
        return res.status(500).json({ error: 'Error detetePlaylist' });
    }
}

module.exports = {
    addPlaylist,
    getPlaylist,
    updatePlaylist,
    detetePlaylist
};
