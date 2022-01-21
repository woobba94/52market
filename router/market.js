const express = require('express');
const router = express.Router();


// 1.홈
router.get('/', (req, res, next) => {
  res.render('index.html');
});

// 검색
router.get('/search', (req, res, next) => {
  res.render('search.html');
});

//게시글 상세
router.get('/post/:post_id', (req, res, next) => {
  res.render('view.html');
});

//게시글 수정
router.get('/post/:post_id/edit', (req, res, next) => {
  res.render('upload-edit.html');
});

// 채팅
router.get('/chat', (req, res, next) => {
  res.render('chat-list.html');
});

router.get('/chat-room', (req, res, next) => {
  res.render('chat-room.html');
});

// 게시물 작성
router.get('/upload', (req, res, next) => {
  res.render('upload.html');
});

//프로필
router.get('/profile', (req, res, next) => {
  res.render('profile-me.html');
  //하령님 작업 확인 필요 :   'profile-my.html'
});

//개볗프로필
router.get('/profile/:accountname', (req, res, next) => {
  res.render('profile.html');
  //하령님 작업 확인 필요 :  'profile-your.html'
});


// splash
router.get('/loading', (req, res, next) => {
  res.render('loading.html');
});

// 로그인
router.get('/login', (req, res, next) => {
  res.render('login.html');
});

// 회원가입
router.get('/join', (req, res, next) => {
  res.render('join.html');
});

// 회원가입-프로필
router.get('/join-profile', (req, res, next) => {
  res.render('join-profile.html');
});


// 상품 등록/수정 페이지
router.get('/product', (req, res, next) => {
  res.render('product.html');
});

// 팔로잉 리스트
router.get('/following', (req, res, next) => {
  res.render('following.html');
});

// 팔로워 리스트
router.get('/follower', (req, res, next) => {
  res.render('follower.html');
});

//프로필:추후 삭제 및 정리 필요 -------------------------------------------------------------
router.get('/profile-my', (req, res, next) => {
  res.render('profile-my.html');
});

//프로필:추후 삭제
router.get('/profile-your', (req, res, next) => {
  res.render('profile-your.html');
});

//확인
router.get('/profile-list', (req, res, next) => {
  res.render('profile-list.html');
});

//확인
router.get('/profile-mod', (req, res, next) => {
  res.render('profile-mod.html');
});

//모듈: 추후 삭제
router.get('/module', (req, res, next) => {
  res.render('module.html');
});

module.exports = router;