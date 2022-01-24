const time = document.querySelector('.date-time');
const date = new Date();
time.textContent = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes() - 1).padStart(2, '0')}`
time.textContent = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes() - 1).padStart(2, '0')}`
