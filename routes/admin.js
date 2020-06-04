var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs')
const multer = require('multer')
var passport = require('passport')
var localStrategy = require('passport-local').Strategy
var path = require('path')
var controller = require('../controllers/controller')
var Order = require('../models/order')
var News = require('../models/news')
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1000000
    },
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}
// Load User model
const User = require('../models/User');
const {  ensureAuthenticated,forwardAdmin } = require('../handlers/auth');

// Login Page
router.get('/login',  forwardAdmin,(req, res) => res.render('admin/login'));

// Register Page
router.get('/register',  forwardAdmin,(req, res) => res.render('admin/register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('admin/register', {
      errors,
      name,
      email,
      password,
      password2
    });
  } else {
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('admin/register', {
          errors,
          name,
          email,
          password,
          password2
        });
      } else {
        const newUser = new User({
          name,
          email,
          password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(() => {
                res.redirect('/admin/login');
              })
              .catch(err => console.log(err));
          });
        });
      }
    });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('user-local', {
    successRedirect: '/admin',
    failureRedirect: '/admin/login'
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/admin/login');
});
router.get('/news', ensureAuthenticated,async (req, res) => {
    var newsfeeds = await News.find()
    console.log(newsfeeds)
    res.render('admin/news', {
        newsfeeds
    })
})
router.get('/news/:id',(req,res)=>{
    News.findByIdAndDelete(req.params.id)
    .then(() => res.redirect('/admin/news'))
    .catch(err => res.status(400).json('Error: ' + err))
})
router.post('/news', upload.single('image'), (req, res) => {
    var particular = req.body.particular
    var designer = req.body.designer
    var brand = req.body.brand
    var email = req.body.email
    var description = req.body.description
    var image = req.file.filename
    var newNews = new News({
        email,
        particular,
        designer,
        brand,
        description,
        image
    })
    newNews.save()
        .then(() => res.render('admin/news',{msg:'Upload Successful'}))
        .catch(err => res.status(400).json('Error: ' + err));
})
router.get('/', ensureAuthenticated,controller.getJobs);
router.get('/index', ensureAuthenticated,controller.getJob);
router.get('/order', ensureAuthenticated,controller.getOrder)
router.get('/accounts', ensureAuthenticated,controller.getAccount)
router.get('/:id', ensureAuthenticated,controller.updateOrder)
router.post('/:id', async (req, res) => {
    var body = req.body
    var status = req.body.status
    var progress = req.body.progress
    var update = {
        status: status,
        progress: progress
    }
    const orders = await Order.findByIdAndUpdate({
        _id: req.params.id
    }, {
        $set: update
    }, {
        new: true, // return the new store instead of the old one
        runValidators: true,
        upsert: true,
        returnOriginal: false,
        returnNewDocument: true
    }).exec();
    //   res.json([orders,body,status,progress])
    console.log(orders)
    res.redirect(`/admin/${orders._id}`)
})
module.exports = router;