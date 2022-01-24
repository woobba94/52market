const time = document.querySelector('.date-time');
const date = new Date();

if (time) {
  time.textContent = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes() - 1).padStart(2, '0')}`
}

const commentProfile = document.querySelector('.comment-in .profile');
if (commentProfile) {
  commentProfile.src = userProfile;
  commentProfile.setAttribute('alt', `${userId}님의 프로필`);
}