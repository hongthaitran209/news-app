"use strict";

const loginModal = document.getElementById("login-modal");
const mainContent = document.getElementById("main-content");
const welcomeMessage = document.getElementById("welcome-message");
const btnLogout = document.getElementById("btn-logout");
const userArr = getFromStorage("USER_ARRAY") || [];
const currentUser = getFromStorage("CURRENT_USER") || [];

// Kiểm tra nếu người dùng đã đăng nhập thì ẩn nút login và register đi và hiện nút Logout ra.
if (currentUser.length !== 0) {
  loginModal.classList.add("hidden");
  mainContent.classList.remove("hidden");
  welcomeMessage.innerHTML = `Welcome ${currentUser[0].firstName} ${currentUser[0].lastName}`;
}

btnLogout.addEventListener("click", function () {
  // Khi người dùng nhấn nút Logout thì sẽ phải xóa thông tin đăng nhập ở localStorage
  removeFromStorage("CURRENT_USER");

  // Hiện nút login và register đồng thời ẩn nút Logout
  loginModal.classList.remove("hidden");
  mainContent.classList.add("hidden");

  // Điều về trang login
  window.location.href = "../pages/login.html";
});
