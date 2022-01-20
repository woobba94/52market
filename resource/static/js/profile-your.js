    // 1. 프로필 정보 가져오기

    // 2. 팔로우 버튼 이벤트 
    // 2-1. 팔로우 되어있을 때 클릭 시 언팔로우로 버튼 변경
    // 2-2. 언팔로우 되어있을 때 클릭 시 팔로우로 버튼 변경

    // 3. 상품 클릭 이벤트 
    // 3-1. 상품 클릭 시 상품 판매 페이지로 이동 

    // 4. 팔로우/워 목록 이벤트
    // 4-1. 팔로워 버튼 클릭 시 팔로워 목록 불러오기
    // 4-2. 팔로잉 버튼 클릭 시 팔로잉 목록 불러오기



   // 팔로우 버튼 이벤트
    // followBtnEvent(element) {
    //     const followBtn = element.querySelector(".follow-btn");
    //     const followerCount = element.querySelector(".followers-count");
    //     let data = {};

    //     followBtn.addEventListener("click", async () => {
    //         if(followBtn.classList.contains("active-button")){
    //             followBtn.classList.remove("active-button");
    //             followBtn.textContent = "팔로우";
    //             data = await this.unfollow();
    //             followerCount.textContent = data["profile"]["followerCount"];
    //         } else {
    //             followBtn.classList.add("active-button");
    //             followBtn.textContent = "언팔로우";
    //             data = await this.follow();
    //             followerCount.textContent = data["profile"]["followerCount"];
    //         }
    //     });
    // }

    // const toggleButton = document.querySelector('.button-ms active-button');

    // toggleButton.addEventListener('click', fucntion() {

    // })

    
    //     const FOLLOW = () => {
    //     document.querySelector('.button-ms ').classList.remove('show');
    // }
    //     const UNFOLLOW = () => {
    //     document.querySelector('.button-ms ').classList.add('show');
    // }
        // document.querySelector('.button-ms ').addEventListener('click', FOLLOW);
        // document.querySelector('.button-ms ').addEventListener('click', UNFOLLOW);
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