const express = require('express').Router;
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' })

// chamada dos controllers
const getVideosFeed = require('../src/controllers/controllerFeed/getVideos')
const createUser = require('../src/controllers/controllerUsers/controllerUsers');
const verifyUser = require('../src/controllers/controllerUsers/loginUser');
const controllerUploads = require('../src/controllers/controllerUpload/controllerUploads');
const uploadBD = require('../src/controllers/controllerUpload/uploadBD');
const Connection = require('../src/database/connection/connection');
const verifyChannel = require('../src/controllers/verifyChannel/verifyChannel');
const verifyDados = require('../src/controllers/verifyChannel/verifyDados');
const createChannel = require('../src/controllers/createChannel/createChannel')
const uploadChannelBD = require('../src/controllers/createChannel/uploadChannelBD')
const getChannel = require('../src/controllers/dadosChannel/getChannel')
const getVideosChannel = require('../src/controllers/dadosChannel/getVideos')
const updateChannel = require('../src/controllers/updateChannel/updateChannel')
const updateChannelbd = require('../src/controllers/updateChannel/updateChannelbd')
const getVideoWachScreen = require('../src/controllers/controllerScreenWach/getVideoWachScreen')
const getChannelWachScreen = require('../src/controllers/controllerScreenWach/getChannelWachScreen')

const router = express();

// rotas iniciais do user sem estar logado
//home
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/home', 'index.html'))
   
})

//buscando os videos para o feed do home

router.get("/feed", (req, res) => {
    getVideosFeed('SELECT * FROM videos', res)
})

//tela para assistir os videos
router.get("/wach", (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/wach', 'index.html'))
})

//buscando o video e os dadods dele
router.get("/getVideoWachScreen", (req, res) => {
    const idvideo = req.query.idvideo
    getVideoWachScreen(`SELECT * FROM videos WHERE id='${idvideo}'`, res)
})

router.get("/getChannelWachScreen", (req, res) => {
    const idchannel = req.query.idchannel
    getChannelWachScreen(`SELECT * FROM channels WHERE id='${idchannel}'`, res)
})

//canais de outro users

router.get('/channels/:nameChannel?/:iduser?', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/channels', 'index.html'))
})

router.get('/:iduser?/channels', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/viewsposLogin/channels', 'index.html'))
})


//cadastro
router.get("/cadastro", (req, res) => {
    res.sendFile(path.join(__dirname, '../src/views/cadastro', 'index.html'))
})

router.post('/login', (req, res) => {
    const {email} = req.body;
    const {password} = req.body;
    
    validarEmail = ` WHERE email='${email}' AND password='${password}'`

    verifyUser('SELECT id, email, password FROM users' + validarEmail, res)
})

router.post('/cadastro/add', (req, res) =>{

    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    createUser(`INSERT INTO users(name, email, password) VALUES('${name}','${email}', '${password}')`, res);
})

// rotas pós o user ter feito login

// tele home user
router.get("/homeuserid/:id?/", (req, res) => {
    res.sendFile(path.join(__dirname, '../src/viewsposLogin/home', 'index.html'))
   
})

//tela de upload de video

router.get('/uploads/:id?/', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/viewsposLogin/upload', 'index.html'))
})

router.post('/uploads/:idUser?/', multer(controllerUploads).fields([{
    name: 'thumbnail',
    maxCount: 1 
    },
    {
    name: 'video',
    maxCount: 1 
}]), (req, res) => {
    const idchannel = req.body.idchannel
    const title = req.body.title;
    const description = req.body.description;
    const video = req.files.video[0].filename;
    const thumbnail = req.files.thumbnail[0].filename;

    const urlVideo = '/videos/' + video;
    const urlThumbnail = '/thumbnails/' + thumbnail;

    uploadBD(`INSERT INTO videos(idchannel, title, description, urlvideo, urlcapa) VALUES('${idchannel}','${title}','${description}', '${urlVideo}', '${urlThumbnail}')`, (req, res));
    res.redirect('/homeuserid/'+req.body.idUser)
  })

// verificar se canal do usuario existe
router.get('/verifyChannel/:idUser?',(req,res) => {
    verifyChannel('SELECT * FROM channels INNER JOIN users ON channels.iduser = users.id', res, req.params.idUser)
})

router.get('/verifyChannel/dados/:idUser?/',(req,res) => {
    verifyDados('SELECT * FROM channels INNER JOIN users ON channels.iduser = users.id', res, req.params.idUser)
})

//criar canal do usuario

router.get('/createChannel/:id?', (req, res) =>{
    res.sendFile(path.join(__dirname, '../src/viewsposLogin/createChannel', 'index.html'))
})

//criar canal
router.post('/createChannel/:id?',multer(createChannel).fields([{
    name: 'banner',
    maxCount: 1
    },
    {
        name: 'imagePerfil',
        maxCount: 1
    }
]), (req, res) =>{
    const name = req.body.name
    const description = req.body.description
    const idUser = req.body.idUser
    const urlBanner = req.body.urlBanner
    const urlImagePerfil = req.body.urlImagePerfil

    console.log(req.body)
    uploadChannelBD(`INSERT INTO channels(iduser, name, description, urlimageperfil, urlbanner) VALUES('${idUser}', '${name}', '${description}', '${urlImagePerfil}', '${urlBanner}')`, res, idUser)
})

//canal canal usuario
router.get('/channel/:id?', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/viewsposLogin/channel', 'index.html'))
    
})
//buscando dados do canal do user

router.get('/getchannel/:iduser?', (req, res) =>{
    const idUser = req.params.iduser
    getChannel(`SELECT * FROM channels WHERE iduser='${idUser}'`, res)
})
//buscando canal do video na tela wach
router.get('/getChannelWachScreen', (req, res) =>{
    const idchannel = req.query.idchannel
    getChannel(`SELECT * FROM channels WHERE id='${idchannel}'`, res)
})
//buscando videos do canal
router.get('/getVideos/channel/:idchannel?', (req, res) =>{
    const idChannel = req.params.idchannel
    getVideosChannel(`SELECT * FROM videos INNER JOIN channels ON videos.idchannel = channels.id`, res, idChannel)
})

//edição de canal
router.get('/editChannel/:iduser/:idchannel?', (req, res) => {
    res.sendFile(path.join(__dirname, '../src/viewsposLogin/editChannel', 'index.html'))
})

router.post('/editChannel', multer(updateChannel).fields([{
    name: 'banner',
    maxCount: 1
    },
    {
        name: 'imagePerfil',
        maxCount: 1
    }
]), (req, res) => {
    const iduser = req.body.iduser
    const idChannel = req.body.idchannel
    const nameChannel = req.body.nameChannel;
    const descriptionChannel = req.body.description;
    const banner = req.files.banner[0].filename;
    const imagePerfil = req.files.imagePerfil[0].filename;

    const urlBanner = '/banners/' + banner
    const urlImagePerfil = '/perfil/' + imagePerfil
    
    updateChannelbd(`UPDATE channels SET name='${nameChannel}', description='${descriptionChannel}', urlimageperfil='${urlImagePerfil}', urlbanner='${urlBanner}' WHERE id='${idChannel}'`,res, iduser)
    
})



module.exports = router;
