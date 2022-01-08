const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index.html');
});

router.get('/home', (req, res, next) => {
  res.render('home.html');
});
router.get('/chat', (req, res, next) => {
  res.render('chat-list.html');
});

router.get('/chat-room', (req, res, next) => {
  res.render('chat-room.html');
});

router.get('/join', (req, res, next) => {
  res.render('join.html');
});

router.get('/join-profile', (req, res, next) => {
  res.render('join-profile.html');
});

router.get('/login', (req, res, next) => {
  res.render('login.html');
});

router.get('/module', (req, res, next) => {
  res.render('module.html');
});
router.get('/post', (req, res, next) => {
  res.render('post.html');
});

router.get('/product', (req, res, next) => {
  res.render('product.html');
});

router.get('/profile-list', (req, res, next) => {
  res.render('profile-list.html');
});
router.get('/profile-mod', (req, res, next) => {
  res.render('profile-mod.html');
});

router.get('/profile-my', (req, res, next) => {
  res.render('profile-my.html');
});

router.get('/profile-your', (req, res, next) => {
  res.render('profile-your.html');
});


router.get('/search', (req, res, next) => {
  res.render('search.html');
});
router.get('/upload', (req, res, next) => {
  res.render('upload.html');
});

router.get('/404', (req, res, next) => {
  res.render('404.html');
});

module.exports = router;