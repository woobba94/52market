# 오이마켓

오이마켓 서비스는 자신의 스토어에 판매하고 있는 상품을 등록하여 홍보할 수 있는 SNS입니다.<br />
상품을 등록하지 않아도 일상을 공유하며 즐거운 SNS 활동을 할 수 있습니다. <br />
사용자는 글과 사진을 올려 자신의 일상을 공유할 수 있고,<br />
다른 사용자를 팔로우하여 홈 화면에서 다른 사람들의 소식을 확인할 수도 있습니다.<br />
다양한 사람들을 팔로우하고, 마음에 드는 피드가 있다면 '좋아요'를 누르거나 댓글을 달 수도 있습니다.<br />
또한, 다른 사용자와 채팅창을 이용해 즐거운 대화도 나눌 수 있습니다.<br />
SNS를 통한 온라인 이웃 되기! 오늘부터 이웃, 오이마켓입니다.

## 팀 : 이륙(26)

| **강혜진**                                                                                                                                                            | **고영진**                                                                                                                                                            | **맹하령**                                                                                                                                                          | **정우진**                                                                                                                                                         |
| --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| <img src="https://avatars.githubusercontent.com/u/54294796?v=4" alt="@dreamfulbud" size="80" height="80" width="80" data-view-component="true" class="avatar circle"> | <img src="https://avatars.githubusercontent.com/u/70947883?v=4" alt="@eovhdnjawm1" size="80" height="80" width="80" data-view-component="true" class="avatar circle"> | <img src="https://avatars.githubusercontent.com/u/82393165?v=4" alt="@UNI-Meang" size="80" height="80" width="80" data-view-component="true" class="avatar circle"> | <img src="https://avatars.githubusercontent.com/u/66201264?v=4" alt="@woobba94" size="80" height="80" width="80" data-view-component="true" class="avatar circle"> |
| [Github](https://github.com/dreamfulbud)                                                                                                                              | [Github](https://github.com/eovhdnjawm1)                                                                                                                              | [Github](https://github.com/UNI-Meang)                                                                                                                              | [Github](https://github.com/woobba94)                                                                                                                              |

## 1. 목표

- API를 이용한 오이마켓 SNS 프론트엔드 개발 구현.

## 2. 개발 환경 및 배포

### 2.1 스택

- HTML
- CSS / SCSS
- JavaScript
- Node.js

### 2.2 배포

```
    git clone https://github.com/dreamfulbud/52market.git
    cd 52market
    nodemon app
```

- http://localhost:8080/

## 3. 프로젝트 구조와 개발 일정

### 3.1 프로젝트 구조

```
.
├── node_modules
├── resource
│   ├── pages
│   │   ├── template
│   |   └── ...html
│   └── static
│       ├── css
│       ├── img
│       └── js
├── router
│   ├── market.js
└── app.js
```

### 3.2 개발일정

기간 : 3주 - 2022.01.03(월) ~ 2022.01.25(화)

- HTML/CSS 1주 - 2021.12.16(목) ~ 2022.01.06(목)
- JavaScript - 2022.01.07(금) ~ 2022.01.25(화)

## 4. 역할 분담

### 강혜진

- 피드 리스트 / 좋아요 기능 / 메뉴 및 모달 기능 / 댓글 CRD / 게시글 CRUD / 상품 삭제
- 사용 API
  - 이미지 API (여러 개의 이미지)
  - 게시글 (게시글 작성/팔로워 게시글 목록/나의 게시글 목록/게시글 상세/게시글 수정/게시글 삭제/게시글 신고)
  - 좋아요 (좋아요/좋아요 취소)
  - 댓글(댓글 작성/댓글 리스트/댓글 삭제/댓글 신고)
  - 상품 삭제

### 고영진

- Splash / 로그인 / 회원가입 / 프로필 설정 / 유효성 검증
- 사용 API
  - 이미지 API (한 개의 이미지)
  - 유저 API (회원가입 / 로그인 / 이메일 검증 / 전체 유저 목록(개발용) / 계정검증)

### 맹하령

- 프로필 화면 / 프로필 수정 / 판매상품 리스트
- 사용 API
  - 이미지(한 개의 이미지)
  - 프로필(프로필 수정/개인 프로필/팔로우/언팔로우)
  - 상품 (상품 리스트/상품 상세)

### 정우진

- 유저 검색 기능 / 유저 팔로우, 언팔로우 기능 / 팔로잉, 팔로워 리스트 / 판매상품 등록, 수정
- 사용 API
  - 검색 (유저 검색)
  - 프로필(팔로우/언팔로우/팔로잉 리스트/팔로워 리스트)
  - 상품 (상품등록/상품수정)

## 5. UI

<img src="https://raw.githubusercontent.com/dreamfulbud/52market/main/52market.jpg" alt="오이마켓"/>
<br/>

## 6. 기능

1. splash<br>
   ![00 인트로](https://user-images.githubusercontent.com/66201264/151148051-fa812113-e639-4f30-a751-350af86bc9c4.gif)<br><br>
2. 회원가입<br>
   ![01 회원가입](https://user-images.githubusercontent.com/66201264/151148053-5c80389a-ee9b-4f74-b0d8-d84cb1ee803d.gif)<br><br>
3. 로그인<br>
   ![02 로그인](https://user-images.githubusercontent.com/66201264/151148058-1052ae14-ad3e-4bf9-96b7-5ad126808c33.gif)<br><br>
4. 오이마켓 피드(홈 화면)<br>
   ![03 팔로우-피드](https://user-images.githubusercontent.com/66201264/151148060-fe7faa11-9eb3-4830-989c-563533010ee8.gif)<br><br>
5. 프로필 수정<br>
   ![04 수정-프로필](https://user-images.githubusercontent.com/66201264/151148065-0f238413-8569-4fcc-8f8d-44df93ba22c5.gif)<br><br>
6. 상품 등록<br>
   ![05 등록-상품](https://user-images.githubusercontent.com/66201264/151148069-d3f1ecae-4e97-4504-bbd4-d4968d9959ac.gif)<br><br>
   ![05 등록-상품여러개](https://user-images.githubusercontent.com/66201264/151148074-caa4248f-f92d-4c34-bd53-7d7643e0de84.gif)<br><br>
7. 상품 수정<br>
   ![06 수정-상품](https://user-images.githubusercontent.com/66201264/151148001-46dad002-dbce-4d79-8c3a-76e49df6995b.gif)<br><br>
8. 상품 삭제<br>
   ![07 삭제-상품](https://user-images.githubusercontent.com/66201264/151148006-d8944ac2-6dcf-46c2-b1cd-5a8859348517.gif)<br><br>
9. 게시글 등록<br>
   ![08 등록-게시글](https://user-images.githubusercontent.com/66201264/151148008-955cf002-2f6e-4ce6-b1c6-421382e95f2d.gif)
   ![08 등록-게시글여러개](https://user-images.githubusercontent.com/66201264/151148014-0b63daa2-5885-406b-a644-7b033a3c25d7.gif)<br><br>
10. 게시글 수정-삭제<br>
    ![10 수정 삭제-게시글](https://user-images.githubusercontent.com/66201264/151148021-7d91067e-c913-4a7d-a854-607fcb123551.gif)<br><br>
11. 팔로우 동기화<br>
    ![11 팔로우 여러명과 상대리스트확인](https://user-images.githubusercontent.com/66201264/151148030-7affc3a0-c84b-49e0-bab6-1be9348e4cfd.gif)<br><br>
12. 팔로우 취소 동기화<br>
    ![13 팔로우 취소 동기화](https://user-images.githubusercontent.com/66201264/151148044-d63eaa15-0d2b-4b3e-a4a9-22fdb7396696.gif)<br><br>
13. 댓글과 좋아요 동기화<br>
    ![12 댓글 좋아요 동기화](https://user-images.githubusercontent.com/66201264/151148037-e1e67607-2919-49fe-b0e0-65ce017ad0d0.gif)<br><br>
14. 키보드 접근성

## 7. 개발하며 고민한 부분 및 해결 방법

- `createElement`, `innerHTML`을 이용해 생성된 요소에 접근하기 위해 애를 먹었지만, JavaScript의 이벤트 위임을 통해 해결하였다.
- 상단 메뉴, 게시물, 댓글, 상품 판매 더 보기 버튼이 같은 UI이지만 내부 콘텐츠 및 버튼 동작이 달라 분기 처리하면서 함수를 나누어가며 리팩토링하였다.
- 접근성 높이기 위해서...
  - SNS의 콘텐츠 길이가 얼마나 길어질지 모르기 때문에 더 보기 및 이전 버튼을 콘텐츠보다 상위에 배치 시켰다.
  - 사용자가 업로드하는 이미지의 대체 텍스트를 사용자에게 일일이 요청하기에는 사용자 피로도가 증가할 수 있다고 생각했다. SNS의 경우 해당 사진에 대한 설명이 게시글에 나와 있다고 판단되어 사용자가 올린 이미지의 대체 텍스트를 '첨부파일'로 통일시켰다.
  - 게시물 삭제, 신고 시 처리되었다는 안내 문구가 짧게 노출되도록 했다.
  - 메뉴/모달창에서 메뉴/모달창 영역 외를 클릭해도 메뉴/모달창을 닫을 수 있도록 하였다.
  - 메뉴/모달창에서 키보드 제어가 잘 되도록 구현하였다.
  - 버튼 요소에 hover, active, focus등의 CSS 효과를 주었다.
