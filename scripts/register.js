"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const userNameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const confirmPasswordInput = document.getElementById("input-password-confirm");
const btnSubmit = document.getElementById("btn-submit");
const userArr = getFromStorage("USER_ARRAY") || [];

const validateData = function () {
  if (
    !(
      firstNameInput.value &&
      lastNameInput.value &&
      userNameInput.value &&
      passwordInput.value &&
      confirmPasswordInput.value
    )
  ) {
    alert("You need to fill in all field");
    return false;
  }

  if (userArr.length !== 0) {
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].userName === userNameInput.value) {
        alert("This user name is already on the list");
        return false;
      }
    }
  }

  if (passwordInput.value.length <= 8) {
    alert("Password must be more than 8 characters");
    return false;
  }

  if (passwordInput.value !== confirmPasswordInput.value) {
    alert("Password and confirmed password must be same");
    return false;
  }

  return true;
};

btnSubmit.addEventListener("click", function () {
  const userData = new User(
    firstNameInput.value,
    lastNameInput.value,
    userNameInput.value,
    passwordInput.value,

    // Các tham số dùng để mặc định fetch API khi người dùng đăng nhập mà chưa thiết lập cài đặt
    // category và số lượng tin tức có trong 1 trang (pageSize)
    "us",
    "business",
    10,
    1
  );

  const validate = validateData();
  if (validate) {
    userArr.push(userData);
    saveToStorage("USER_ARRAY", userArr);
    window.location.href = "../pages/login.html";
  }
});
