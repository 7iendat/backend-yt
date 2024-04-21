const db = require("../models")


app.post('/music', async (req, res) => {
    const { videoId, channelId, title, thumbnails, channelTitle, isDelete } = req.body

    try{
        const music = await db.Music.create({ videoId, channelId, title, thumbnails, channelTitle, isDelete })
        return res.json(music)
    }catch (err){
        console.log(err)
        return res.status(500).json(err)
    }

})