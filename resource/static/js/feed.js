const frag = document.createDocumentFragment();
const hrefLink = location.href;

if (token) {
  if (hrefLink.indexOf('/profile/') !== -1) {
    getProfile();
  } else {
    getFeed();
  }
} else {
  location.href = './login';
}

//피드 목록(팔로워 게시글)
async function getFeed() {
  const res = await fetch(`${url}/post/feed`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  const json = await res.json();
  const posts = json.posts;
  if (posts.length > 0) {
    feedList(posts);
  } else {
    noFeed();
  }
}
async function getProfile() {
  const accountName = location.href.split("/profile/")[1];
  const res = await fetch(`${url}/post/${accountName}/userpost`, {
    // ${url}/post/${userId}/userpost
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  const json = await res.json();
  const posts = json.post;
  feedList(posts);
}

function feedList(posts) {
  const h2Title = document.createElement('h2');
  h2Title.textContent = '피드 리스트';
  h2Title.classList.add('a11y-hidden');
  const postUl = document.createElement('ul');
  postUl.classList.add('post-list');
  posts.forEach(post => {
    const date = `${post.updatedAt.split('-')[0]}년 ${post.updatedAt.split('-')[1]}월 ${post.updatedAt.split('-')[2].split('T')[0]}일`;
    const postLi = document.createElement('li');
    let postImg = '';
    if (post.image) {
      let imgArr = post.image.split(',');
      for (let i = 0; i < imgArr.length; i++) {
        postImg += `<img src="${imgArr[i]}" alt="${post.content}" class="post-img" />`
      }
      if (imgArr.length > 1) {
        postImg = `<span class="post-imgs">${postImg}</span>`
      }
    }
    postLi.innerHTML = `
      <article class="post-article" id="${post.id}">
        <a href="/profile/${post.author.accountname}" class="user-wrap">
        <img src="${post.author.image}" alt="${post.author.username}님의 프로필" class="profile" />
        
        <span class="user-txt">
            <span class="user-title">${post.author.username}</span>
            <span class="user-description">@${post.author.accountname}</span>
          </span>
        </a>
        <div class="post-cont">
          <a href="/post/${post.id}">
            <span class="post-text">${post.content}</span>
            ${postImg}
          </a>
          <p class="like-comment">
            <button type="button" class="btn-like ${post.hearted ? 'on' : ''}">
              <span class="a11y-hidden">좋아요</span > 
              <span class="heart-count">${post.heartCount}</span>
            </button>
        <a href="/post/${post.id}" class="btn-comment">
          <span class="a11y-hidden">댓글</span>${post.commentCount}
        </a>
          </p>
        <p class="date">${date}</p>
        </div>
        <button class="imgbtn-more">더보기</button>
      </article>
    `
    frag.appendChild(postLi);
  });
  document.querySelector('section').appendChild(h2Title);
  document.querySelector('section').appendChild(postUl).appendChild(frag);

  const detailMore = postUl.querySelectorAll('.imgbtn-more');
  detailMore.forEach((item) => {
    item.addEventListener('click', showMenuPostModal);
  });

  const likeBtn = document.querySelectorAll('.btn-like');
  likeBtn.forEach((item) => {
    item.addEventListener('click', likeEvent);
  })
}

function noFeed() {
  const div = document.createElement('div');
  div.classList.add('wrap-index');
  div.innerHTML = `
    <h2 class="title">HOME</h2>
    <div class="symbol-logo-gray"></div>
    <p>유저를 검색해 팔로우 해보세요!</p>
    <a href="/search" class="button">검색하기</a>
  `;
  document.querySelector('section').append(div);
}

