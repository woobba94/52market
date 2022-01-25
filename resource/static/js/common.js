/*
  Kang Hyejin
  강혜진 작성파일
*/
const url = 'http://146.56.183.55:5050'; // API url

//로그인시 저장된 localStorage
const token = localStorage.getItem('token');
const userId = localStorage.getItem('accountname');
const userProfile = localStorage.getItem('profileImg');
//현재 주소
const nowUrl = location.href;
const link = document.querySelector('.btn-user');
//flagment
const frag = document.createDocumentFragment();

//이전버튼
const btnBack = document.querySelector('header .btn-back');
const prevBtn = document.querySelector('.btn-prev-back'); //404 페이지

//메인메뉴
const mainMenu = document.querySelector('.main-menu');

//프로필,채팅 페이지 더보기 버튼
const headerMoreBtn = document.querySelector('header .btn-more');

if (headerMoreBtn) {
  headerMoreBtn.addEventListener('click', function (e) {
    showMenu(e, 'more');
  });
}

//메인메뉴
if (link) {
  link.href = `/profile/${userId}`;
}
//메인메뉴
if (mainMenu) {
  if (nowUrl.indexOf('/chat') !== -1) {
    // '/chat' 페이지
    mainMenu.querySelector('.btn-chat').closest('li').classList.add('active');
  } else if (nowUrl.indexOf('/profile/') !== -1 && nowUrl.split('/profile/')[1] === userId) {
    // '/profile' 페이지
    mainMenu.querySelector('.btn-user').closest('li').classList.add('active');
  } else {
    // '/' 페이지
    mainMenu.querySelector('.btn-home').closest('li').classList.add('active');
  }
}

//이전버튼 클릭 이벤트
if (btnBack) {
  btnBack.addEventListener('click', clickBack);
} else if (prevBtn) {
  prevBtn.addEventListener('click', clickBack);
}
function clickBack() {
  if (location.href.includes('/profile/')) location.href = 'http://localhost:8080/';
  else if (document.referrer.includes('/post/')) {
    let thisUser = document.querySelector('.user-description').textContent.substr(1);
    location.href = `http://localhost:8080/profile/${thisUser}`;
  } else history.back().reload();
}

//하단 메뉴 등장
function showMenu(e, type, data) {
  let typeText = '';
  let thisParent = null;
  let inButton = '';

  // 상단 더보기
  if (type === 'more') {
    menuMore(e);
  }
  //게시글 더보기
  else if (type === 'post') {
    menuPost(e, data);
  }
  // 댓글
  else if (type === 'comment') {
    menuComment(e, data);
  }
  //판매상품
  else if (type === 'product') {
    //내 게시글일 경우 메뉴 보이기
    if (data.author.accountname === userId) {
      menuProduct(e, data);
    }
    // 내 게시글이 아닐 땐 링크로 이동
    else {
      location.href = data.link;
    }
  }
}

//게시글 메뉴
function menuPost(e, post) {
  typeText = '게시글';
  thisParent = e.currentTarget.closest('article');
  if (post.author.accountname === userId) {
    //나의 게시글 일때
    inButton = `<button class='show-pop-delete'>삭제</button>
    <button type='button' class='modify'>수정</button>`;
  } else {
    //다른사람 게시글 일때
    inButton = `<button class='show-pop-report'>신고</button>`;
  }

  addMenu();

  const menuDelete = thisParent.querySelector('.show-pop-delete');
  const menuReport = thisParent.querySelector('.show-pop-report');
  const menuModify = thisParent.querySelector('.modify');
  //삭제
  if (menuDelete) {
    menuDelete.addEventListener('click', function (e) {
      openPop(typeText, '삭제', thisParent, post.id);
    });
  }
  //수정
  if (menuModify) {
    menuModify.addEventListener('click', function (e) {
      location.href = `/post/${post.id}/edit`;
    });
  }
  //신고
  if (menuReport) {
    menuReport.addEventListener('click', function (e) {
      openPop(typeText, '신고', thisParent, post.id);
    });
  }
}

