/*
  Kang Hyejin
  강혜진 작성파일
*/

//게시글 좋아요
async function likePost(postId) {
  const res = await fetch(`${url}/post/${postId}/heart`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  const data = await res.json();
  return data;
};

//게시글 좋아요 취소
async function cancelLikePost(postId) {
  const res = await fetch(`${url}/post/${postId}/unheart`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  const data = await res.json();
  return data;
};

//게시글 좋아요 및 취소
async function likeEvent(e) {
  const heartCnt = e.currentTarget.querySelector('.heart-count');
  const postId = e.currentTarget.closest('article').getAttribute('id');

  let data = {};
  if (this.classList.contains('on')) {

    //좋아요 취소
    this.classList.remove('on');
    data = await cancelLikePost(postId);

    heartCnt.textContent = data.post.heartCount;

  } else {
    //좋아요
    this.classList.add('on');
    data = await likePost(postId);
    heartCnt.textContent = data.post.heartCount;
  }
};

