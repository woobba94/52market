//게시글 더보기 버튼
function showMenuPostModal(e) {
  const article = e.currentTarget.closest('article');
  const postId = article.id;
  const menuModal = document.createElement('section');
  menuModal.classList.add('menu-modal');
  menuModal.innerHTML = `
    <div class="inner">
      <h2 class='a11y-hidden'>게시글 메뉴</h2>
      <button class='show-pop-delete'>삭제</button>
      <button class='modify'>수정</button>
      <button class='close-modal'>
        <span class='a11y-hidden'>게시글 메뉴 닫기</span>
      </button>
    </div>
    <div class="dim">
  `;
  article.appendChild(menuModal);

  menuModal.querySelector('.show-pop-delete').addEventListener('click', popDeltePostModal);
  menuModal.querySelector('.modify').addEventListener('click', function () {
    location.href = `/post/${postId}/edit`;
  });
  menuModal.querySelector('.close-modal').addEventListener('click', clearModal);
  menuModal.querySelector('.dim').addEventListener('click', clearModal);
}

//게시글 삭제 모달
function popDeltePostModal(e) {
  const article = e.currentTarget.closest('article');
  const popModal = document.createElement('div');
  popModal.classList.add('pop-modal');
  popModal.innerHTML = `
      <p>삭제하시겠습니까?</p>
      <div class="flex">
      <button class='cancel'>취소</button>
      <button class='delete-comment'>삭제</button>
      </div>
  `;
  article.appendChild(popModal);
  popModal.querySelector('.delete-comment').addEventListener('click', deletePost);
  popModal.querySelector('.cancel').addEventListener('click', clearModal);
}

async function deletePost(e) {
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
    location.href = `/post/${userId}/userpost`;
  }, 800);
}
