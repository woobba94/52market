const mainElement = document.querySelector('.container');
// 상품 정보 가져오기
async function getProductData() {
  const response = await fetch(`http://146.56.183.55:5050/product/detail/${this.productId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access-token'),
    },
  });
  this.productData = await response.json();
}

// 첨부된 이미지 나타나기
function postProductImg() {
  const imgInputBtn = document.querySelector('.image-input-field input');
  const productImgBox = document.querySelector('.image-input-field');
  let productImgElement = document.querySelector('.image-input-field img');
  console.log(productImgElement);
  imgInputBtn.addEventListener('change', (e) => {
    this.productImgName = '';

    if (!productImgElement) {
      productImgElement = document.createElement('img');
      productImgBox.append(productImgElement);
    }

    if (e.target.files && e.target.files[0]) {
      imgInputBtn.setAttribute('data-state', 1);
      let reader = new FileReader();

      reader.onload = (e) => {
        productImgElement.src = e.target.result;
      };
      reader.readAsDataURL(e.target.files[0]);
    }

    const formData = new FormData();
    formData.append('image', imgInputBtn.files[0]);

    fetch(`http://146.56.183.55:5050/image/uploadfile`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.productImgName = data['filename'];
        console.log('파일이름 받아옴');
        btnActive();
      })
      .catch((err) => console.err(err));
  });
}

// 현재 상품 정보 세팅
async function setCurrentData() {
  console.log('현재 상품 정보 세팅');
  const productName = document.querySelector('#productNameInput');
  const productPrice = document.querySelector('#priceInput');
  const storeLink = document.querySelector('#storeLinkInput');
  const productImgInput = documenthis.querySelector('#productImgInput');
  const productImgBox = document.querySelector('#product-img-box');

  const productImgElement = document.createElement('img');
  productImgBox.append(productImgElement);

  await this.getProductData();

  const data = this.productData['product'];
  this.productImgName = data['itemImage'];
  productImgElement.src = this.productImgName;
  productName.value = data['itemName'];
  productPrice.value = data['price'];
  storeLink.value = data['link'];

  productImgInput.setAttribute('data-state', 1);
  productName.setAttribute('data-state', 1);
  productPrice.setAttribute('data-state', 1);
  storeLink.setAttribute('data-state', 1);

  this.btnActive();
}

// 상품 정보 서버로 전송 - 업로드
async function postProductData() {
  const saveBtn = document.querySelector('.button-save');
  // saveBtn.addEventListener("click", async () => {
  const productName = document.querySelector('#productNameInput');
  const productPrice = document.querySelector('#priceInput');
  const storeLink = document.querySelector('#storeLinkInput');
  // const productImgName =
  console.log(`productImgName : ${this.productImgName}`);

  const price = parseInt(productPrice.value.replaceAll(',', ''), 10);
  const response = await fetch(`http://146.56.183.55:5050/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('Token'),
    },
    body: JSON.stringify({
      product: {
        itemName: productName.value,
        price: price,
        link: storeLink.value,
        itemImage: `http://146.56.183.55:5050/${this.productImgName}`,
      },
    }),
  });

  const data = await response.json();

  if (data) {
    this.dataReset();
    href('/6.profile.html');
  }
  // });
}

function href(pageName) {
  const routeTag = document.createElement('a');
  routeTag.id = 'routeTag';
  routeTag.href = `/pages${pageName}`;
  document.querySelector('.container').appendChild(routeTag);
  document.querySelector('#routeTag').click();
}

// 상품 정보 서버로 전송 - 수정
function editProductData() {
  const saveBtn = document.querySelector('.button-save');
  saveBtn.addEventListener('click', async () => {
    const productName = document.querySelector('#productNameInput');
    const productPrice = document.querySelector('#priceInput');
    const storeLink = document.querySelector('#storeLinkInput');

    const price = parseInt(productPrice.value.replaceAll(',', ''), 10);
    const response = await fetch(`http://146.56.183.55:5050/product/${this.productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('access-token'),
      },
      body: JSON.stringify({
        product: {
          itemName: productName.value,
          price: price,
          link: storeLink.value,
          itemImage: this.productImgName,
        },
      }),
    });

    const data = await response.json();

    if (data) {
      this.dataReset();
      href('/profile');
    }
  });
}

// 상품 정보 전송 후 데이터 리셋
function dataReset() {
  console.log('상품 정보 전송 후 데이터 리셋vv');
  const inputs = document.querySelectorAll('INPUT');
  inputs.forEach((item) => {
    item.value = '';

    if (item.getAttribute('type') == 'file') {
      const imgTag = document.querySelector('#product-img-box img');
      imgTag.remove();
      this.productImgName = '';
    }
  });
}

// url 형식 올바른지 체크
function isValidUrl() {
  const urlBoxVal = document.querySelector('#product-url').value;
  const urlRegexData =
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

  return urlRegexData.test(urlBoxVal) === true ? true : false;
}

// 값이 모두 채워졌는지 확인
function isFilledAll() {
  let flag = true;
  const inputBox = document.querySelectorAll('.label-input input');
  // 하나만 찾으면 false이지만 forEach에는 break 가 존재하지 않아 끝까지 순회.
  inputBox.forEach((item) => {
    if (item.value === '') {
      flag = false;
      // break;
      // return false;
    }
  });
  return flag ? true : false;
}

// 저장 버튼 활성화 체크
function btnActive() {
  const saveBtn = document.querySelector('.button-save');
  if (isFilledAll() && isValidUrl()) saveBtn.disabled = false;
  else saveBtn.disabled = true;
}

function clickImgBtn() {
  console.log('click');
  const imgInput = document.querySelector('#productImgInput');
  imgInput.click();
  postProductImg();
}

window.addEventListener('DOMContentLoaded', () => {
  postProductImg();
});
