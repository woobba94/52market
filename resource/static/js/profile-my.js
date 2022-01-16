// 프로필 수정 버튼 누르면 페이지 이동

// profileEdit() {
//     const profileEditBtn = this.mainElement.querySelector(".profile-edit");

//     if(profileEditBtn) {
//         profileEditBtn.addEventListener("click", () => {
//             href("/account/edit");
//         });
//     }
// }
// function profileEdit() {
//     const PROFILE_EDIT_BTN = document.querySelector(".profile-edit");

//     if(PROFILE_EDIT_BTN) {
//         PROFILE_EDIT_BTN.addEventListener("click", () => {
//             href("./profile-mod");
//         });
//     }
// }

// profileEdit();


// profileEdit() {
//     const PROFILE_EDIT_BTN = this.mainElement.querySelector('.profile-edit');

//     if(PROFILE_EDIT_BTN) {  
//         PROFILE_EDIT_BTN.addEventListener('click', () => {
//             href('/profile-mode.html');
//         });
// }
// }


function moveProfileModPage() {
    const PROFILE_MOD_PAGE = document.querySelector(".profile-edit");
    
    PROFILE_MOD_PAGE.addEventListener("click",function() {
     location.href = "./profile-mod";
    })
    }
    moveProfileModPage();



    function moveProductPage() {
        const PRODUCT_PAGE = document.querySelector(".move-product");
        
        PRODUCT_PAGE.addEventListener("click",function() {
         location.href = "./product";
        })
        }
        moveProductPage();

      // 상품 등록하기 버튼
    //   productRegister() {
    //     const productBtn = this.mainElement.querySelector(".product-add-btn");

    //     if(productBtn) {
    //         productBtn.addEventListener("click", () => {
    //             href("/product");
    //         });
    //     }
    // }