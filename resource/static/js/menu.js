const accountName = localStorage.getItem('accountname');

const target = document.querySelector('.btn-user');

target.href += `/${accountName}`;
