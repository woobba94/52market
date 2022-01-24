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
const warningMsg2 = document.querySelector('.error-message2');
const warningMsg3 = document.querySelector('.error-message3');
//사용중인 아이디

// user 정보 받아서 뿌려주기
const myName = document.querySelector("#user-name");
const myId = document.querySelector("#now-user-id");

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

    myName.value = result.profile.username;

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


// let userIds = myId.value;
// console.log(userIds);
// 아이디 중복 검사 
// async function checkIdValid(newMyId) {

//     const res = await fetch(`${url}/user/accountnamevalid`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//             "user": {
//                 "accountname": newMyId,
//             }
//         })
//     })
//     const checkId = await res.json();

//     return checkId.message == "사용 가능한 계정ID 입니다." ? true : false
// }


// user-name 글자 수 검사
function userNameVal(userName) {
    if (userName.length < 2) {
        warningMsg1.style.display = 'block';
        return true;
    }
    return false;
}

// id 유효성 정규식 구문 (영문 숫자 밑줄 하이픈)
// function id_check(idVal) {
//     const userIdReg = /^[a-zA-Z0-9_.]/;
//     return userIdReg.test(idVal) === true ? true : false;
// }

// function idError() {
//     const test = myId.value;
//     const userIdReg = /^[a-zA-Z0-9_.]/;
//     const ans = userIdReg.test(test);
//     console.log(ans);
//     return ans;
// }
// 버튼 활성화
// function btnChange() {
//     if(newUserNames.value !== '' && focusrId.value !== '') {
//         $saveBtn.disabled = false; 
//     } else {
//         $saveBtn.disabled = true;
//     }
// }

// warning message remove
const focusName = document.querySelector('#user-name');

focusName.addEventListener("click", function () {
    warningMsg1.style.display = "none";
});

// const focusId = document.querySelector('#now-user-id');
myId.addEventListener("click", function () {
    warningMsg2.style.display = "none";
});

//프로필 수정 값 체크 후 서버 전송
async function editProfile() {
    const newUserName = document.querySelector('#user-name').value;
    const intro = document.querySelector('#intro-input').value;
    const imageUrl = document.querySelector('.imgPre').src
    // const newUserId = myId.value;
    if (userNameVal(newUserName)) {
        return ;
    }
    const res = await fetch(`${url}/user`, {
        method: "PUT",
        headers: {
            "Authorization": `Bearer ${myToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "user": {
                "username": newUserName,
                "accountname": myAccountName,
                "intro": intro,
                "image": imageUrl,
            }
        })
    })
    const json = await res.json();
    if (json.status === 422) {
        warningMsg2.style.display = "block";
    // } else if (idError()) {
    //     warningMsg3.style.display = "block";
    } else {
        location.href = `/profile/${myAccountName}`
    }
    // if (checkIdValid(newUserId)) {
    // }

}
// // 저장 버튼 
$saveBtn.addEventListener('click', editProfile);





// else if (json.status === 422 && idError(false)){
//     warningMsg2.style.display="block";
//     warningMsg1.style.display = "block";
// }
// if (json.status === 422) {
//     if(msg == '이미 사용중인 계정 ID입니다.') {
//     warningMsg2.style.display = "block";
//     } 
// } else if (id_check(false)) {
//     warningMsg1.style.display = "block";
// } else (json.status === 200) {
//     location.href = `/profile/${myAccountName}`;
// }
// }

// if (id_check(true)) {
//     if (json.status === 200) {
//         location.href = `/profile/${myAccountName}`;
//     } else {
//         warningMsg2.style.display = "block";
//     }
// } else (id_check) {
//     warningMsg1.style.display = "block";
// }

// if (json.status === 422) {

// if (id_check(false)) {
//     warningMsg1.style.display = "block";
// } else ()
// $saveBtn.classList.remove('disabled');
//     location.href = `/profile/${myAccountName}`;
// } else if(id_check(false)) {
//     warningMsg1.style.display = "block";
// } else if (json.status === 422) {
//     warningMsg2.style.display = "block";
// }

// if (json.status === 422) {
//     warningMsg2.style.display = "block";
// } else if (id_check(false)) {
//     warningMsg1.style.display = "block";
// }
// else if (json.status === 422 && idError(false)){
//     warningMsg2.style.display="block";
//     warningMsg1.style.display = "block";
// }
//     else (id_check(true) && json.status === 200) {
//         location.href = `/profile/${myAccountName}`;
//     }
// }


//         if (json.status === 422) {
//             warningMsg2.style.display = "block";
//         } else if (idError(false)) {
//             warningMsg3.style.display = "block";
//         }
//         else {
//             location.href = `/profile/${myAccountName}`
// }

// if (json.status === 200) {
//     location.href = `/profile/${myAccountName}`
// } else if (idError(false)) {
//     warningMsg3.style.display = "block";
// }
// else {
//     location.href = `/profile/${myAccountName}`
// }
