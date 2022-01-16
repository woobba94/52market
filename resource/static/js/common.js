const url = "http://146.56.183.55:5050";
//localStorage
const token = localStorage.getItem('token');
const userId = localStorage.getItem('accountname');
const userProfile = localStorage.getItem('profileImg');



const btnBack = document.querySelector('header .btn-back');
// 이전버튼
function clickBack() {
  history.back();
};