const saveBtn = document.querySelector('.post-save');

//저장버튼 활성화
function changeBtn() {
  if (textarea.value !== '' || inputFile.value !== '') {
    saveBtn.disabled = false;
  } else {
    saveBtn.disabled = true;
  }
}

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
  location.href = `/profile`;
}

saveBtn.addEventListener('click', createPost);
textarea.addEventListener('input', changeBtn);
inputFile.addEventListener('input', changeBtn);