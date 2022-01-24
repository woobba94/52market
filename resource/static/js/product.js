const mainElement = document.querySelector('.container');
const saveBtn = document.querySelector('.button-save');
const inputBox = document.querySelectorAll('.label-input input');

const productUrlBox = document.querySelector('#product-url');

productUrlBox.addEventListener('focus', (event) => {
  if (event.target.value == '') event.target.value = 'http://';
});
productUrlBox.addEventListener('blur', (event) => {
  if (event.target.value == 'http://') event.target.value = '';
});

// input 값 변경 리스너 -> 저장버튼 활성화 시도
[].forEach.call(inputBox, function (input) {
  input.addEventListener('input', (event) => {
    // console.log(event.target.value);
    // 변경된 값이 빈문자열 즉 다 지웠다면 비운상태로 체크
    if (event.target.value === '') event.target.value = '';
    // 저장버튼 활성화 시도
    activeCheckSaveButton();
  });
});

// 저장버튼 리스너
// 이미 존재하는 상품일 경우
if (location.href.split('product')[1] != '') {
  document.querySelector('.button-save').disabled = false;
  saveBtn.addEventListener('click', editProductData);
} else saveBtn.addEventListener('click', postProductData);

// 첨부된 이미지 렌더링
function postProductImg() {
  const imgInputBtn = document.querySelector('.image-input-field input');
  const productImgBox = document.querySelector('.image-input-field');
  let productImgElement = document.querySelector('.image-input-field img');

  imgInputBtn.addEventListener('change', (e) => {
    this.productImgName = '';
    // 최초 업로드일 경우 img태그 새로 만들기
    if (!productImgElement) {
      productImgElement = document.createElement('img');
      productImgBox.append(productImgElement);
      activeCheckSaveButton();
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
      })
      .catch((err) => console.err(err));
  });
}

// 상품 등록
async function postProductData() {
  const productName = document.querySelector('#product-name');
  const productPrice = document.querySelector('#product-price');
  // const productImgName = window.productImgName;
  console.log(productImgName);
  const price = parseInt(productPrice.value.replaceAll(',', ''), 10);
  const url = `http://146.56.183.55:5050/product`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
    body: JSON.stringify({
      product: {
        itemName: productName.value,
        price: price,
        link: productUrlBox.value,
        itemImage: `http://146.56.183.55:5050/${productImgName}`,
      },
    }),
  });

  const data = await response.json();
  console.log(data);
  if (data) {
    // this.dataReset();
    window.location = `/profile/${localStorage.getItem('accountname')}`;
  }
}

// ----------------- 기존 상품 수정 로직 -----------------
// 상품 정보 가져오기
async function getProductData() {
  const productId = location.href.split('/product/')[1];
  const response = await fetch(`http://146.56.183.55:5050/product/detail/${productId}`, {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  });
  this.productData = await response.json();
}

// 현재 상품 정보 세팅
async function setCurrentData() {
  console.log('현재 상품 정보 세팅');
  const productName = document.querySelector('#product-name');
  const productPrice = document.querySelector('#product-price');
  const productUrl = document.querySelector('#product-url');
  const productImgBox = document.querySelector('.image-input-field');

  const productImgElement = document.createElement('img');
  productImgBox.append(productImgElement);

  await this.getProductData();

  const data = this.productData['product'];
  this.productImgName = data['itemImage'];
  productImgElement.src = this.productImgName;
  productName.value = data['itemName'];
  productPrice.value = data['price'];
  productUrl.value = data['link'];
}

// 상품 정보 서버로 전송 - 수정
async function editProductData() {
  const productName = document.querySelector('#product-name');
  const productPrice = document.querySelector('#product-price');
  const productUrl = document.querySelector('#product-url');
  const productImgSrc = document.querySelector('.image-input-field img').src;
  const price = parseInt(productPrice.value.replaceAll(',', ''), 10);
  const response = await fetch(
    `http://146.56.183.55:5050/product/${location.href.split('/product/')[1]}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify({
        product: {
          itemName: productName.value,
          price: price,
          link: productUrl.value,
          itemImage: productImgSrc,
        },
      }),
    }
  );

  const data = await response.json();
  console.log(data);
  if (data) {
    // deleteProduct(location.href.split('/product/')[1]);
    window.location = `/profile/${localStorage.getItem('accountname')}`;
  }
}

// 상품 삭제
async function deleteProduct(tagetId) {
  const response = await fetch(`http://146.56.183.55:5050/product/${tagetId}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
}

// ------------------ 형식 체크 함수들 --------------------

// url 형식 올바른지 체크
function isValidUrl() {
  const urlRegexData = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  );

  return urlRegexData.test(productUrlBox.value) === true ? true : false;
}

// 값이 모두 채워졌는지 체크
function isFilledAll() {
  let flag = true;
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

// 저장 버튼 활성화 여부
function activeCheckSaveButton() {
  const imgBox = document.querySelector('.image-input-field img');
  const saveBtn = document.querySelector('.button-save');
  if (isFilledAll() && isValidUrl() && imgBox) saveBtn.disabled = false;
  else saveBtn.disabled = true;
}

window.addEventListener('DOMContentLoaded', () => {
  // 이미 존재하는 상품일 경우
  if (location.href.split('product')[1] != '') setCurrentData();
  postProductImg();
});



//판매 상품 삭제하기(강혜진 작성)
async function deleteProduct(productId) {
  const popModal = document.querySelector('.pop-modal');
  popModal.innerHTML = `
      <p>삭제되었습니다.</p>
  `;
  await fetch(`${url}/product/${productId}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  });
  setTimeout(function () {
    location.href = `/profile/${nowUrl.split('/profile/')[1]}`;
  }, 800);
}
