/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../src/client/js/home.js":
/*!*******************************!*\
  !*** ./src/client/js/home.js ***!
  \*******************************/
/***/ (() => {

eval("var timer = document.querySelector(\".content timer\");\nvar timerTime = document.querySelector(\".content_timer_time\");\nvar timerStartBtn = document.querySelector(\"#start_button\");\nvar timerPauseBtn = document.querySelector(\"#pause_button\");\n\nfunction startTimer(clickedTime) {\n  var date = new Date();\n  var sumOfTime = parseInt((date.getTime() - clickedTime) / 1000);\n  console.log(sumOfTime);\n  var hours = parseInt(sumOfTime / 3600);\n  var minutes = parseInt(sumOfTime % 3600 / 60);\n  var seconds = parseInt(sumOfTime % 3600 % 60);\n  timerTime.innerText = \"\".concat(String(hours).padStart(2, \"0\"), \" : \").concat(String(minutes).padStart(2, \"0\"), \" : \").concat(String(seconds).padStart(2, \"0\"));\n}\n\nfunction paintTime(event) {\n  var date = new Date();\n  var clickedTime = date.getTime();\n  setInterval(function () {\n    startTimer(clickedTime);\n  }, 1000);\n}\n\ntimerStartBtn.addEventListener('click', paintTime);\n\n//# sourceURL=webpack://web/./src/client/js/home.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../src/client/js/home.js"]();
/******/ 	
/******/ })()
;