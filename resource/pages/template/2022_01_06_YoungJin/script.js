$(function MaintoSearch() {
    $(`.top-main-icon`).click(function () {
        if ($(`#main-page`).css("display") != "none") {
            $(`#main-page`).hide();
            $(`#search-page`).show();
        }

    })
})

$(function SearchtoMain() {
    $(`.top-search-icon-arrow`).click(function () {
        if ($(`#search-page`).css("display") != "none") {
            $(`#main-page`).show();
            $(`#search-page`).hide();
        }
    })
})

$(function MaintoChat() {
    $(`.chat-test-btn`).click(function () {
        if ($(`#main-page`).css("display") != "none") {
            $(`#chat-page`).show();
            $(`#main-page`).hide();
        }
    })
})

$(function ChattoMain() {
    $(`.top-chat-icon-arrow`).click(function () {
        if ($(`#search-page`).css("display") != "none") {
            $(`#chat-page`).show();
            $(`#search-page`).hide();
        }
    })
})


$(function MaintoUpload() {
    $(`.upload-test-btn`).click(function () {
        if ($(`#main-page`).css("display") != "none") {
            $(`#upload-page`).show();
            $(`#main-page`).hide();
        }
    })
})

$(function UploadtoMain() {
    $(`.top-upload-icon-arrow`).click(function () {
        if ($(`#search-page`).css("display") != "none") {
            $(`#upload-page`).show();
            $(`#search-page`).hide();
        }
    })
})

// 작성자: 고영진
// 텍스트 값을확인하여 
// 버튼 활성화 비활성화 js
$(function(){   
    $(".upload-test-text").on('input',function(){
        if($(".upload-test-text").val()){
            $(".top-upload-button").attr('class', "top-upload-button on");
        }
        else{
            $(".top-upload-button").attr('class',"top-upload-button");
        }
    });
})