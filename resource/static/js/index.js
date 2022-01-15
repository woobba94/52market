const container = document.querySelector('.container');
console.log(localStorage.getItem("Token"))
if(localStorage.getItem("Token")){
    getFeed()
}
else{
    location.href = './login.html'
}
// console.log(localStorage.getItem("Token"))//요거는 로컬스토리지에 값잘 있나 확인.
async function getFeed() {
    const url = "http://146.56.183.55:5050"
    const token = localStorage.getItem("Token")
    const res = await fetch(url+"/post/feed",{
        method:"GET",
        headers:{
            "Authorization" : `Bearer ${token}`,
            "Content-type" : "application/json"
        }
    })
    const json = await res.json()
    const posts = json.posts
    //forEach문으로 받아온 데이터 전부 살펴보면서 그려주는 부분
    posts.forEach(post => {
        const authorImage = post.author.image
        const authorAccount = post.author.accountname
        const authorName = post.author.username
        const commentCount = post.commentCount
        const content = post.content
        const heartCount = post.heartCount
        const hearted = post.hearted
        document.querySelector(".container").innerHTML+=`
        <div class="post-container">
            <img class="profileimg" src="${authorImage}"/>
            <div class="h">${authorAccount}</div>
            <div class="h">${authorName}</div>
            <div class="h">${content}</div>
            <div class="h">${commentCount}</div>
            <div class="${hearted ?"yes":"no"}">${hearted}</div>
            
        </div>                
        `
    });
}
getFeed()