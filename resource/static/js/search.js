const searchListBox = document.querySelector('.wrap-search');
const inputBox = document.querySelector('.input-search');

// input 값 변경 리스너
inputBox.addEventListener('input', (event) => {
  // 변경된 값이 빈문자열 즉 다 지웠다면 list 비우기
  if (event.target.value === '') searchListBox.innerHTML = '';
  else search(event.target.value);
});

async function search(inputVal) {
  // listBox 초기화
  searchListBox.innerHTML = '';
  const url = `https://mandarin.api.weniv.co.kr/user/searchuser/?keyword=${inputVal}`;
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  const data = await res.json();

  data.forEach((element) => {
    searchListBox.innerHTML += `
  <article class="search-child" id="${element._id}">
    <a href="/profile/${element.accountname}" class="user-wrap">
      <img src="${element.image}" alt="${element.username}님의 프로필" class="profile" />
      <span class="user-txt">
        <span class="user-title">${element.username}</span>
        <span class="user-description">@${element.accountname}</span>
      </span>
    </a>
  </article>
  `;
  });
}
