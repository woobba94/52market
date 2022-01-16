const frag = document.createDocumentFragment();
const postId = location.href.split("/post/")[1];

//게시 버튼 활성화
function changeCommentBtn() {
  if (inputComment.value === '') {
    commentBtn.disabled = true;
  } else {
    commentBtn.disabled = false;
  }
}

//1. 댓글 작성
async function createComment() {
  const inputText = inputComment.value;
  const res = await fetch(`${url}/post/${postId}/comments`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "comment": {
        "content": inputText
      }
    })
  })
  location.href = `/post/${postId}`;
}
//2. 댓글 리스트
async function getPostComments() {
  const res = await fetch(`${url}/post/${postId}/comments`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  const comments = json.comments;
  comments.forEach((comment) => {
    const date = new Date(comment.createdAt);
    const now = new Date();
    let gap = (now - date) / (1000 * 60);
    let time = '';
    if (gap < 1) {
      time = '방금';
    } else if (gap >= 1 && gap < 60) {
      time = Math.round(gap) + '분 전';
    } else if (gap >= 60 && gap < 1440) {
      time = Math.round(gap / 60) + '시간 전';
    } else {
      time = `${date.getFullYear()}년  ${date.getMonth() + 1}월 ${date.getDate()}일`;
    }
    const commentLi = document.createElement('li');
    commentLi.classList.add('user-wrap')
    commentLi.setAttribute('id', comment.id);
    commentLi.innerHTML = `
    <a href="/profile/${comment.author.accountname}"><img src="${comment.author.image}" alt="${comment.author.username}님의 프로필" class="profile" /></a>
    <div class="user-txt">
      <a href="/profile/${comment.author.accountname}" class="user-title">${comment.author.username}</a>
      <span class="time">${time} </span>
      <p class="user-comment">${comment.content}</p>
    </div>
    <button class="imgbtn-more">더보기</button>
    `;
    frag.prepend(commentLi);
  });
  commentUl.append(frag);

  const btnMore = commentUl.querySelectorAll('.imgbtn-more');
  btnMore.forEach((item) => {
    item.addEventListener('click', showMenuModal);
  })
}
//3. 댓글 삭제
async function deleteComment(e) {
  const commentId = e.currentTarget.closest('.user-wrap').id;
  const popModal = document.querySelector('.pop-modal');
  popModal.innerHTML = `
      <p>삭제되었습니다.</p>
  `;
  const res = await fetch(`${url}/post/${postId}/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  setTimeout(function () {
    location.href = `/post/${postId}`;
  }, 800);
}
//4. 댓글 신고
async function reportComment(e) {
  const commentId = e.currentTarget.closest('.user-wrap').id;
  const popModal = document.querySelector('.pop-modal');
  popModal.innerHTML = `
      <p>처리되었습니다.</p>
  `;

  const res = await fetch(`${url}/post/${postId}/comments/${commentId}/report`, {
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
//댓글 더보기 메뉴
function showMenuModal(e) {
  const parent = e.currentTarget.closest('.user-wrap');
  const thisUser = parent.querySelector('.user-title').getAttribute('href').split('/profile/')[1];
  const menuModal = document.createElement('section');
  menuModal.classList.add('menu-modal');
  if (userId === thisUser) {
    menuModal.innerHTML = `
    <div class="inner">
      <h2 class='a11y-hidden'>댓글 메뉴</h2>
      <button class='show-pop-delete'>삭제</button>
      <button class='close-modal'>
        <span class='a11y-hidden'>댓글 메뉴 닫기</span>
      </button>
    </div>
    <div class="dim">
  `;
    parent.appendChild(menuModal);
    parent.querySelector('.show-pop-delete').addEventListener('click', openCommentModal);
  } else {
    menuModal.innerHTML = `
    <div class="inner">
      <h2 class='a11y-hidden'>댓글 메뉴</h2>
      <button class='show-pop-report'>신고</button>
      <button class='close-modal'>
        <span class='a11y-hidden'>댓글 메뉴 닫기</span>
      </button>
    </div>
    <div class="dim">
  `;
    parent.appendChild(menuModal);
    parent.querySelector('.show-pop-report').addEventListener('click', openCommentModal);
  }
  parent.querySelector('.close-modal').addEventListener('click', clearModal);
  parent.querySelector('.dim').addEventListener('click', clearModal);
}

// 삭제/신고 버튼 클릭 - 모달
function openCommentModal(e) {
  const clickBtn = e.currentTarget.textContent; //클릭한 버튼 확인 (삭제/신고/수정)
  const parent = e.currentTarget.closest('.user-wrap');
  const popModal = document.createElement('div');
  popModal.classList.add('pop-modal');
  if (clickBtn === '삭제') {
    popModal.innerHTML = `
      <p>삭제하시겠습니까?</p>
      <div class="flex">
        <button class='cancel'>취소</button>
        <button class='delete'>삭제</button>
      </div>
    `;
    parent.appendChild(popModal);
    popModal.querySelector('.delete').addEventListener('click', deleteComment);
    popModal.querySelector('.cancel').addEventListener('click', clearModal);
  } else if (clickBtn === '신고') {
    popModal.innerHTML = `
      <p>신고하시겠습니까?</p>
      <div class="flex">
        <button class='cancel'>취소</button>
        <button class='report'>신고</button>
      </div>
    `;
    parent.appendChild(popModal);
    parent.querySelector('.report').addEventListener('click', reportComment);
    parent.querySelector('.cancel').addEventListener('click', clearModal);
  }
}

//댓글 이미지
function profileImg() {
  const commentProfile = document.querySelector('.comment-in .profile');
  commentProfile.src = userProfile;
  commentProfile.setAttribute('alt', `${userId}님의 프로필`);
}

commentBtn.addEventListener('click', createComment);
inputComment.addEventListener('input', changeCommentBtn);

getPostComments();
profileImg();