const url = "http://146.56.183.55:5050";
//localStorage
const token = localStorage.getItem('token');
const userId = localStorage.getItem('accountname');
const userProfile = localStorage.getItem('profileImg');


//모달 지우기
function clearModal() {
  document.querySelector('.menu-modal').remove();
  document.querySelector('.pop-modal').remove();
}