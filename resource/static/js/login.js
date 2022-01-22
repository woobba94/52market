const $loginBtn = document.querySelector('#login-btn');
const loginInputVal = document.querySelector(".email-inp");
const pwInputVal = document.querySelector(".pw-inp");

// id 입력시 버튼 활성화
loginInputVal.addEventListener('input', loginchangeBtn);
// pw 입력시 버튼 활성화 (changeBtn 내에서 교차검증)
pwInputVal.addEventListener('input', loginchangeBtn);
// login 기능
$loginBtn.addEventListener("click", login)
//로그인버튼 활성화
function loginchangeBtn() {
    if (document.querySelector(".email-inp").value !== '' &&
        document.querySelector(".pw-inp").value !== '') {
        $loginBtn.disabled = false;
    } else {
        $loginBtn.disabled = true;
    }
}

// 아이디 비밀번호 검증
// function changeInp(){
//     // 
// }

// 로그인 
function getInput() {
    console.log(document.querySelector("#email-id").value);
    console.log(document.querySelector("#password-id").value);
}

// 로그인
// 비동기로 쓸것이기 때문에 async
async function login() {
    // getInput();
    const email = document.querySelector("#email-id").value
    const pw = document.querySelector("#password-id").value
    // const url = 'http://146.56.183.55:5050'
    const loginData = {
        "user": {
            "email": email,
            "password": pw
        }
    }
    const res = await fetch(url + '/user/login', {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    const json = await res.json()
    console.log(url);
    localStorage.setItem("token", json.user.token)
    console.log(json.user.token);
    console.log(json.user.imagePre);
    location.href = "./";
}

 // 에러메시지
 const loginerroremail = document.querySelector("#login-id-error-message");
    const loginerrorpw = document.querySelector("#login-pw-error-message");

    // 에러 Input
    const loginerroremailInp = document.querySelector("#login-id-label-input");
    const loginerrorpwInp = document.querySelector("#login-pw-label-input");

// 에러 걸어줘야할때
function loginErrorOn(val){
        switch(val){
            case 1:
            loginerroremailInp.classList.add('error');
            loginerroremail.style.display = "block";
                break;
            case 2:
            loginerrorpwInp.classList.add('error');
            loginerrorpw.style.display = "block";
                break;
            default:
                console.log(val);                    
        }
    }

    // 에러 해제 해줘야할떄
    function loginErrorOff(val){
        switch(val){
            case 1:
            loginerroremailInp.classList.remove('error');
                loginerroremail.style.display = "none";
                break;
            case 2:
            loginerrorpwInp.classList.remove('error');
                loginerrorpw.style.display = "none";
                break;                    
            default:
                console.log(val);
        }
    }
