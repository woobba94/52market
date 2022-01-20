// 0. 나의 정보 불러오기 
// 0.1. 이미지 리스트로 넣어주기

// 1. 이미지 클릭 
// 1-1. 이미지 이벤트 실행 
//      hidden-menu show 
// 1-2. if == EventTarget.삭제 
//         삭제 modal open 
// 1-3. if == EventTarget.수정
//         상품등록 페이지 이동
//          클릭한 상품 정보 불러오기
// 1-4. if == EventTarget.사이트보기
//         사이트 페이지로 이동 

// 2. 프로필 수정 클릭시 profile-mod page로 이동
// 3. 상품등록 클릭시 product page 로 이동

// 4. 팔로우 버튼 이벤트 실행
//4-1. 팔로우 목록 받아오기
//4-2. 팔로워 목록 받아오기 


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

    //상품 클릭 시 모달 메뉴
    // productHiddenMenu() {
    //     const productItems = this.mainElement.querySelectorAll(".product-list li");
    //     productItems.forEach((item) => {
    //         const productId = item.getAttribute("data-id");
    //         item.addEventListener("click", () => {
    //             createHiddenMenu();
    //             const hiddenMenu = this.rootElement.querySelector(".hidden-menu");
    //             const menuList = this.rootElement.querySelector(".hidden-menu-list");
    //             setTimeout(() => {
    //                 hiddenMenu.classList.add("active");
    //                 menuList.innerHTML = `
    //                     <li><button type="button" class="delete-product">삭제</button></li>
    //                     <li><a href="/product/${productId}/edit" class="edit-product">수정</a></li>
    //                     <li><a href="${item["link"]}" class="product-link">웹사이트에서 상품 보기</a></li>
    //                 `;
    //                 this.deleteProductEvent(menuList, productId)
    //             }, 150);
    //         });
    //     });
    // }

    // 상품을 누르면 나타나는 메뉴 - 사용자가 나일 경우에만 나타남.
    function productHiddenMenu() {
        const productItems = document.querySelectorAll(".product-list li");
        productItems.forEach((item) => {
            const productId = item.getAttribute("data-id");
            item.addEventListener("click", () => {
                createHiddenMenu();
                const hiddenMenu = document.querySelector(".hidden-menu");
                const menuList = document.querySelector(".hidden-menu-list");
                setTimeout(() => {
                    hiddenMenu.classList.add("active");
                    menuList.innerHTML = `
                        <li><button type="button" class="delete-product">삭제</button></li>
                        <li><a href="./product" class="edit-product">수정</a></li>
                        <li><a href="#" class="product-page-link">웹사이트에서 상품 보기</a></li>
                    `;
                    this.deleteProductEvent(menuList, productId)
                }, 150);
            });
        });
    }
    productHiddenMenu(); 
    // 상품 삭제 이벤트
    deleteProductEvent(menuList, id) {
        const productSection = this.mainElement.querySelector(".product-section");
        const deleteBtn = menuList.querySelector(".delete-product");

        deleteBtn.addEventListener("click", () => {
            const message = "삭제하시겠어요?";
            const btn = "삭제";
            this.alertBox = new AlertBox(message, btn);
            this.alertBox.createAlertBox();
            const doingBtn = this.rootElement.querySelector(".do-btn");
            
            doingBtn.addEventListener("click", async () => {
                const productList = this.mainElement.querySelector(".product-list");
                productList.innerHTML = "";
                await this.deleteProduct(id);
                await this.getProductData();
                const productInfo = this.productData["product"];
                if(productInfo.length != 0) {
                    this.setProduct(productInfo);
                } else {
                    productSection.remove();
                }
            });
        });
    }



    () => {
        createHiddenMenu();
        const hiddenMenu = document.querySelector(".hidden-menu");
        const menuList = document.querySelector(".hidden-menu-list");
        setTimeout(() => {
        hiddenMenu.classList.add("active");
    menuList.innerHTML = `
    <li><button type="button" class="delete-product">삭제</button></li>
    <li><a href="/product/${productId}/edit" class="edit-product">수정</a></li>
    <li><a href="${item["link"]}" class="product-link">웹사이트에서 상품 보기</a></li>`;
    this.deleteProductEvent(menuList, productId)
        }, 150);
}

    // function Drawer(el, open = false) {
    //     this.el = el;
    //     this.isOpen = open;
    //     Object.assign(this.el.style), {
    //         display: 'block',
    //         position: 'fixed',
    //         top: 0,
    //         bottom: '30px',
    //         right: 0,
    //         width: '330px',  
    //         padding: '10px',
    //         backgroundColor: 'white',
    //         transition: 'all 0.4s ease-out'
    //     });
    //     (this.isOpen) ? this.open() : this.close();
    // }
    // Drawer.prototype.open = function() {
    //     this.isOpen = true;
    //     this.el.style.transform = 'translate(0px)';
    // }
    // Drawer.prototype.close = function() {
    //     this.isOpen = false;
    //     this.el.style.transform = 'translate(220px)';
    // }

    // const sideMenu = new Drawer(document.querySelector('.drawer'));
    // document.querySelector('drawer-opener').addEventListener('click', e => {
    //     if (!sideMenu.isOpen) {
    //         sideMenu.open();
    //     } else {
    //         sideMenu.close();
    //     }
    // });
