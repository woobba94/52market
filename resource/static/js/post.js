const detailSection = document.querySelector('.detail');
const commentUl = document.querySelector('.comment-wrap');
const commentBtn = document.querySelector('.comment-save');
const inputComment = document.querySelector('.comment-box');

if (token && nowUrl.indexOf('/post/') !== -1) {
  getPostDetail();
} else {
  location.href = './login';
}
//게시글 상세보기
async function getPostDetail() {
  const postId = location.href.split("/post/")[1];
  const res = await fetch(`${url}/post/${postId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  const post = json.post;
  console.log(post);
  const date = `${post.updatedAt.split('-')[0]}년 ${post.updatedAt.split('-')[1]}월 ${post.updatedAt.split('-')[2].split('T')[0]}일`;

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

  const postArticle = document.createElement('article');
  postArticle.classList.add('post-article');
  postArticle.setAttribute('id', `${post.id}`);
  postArticle.innerHTML = `
  <a href="/profile/${post.author.accountname}" class="user-wrap">
   <img src="${post.author.image}" alt="${post.author.username}님의 프로필" class="profile" />
    <span class="user-txt">
      <span class="user-title">${post.author.username}</span>
      <span class="user-description">@${post.author.accountname}</span>
    </span>
  </a>

  <div class="post-cont">
    <p class=" post-text">${post.content}</p>
    ${postImg}    
    <p class="like-comment">
          <button type="button" class="btn-like ${post.hearted ? 'on' : ''}">
            <span class="a11y-hidden">좋아요</span > 
            <span class="heart-count">${post.heartCount}</span>
          </button>
      <span class="btn-comment">
        <span class="a11y-hidden">댓글</span>${post.commentCount}
      </span>
    </p>
    <p class="date">${date}</p>
  </div>
  <button class="imgbtn-more">더보기</button>
  `;
  detailSection.appendChild(postArticle);

  const detailMore = postArticle.querySelector('.imgbtn-more');
  detailMore.addEventListener('click', showMenu);

  const likeBtn = postArticle.querySelector('.btn-like');
  likeBtn.addEventListener('click', likeEvent);
}

//게시글 삭제
async function deleteEvent(e) {
  const postId = e.currentTarget.closest('article').id;
  const popModal = document.querySelector('.pop-modal');
  popModal.innerHTML = `
      <p>삭제되었습니다.</p>
  `;
  const res = await fetch(`${url}/post/${postId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  setTimeout(function () {
    location.href = `/profile/${userId}`;
  }, 800);
}

//게시글 신고
async function reportEvent(e) {
  const postId = e.currentTarget.closest('article').id;
  const popModal = document.querySelector('.pop-modal');
  popModal.innerHTML = `
      <p>처리되었습니다.</p>
  `;
  const res = await fetch(`${url}/post/${postId}/report`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const data = await res.json();
  console.log(data);
  setTimeout(function () {
    clearModal()
  }, 800);
}

