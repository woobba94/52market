//localStorage
const myAccountName = localStorage.getItem('accountname');
const myToken = localStorage.getItem('token');
const $imageUpload = document.querySelector('chooseImg');
const $imagePre = document.querySelector('.imgPre');
const hrefLink = location.href;
const $saveBtn = document.querySelector('.submit-btn');

// const newUserNames = document.querySelector('#user-id');
// console.log(newUserNames);

const warningMsg1 = document.querySelector('.error-message1');
const warningMsg2 = document.querySelector('.error-message2'); //사용중인 아이디
// user 정보 받아서 뿌려주기
async function getUserData() {
    const res = await fetch(`${url}/profile/${myAccountName}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${myToken}`,
            "Content-Type": "application/json",
        }
    });
    const result = await res.json();
    console.log(result);

    const myName = document.querySelector("#user-name");
    myName.value = result.profile.username;
    const myId = document.querySelector("#user-id");
    // console.log(result.profile, "프로필");
    // console.log(result.prorile.accountname, "어카운");
    myId.value = result.profile.accountname;
    const myIntro = document.querySelector("#intro-input");
    myIntro.value = result.profile.intro;
    const myImage = document.querySelector(".imgPre");
    myImage.src = result.profile.image;
}
getUserData();

//이미지 업로드
async function imageUpload(files) {
    const formData = new FormData();
    formData.append("image", files[0]);
    const res = await fetch(`${url}/image/uploadfile`, {
        method: 'POST',
        body: formData
    })
    const data = await res.json();
    const productImgName = data["filename"];
    return productImgName;
}

async function profileImage(e) {
    const files = e.target.files
    const result = await imageUpload(files)
    $imagePre.src = url + '/' + result //여기 수정
    console.log(result)
}

document.querySelector('#chooseImg').addEventListener("change", profileImage);


// 아이디 중복 검사 
async function checkIdValid(id) {
    const res = await fetch(`${url}/user/accountnamevalid`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "user": {
                "accountname": username
            }
        })
    })
    const checkId = await res.json();
    return checkId.message == "사용 가능한 계정ID 입니다." ? true : false
}

// id 유효성 정규식 구문 (영문 숫자 밑줄 하이픈)
function id_check(idVal) {
    const userIdReg = /^[a-zA-Z0-9_.]/;
    return userIdReg.test(idVal) === true ? true : false;
}

function idError() {
    const newUserNames = document.querySelector('#user-id');
    const test = newUserNames.value;
    if (id_check(test)) {
        return true;
    }
    return false;
}

// warning message remove
const focusName = document.querySelector('#user-name');
console.log(focusName);
focusName.addEventListener("click", function () {
    warningMsg1.style.display = "none";
});

const focusId = document.querySelector('#user-id');
focusId.addEventListener("click", function () {
    warningMsg2.style.display = "none";
});

//프로필 수정 값 체크 후 서버 전송
async function editProfile() {
    const userName = document.querySelector('#user-name').value;
    const userId = document.querySelector('#user-id').value;
    const intro = document.querySelector('#intro-input').value;
    const imageUrl = document.querySelector('.imgPre').src
    console.log(imageUrl);

    const res = await fetch(`${url}/user`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${myToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": {
                "username": userName,
                "accountname": userId,
                "intro": intro,
                "image": imageUrl,
            }
        })
    })
    console.log(res);
    const json = await res.json();

    if (json.status === 422) {
        warningMsg2.style.display = "block";
    } else if (idError(false)) {
        warningMsg1.style.display = "block";
    }
    // else if (json.status === 422 && idError(false)){
    //     warningMsg2.style.display="block";
    //     warningMsg1.style.display = "block";
    // }
    else {
        location.href = `/profile/${myAccountName}`
    }
}

// 저장 버튼 
$saveBtn.addEventListener('click', editProfile);
