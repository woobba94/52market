// 프로필 페이지로 이동
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
    function deleteProductEvent(menuList, id) {
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


    // 모달창
    function createHiddenMenu () {
        const hiddenMenu = document.querySelector(".hidden-menu");
        const menuList = document.querySelector(".hidden-menu-list");
    }
