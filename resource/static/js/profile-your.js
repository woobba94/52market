
        function btnFollow() {
        const BTN_FOLLOW = document.querySelector('.button-ms');

        document.querySelector('.button-ms ').addEventListener('click',() => {
            if (BTN_FOLLOW.innerText == '팔로우') {
                BTN_FOLLOW.classList.toggle('show')
                BTN_FOLLOW.innerHTML = "언팔로우";
            } else {
                BTN_FOLLOW.classList.remove('show')
                BTN_FOLLOW.innerText = '팔로우'
            }
        })
        
    }  
    btnFollow();
