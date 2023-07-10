"use strict";

const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const btnSubmit = document.getElementById("btn-submit");
const userArr = getFromStorage("USER_ARRAY") || [];
const currentUser = getFromStorage("CURRENT_USER") || [];

btnSubmit.addEventListener("click", function () {
  // Kiểm tra xem đã có danh sách người dùng đăng ký chưa.
  if (userArr.length === 0) {
    alert("No user has been registered yet!");
    window.location.href = "../pages/register.html";
  }

  // Đoạn code này chỉ chạy khi chưa có người đăng nhập.
  if (currentUser.length === 0) {
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].userName === userNameInput.value) {
        if (userArr[i].password === passwordInput.value) {
          currentUser.push(userArr[i]);
          saveToStorage("CURRENT_USER", currentUser);
          window.location.href = "../index.html";
        } else {
          alert("User name or Password is not correct");
        }
      }
    }
  }
});
