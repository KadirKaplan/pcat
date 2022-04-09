const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');
const methodOverride = require('method-override');
const photoController = require('./controller/photoControllers');
const pageController = require('./controller/pageController');


const app = express();

mongoose.connect('mongodb+srv://kadirkaplan:qweasd123@cluster0.yhbwx.mongodb.net/PCAT?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then (() => {
    console.log("db connected!")
}).catch ((err) => {
    console.log(err)
});


//TEMPLATEENGİNE(ejs)
app.set("view engine", "ejs");

//MİDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));// urldeki datayı okumamızı saglıyor
app.use(express.json());// buda urldeki datayı json formatına donusturmeye yarıyor.
app.use(fileUpload());
app.use(methodOverride('_method', {
    methods: ['POST', 'GET']
}
));

//ROUTES

app.get('/', photoController.getAllPhotos);
app.get('/photos/:id', photoController.getPhoto);
app.post('/photos', photoController.createPhoto);
app.put('/photos/:id', photoController.updatePhoto);
app.delete('/photos/:id', photoController.deletePhoto);
app.get('/about', pageController.getAboutPage);
app.get('/add', pageController.getAddPage);
app.get('/photos/edit/:id', pageController.getEditPage);




const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Sunucu ${port} 'de çalışıyor...`);
});