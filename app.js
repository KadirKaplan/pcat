const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');   
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

mongoose.connect('mongodb://localhost/PCAT');

//TEMPLATEENGİNE(ejs)
app.set("view engine", "ejs");

//MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// urldeki datayı okumamızı saglıyor
app.use(express.json());// buda urldeki datayı json formatına donusturmeye yarıyor.
app.use(fileUpload());
//ROUTES

app.get('/', async (req, res) => {
    const photos = await Photo.find({}).sort('-dateCreated');
    res.render('index', {
        photos
    });
});
app.get('/photos/:id', async (req, res) => {

    const photo = await Photo.findById(req.params.id);
    res.render('photo', {
        photo
    });
});
app.get('/about', (req, res) => {

    res.render('about');
});

app.get('/add', (req, res) => {

    res.render('add');
});

app.post('/photos', async (req, res) => {
    

  
    const uploadDir = 'public/uploads';
  
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
  
    let uploadeImage = req.files.image;
    let uploadPath = __dirname + '/public/uploads/' + uploadeImage.name;
  
    uploadeImage.mv(uploadPath, async () => {
      await Photo.create({
        ...req.body,
        image: '/uploads/' + uploadeImage.name,
      });
      res.redirect('/');
    });
});




const port = 3000;
app.listen(port, () => {
    console.log(`Sunucu ${port} 'de çalışıyor...`);
});