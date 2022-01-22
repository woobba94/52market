async function toggleFollow(accountname) {
  let urlVal = '';
  let methodVal = '';
  let textContentVal = '';
  // console.log(this);
  // isFollow 상태에따른 값 세팅
  if (this.textContent === '팔로우') {
    console.log('팔로우함');
    urlVal = 'follow';
    methodVal = 'POST';
    textContentVal = '언팔로우';
  } else {
    console.log('언팔로우함');
    urlVal = 'unfollow';
    methodVal = 'DELETE';
    textContentVal = '팔로우';
  }

  const url = `http://146.56.183.55:5050/profile/${accountname}/${urlVal}`;
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    method: methodVal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  const data = await res.json();
  this.textContent = textContentVal;

  // console.log('follow 토글');
}

// async function follow(accountname) {
//   // const section = document.querySelector('.following-list');
//   const url = `http://146.56.183.55:5050/profile/${accountname}/follow`;
//   const token = localStorage.getItem('token');
//   const res = await fetch(url, {
//     method: 'POST',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   });
//   const data = await res.json();
//   this.textContent = '언팔로우';
//   this.func = unFollow;
//   console.log('follow 실행됨');
// }

// async function unFollow(accountname) {
//   // const section = document.querySelector('.following-list');
//   const url = `http://146.56.183.55:5050/profile/${accountname}/unfollow`;
//   const token = localStorage.getItem('token');
//   const res = await fetch(url, {
//     method: 'DELETE',
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-type': 'application/json',
//     },
//   });
//   const data = await res.json();
//   this.textContent = '팔로우';
//   this.func = follow;
//   console.log('unfollow 실행됨');
// }
