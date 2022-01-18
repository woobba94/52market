//게시글 더보기 버튼 클릭 - 메뉴
function showMenuPostModal(e) {
  const article = e.currentTarget.closest('article');
  const postId = article.id; //게시글 아이디
  const articleId = article.querySelector('.user-description').textContent.slice(1); //작성자 아이디

  //메뉴 모달 생성
  const menuModal = document.createElement('section');
  menuModal.classList.add('menu-modal');
  if (articleId === userId) {
    //내가 쓴 게시글일 경우 : 삭제 / 수정
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
    menuModal.querySelector('.show-pop-delete').addEventListener('click', openModal);
    menuModal.querySelector('.modify').addEventListener('click', function () {
      location.href = `/post/${postId}/edit`;
    });
    menuModal.querySelector('.close-modal').addEventListener('click', clearModal);
    menuModal.querySelector('.dim').addEventListener('click', clearModal);
  } else {
    //타인이 쓴 게시글일 경우 : 신고
    menuModal.innerHTML = `
    <div class="inner">
      <h2 class='a11y-hidden'>게시글 메뉴</h2>
      <button class='show-pop-report'>신고</button>
      <button class='close-modal'>
        <span class='a11y-hidden'>게시글 메뉴 닫기</span>
      </button>
    </div>
    <div class="dim">
  `;
    article.appendChild(menuModal);
    menuModal.querySelector('.show-pop-report').addEventListener('click', openModal);
    menuModal.querySelector('.close-modal').addEventListener('click', clearModal);
    menuModal.querySelector('.dim').addEventListener('click', clearModal);
  }
}

// 삭제/신고 버튼 클릭 - 모달
function openModal(e) {
  const clickBtn = e.currentTarget.textContent; //클릭한 버튼 확인 (삭제/신고/수정)

  const article = e.currentTarget.closest('article');
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
    article.appendChild(popModal);
    popModal.querySelector('.delete').addEventListener('click', deleteEvent);
    popModal.querySelector('.cancel').addEventListener('click', clearModal);
  } else if (clickBtn === '신고') {
    popModal.innerHTML = `
      <p>신고하시겠습니까?</p>
      <div class="flex">
        <button class='cancel'>취소</button>
        <button class='report'>신고</button>
      </div>
    `;
    article.appendChild(popModal);
    article.querySelector('.report').addEventListener('click', reportEvent);
    article.querySelector('.cancel').addEventListener('click', clearModal);
  }
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

//모달창 닫기
function clearModal() {
  const popModal = document.querySelector('.pop-modal');
  const menuModal = document.querySelector('.menu-modal');
  if (popModal) {
    popModal.remove();
    menuModal.remove();
  } else {
    menuModal.remove();
  }
}
