const postId = location.href.split('/post/')[1].split('/')[0];
const editBtn = document.querySelector('.post-edit');
if (token) {
  getEdit();
} else {
  location.href = './login';
}

//수정버튼 활성화
function changeBtn() {
  if (textarea.value !== '' || inputFile.value !== '') {
    editBtn.disabled = false;
  } else {
    editBtn.disabled = true;
  }
}
async function getEdit() {
  const res = await fetch(`${url}/post/${postId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-type": "application/json"
    }
  })
  const json = await res.json();
  const post = json.post;
  textarea.value = post.content;
  const imgArr = post.image.split(',');

  for (let i = 0; i < imgArr.length; i++) {
    const imgList = document.createElement('li');
    imgList.innerHTML = `<img src='${imgArr[i]}' alt='${imgArr[0].split(url + '/')[1].split('.')[0]}' />`
    imgUl.appendChild(imgList);

  }
}

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

editBtn.addEventListener('click', putEdit);
textarea.addEventListener('input', changeBtn);
inputFile.addEventListener('input', changeBtn);