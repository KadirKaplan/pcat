const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//CONNECT DB

mongoose.connect('mongodb://localhost/pcat-test-db');


//CREATE SCHEMA

const PhotoSchema = new Schema({
    title: String,
    description: String,
})

const Photo = mongoose.model('Photo', PhotoSchema);

//CREATE PHOTO

Photo.create({
    title: "Photo Title 2",
    description: "Photo Description 2 Lorem İpsum"
});

//READ FHOTO

Photo.find({}, (err, data) => {
    console.log(data);
});

//UPDATE PHOTO

Photo.findByIdAndUpdate(
    id, {
    title: "Phptp title değiştirildi",
    description: "photo description değiştirildi"
    },
    (
    (err,data) => {
        console.log(data);
    })

)


//DELETE PHOTO
const id = "624f8203c64abc7360ee747e";
Photo.findByIdAndDelete(id,(err,data)=>{
    console.log('photo is removes');
} )