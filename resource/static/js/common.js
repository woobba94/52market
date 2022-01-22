/*
  Kang Hyejin
  강혜진 작성파일
*/

const url = 'http://146.56.183.55:5050'; // API url

//로그인시 저장된 localStorage
const token = localStorage.getItem('token');
const userId = localStorage.getItem('accountname');
const userProfile = localStorage.getItem('profileImg');
// 우진추가
const link = document.querySelector('.btn-user');
link.href = `/profile/${userId}`;
//flagment
const frag = document.createDocumentFragment();
//현재 주소
const nowUrl = location.href;

//이전버튼
const btnBack = document.querySelector('header .btn-back');
const prevBtn = document.querySelector('.btn-prev-back'); //404 페이지

//메인메뉴
const mainMenu = document.querySelector('.main-menu');

//프로필,채팅 페이지 더보기 버튼
const headerMoreBtn = document.querySelector('header .btn-more');

if (headerMoreBtn) {
  headerMoreBtn.addEventListener('click', showMenu);
}

//메인메뉴
if (mainMenu) {
  if (nowUrl.indexOf('/chat') !== -1) {
    // '/chat' 페이지
    mainMenu.querySelector('.btn-chat').closest('li').classList.add('active');
  } else if (nowUrl.indexOf('/profile/') === -1 && nowUrl.indexOf('/profile') !== -1) {
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
  history.back();
}

//하단 메뉴 등장
function showMenu(e) {
  let type = e.currentTarget.className;
  let typeText = '댓글';
  let thisParent = null;
  let inButton = '';
  let thisUser = '';

  if (type.indexOf('btn-more') !== -1 && type.indexOf('imgbtn-more') === -1) {
    //상단 더보기 버튼일경우
    typeText = '더보기';
    thisParent = e.currentTarget.closest('header');
    thisUser = '';
  } else if (type.indexOf('comment') !== -1) {
    // 댓글일경우
    typeText = '댓글';
    thisParent = e.currentTarget.closest('.user-wrap');
    thisUser = thisParent.querySelector('.user-title').getAttribute('href').split('/profile/')[1];
  } else {
    //게시글일 경우
    typeText = '게시글';
    thisParent = e.currentTarget.closest('article');
    thisUser = thisParent.querySelector('.user-description').textContent.slice(1);
    // const postId = thisParent.id; //게시글 아이디
  }

  if (thisUser === '' && typeText === '더보기') {
    inButton = `<button class='setting-profile'>설정 및 개인정보</button>
    <button class='show-pop-logout'>로그아웃</button>`;
  } else if (thisUser === userId && typeText === '게시글') {
    //나의 게시글일때
    inButton = `<button class='show-pop-delete'>삭제</button>
    <button type='button' class='modify'>수정</button>`;
  } else if (thisUser === userId && typeText === '댓글') {
    //나의 댓글일때
    inButton = `<button class='show-pop-delete'>삭제</button>`;
  } else {
    //나의 글이 아닐때
    inButton = `<button class='show-pop-report'>신고</button>`;
  }

  //모달생성
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
  firstFocus.addEventListener('click', openModal);
  firstFocus.addEventListener('keydown', keyShiftTabEvent);

  thisParent.querySelector('.close-modal').addEventListener('keydown', keyTabEvent);
  thisParent.querySelector('.close-modal').addEventListener('click', clearModal);
  thisParent.querySelector('.dim').addEventListener('click', clearModal);

  if (thisUser === userId) {
    thisParent.querySelector('.modify').addEventListener('click', function () {
      location.href = `/post/${thisParent.id}/edit`;
    });
  }

  thisParent.querySelector('.setting-profile').addEventListener('click', function () {
    location.href = `/profile-mod`;
  });

  thisParent.querySelector('.show-pop-logout').addEventListener('click', openModal);
}

// 팝업 모달 등장
function openModal(e) {
  console.log('로그아웃 클릭');

  const clickBtn = e.currentTarget.textContent; //클릭한 버튼 확인 (삭제/신고/수정)
  let type = e.currentTarget.closest('.inner').querySelector('h2').textContent.split(' ')[0];
  let thisParent = null;
  let inButton = '';
  let thisUser = '';

  console.log('dddd');
  if (type === '댓글') {
    thisParent = e.currentTarget.closest('.user-wrap');
    thisUser = thisParent.querySelector('.user-title').getAttribute('href').split('/profile/')[1];
  } else if (type === '게시글') {
    thisParent = e.currentTarget.closest('article');
    thisUser = thisParent.querySelector('.user-description').textContent.slice(1);
  } else if (type === '더보기') {
    thisParent = e.currentTarget.closest('header');
    thisUser = '';
  }

  if (thisUser === '') {
    inButton = `<button class='logout'>로그아웃</button>`;
  }
  // 나의 글일때
  else if (thisUser === userId) {
    inButton = `<button class='delete'>삭제</button>`;
  } else {
    inButton = `<button class='report'>신고</button>`;
  }
  //모달생성
  const popModal = document.createElement('div');
  popModal.classList.add('pop-modal');
  popModal.innerHTML = `
      <p>${clickBtn}하시겠습니까?</p>
      <div class="flex">
        <button class='cancel'>취소</button>
        ${inButton}
      </div>
    `;
  thisParent.appendChild(popModal);

  popModal.querySelector('.cancel').focus();
  popModal.querySelector('.cancel').addEventListener('click', clearModal);
  popModal.querySelector('.cancel').addEventListener('keydown', keyShiftTabEvent);

  if (thisUser === '') {
    popModal.querySelector('.logout').addEventListener('keydown', keyTabEvent);
  } else if (thisUser === userId) {
    popModal.querySelector('.delete').addEventListener('keydown', keyTabEvent);
  } else {
    popModal.querySelector('.report').addEventListener('keydown', keyTabEvent);
  }

  if (type === '댓글' && thisUser === userId) {
    popModal.querySelector('.delete').addEventListener('click', deleteComment);
  } else if (type === '댓글' && userId !== thisUser) {
    popModal.querySelector('.report').addEventListener('click', reportComment);
  } else if (type === '게시글' && userId === thisUser) {
    popModal.querySelector('.delete').addEventListener('click', deleteEvent);
  } else if (type === '게시글' && userId !== thisUser) {
    popModal.querySelector('.report').addEventListener('click', reportEvent);
  } else if ((type = '더보기' && thisUser === '')) {
    popModal.querySelector('.logout').addEventListener('click', function () {
      localStorage.removeItem('profileImg');
      localStorage.removeItem('accountname');
      localStorage.removeItem('token');
      location.href = `/loading`;
    });
  }
}

//키보드 Tab 포커스이동
function keyTabEvent(e) {
  const targetClass = e.currentTarget.className;
  const firstButton = e.currentTarget.closest('div').querySelector('button');

  if (targetClass === 'close-modal' || targetClass === 'report' || targetClass === 'delete') {
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
    targetClass === 'cancel'
  ) {
    if (e.shiftKey && e.keyCode === 9) {
      e.preventDefault();
      window.setTimeout(function () {
        lastButton.focus();
      }, 100);
    }
  }
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
