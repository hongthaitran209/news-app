"use strict";

const inputPageSize = document.getElementById("input-page-size");
const inputCategory = document.getElementById("input-category");
const btnSubmit = document.getElementById("btn-submit");
const userArr = getFromStorage("USER_ARRAY") || [];
const currentUser = getFromStorage("CURRENT_USER") || [];

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

btnSubmit.addEventListener("click", function () {
  const category = inputCategory.value.toLowerCase();
  const pageSize = Number(inputPageSize.value);
  if (currentUser.length === 1) {
    currentUser[0] = parseUser(currentUser[0]);
    if (category && pageSize) {
      currentUser[0].setCategory = category;
      currentUser[0].setPageSize = pageSize;
      saveToStorage("CURRENT_USER", currentUser);
      window.location.href = "../pages/news.html";

      // Thực hiện việc ghi đè những cài đặt mà người dùng đã thiết lập vào mảng danh sách người dùng
      // để sau này khi người dùng đăng nhập lại thì trang news sẽ hiển thị theo như cài đặt trước đó.
      for (let i = 0; i < userArr.length; i++) {
        if (userArr[i].userName === currentUser[0].userName) {
          userArr[i] = currentUser[0];
        }
      }
      saveToStorage("USER_ARRAY", userArr);
    } else {
      alert("You need to input your information!");
    }
  } else {
    alert("You need to login first!");
    window.location.href = "../pages/login.html";
  }
});
