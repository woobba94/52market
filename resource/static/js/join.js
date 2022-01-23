
// email, 프로필 페이지
const $signupEmailPw = document.querySelector("#singup-emailpw")
const $signupProfile = document.querySelector("#singup-profile")

const $signUpBtn = document.querySelector('#signup-check-btn');
const signUpidInput = document.querySelector("#email-id");
const signUppwInput = document.querySelector("#password-id");

// 에러메시지
const erroremail = document.querySelector(".id-error-message");
const errorpw = document.querySelector(".pw-error-message");

// 에러 Input
const erroremailInp = document.querySelector(".label-input-id");
const errorpwInp = document.querySelector(".label-input-pw");

// 이메일 중복체크
async function checkEmailValid(email) {
    // const url = 'http://146.56.183.55:5050'
    const res = await fetch(url + '/user/emailvalid', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": {
                "email": email
            }
        })
    })
    const json = await res.json()
    return json.message == "사용 가능한 이메일 입니다." ? true : false

    // return 이 이메일이 사용가능하지 체크를 할거에요.
}
document.querySelector("#signup-check-btn").addEventListener("click", async () => {
    const email = document.querySelector("#email-id").value
    const pw = document.querySelector("#password-id").value

    // 이메일 패스워드 유효성
    if (pw_check(pw)) {
        const emailValid = await checkEmailValid(email)
        if (email_check(email)) {
            if (!emailValid) {
                signUpErrorOn(1);
            }
            else {
                $signupProfile.style.display = "block";
                $signupEmailPw.style.display = "none";
            }
        }
        // 아이디 검증
        else {
            erroremail.innerHTML = "이메일 형식이 올바르지 않습니다";
            signUpErrorOn(1);
        }
    } else // 비밀번호 검증
    {
        signUpErrorOn(2);
    }
})

// 이메일 입력시 버튼 활성화
signUpidInput.addEventListener('input', changeBtn);
// pw 입력시 버튼 활성화 (changeBtn 내에서 교차검증)
signUppwInput.addEventListener('input', changeBtn);
//로그인버튼 활성화
function changeBtn() {
    if (signUpidInput.value !== '' && signUppwInput.value !== '') {
        $signUpBtn.disabled = false;
        signUpErrorOff(1);
        signUpErrorOff(2);

    } else {
        $signUpBtn.disabled = true;

    }
}

// 이메일 정규식 체크
function email_check(email) {
    const checkid = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

    return checkid.test(email) === true ? true : false;
}

function pw_check(pw) {
    const checkpw = /^[a-zA-Z0-9]{6,12}$/;

    return checkpw.test(pw) === true ? true : false;
}

// 에러 걸어줘야할때
function signUpErrorOn(val) {
    switch (val) {
        case 1:
            erroremailInp.classList.add('error');
            erroremail.style.display = "block";
            break;
        case 2:
            errorpwInp.classList.add('error');
            errorpw.style.display = "block";
            break;
        default:
            console.log(val);
    }
}

// 에러 해제 해줘야할떄
function signUpErrorOff(val) {
    switch (val) {
        case 1:
            erroremailInp.classList.remove('error');
            erroremail.style.display = "none";
            break;
        case 2:
            errorpwInp.classList.remove('error');
            errorpw.style.display = "none";
            break;
        default:
            console.log(val);
    }
}

///////////////////////// 프로필
const $profilenextBtn = document.querySelector("#profile-next-btn");
const profileidInput = document.querySelector("#profile-id");
const profilenameInput = document.querySelector("#signup-nickname");
const $signUpimagePre = document.querySelector("#signUpimagePre");

profileidInput.addEventListener('input', profilechangeBtn);
profilenameInput.addEventListener('input', profilechangeBtn);
//프로필 버튼 활성화
async function profilechangeBtn() {
    if (profileidInput.value !== '' && profilenameInput.value !== '') {
        $profilenextBtn.disabled = false;
    } else {
        $profilenextBtn.disabled = true;
    }
    await profileBtnText();

}

// 비동기 프로필 버튼 텍스트 변경
async function profileBtnText() {
    if (profileidInput.value !== '' && profilenameInput.value !== '') {
        $profilenextBtn.innerText = "오이마켓 시작하기"
    } else {
        $profilenextBtn.innerText = "다음"
    }
}

async function imageUpload(files) {
    // 서버로 날아가긴위한 임의의 폼 형식
    const formData = new FormData();
    // console.log(url);
    formData.append("image", files[0]);//formData.append("키이름","값")
    const res = await fetch(url + '/image/uploadfile', {
        method: "POST",
        body: formData
    })
    const data = await res.json()
    const productImgName = data["filename"];
    return productImgName
}


async function profileImage(e) {
    const files = e.target.files
    const result = await imageUpload(files)
    $signUpimagePre.src = url + "/" + result;

}
document.querySelector(".imgbtn-img").addEventListener("change", profileImage)
// document.querySelector(".imgbtn-img").addEventListener("click", profileImage)

async function join() {
    const email = document.querySelector("#email-id").value;
    const password = document.querySelector("#password-id").value;
    const userName = document.querySelector("#signup-nickname").value;
    const userId = document.querySelector("#profile-id").value;
    const intro = document.querySelector("#profile-introduce-id").value;
    const imageUrl = document.querySelector("#signUpimagePre").src
    try {
        const res = await fetch(url + "/user", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                "user": {
                    "email": email,
                    "password": password,
                    "username": userName,
                    "accountname": userId,
                    "intro": intro,
                    "image": imageUrl,
                    // "token":token,
                }
            })
        })
        console.log(res)
        const json = await res.json()
        const message = json.message
        // 서버에 image, accountname 올리기
        if (res.status == 200) {
            localStorage.setItem("accountname", json.user.accountname);
            localStorage.setItem("profileImg", json.user.image);
            login();
            console.log(json);

        }
        else {
            console.log(json)
        }
    } catch (err) {
        alert(err)
    }
}
$profilenextBtn.addEventListener("click", join)

const testbtn2 = document.querySelector("#signup-check-btn");

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
    console.log(json);
    localStorage.setItem("token", json.user.token)

    location.href = "/"
}
