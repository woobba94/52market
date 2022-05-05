async function toggleFollow(accountname) {
  let urlVal = '';
  let methodVal = '';
  let textContentVal = '';
  let addClassName = '';
  // isFollow 상태에따른 값 세팅
  if (this.textContent === '팔로우') {
    urlVal = 'follow';
    methodVal = 'POST';
    textContentVal = '언팔로우';
    this.classList.remove('btn-follow');
    this.classList.add('btn-unfollow');
  } else {
    urlVal = 'unfollow';
    methodVal = 'DELETE';
    textContentVal = '팔로우';
    this.classList.add('btn-follow');
    this.classList.remove('btn-unfollow');
  }

  const url = `https://mandarin.api.weniv.co.kr/profile/${accountname}/${urlVal}`;
  const token = localStorage.getItem('token');
  const res = await fetch(url, {
    method: methodVal,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
  });
  this.textContent = textContentVal;
}
