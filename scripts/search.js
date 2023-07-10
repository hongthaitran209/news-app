"use strict";

const newsContainer = document.getElementById("news-container");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const pageNumEle = document.getElementById("page-num");
const inputQuery = document.getElementById("input-query");
const btnSubmit = document.getElementById("btn-submit");
// API URL: https://newsapi.org/v2/everything?q=bitcoin&apiKey=cd666dae9664403c896fbe330e6e4f87

class SearchCl {
  constructor(keyWord, pageSize, page) {
    this.keyWord = keyWord;
    this.pageSize = pageSize;
    this.page = page;
  }

  async searchNews() {
    try {
      const req = await fetch(
        `https://newsapi.org/v2/everything?q=${this.keyWord}&pageSize=${this.pageSize}&page=${this.page}&apiKey=cd666dae9664403c896fbe330e6e4f87`
      );

      const data = await req.json();
      const { status, totalResults, articles } = data;
      renderNews(articles);

      if (
        (totalResults % this.pageSize !== 0 &&
          this.page > Math.floor(totalResults / this.pageSize)) ||
        (totalResults % this.pageSize === 0 &&
          this.page === totalResults / this.pageSize)
      ) {
        btnNext.classList.add("hidden");
      }

      if (this.page === 1) {
        btnPrev.classList.add("hidden");
      } else {
        btnPrev.classList.remove("hidden");
      }
      console.log(data);
    } catch (err) {
      console.log(err.message);
    }
  }

  set setKeyWord(keyWord) {
    this.keyWord = keyWord;
  }

  set setPage(page) {
    this.page = page;
  }
}

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

const search = new SearchCl(inputQuery.value, 10, 1);

btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu người dùng nhập vào và dùng phương thức set của class SearchCl để gán giá trị đó vào thuộc tính keyWord
  search.setKeyWord = inputQuery.value;

  // Đưa về trang tin tức đầu tiên mỗi khi người dùng ấn nút search trong trường hợp người dùng muốn tìm tin tức với từ khóa khác.
  search.setPage = 1;
  pageNumEle.innerHTML = search.page;
  inputQuery.value = "";
  if (search.keyWord) {
    search.searchNews();
  } else {
    alert("You need to input your key word!");
  }
});

btnNext.addEventListener("click", function () {
  search.page++;
  pageNumEle.innerHTML = search.page;
  search.searchNews();
});

btnPrev.addEventListener("click", function () {
  search.page--;
  pageNumEle.innerHTML = search.page;
  search.searchNews();
});
