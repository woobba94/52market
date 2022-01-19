const url = "http://146.56.183.55:5050";
//localStorage
const token = localStorage.getItem('token');
const userId = localStorage.getItem('accountname');
const userProfile = localStorage.getItem('profileImg');


//현재 주소
const nowUrl = location.href;

//메인메뉴
const mainMenu = document.querySelector('.main-menu');

if (nowUrl.indexOf('/chat') !== -1) {
  // '/chat' 포함
  mainMenu.querySelector('.btn-chat').closest('li').classList.add('active');
} else if (nowUrl.indexOf('/profile') !== -1) {
  mainMenu.querySelector('.btn-user').closest('li').classList.add('active');
} else {
  mainMenu.querySelector('.btn-home').closest('li').classList.add('active');
}



const btnBack = document.querySelector('header .btn-back');
// 이전버튼
function clickBack() {
  history.back();
};