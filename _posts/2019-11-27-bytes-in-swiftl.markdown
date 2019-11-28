---
layout: post
title:  "在 Swift 裡頭操作 Bytes"
date:   2019-11-27 22:07:21 +0800
categories: swift
---

從 2014 年 Swift 語言正式公開以來，就可以很明顯看出，這個語言在設計上的一大方向之一，就是想盡辦法想要隱藏指標這件事情，讓大家不需要碰到指標，甚至 byte、bit 這些觀念，就可以寫出程式來。

像是 bit flags 就被寫成是 array 的語法，在 Objective-C 當中原本 Foundation 物件都是 reference type，到了 Swift 3 以後又統統都是 value type，然後每一代 Swift 在跟指標有關的 API 都在大改。

有的時候你還是要寫點加解密之類的東西，像是先把數字轉成字串然後加個鹽巴再 AES 加密再 Base64 再把字串反轉…諸如此類，這時候就會一定會碰到 Binary 資料。這時候，如果你還是抱持著寫 C 語言的那種習慣的話，寫起 Swift 就會十分彆腳。

但很多時候，其實你根本不需要真的操作指標，你只是想要知道指標所指向的位置有什麼東西，換句話說，你只需要知道那些 bytes。在 Swift 裡頭，很多原本需要使用指標的場合，就只要把它當成 UInt8 的 Iterable 就可以了。

## Data

基本上現在你可以在 Swift 裡頭的 Data 型態，當成像是 \[UInt8\] 一樣使用。像是我們想要把一段 Data 裡頭的每個 byte 倒出來看看：

``` swift
var str = "Hello, playground"
var data = str.data(using: .ascii)!
for byte in data {
	print(String(format: "%2x", byte))
}
```

也可以用 map 這些 method。

``` swift
extension Data {
	func hexString() -> String {
		return self.map { String(format:"%02x", $0) }.joined()
	}
}

var str = "Hello, playground"
var data = str.data(using: .ascii)!
var hex = data.hexString()
```

其餘可以用的還包括 count、append、remove… 等等。

所以，我們就可以來寫一個簡單到一定超容易被破解的凱薩加密：

``` swift
func cipher(data: Data, offset:Int) -> Data {
	let array = data.map { UInt8((Int($0) + offset) % 256) }
	return Data(array)
}

var str = "Hello, playground"
var data = cipher(data: str.data(using: .ascii)!, offset: 3)
var result = String(data: data, encoding: .utf8)

```

Data 與 \[UInt8\] 的轉換也很簡單：

``` swift
var str = "Hello, playground"
var data = str.data(using: .ascii)!
var dataToArray = data.map { $0 } // 把 Data 轉成 [UInt8]
var arrayToData = Data(dataToArray) // 把 [UInt8] 轉成 Data
```

## UnsafeRawBufferPointer

至於我們想要拿到組成一個數字用的 Bytes，則可以呼叫 `withUnsafeBytes` 這個 function，然後我們會在 `withUnsafeBytes` 的 callback closure 裡頭拿到一個叫做 UnsafeRawBufferPointer 的物件。這個物件用起來…也很像是 [UInt8]。

比方說，我們可以把一個 32 位元整數的 4 個 bytes 倒出來看看：

``` swift
var int: Int32 = 1

withUnsafeBytes(of: int) { bytes in
	for byte in bytes {
		print(String(format: "%02x", byte))
	}
}
```

把數字轉成 Bytes 有什麼用呢？舉個在 iOS 開發會遇到的情境好了：在處理一些比較底層的行為的時候，蘋果習慣使用 OSStatus 當做發生錯誤時的錯誤代碼，這個代碼其實是一個 32 位元整數，但是這個整數到底是什麼意思，往往要把這個整數轉換成四個 char，從 char 對應的字母嘗試解讀：這四個字母通常是某個單字的縮寫。

``` swift
var int: UInt32 = 1718449215

var x = withUnsafeBytes(of: int.bigEndian) { bytes in
	return String(bytes: Array(bytes), encoding: .ascii)
}
```

我們就可以得到 "fmt?" 這個字串，大概可以當成 "format?" 的意思，代表的意義是 Core Audio 不支援我們要求播放的檔案格式。

如果我們拿到 "fmt?"，想要轉回 1718449215，也可以用 withUnsafeBytes 以及 UnsafeRawBufferPointer：

``` swift
var str = "fmt?"
var data = str.data(using: .ascii)!
withUnsafeBytes(of:data) { bytes in
	return bytes.load(as: UInt32.self).bigEndian
}
```

我們也可以把 \[UInt8\] 倒進 UnsafeRawPointer 裡頭，再轉成整數。

``` swift
var bytes:[UInt8] = [102, 109, 116, 63]
UnsafeRawPointer(bytes).load(as: UInt32.self).bigEndian
```
