/*
  Kang Hyejin
  강혜진 작성파일
*/
const listBtn = document.querySelector('.imgbtn-list');
const albumBtn = document.querySelector('.imgbtn-album');
const postUl = document.querySelector('.post-list');
const detailSection = document.querySelector('.detail');

let state = 'list'; // 목록/앨범 상태 구분

if (token) {
  if (nowUrl.split('/profile/')[1] === userId) {
    myFeed(state);
    listBtn.addEventListener('click', changeList);
    albumBtn.addEventListener('click', changeAlbum);
  } else if (nowUrl.indexOf('/profile/') !== -1) {
    getProfile(state);
    listBtn.addEventListener('click', changeList);
    albumBtn.addEventListener('click', changeAlbum);
  } else if (nowUrl.indexOf('/post/') !== -1) {
    getPostDetail();
  } else {
    getFeed();
  }
} else {
  location.href = './loading';
}

function changeList() {
  state = 'list';
  listBtn.classList.add('active');
  albumBtn.classList.remove('active');
  document.querySelector('h2.a11y-hidden').remove();
  document.querySelector('.post-album').remove();
  if (nowUrl.split('/profile')[1] === '') {
    myFeed(state);
  } else {
    getProfile(state);
  }


}

function changeAlbum() {
  state = 'album';
  listBtn.classList.remove('active');
  albumBtn.classList.add('active');
  document.querySelector('h2.a11y-hidden').remove();
  document.querySelector('.post-list').remove();
  if (nowUrl.split('/profile')[1] === '') {
    myFeed(state);
  } else {
    getProfile(state);
  }
}

//피드 목록(팔로워 게시글) - /index
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
    feedList(posts, state);
  } else {
    noFeed();
  }
}

//나의 피드 - /profile
async function myFeed(state) {
  const res = await fetch(`${url}/post/${userId}/userpost`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  const json = await res.json();
  const posts = json.post;
  feedList(posts, state);
}

async function getProfile(state) {
  const accountName = location.href.split("/profile/")[1];
  const res = await fetch(`${url}/post/${accountName}/userpost`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  const json = await res.json();
  const posts = json.post;
  feedList(posts, state);
}

function feedList(posts, state) {
  const h2Title = document.createElement('h2');
  h2Title.textContent = '피드 리스트';
  h2Title.classList.add('a11y-hidden');

  document.querySelector('section').appendChild(h2Title);
  if (posts.length === 0) {
    const nodata = document.createElement('p');
    nodata.classList.add('nodata');
    nodata.textContent = '등록된 피드가 없습니다';
    h2Title.after(nodata);
  };


  const postUl = document.createElement('ul');
  posts.forEach(post => {
    const date = `${post.updatedAt.split('-')[0]}년 ${post.updatedAt.split('-')[1]}월 ${post.updatedAt.split('-')[2].split('T')[0]}일`;
    let postImg = '';
    if (post.image) {
      let imgArr = post.image.split(',');
      firstImg = `
      <a href="/post/${post.id}">
        <img src="${imgArr[0]}" alt="첨부파일" class="post-img" />
      </a>
      `;
      for (let i = 0; i < imgArr.length; i++) {
        postImg += `<img src="${imgArr[i]}" alt="첨부파일" class="post-img" />`
      }
      if (imgArr.length > 1) {
        postImg = `<span class="post-imgs">${postImg}</span>`
        firstImg = `
        <a href="/post/${post.id}" class="imgs">
          <img src="${imgArr[0]}" alt="첨부파일" class="post-img" />
        </a>
        `;
      }
    }
    if (state === 'list') {
      postUl.classList.add('post-list');
      const postLi = document.createElement('li');
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
          <p>
            <span class="post-text">${post.content}</span>
            ${postImg}
          </p>
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
      document.querySelector('section').appendChild(postUl).appendChild(frag);

      const likeBtn = document.querySelectorAll('.btn-like');
      likeBtn.forEach((item) => {
        item.addEventListener('click', likeEvent);
      })

    } else if (state === 'album') {
      postUl.classList.add('post-album');
      if (post.image) {
        const postLi = document.createElement('li');
        postLi.innerHTML = `
        ${firstImg}
      `;
        frag.appendChild(postLi);
      }
      document.querySelector('section').appendChild(postUl).appendChild(frag);
    }
  });
  const detailMore = postUl.querySelectorAll('.imgbtn-more');
  detailMore.forEach((item) => {
    item.addEventListener('click', function (e) {
      const postData = {
        id: item.closest('article').id,
        author: {
          accountname: item.closest('article').querySelector('.user-description').textContent.slice(1),
        }
      }
      showMenu(e, 'post', postData)
    });
  });
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





//게시글 삭제
async function deleteEvent(postId) {
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
async function reportEvent(postId) {
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


//게시글 상세보기
async function getPostDetail() {
  const postId = nowUrl.split("/post/")[1];
  const res = await fetch(`${url}/post/${postId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  const post = json.post;
  const date = `${post.updatedAt.split('-')[0]}년 ${post.updatedAt.split('-')[1]}월 ${post.updatedAt.split('-')[2].split('T')[0]}일`;

  let postImg = '';
  if (post.image) {
    let imgArr = post.image.split(',');
    for (let i = 0; i < imgArr.length; i++) {
      postImg += `<img src="${imgArr[i]}" alt="첨부파일" class="post-img" />`
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
  detailMore.addEventListener('click', function (e) {
    showMenu(e, 'post', post)
  });

  const likeBtn = postArticle.querySelector('.btn-like');
  likeBtn.addEventListener('click', likeEvent);
}