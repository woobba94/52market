//localStorage
const myAccountName = localStorage.getItem('accountname');
const myToken = localStorage.getItem('token');
const $imageUpload = document.querySelector('chooseImg');
const $imagePre = document.querySelector('.imgPre');
const hrefLink = location.href;
const $saveBtn = document.querySelector('.submit-btn');

const warningMsg1 = document.querySelector('.error-message1');
const warningMsg2 = document.querySelector('.error-message2');
const warningMsg3 = document.querySelector('.error-message3');

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

// user-name 글자 수 검사
function userNameVal(userName) {
    if (userName.length < 2) {
        warningMsg1.style.display = 'block';
        return true;
    }
    return false;
}

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
        return;
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
      
    } else {
        localStorage.profileImg = json.user.image;
        location.href = `/profile/${myAccountName}`
    }

}

// 저장 버튼 
$saveBtn.addEventListener('click', editProfile);
