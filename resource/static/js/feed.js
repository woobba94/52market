const postUl = document.querySelector('.post-list');
const frag = document.createDocumentFragment();

if (token) {
  getFeed();
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


  posts.forEach(post => {
    const date = `${post.updatedAt.split('-')[0]}년 ${post.updatedAt.split('-')[1]}월 ${post.updatedAt.split('-')[2].split('T')[0]}일`;
    const postLi = document.createElement('li');
    postLi.innerHTML = `
      <article class="post-article" id="${post.id}">
        <a href="/profile/${post.id}" class="user-wrap">
        <img src="${post.author.image}" alt="${post.author.username}님의 프로필" class="profile" />
        
        <span class="user-txt">
            <span class="user-title">${post.author.username}</span>
            <span class="user-description">@${post.author.accountname}</span>
          </span>
        </a>

        <div class="post-cont">
          <a href="/post/${post.id}">
            <span class="post-text">${post.content}</span>
            <img src="${post.image}" alt="${post.content}" class="post-img"  />
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
  postUl.appendChild(frag);

  const likeBtn = document.querySelectorAll('.btn-like');
  likeBtn.forEach((item) => {
    item.addEventListener('click', likeEvent);
  })
}

//피드 
