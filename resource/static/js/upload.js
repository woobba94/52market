const textarea = document.querySelector('.textarea');
const inputFile = document.querySelector('.imgbtn-img');
const imgUl = document.querySelector('.img-wrap ul')
const profileImg = document.querySelector('.profile');
const hrefLink = location.href;
const saveBtn = document.querySelector('.post-save'); //저장버튼
const editBtn = document.querySelector('.post-edit'); //수정버튼
let status = 'upload';

if (!token) {
  location.href = './login';
}

if (hrefLink.indexOf('/edit') !== -1) {
  //수정
  status = 'edit';
  getEdit();
  editBtn.addEventListener('click', putEdit); //수정
} else if (hrefLink.indexOf('/upload') !== -1) {
  //업로드
  saveBtn.addEventListener('click', createPost); //업로드
}

//저장버튼 활성화
function changeBtn() {
  if (textarea.value !== '' || inputFile.value !== '') {
    if (status === 'upload') {
      saveBtn.disabled = false;
    } else {
      editBtn.disabled = false;
    }
  } else {
    if (status === 'upload') {
      saveBtn.disabled = true;
    } else {
      editBtn.disabled = true;
    }
  }
}

textarea.addEventListener('input', changeBtn);
inputFile.addEventListener('input', changeBtn);


//게시글 등록
async function createPost(e) {
  const inputText = textarea.value;
  const imgArr = [];
  (imgUl.querySelectorAll('img')).forEach((item) => {
    imgArr.push(item.src);
  });
  const res = await fetch(`${url}/post`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "post": {
        "content": inputText,
        "image": imgArr + ''
      }
    })
  })
  const data = await res.json();
  const post = data.post;
  location.href = `/profile/${post.author.accountname}`;
}

//컨텐츠 입력부분 자동 높이 조절
function changeHeight(e) {
  this.style.height = '1px';
  this.style.height = `${e.currentTarget.scrollHeight}px`;
}

//프로필 이미지
const uploadProfile = document.querySelector('.upload-wrap .profile');
uploadProfile.src = userProfile;
uploadProfile.setAttribute('alt', `${userId}님의 프로필`);


//이미지 업로드
async function imgUpload(files, index) {
  const formData = new FormData();
  formData.append("image", files[index]);
  const res = await fetch(`${url}/image/uploadfile`, {
    method: 'POST',
    body: formData
  })
  const data = await res.json();
  const productImgName = data["filename"];
  return productImgName;
}

async function imgCheck(e) {
  const files = inputFile.files;

  if (files.length <= 3) {
    for (let index = 0; index < files.length; index++) {
      const imgNewName = await imgUpload(files, index);
      const imgList = document.createElement('li');
      imgList.innerHTML = `<img src='${url}/${imgNewName}' alt='${imgNewName}' />`
      imgUl.appendChild(imgList);
    }
  } else {
    alert('이미지는 최대 3개까지만 업로드 가능합니다.');
  }
}

//업로드한 이미지 삭제기능


textarea.addEventListener('input', changeHeight);
inputFile.addEventListener('input', imgCheck);


//이전버튼
btnBack.addEventListener('click', clickBack);


//수정 게시물 정보 가져오기
async function getEdit() {
  const postId = location.href.split('/post/')[1].split('/')[0];
  const res = await fetch(`${url}/post/${postId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  const post = json.post;

  //내 게시물이 아닐때 > 404 페이지 이동
  if (post.author.accountname !== userId) {
    location.href = '/404';
  }

  textarea.value = post.content;
  if (post.image) {
    const imgArr = post.image.split(',');
    for (let i = 0; i < imgArr.length; i++) {
      const imgList = document.createElement('li');
      imgList.innerHTML = `<img src='${imgArr[i]}' alt='${imgArr[0].split(url + '/')[1].split('.')[0]}' />`
      imgUl.appendChild(imgList);

    }
  }



}

// 게시물 수정하기
async function putEdit() {
  const inputText = textarea.value;
  const imgArr = [];
  (imgUl.querySelectorAll('img')).forEach((item) => {
    imgArr.push(item.src);
  });
  const res = await fetch(`${url}/post/${postId}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    },
    body: JSON.stringify({
      "post": {
        "content": inputText,
        "image": imgArr + ''
      }
    })
  })
  const data = await res.json();
  const post = data.post;
  location.href = `/profile/${post.author.accountname}`;
}

