"use strict";

class User {
  constructor(
    firstName,
    lastName,
    userName,
    password,
    country,
    category,
    pageSize,
    page
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.password = password;
    this.country = country;
    this.category = category;
    this.pageSize = pageSize;
    this.page = page;
  }

  // API URL = https://newsapi.org/v2/top-headlines?country=us&category=business&pageSize=10&page=1&apiKey=cd666dae9664403c896fbe330e6e4f87
  async loadNews() {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${this.country}&category=${this.category}&pageSize=${this.pageSize}&page=${this.page}&apiKey=cd666dae9664403c896fbe330e6e4f87`
      );

      // Sau khi gọi API thành công thì dữ liệu chúng ta cần dùng nằm ở trong body.
      // do đó cần dùng phương thức json() để lấy dữ liệu đó ra.
      const data = await response.json();
      const { status, totalResults, articles } = data;
      renderNews(articles);

      // Kiểm tra xem trang hiện tại đã là trang cuối chưa.
      // Nếu là trang cuối rồi thì sẽ ẩn nút Next đi.
      if (
        (totalResults % this.pageSize !== 0 &&
          this.page > Math.floor(totalResults / this.pageSize)) ||
        (totalResults % this.pageSize === 0 &&
          this.page === totalResults / this.pageSize)
      ) {
        btnNext.classList.add("hidden");
      }

      // Kiểm tra nếu như đang ở trang đầu tiên thì ẩn nút Previous.
      if (this.page === 1) {
        btnPrev.classList.add("hidden");
      } else {
        btnPrev.classList.remove("hidden");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  set setCountry(country) {
    this.country = country;
  }

  set setCategory(category) {
    this.category = category;
  }

  set setPageSize(pageSize) {
    this.pageSize = pageSize;
  }

  set setPage(page) {
    this.page = page;
  }

  get getCategory() {
    return this.category;
  }

  get getPageSize() {
    return this.pageSize;
  }
}
