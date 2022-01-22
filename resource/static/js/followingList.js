// async function getFollowing(accountname) {
//   const section = document.querySelector('.following-list');
//   const url = `http://146.56.183.55:5050/profile/${accountname}/following`;
//   const token = localStorage.getItem('token');
//   const res = await fetch(url, {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   });
//   const data = await res.json();

//   data.forEach((element) => {
//     section.innerHTML += `
//   <article class="follow-list-child" id="${element.id}">
//     <a href="/profile/${element.accountname}" class="user-wrap">
//       <img src="${element.image}" alt="${element.username}님의 프로필" class="profile" />
//       <span class="user-txt">
//         <span class="user-title">${element.username}</span>
//         <span class="user-description">@${element.accountname}</span>
//       </span>
//     </a>
//     <button class="button-small toggle-btn-follow" name="${element.accountname}"></button>
//   </article>
//   `;
//     // 만들어진 각 버튼에 해당 유저의 id를 이용하여 팔로우 이벤트 최초연결
//     let btn = document.querySelector(`.toggle-btn-follow[name=${element.accountname}]`);
//     if (element.isfollow) {
//       btn.textContent = '언팔로우';
//       btn.classList += ' btn-unfollow';
//     } else {
//       btn.textContent = '팔로우';
//       btn.classList += ' btn-follow';
//     }

//     // btn.func = toggleFollow;
//     // btn.addEventListener('click', function () {
//     //   btn.func(element.accountname);
//     // });
//   });
//   btnList = document.querySelectorAll('.toggle-btn-follow');
//   btnList.forEach(function (item) {
//     item.func = toggleFollow;
//     item.addEventListener('click', function () {
//       item.func(item.name);
//     });
//   });
// }

setFollowList(location.href.split('/following/')[1], false);
