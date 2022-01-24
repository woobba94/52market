let accountName = nowUrl.split('/profile/')[1];
const hrefLink = location.href;
const followersNum = document.querySelector('.followers-num');
const followingsNum = document.querySelector('.followings-num');
const followerLink = document.querySelector('.follower-num');
const followingLink = document.querySelector('.following-num');

//user 정보 가져와서 뿌려주기
async function getUserData() {
  const res = await fetch(`${url}/profile/${accountName}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
  const result = await res.json();
  // console.log(result);

  const userName = document.querySelector('.user-name');
  userName.innerText = '@' + result.profile.accountname;

  const thisUserId = document.querySelector('.user-id');

  thisUserId.innerText = result.profile.username;

  const userIntro = document.querySelector('.user-wrap');
  userIntro.innerText = result.profile.intro;

  const userImage = document.querySelector('.imgPre');
  userImage.src = result.profile.image;

  followersNum.innerText = result.profile.followerCount;
  followingsNum.innerText = result.profile.followingCount;
  followerLink.href = `/follower/${accountName}`;
  followingLink.href = `/following/${accountName}`;
}

getUserData();

const mainElement = document.querySelector('.container');
//user가 등록한 상품 정보 가져오기
async function getProductList() {
  const response = await fetch(`http://146.56.183.55:5050/product/${accountName}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  this.productList = await response.json();
  // console.log(productList);
}

// user가 등록한 상품 정보 세팅
async function setCurrentProduct() {
  const productName = document.querySelector('.product-name');
  const productPrice = document.querySelector('.product-price');
  const productImgInput = document.querySelector('.product-img');

  await this.getProductList();

  const datas = await this.productList['product'];
  // console.log(datas);

  datas.map((data) => {
    const productList = document.querySelector('.product-list');
    let productBox = document.createElement('li');
    console.log(data)
    productBox.innerHTML = `
        <button type="button" class="product-item" id="${data.author.accountname}_${data.id}">
          <img src="${data.itemImage}" class="product-img" alt="상품사진"></a>
          <span class="product-name">${data.itemName}</span>
          <em class="product-price">${data.price}원</em>
          <span style="display:none" class="product-link">${data.link}</span>
        </button>
        
        `;
    productList.appendChild(productBox);
  });
  //판매상품 클릭
  const productItem = document.querySelectorAll('.product-item');
  if (productItem) {
    productItem.forEach((item) => {
      item.addEventListener('click', function (e) {
        const productData = {
          author: {
            accountname: e.currentTarget.id.split('_')[0]
          },
          id: e.currentTarget.id.split('_')[1],
          link: e.currentTarget.querySelector('.product-link').textContent,
        }
        showMenu(e, 'product', productData);
      });
    })
  }
}

setCurrentProduct();
getProductList();

async function setFollowBtn() {
  const addFollowBtn = document.querySelector('.btns-wrap');
  // if ( accountName == thisUserId)
  if (accountName == userId) {
    addFollowBtn.innerHTML = `<a class="button button-ms line btn-mod profile-edit" href="/profile-mod"> 프로필 수정</a>
    <a class="button button-ms line move-product" href="/product">상품 등록</a>`;
  } else {
    // getIsFollow(accountName);
    addFollowBtn.innerHTML = `<a class="imgbtn imgbtn-message" href="/chat">메시지</a>
    <button class="button-ms active-button" name="${accountName}"></button>
    <a class="imgbtn imgbtn-share" href="#">공유버튼
    </a>`;

    const followBtn = document.querySelector('.btns-wrap .button-ms');

    // isfollow 체크 -> 버튼 텍스트 최초 세팅 (팔로우/언팔로우)
    const isfollow = await getIsFollow(accountName);
    if (isfollow) followBtn.innerHTML = '언팔로우';
    else followBtn.innerHTML = '팔로우';

    // 리스너 연결
    followBtn.func = toggleFollow;
    followBtn.addEventListener('click', function () {
      followBtn.func(followBtn.name);
    });
  }
}
setFollowBtn();

// 내 프로필버튼
function 내프로필버튼() {
  // 프로필 페이지로 이동
  function moveProfileModPage() {
    const profileModPage = document.querySelector('.profile-edit');

    profileModPage.addEventListener('click', function () {
      location.href = './profile-mod';
    });
  }
  moveProfileModPage();

  // 상품등록 페이지로 이동
  function moveProductPage() {
    const productPage = document.querySelector('.move-product');

    productPage.addEventListener('click', function () {
      location.href = './product';
    });
  }
  moveProductPage();
}

// 팔로워 페이지로 이동
function movefollowersPage() {
  followersNum.addEventListener('click', function () {
    location.href = '/follower';
  });
}
movefollowersPage();
// else
// 팔로우, 언팔로우 버튼

//공통
//이미지 클릭 시 모달창 함수
// function openModal(e) {
//   const modal = document.querySelector('hidden-menu');

//   const clickImgBtn = document.querySelector('.product-img');
//   clickImgBtn.addEventListener('click', () => { });
// }

// // 팔로워 페이지로 이동
// function movefollowersPage() {
//   followersNum.addEventListener('click', function () {
//     location.href = '/follower';
//   });
// }
// movefollowersPage();
// // 팔로잉 페이지로 이동
// function movefollowingPage() {
//   followingsNum.addEventListener('click', function () {
//     location.href = '/following';
//   });
// }
// movefollowingPage();

async function getIsFollow(accountname) {
  const url = `http://146.56.183.55:5050/profile/${accountname}`;
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  const json = await res.json();
  let result = json.profile.isfollow;
  return result;
}
