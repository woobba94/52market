const container = document.querySelector('.container');
console.log(localStorage.getItem('Token'));
if (localStorage.getItem('Token')) {
  getFeed();
} else {
  location.href = './login.html';
}

async function getFeed() {
  const url = 'https://mandarin.api.weniv.co.kr';
  const token = localStorage.getItem('Token');
  const res = await fetch(url + '/post/feed', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  const posts = json.posts;
  // 받아온 데이터 전부 그려주기
  posts.forEach((post) => {
    const authorImage = post.author.image;
    const authorAccount = post.author.accountname;
    const authorName = post.author.username;
    const commentCount = post.commentCount;
    const content = post.content;
    const heartCount = post.heartCount;
    const hearted = post.hearted;
    document.querySelector('.container').innerHTML += `
        <div class="post-container">
            <img class="profileimg" src="${authorImage}"/>
            <div class="h">${authorAccount}</div>
            <div class="h">${authorName}</div>
            <div class="h">${content}</div>
            <div class="h">${commentCount}</div>
            <div class="${hearted ? 'yes' : 'no'}">${hearted}</div>
            
        </div>                
        `;
  });
}
getFeed();
