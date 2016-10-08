/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _canvas = __webpack_require__(1);

	var _testCharacters = __webpack_require__(2);

	var _testCharacters2 = _interopRequireDefault(_testCharacters);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Context2DConstructor = CanvasRenderingContext2D || Context2d;
	var _realFillText = Context2DConstructor.prototype.fillText;

	function createImage(src, text) {
	  var newLink = document.createElement('a');
	  newLink.href = src;
	  newLink.download = text.split('').map(function (char) {
	    return char.charCodeAt(0).toString(16);
	  }).join('-') + '.png';
	  var newImage = new Image();
	  newImage.src = src;
	  newLink.appendChild(newImage);
	  document.body.appendChild(newLink);
	}

	Context2DConstructor.prototype.fillText = function (text) {
	  var fillTextResponse = _realFillText.apply(this, Array.from(arguments));
	  createImage(this.canvas.toDataURL(), text);
	  return fillTextResponse;
	};

	_testCharacters2.default.forEach(function (char) {
	  return (0, _canvas.canDrawCharacter)(char);
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.prepareCanvasContext = prepareCanvasContext;
	exports.canDrawCharacter = canDrawCharacter;
	exports.getCharacterWidth = getCharacterWidth;
	var DRAW_SIZE = 32;

	function prepareCanvasContext(context) {
	  if (!context) {
	    context = document.createElement('canvas').getContext('2d');
	    context.fillStyle = "#000";
	    context.font = DRAW_SIZE + 'px "Apple Color Emoji","Segoe UI","Segoe UI Emoji","Segoe UI Symbol",Arial';
	  } else {
	    context.clearRect(0, 0, DRAW_SIZE * 2, DRAW_SIZE * 2);
	  }

	  return context;
	}

	function canDrawCharacter(character, context) {
	  context = prepareCanvasContext(context);
	  context.fillText(character, 0, DRAW_SIZE);

	  return context.getImageData(DRAW_SIZE / 2, DRAW_SIZE / 2, 1, 1).data[0] !== 0;
	}

	function getCharacterWidth(character, context) {
	  context = prepareCanvasContext(context);

	  return context.measureText(character).width;
	}

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = ['\uD83D\uDC78', '\uD83D\uDC78\uD83C\uDFFE', '\uD83D\uDD75', '\uD83D\uDE19', '\uD83D\uDE42', '\uD83E\uDD14', '\uD83E\uDD23'];

/***/ }
/******/ ]);