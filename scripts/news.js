"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const pageNumEle = document.getElementById("page-num");
const btnNext = document.getElementById("btn-next");
const userArr = getFromStorage("USER_ARRAY") || [];
const currentUser = getFromStorage("CURRENT_USER") || [];
// API URL = https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&page=1&apiKey=cd666dae9664403c896fbe330e6e4f87

const renderNews = function (articlesArr) {
  let text = "";
  articlesArr.forEach(function (item) {
    text += `<div class="card flex-row flex-wrap">
    <div class="card mb-3" style="">
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            src="${item.urlToImage}"
            class="card-img"
            alt="${item.title}"
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">
            ${item.title}
            </h5>
            <p class="card-text">
            ${item.content}
            </p>
            <a
              href="${item.url}"
              class="btn btn-primary"
              >View</a
            >
          </div>
        </div>
      </div>
    </div>
  </div>`;
  });
  newsContainer.innerHTML = text;
};

// Do khi lưu xuống LocalStorage, chỉ có thể lưu được các JS Object chứ không phải Class Instance (chỉ lưu được các thuộc tính chứ các hàm trong class đó sẽ không lưu được)
// cần viết một hàm để chuyển từ JS Object sang Class Instance
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.userName,
    userData.password,
    userData.country,
    userData.category,
    userData.pageSize,
    userData.page
  );
  return user;
}

const news = new User(null, null, null, null, "us", "business", 10, 1);
if (currentUser.length === 1) {
  //Chế độ hiển thị các tin tức lấy từ API về khi người dùng đã đăng nhập
  currentUser[0] = parseUser(currentUser[0]);
  currentUser[0].loadNews();
} else {
  //Chế độ mặc định hiển thị các tin tức lấy từ API về khi người dùng chưa đăng nhập
  news.loadNews();
}

btnNext.addEventListener("click", function () {
  if (currentUser.length === 1) {
    // Đoạn code dành cho người dùng đã đăng nhập.
    currentUser[0].page++;
    pageNumEle.textContent = currentUser[0].page;
    currentUser[0].loadNews();
  } else {
    // Đoạn code dành cho người dùng chưa đăng nhập nhưng vẫn có thể coi được tin tức lấy từ API xuống
    news.page++;
    pageNumEle.textContent = news.page;
    news.loadNews();
  }
});

btnPrev.addEventListener("click", function () {
  if (currentUser.length === 1) {
    // Đoạn code dành cho người dùng đã đăng nhập.
    currentUser[0].page--;
    pageNumEle.textContent = currentUser[0].page;
    currentUser[0].loadNews();
  } else {
    // Đoạn code dành cho người dùng chưa đăng nhập nhưng vẫn có thể coi được tin tức lấy từ API xuống
    news.page--;
    pageNumEle.textContent = news.page;
    news.loadNews();
  }
});