//댓글 메뉴
function menuComment(e, comment) {
  typeText = '댓글';
  thisParent = e.currentTarget.closest('.user-wrap');
  if (comment.author.accountname === userId) {
    //나의 댓글일때
    inButton = `<button class='show-pop-delete'>삭제</button>`;
  } else {
    //다른사람 댓글일때
    inButton = `<button class='show-pop-report'>신고</button>`;
  }

  addMenu();

  const menuDelete = thisParent.querySelector('.show-pop-delete');
  const menuReport = thisParent.querySelector('.show-pop-report');
  //삭제
  if (menuDelete) {
    menuDelete.addEventListener('click', function (e) {
      openPop(typeText, '삭제', thisParent, comment.id);
    });
  }
  신고;
  if (menuReport) {
    menuReport.addEventListener('click', function (e) {
      openPop(typeText, '신고', thisParent, comment.id);
    });
  }
}

//상단메뉴
function menuMore(e) {
  typeText = '더보기';
  thisParent = e.currentTarget.closest('header');
  // thisUser = '';
  inButton = `<button class='setting-profile'>설정 및 개인정보</button>
  <button class='show-pop-logout'>로그아웃</button>`;

  addMenu();

  const menuProfile = thisParent.querySelector('.setting-profile');
  const menuLogout = thisParent.querySelector('.show-pop-logout');

  //설정 및 개인정보
  if (menuProfile) {
    menuProfile.addEventListener('click', function (e) {
      location.href = '/profile-mod';
    });
  }
  //로그아웃
  if (menuLogout) {
    menuLogout.addEventListener('click', function (e) {
      openPop(typeText, '로그아웃', thisParent);
    });
  }
}

//판매상품 메뉴
function menuProduct(e, product) {
  thisParent = e.currentTarget.closest('.product-wrap');
  typeText = '판매 상품';
  inButton = `
  <button class='show-pop-delete'>삭제</button>
  <button type='button' class='modify'>수정</button>
  <button type='button' class='view-product'>웹사이트에서 상품보기</button>
  `;

  addMenu();

  const menuDelete = thisParent.querySelector('.show-pop-delete');
  const menuModify = thisParent.querySelector('.modify');
  const menuView = thisParent.querySelector('.view-product');
  //삭제
  if (menuDelete) {
    menuDelete.addEventListener('click', function (e) {
      openPop(typeText, '삭제', thisParent, product.id);
    });
  }
  //수정
  if (menuModify) {
    menuModify.addEventListener('click', function (e) {
      location.href = `/product/${product.id}`;
    });
  }
  //웹사이트로 이동
  if (menuView) {
    menuView.addEventListener('click', function (e) {
      location.href = product.link;
    });
  }
}

//하단 메뉴
function addMenu() {
  const menuModal = document.createElement('section');
  menuModal.classList.add('menu-modal');
  menuModal.innerHTML = `
    <div class='inner'>
      <h2 class='a11y-hidden'>${typeText} 메뉴</h2>
      ${inButton}
      <button class='close-modal'><span class='a11y-hidden'>${typeText} 메뉴 닫기</span></button>
    </div>
    <div class="dim"></div>
  `;
  thisParent.appendChild(menuModal);

  const firstFocus = thisParent.querySelector('.menu-modal button');

  firstFocus.focus();
  firstFocus.addEventListener('keydown', keyShiftTabEvent);
  thisParent.querySelector('.close-modal').addEventListener('keydown', keyTabEvent);
  thisParent.querySelector('.close-modal').addEventListener('click', clearModal);
  thisParent.querySelector('.dim').addEventListener('click', clearModal);
}

