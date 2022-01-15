const textarea = document.querySelector('.textarea');
const inputFile = document.querySelector('.imgbtn-img');
const imgUl = document.querySelector('.img-wrap ul')
const profileImg = document.querySelector('.profile');

if (!token) {
  location.href = './login';
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


