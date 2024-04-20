// const express = require('express')
// const app = express()
// app.use(express.json())
// const { sequelize, Music} = require('./src/models')

// app.post('/music', async (req, res) => {
//     const { videoId, channelId, title, thumbnails, channelTitle, isDelete } = req.body

//     try{
//         const music = await ({ videoId, channelId, title, thumbnails, channelTitle, isDelete })
//         return res.json(music)
//     }catch (err){
//         console.log(err)
//         return res.status(500).json(err)
//     }

// })