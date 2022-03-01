const $loginBtn = document.querySelector('#login-btn');
const loginInputVal = document.querySelector('.email-inp');
const pwInputVal = document.querySelector('.pw-inp');

// id 입력시 버튼 활성화
loginInputVal.addEventListener('input', loginchangeBtn);
// pw 입력시 버튼 활성화 (changeBtn 내에서 교차검증)
pwInputVal.addEventListener('input', loginchangeBtn);
// login 기능
$loginBtn.addEventListener('click', login);

// 에러메시지 해제
loginInputVal.addEventListener('click', loginErrorOff);
pwInputVal.addEventListener('click', loginErrorOff);

//로그인버튼 활성화
function loginchangeBtn() {
  if (
    document.querySelector('.email-inp').value !== '' &&
    document.querySelector('.pw-inp').value !== ''
  ) {
    $loginBtn.disabled = false;
  } else {
    $loginBtn.disabled = true;
  }
}

// 로그인
async function login() {
  const email = document.querySelector('#email-id').value;
  const pw = document.querySelector('#password-id').value;
  const loginData = {
    user: {
      email: email,
      password: pw,
    },
  };
  const res = await fetch('https://api.mandarin.cf' + '/user/login', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(loginData),
  });
  const json = await res.json();
  console.log(json);
  if (json.status !== 422) {
    localStorage.setItem('token', json.user.token);
    localStorage.setItem('accountname', json.user.accountname);
    localStorage.setItem('profileImg', json.user.image);
  } else {
    loginErrorOn();
  }
  location.href = './';
}

// 에러메시지
const loginerroremail = document.querySelector('#login-id-error-message');
const loginerrorpw = document.querySelector('#pw-id-error-message');

// 에러 Input
const loginerroremailInp = document.querySelector('#login-id-label-input');
const loginerrorpwInp = document.querySelector('#login-pw-label-input');

// 에러 걸어줘야할때
function loginErrorOn() {
  loginerrorpwInp.classList.add('error');
  loginerroremailInp.classList.add('error');
  loginerrorpw.style.display = 'block';
}

// 에러 해제 해줘야할떄
function loginErrorOff() {
  loginerroremailInp.classList.remove('error');
  loginerrorpwInp.classList.remove('error');
  loginerrorpw.style.display = 'none';
}
