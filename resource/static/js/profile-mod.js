// 본인의 프로필 정보를 받아오기
// 이미지 업로드 (1개만 선택 가능) 
// 사용자 id 유효성 검사 
// 마이 프로필 페이지로 이동 
// 저장 클릭 시 데이터 서버전송 ?? 수정 

//localStorage
// const token = localStorage.getItem('token');
// const userId = localStorage.getItem('accountname');

const url = "http://146.56.183.55:5050"; 
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzcwMjM1MSwiaWF0IjoxNjQyNTE4MzUxfQ.SwqCtFFct_LKNGNcdUbRAlRT4AvC9KqJmg76T1qKOPo';
const $imageUpload = document.querySelector('chooseImg');
const $imagePre = document.querySelector('.imgPre');
const hrefLink = location.href;
const saveBtn = document.querySelector('.submit-btn'); 

async function getUserData() {
    const res = await fetch(`${url}/profile/hey_binky`, {
        method:"GET",
        headers: {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzcwMjM1MSwiaWF0IjoxNjQyNTE4MzUxfQ.SwqCtFFct_LKNGNcdUbRAlRT4AvC9KqJmg76T1qKOPo",
            "Content-Type": "application/json",
            }
    });
    const result = await res.json();
    // console.log(result);
    const userName = document.querySelector("#user-name");
    userName.value = result.profile.accountname;
    const userId = document.querySelector("#user-id");
    userId.value = result.profile.username;
    const userIntro = document.querySelector("#intro-input");
    userIntro.value = result.profile.intro;
    const userImage = document.querySelector(".imgPre");
    userImage.src = result.profile.image;
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



//프로필 수정
async function editProfile() {
    const res = await fetch (`${url}/profile/hey_binky`, {
        method: "PUT",
        headers : {
            "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzcwMjM1MSwiaWF0IjoxNjQyNTE4MzUxfQ.SwqCtFFct_LKNGNcdUbRAlRT4AvC9KqJmg76T1qKOPo" 
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            "user": {
                "username": String,
                "accountname": String,
                "intro": String,
                "image": String
            }
        })
    })
}
//ID 유효성 검사
// async function checkIdValid(id) {
//     const res = await fetch(localStorage.getItem("url")+'/user/idvalid', {
//         method:"POST",
//         headers: {
//                 "Content-Type": "application/json",
//             },
//         body:JSON.stringify({
//             "userId":{
//                     "id": id
//             }
//         })
//     })
//     const json = await res.json()
//     return json.message == "사용 가능한 아이디 입니다." ? true : false
// }

//Id 중복 검사
async function checkIdValid(id) {
    const res = await fetch(`${url}/profile/hey_binky`+'idvalid', {
        method:"POST",
        headers: {
                "Content-Type": "application/json",
            },
        body:JSON.stringify({
            "userId":{
                    "id": id
            }
        })
    })
    const json = await res.json()
    return json.message == "사용 가능한 아이디 입니다." ? true : false
}
document.querySelector(".submit-btn").addEventListener('click', async () => {
    const id = document.querySelector("#user-id").value
    const idValid = await checkIdValid(id)
    if (idValid) {
        alert ("사용 가능한 ID 입니다.")
    } else {
        alert ("중복된 ID 입니다.")
    }
})

  // input 값 
async function join() {
    const userName = document.querySelector('#user-id');
    const userId = document.querySelector('#user-id');
    const intro = document.querySelector('#intro-input');
    const imageUrl = document.querySelector('.imgPre').src 
    try {
        const res = await fetch("http://146.56.183.55:5050/user", {
            method : "PUT",
            headers : {
                "Content-Type" : "application/json",
                "Authorization" : "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxY2E2MzhhYjVjNmNkMTgwODRlNDQ3ZCIsImV4cCI6MTY0NzcwMjM1MSwiaWF0IjoxNjQyNTE4MzUxfQ.SwqCtFFct_LKNGNcdUbRAlRT4AvC9KqJmg76T1qKOPo" 
            },
            body : JSON.stringify({
                "user" : {
                    "username" : userName.value,
                    "accountname" : userId.value,
                    "intro" : intro.value,
                    "image" : imageUrl,
                }
            })
        })
    const json = await res.json()
    console.log(json, "여기");
    
    const failMsg = "이미 사용중이 계정 ID입니다.";

    if (json.message !== failMsg) {
        location.href = "/profile-mod"
    } else {
        console.log(json); //3번 
    }
} catch(err) {
    alert('에러났네');
}
}
 //버튼 활성화 
saveBtn.addEventListener('click', join)
