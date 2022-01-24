/*
  Kang Hyejin
  강혜진 작성파일
*/
const commentUl = document.querySelector('.comment-wrap');
const commentBtn = document.querySelector('.comment-save');
const inputComment = document.querySelector('.comment-box');
const postId = nowUrl.split("/post/")[1];

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
    <button class="imgbtn-more comment">더보기</button>
    `;
    frag.prepend(commentLi);
  });
  commentUl.append(frag);

  const btnMore = commentUl.querySelectorAll('.imgbtn-more');
  const commentLen = btnMore.length - 1;
  btnMore.forEach((item, index) => {
    item.addEventListener('click', function (e) {
      showMenu(e, 'comment', comments[commentLen - index]);
    });
  })
}
//3. 댓글 삭제
async function deleteComment(commentId) {
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
async function reportComment(commentId) {
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