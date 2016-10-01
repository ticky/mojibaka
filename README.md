# ✨ Mojibaka

A browser emoji support detection toolkit

## 🔨 Tools

### 🛠 `detect` (default)

Returns an object containing information about the current browser's emoji support, including;

* `version`: The return value of `detectVersion`
* `fitzpatrick`: The return value of `detectFitzpatrick` (if `version` is > 0)
* `genders`: The return value of `detectGenders` (if `version` is >= 7.0)

Useful for determining broad emoji support

### 🔬 `canDrawCharacter`

Determines whether the supplied character is drawn (read: the center pixel is drawn) by the current browser.
Useful for determining granular emoji support.

### 🔎 `detectVersion`

Returns the maximum Unicode emoji version support was detected for, as a float.

### 🕵🏽 `detectFitzpatrick`

Returns a Boolean denoting whether the browser understands Fitzpatrick Skin Tone Modifiers (a Unicode 7.0 feature)

### 🕵🏻‍♀️ `detectGenders`

Returns a Boolean denoting whether the browser understands zero-width joiner gender modifiers (a Unicode 8.0 feature)

## ⚠️ Caveats

* This is still being tested. It may not (read: definitely does not) handle all cases
* This doesn't test for Unicode 10.0 compatibility
* No version test is conclusive; individual character support _still_ varies by platform
* The API may change wildly as I try to make use of this
