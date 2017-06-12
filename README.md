# ✨ Mojibaka
[![npm](https://img.shields.io/npm/v/mojibaka.svg?maxAge=2592000)](https://www.npmjs.com/package/mojibaka) ![mojibaka](https://img.shields.io/npm/l/mojibaka.svg?maxAge=2592000)  [![Build Status](https://travis-ci.org/ticky/mojibaka.svg?branch=master)](https://travis-ci.org/ticky/mojibaka) [![codecov](https://codecov.io/gh/ticky/mojibaka/branch/master/graph/badge.svg)](https://codecov.io/gh/ticky/mojibaka)

A browser emoji support detection toolkit

## 🔨 Tools

### 🛠 `detect` (default)

Returns an object containing information about the current browser's emoji support, including;

* `version`: The return value of `detectVersion`
* `fitzpatrick`: The return value of `detectFitzpatrick` (if `version` is > 0)
* `genders`: The return value of `detectGenders` (if `version` is >= 7.0)
* `scale`: The return value of `detectScale` (if `version` is > 0)

Useful for determining broad emoji support

### 🔎 `detectVersion`

Returns the maximum Unicode emoji version support was detected for, as a float.

### 🕵🏽 `detectFitzpatrick`

Returns a Boolean denoting whether the browser understands Fitzpatrick Skin Tone Modifiers (a Unicode 7.0 feature)

### 🕵🏻‍♀️ `detectGenders`

Returns a Boolean denoting whether the browser understands zero-width joiner gender modifiers (a Unicode 8.0 feature)

### 📏 `detectScale`

Returns the size of the emoji compared to text, as a float, rounded to one decimal place. Useful for compensating for size differences between different browser implementations.

## ⚠️ Caveats

* This doesn't yet test for Unicode 10.0 compatibility
* No version test is conclusive; individual character support _still_ varies by platform
* Consider carefully what you're using Mojibaka's output for. The less work you do to handle Emoji yourself within the browser, the better!
