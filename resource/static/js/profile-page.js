const accountName = location.href.split("/profile/")[1];
const hrefLink = location.href;
const followersNum = document.querySelector('.followers-num');
const followingsNum = document.querySelector('.followings-num');
// const urls = "http://146.56.183.55:5050"; 
// const tokens = localStorage.getItem('token');

// console.log(accountName);
//user 정보 가져와서 뿌려주기 
async function getUserData() {
    const res = await fetch(`${url}/profile/${accountName}`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
        }
    });
    const result = await res.json();
    // console.log(result);

    const userName = document.querySelector(".user-name");
    userName.innerText = "@" + result.profile.accountname;

    const thisUserId = document.querySelector(".user-id");

    thisUserId.innerText = result.profile.username;

    const userIntro = document.querySelector(".user-wrap");
    userIntro.innerText = result.profile.intro;

    const userImage = document.querySelector(".imgPre");
    userImage.src = result.profile.image;

    followersNum.innerText = result.profile.followerCount;
    followingsNum.innerText = result.profile.followingCount;

    //등록한 상품 정보 불러오기
}

getUserData();

const mainElement = document.querySelector('.container');

// 상품 정보 가져오기
async function getProductList() {
    const response = await fetch(`http://146.56.183.55:5050/product/${accountName}`, {
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-type": "application/json"
        }
    });
    this.productList = await response.json();

    // console.log(productList);


}


// const storeLink = document.querySelector('#storeLinkInput');

// 현재 상품 정보 세팅
async function setCurrentProduct() {
    const productName = document.querySelector('.product-name');
    const productPrice = document.querySelector('.product-price');
    const productImgInput = document.querySelector('.product-img');

    await this.getProductList();

    const datas = await
    this.productList['product'];
    // console.log(datas);


    datas.map(data => {
        const productList = document.querySelector('.product-list');
        let productBox = document.createElement('li');
        // this.productImgName = data['itemImage']; 
        // productImgInput.src = this.productImgName;
        // productName.innerText = data['itemName'];
        // productPrice.innerText = data['price']+ "원";
        // console.log(data);

        productBox.innerHTML = `
        <a href="${data.link}">
        <img src="${data.itemImage}" class="product-img" alt="상품사진"></a>
        <p class="product-name">${data.itemName}</p>
        <em class="product-price">${data.price}</em>
        `
        productList.appendChild(productBox);
        // data.product.forEach((ele) => {
        //     console.log(ele);
        // })

        // console.log(data.product);

    })

    // productImgInput.setAttribute('data-state', 1);
    // productName.setAttribute('data-state', 1);
    // productPrice.setAttribute('data-state', 1);
    // this.btnActive();
}

setCurrentProduct();
getProductList();




// addFollowBtn.insertAdjacentHTML('afterEnd', `<button type="button" class="button button-ms line btn-mod profile-edit"> 프로필 수정</button>
// <button type="button" class="button button-ms line move-product">상품 등록</button>`);

const addFollowBtn = document.querySelector('.btns-wrap');
// if ( accountName == thisUserId)
if (accountName == userId) {
    addFollowBtn.innerHTML = `<a class="button button-ms line btn-mod profile-edit" href="/profile-mod"> 프로필 수정</a>
    <a class="button button-ms line move-product" href="/product">상품 등록</a>`;
} else {
    const BTN_FOLLOW = document.querySelector('.button-ms');
    addFollowBtn.innerHTML = `<a class="imgbtn imgbtn-message" href="/chat">메시지</a>
    <button class="button-ms active-button">팔로우</button>
    <a class="imgbtn imgbtn-share" href="#">공유버튼
    </a>`;

    BTN_FOLLOW.addEventListener('click', () => {
        if (BTN_FOLLOW.innerText == '팔로우') {
            BTN_FOLLOW.classList.toggle('show')
            BTN_FOLLOW.innerHTML = "언팔로우";
        } else {
            BTN_FOLLOW.classList.remove('show')
            BTN_FOLLOW.innerText = '팔로우';
        }
    })

}

// 내 프로필버튼 
function 내프로필버튼() {

    // 프로필 페이지로 이동
    function moveProfileModPage() {
        const PROFILE_MOD_PAGE = document.querySelector(".profile-edit");

        PROFILE_MOD_PAGE.addEventListener("click", function () {
            location.href = "./profile-mod";
        })
    }
    moveProfileModPage();


    // 상품등록 페이지로 이동
    function moveProductPage() {
        const PRODUCT_PAGE = document.querySelector(".move-product");

        PRODUCT_PAGE.addEventListener("click", function () {
            location.href = "./product";
        })
    }
    moveProductPage();
}


// else 
// 팔로우, 언팔로우 버튼 



//공통
//이미지 클릭 시 모달창 함수
function openModal(e) {
    const modal = document.querySelector('hidden-menu');

    const clickImgBtn = document.querySelector('.product-img');
    clickImgBtn.addEventListener('click', () => {

    })
}


//팔로워 페이지로 이동
function movefollowersPage() {

    followersNum.addEventListener("click", function () {
        location.href = "/follower";
    })
}
movefollowersPage();

//팔로잉 페이지로 이동
function movefollowingPage() {

    followingsNum.addEventListener("click", function () {
        location.href = "/following";
    })
}
movefollowingPage();
