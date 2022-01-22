/*
  Kang Hyejin
  강혜진 작성파일
*/

const textarea = document.querySelector('.textarea'); //내용 입력
const inputFile = document.querySelector('.imgbtn-img'); // file
const saveBtn = document.querySelector('.post-save'); //저장버튼
const editBtn = document.querySelector('.post-edit'); //수정버튼
const imgUl = document.querySelector('.img-wrap ul')
const profileImg = document.querySelector('.profile'); //프로필 이미지

let state = 'upload'; // 수정, 새게시물 구분

if (!token) {
  location.href = './loading';
}

//게시글 수정/업로드 여부 체크
if (nowUrl.indexOf('/edit') !== -1) {
  //수정
  state = 'edit';
  getEdit();
  editBtn.addEventListener('click', putEdit); //수정
} else if (nowUrl.indexOf('/upload') !== -1) {
  //업로드
  saveBtn.addEventListener('click', createPost); //업로드
}

//저장버튼 활성화
function changeBtn() {
  if (textarea.value !== '') {
    if (state === 'upload') {
      saveBtn.disabled = false;
    } else if (state === 'edit') {
      editBtn.disabled = false;
    }
  } else {

    if (state === 'upload') {
      saveBtn.disabled = true;
    } else if (state === 'edit') {
      editBtn.disabled = true;
    }
  }
}





//이미지 미리보기
function preview() {
  const files = inputFile.files;
  imgUl.innerHTML = '';

  if (files.length <= 3) {
    const imgArr = Array.from(files);
    imgArr.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        let imgList = `
        <li id='${index}id${file.lastModified}'>
            <img src='${e.target.result}' alt='첨부파일' />
            <button button type = "button" data-index='${index}id${file.lastModified}' class="delete-img" > <span class="a11y-hidden">이미지 삭제</span></button >
        </li >
      `;
        imgUl.insertAdjacentHTML('beforeend', imgList);
      }
      reader.readAsDataURL(file);

      //이미지 삭제하기
      imgUl.addEventListener('click', removeFile);
    });
  } else {
    alert('이미지는 최대 3개까지만 업로드 가능합니다.');
    inputFile.value = '';
  }
}

//이미지 제거하기
function removeFile(e) {
  if (e.target.className != "delete-img") return;
  const removeTargetId = e.target.dataset.index;
  const removeTarget = document.getElementById(removeTargetId);
  const files = inputFile.files;
  const dataTranster = new DataTransfer();
  Array.from(files).filter((file, index) => `${index}id${file.lastModified}` != removeTargetId).forEach(file => { dataTranster.items.add(file) });
  inputFile.files = dataTranster.files;
  removeTarget.remove();
  changeBtn();
};

//이미지 업로드
async function imgUpload(files, index) {
  const formData = new FormData();
  formData.append("image", files[index]);
  console.log(formData);
  const res = await fetch(`${url}/image/uploadfile`, {
    method: 'POST',
    body: formData
  });
  const data = await res.json();
  const productImgName = data['filename'];
  return productImgName;
}


//게시글 등록
async function createPost(e) {
  const inputText = textarea.value;
  const imgArr = [];
  const files = inputFile.files;
  for (let index = 0; index < files.length; index++) {
    const imgurl = await imgUpload(files, index);
    imgArr.push(`${url}/${imgurl}`);
  }
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


//수정 게시물 정보 가져오기
async function getEdit() {
  const postId = nowUrl.split('/post/')[1].split('/')[0];
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
    for (let index = 0; index < imgArr.length; index++) {
      const imgList = `
      <li>
        <img src='${imgArr[index]}' alt='첨부파일' />
        <button button type = "button" class="delete-img" id="idx${index}">
          <span class="a11y-hidden">이미지 삭제</span>
        </button>
      </li>
      `
      imgUl.insertAdjacentHTML('beforeend', imgList);
      imgUl.addEventListener('click', function (e) {
        if (e.target.className === 'delete-img') {
          e.target.closest('li').remove();
          const index = e.target.id.split('idx')[1];
          imgArr.splice(index, 1);
        }
      })
    }
  }
}

// 게시물 수정하기
async function putEdit() {
  const postId = location.href.split('/post/')[1].split('/')[0];
  const inputText = textarea.value;
  let imgArr = []; //이미 있는 이미지
  const files = inputFile.files; //새로 업로드 이미지

  // 새로 업로드한 이미지가 없다면, 기존 이미지 푸시
  if (files.length === 0) {
    // 기존 이미지 푸시.
    (document.querySelectorAll('.upload-cont .img-wrap img')).forEach((item) => {
      imgArr.push(item.src);
    });
  }
  //이미지 미리보기
  inputFile.addEventListener('click', preview);

  //새로 업로드 이미지
  for (let index = 0; index < files.length; index++) {
    const imgurl = await imgUpload(files, index);
    imgArr.push(`${url}/${imgurl}`);
  }

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
  location.href = `/profile`;
}

//버튼 활성화
textarea.addEventListener('input', changeBtn);
inputFile.addEventListener('change', changeBtn);

//내용 입력 높이 조절
textarea.addEventListener('input', changeHeight);
//이미지 파일 체크
inputFile.addEventListener('change', preview);
//이전버튼
btnBack.addEventListener('click', clickBack);