const express = require('express');
const router = express.Router();


router.get('/', (req, res, next) => {
  res.render('index.html');
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

//나의 게시글 게시물
router.get('/post/:accountname/userpost', (req, res, next) => {
  res.render('profile-list.html');
});

//게시글 상세
router.get('/post/:post_id', (req, res, next) => {
  res.render('post.html');
});

//게시글 수정
router.get('/post/:post_id/edit', (req, res, next) => {
  res.render('upload-edit.html');
});

//프로필
router.get('/profile', (req, res, next) => {
  res.render('profile-my.html');
});
//개인프로필
router.get('/profile/:accountname', (req, res, next) => {
  res.render('profile-list.html');
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

router.get('/test', (req, res, next) => {
  res.render('login_test.html');
});

module.exports = router;