//확인 팝업
function openPop(typeText, buttonText, thisParent, thisId) {
  if (buttonText === '삭제') {
    inButton = `<button class='delete'>삭제</button>`;
    addPop(typeText, '삭제', thisParent, inButton, thisId);
  } else if (buttonText === '신고') {
    inButton = `<button class='report'>신고</button>`;
    addPop(typeText, '신고', thisParent, inButton, thisId);
  } else if (buttonText === '로그아웃') {
    inButton = `<button class='logout'>로그아웃</button>`;
    addPop(typeText, '로그아웃', thisParent, inButton);
  }
}
//확인 팝업 (~하시겠습니까)
function addPop(typeText, buttonText, thisParent, inButton, thisId) {
  const popModal = document.createElement('div');
  popModal.classList.add('pop-modal');
  const dim = document.createElement('div');
  dim.classList.add('pop-dim');
  popModal.innerHTML = `
      <p>${buttonText}하시겠습니까?</p>
      <div class="flex">
        <button class='cancel'>취소</button>
        ${inButton}
      </div>
    `;
  thisParent.appendChild(popModal);
  thisParent.appendChild(dim);

  popModal.querySelector('.cancel').focus();
  popModal.querySelector('.cancel').addEventListener('click', clearModal);
  popModal.querySelector('.cancel').addEventListener('keydown', keyShiftTabEvent);
  popModal.querySelector('button:last-child').addEventListener('keydown', keyTabEvent);
  dim.addEventListener('click', clearModal);

  const deleteBtn = popModal.querySelector('.delete');
  const reportBtn = popModal.querySelector('.report');
  if (typeText === '게시글') {
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function () {
        deleteEvent(thisId);
      });
    }
    if (reportBtn) {
      reportBtn.addEventListener('click', function () {
        reportEvent(thisId);
      });
    }
  } else if (typeText === '댓글') {
    if (deleteBtn) {
      deleteBtn.addEventListener('click', function () {
        deleteComment(thisId);
      });
    }
    if (reportBtn) {
      reportBtn.addEventListener('click', function () {
        reportComment(thisId);
      });
    }
  } else if (typeText === '판매 상품') {
    popModal.querySelector('.delete').addEventListener('click', function () {
      deleteProduct(thisId);
    });
  } else if (typeText === '더보기') {
    //로그아웃
    popModal.querySelector('.logout').addEventListener('click', function () {
      localStorage.removeItem('profileImg');
      localStorage.removeItem('accountname');
      localStorage.removeItem('token');
      location.href = `/loading`;
    });
  }
}

//모달창 닫기
function clearModal() {
  const menuModal = document.querySelector('.menu-modal');
  const popModal = document.querySelector('.pop-modal');
  const dim = document.querySelector('.pop-dim');
  if (menuModal) {
    menuModal.remove();
    if (popModal) {
      popModal.remove();
      dim.remove();
    }
  }
}

//키보드 Tab 포커스이동
function keyTabEvent(e) {
  const targetClass = e.currentTarget.className;
  const firstButton = e.currentTarget.closest('div').querySelector('button');

  if (
    targetClass === 'close-modal' ||
    targetClass === 'report' ||
    targetClass === 'delete' ||
    targetClass === 'logout'
  ) {
    //tab
    if (!e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      window.setTimeout(function () {
        firstButton.focus();
      }, 100);
    }
  }
}

//키보드 Shift+Tab 포커스이동
function keyShiftTabEvent(e) {
  const targetClass = e.currentTarget.className;
  const lastButton = e.currentTarget.closest('div').querySelector('button:last-child');
  if (
    targetClass === 'show-pop-report' ||
    targetClass === 'show-pop-delete' ||
    targetClass === 'cancel' ||
    targetClass === 'setting-profile'
  ) {
    if (e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      window.setTimeout(function () {
        lastButton.focus();
      }, 100);
    }
  }
}

//판매 상품 삭제하기(강혜진 작성)
async function deleteProduct(productId) {
  const popModal = document.querySelector('.pop-modal');
  popModal.innerHTML = `
      <p>삭제되었습니다.</p>
  `;
  await fetch(`${url}/product/${productId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  setTimeout(function () {
    location.href = `/profile/${nowUrl.split('/profile/')[1]}`;
  }, 800);
}
