var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/complexProject')
var db = mongoose.connection
var fs = require('fs')
var path = require('path')
var News = require('../models/news')
var multer = require('multer')
var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null, 'uploads')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname))
    }
})
var upload = multer({
    storage:storage
})
exports.getNews = async (req, res, next)=>{
    res.render('News')
}
exports.getNewsFeed = (req, res, next)=>{
    res.render('admin/news', {title:'NewsFeed'})
}



  exports.sendNews = (req, res, next)=>{
      var particular = req.body.particular
      var designer = req.body.designer
    var description = req.body.description
    var sole = req.body.sole
    var photo = fs.readFileSync(req.file.path)
    var encode_image = photo.toString('base64')
    // var finalImg = {
    //     contentType: req.file.mimetype,
    //     path: req.file.path,
    //     image: new Buffer(encode_image, 'base64')
    // }
//     var file = req.file
//     if(photo1,photo2,photo3 = file){
// console.log('Uploadingfile')
//     }else{
//         console.log('upload failed')
//     }
   var newNews = new News({
       description: description,
       contentType: req.file.mimetype,
       path: req.file.path,
       image: new Buffer(encode_image, 'base64'),
       particular: particular,
       sole: sole,
       designer: designer
   })
News.createNews(newNews, function(err, data){
		if(err) throw err
      })
    req.flash('success', "News Successful")
    res.redirect('/admin/news')
    // res.location('/')

  }
//   const storage = multer.diskStorage({
//     destination: (req, file, callback) => {
//         callback(null, './.temp/uploads');
//     },
//     filename: (req, file, callback) => {
//         callback(null, file.fieldname + '-' + Date.now());
//     }
// });
// const multerOptions = {
//     storage: storage
// };

// const upload = multer(multerOptions).array('files[]');

// module.exports = (req, res, next) => {
//   upload(req, res, (err) => {
//         for (let i in req.files) {
//             const file = req.files[i];
//             // here you can call GridFS method and upload the file
//         }
//   });
// }); 
// app.post('/upload', function(request, response) {
//     upload(request, response, function(err) {  
  
//    var files = new Array (req.file.filename,req.file.namedName) 
//       for(var i = 0 ; i < files.length; i++) 
//   { 
//   // here you can call GridFS method 
//    }