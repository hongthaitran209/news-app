"use strict";

const saveToStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

const getFromStorage = function (key, df) {
  const data = JSON.parse(localStorage.getItem(key));
  return data ?? df;
};

const removeFromStorage = function (key) {
  localStorage.removeItem(key);
};
