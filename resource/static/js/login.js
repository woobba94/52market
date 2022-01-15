// 이메일로 회원가입
// document.getElementById('signup-check-btn').addEventListener('click', signUpCheck);


// function signUpCheck(){
//     console.log('hello');
//     return location.href = "http://localhost:8080/login";
// }



const $loginBtn = document.querySelector('#login-btn');
$loginBtn.addEventListener("click",login)

// 로그인 
function getInput() {
    console.log(document.querySelector("#email-id").value);
    console.log(document.querySelector("#password-id").value);
}

// 비동기로 쓸것이기 때문에 async
async function login() {
    // getInput();
    const email = document.querySelector("#email-id").value
    const pw = document.querySelector("#password-id").value
    const url = 'http://146.56.183.55:5050'
        const loginData = {
                "user":{
                        "email": email,
                        "password": pw
                        }
                }
        
        const res = await fetch('http://146.56.183.55:5050/user/login',{
            method:"POST",
            headers:{
                "Content-type" : "application/json"
            },
            body:JSON.stringify(loginData)
        })
        const json = await res.json()
        localStorage.setItem("Token",json.user.token)
        location.href = "./resource/pages/index.html"
        
    }

// async function getFeed() {
//     const url = localStorage.getItem("Url");
//     const token = localStorage.getItem("Token");
//     const res = await fetch(url + "/post/feed",
//         {
//             method: "POST",
//             headers: {
//                 "Authorization": `Bearer ${token}`,
//                 "Content-type": "application/json"
//             }
//         });
//     const json = await res.json()
//     console.log(json.posts);
//     const posts = json.posts
//     posts.forEach(post => {
//         const authorImage = post.author.image
//         const authorAccount = post.author.accountname
//         const authorName = post.author.username
//         const commentCount = post.commentCount
//         const content = post.content
//         const heartCount = post.heartCount
//         const hearted = post.hearted
//         document.querySelector(".container").innerHTML+=`
//             <div class="post-container">
//                 <img class="profileimg" src="${authorImage}"/>
//                 <div class="h">${authorAccount}</div>
//                 <div class="h">${authorName}</div>
//                 <div class="h">${content}</div>
//                 <div class="h">${commentCount}</div>
//                 <div class="${hearted ?"yes":"no"}">${hearted}</div>
                
//             </div>                
//             `
//     });
// }


// const data = await fetch();
// const json = await data.json();
// data가 끝날때 json을 해라


