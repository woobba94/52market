function modalDel () {
    const OPEN = () => {
    document.querySelector('.modal-del').classList.remove('hidden');
}
    const CLOSE = () => {
    document.querySelector('.modal-del').classList.add('hidden');
}
    document.querySelector('.modal').addEventListener('click', OPEN);
    document.querySelector('.btn-cancel').addEventListener('click', CLOSE);
}
modalDel();

    document.querySelector('.button-back').addEventListener('click',() => {
    window.history.back();
    });

function footerTab() {
    const FOOTER_NAV_TAB= document.querySelector('.footer-nav');

    function select(ulEl, liEl) {
        const FOOTER_NAV_TAB = document.querySelector('.footer-nav');
        
        Array.from(ulEl.children).forEach(
            v => v.classList.remove('selected')
        )
        if(liEl) liEl.classList.add('selected');
    }
    
    FOOTER_NAV_TAB.addEventListener('click', e => {
        const selected = e.target;
        select(FOOTER_NAV_TAB, selected);
    })
}
footerTab();

function moveSearchPage() {
const SEARCH_PAGE = document.querySelector(".btn-search");

SEARCH_PAGE.addEventListener("click",function() {
 location.href = "search_page.html";
})
}
moveSearchPage();
