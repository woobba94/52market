//localStorage
const myAccountName = localStorage.getItem('accountname');
const url = "http://146.56.183.55:5050";
const myToken = localStorage.getItem('token');
const $imageUpload = document.querySelector('chooseImg');
const $imagePre = document.querySelector('.imgPre');
const hrefLink = location.href;
const $saveBtn = document.querySelector('.submit-btn');

// user 정보 받아서 뿌려주기
async function getUserData() {
    // const accountName = localStorage.getItem('accountname');
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

//프로필 이미지 //userID 변수로 지정!!
// const uploadProfile = document.querySelector('.profile-image-insert-wrap .imgPre');
// uploadProfile.src = userProfile;
// uploadProfile.setAttribute('alt', `${userId}님의 프로필`);

// Id 중복 검사
// async function checkIdValid(id) {
//     const res = await fetch(`${url}/user/accountnamevalid, {
//         method:"POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body:JSON.stringify({
//             "user":{
//                 "accountname": String
//             }
//         })
//     })
//     const json = await res.json();
//     return json.message == "사용 가능한 아이디 입니다." ? true : false
// }



// document.querySelector(".submit-btn").addEventListener('click', async () => {
//     const id = document.querySelector("#user-id").value
//     const idValid = await checkIdValid(id)
//     const failMsg = document.querySelector('.input-warning-msg');

//     if (idValid) {
//         alert ("사용 가능한 ID 입니다.")
//     } else {
//         failMsg.style.display = "block";
//     }
// })

//  {
//   method: 'PUT',
//   headers: {
//     'Content-Type': 'application/json',
//     Authorization: 'Bearer ' + localStorage.getItem('access-token'),
//   },
//프로필 수정 input + id 중복 검사 해야함
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
    console.log(json, "수정된 값 찍어줘");
    // const failMsg = "이미 쓰고있음"
    // const message = json.message;
    // if (json.message !== failMsg)

    if (res.status == 200) {
        location.href = `/profile/${myAccountName}`
    } else {
        console.log(json);
    }
}

//저장버튼 활성화
function profileChangeBtn() {
    if (document.querySelector(".email-inp").value !== '' &&
        document.querySelector(".pw-inp").value !== '') {
        $SaveBtn.disabled = false;
    } else {
        $SaveBtn.disabled = true;
    }
}
//버튼 활성화 
$saveBtn.addEventListener('click', editProfile);