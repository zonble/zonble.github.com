---
layout: post
title: UnsafeRawPointer 與 UnsafeRawBufferPointer
date: 2019-12-04 01:17 +0800
---

 UnsafeRawPointer 與 UnsafeRawBufferPointer 這兩個 structure 名字差不多，不過代表的東西不同。UnsafeRawPointer 可以理解成就是 C 語言裡頭的 pointer（也就是 void *） ，至於 UnsafeRawBufferPointer 就是連續的 bytes，可以理解成我們可以從裡頭拿到 UInt8 的 Array。

 簡單寫一段 code：
 
``` swift
var ptr: UnsafeMutableRawPointer = calloc(1, MemoryLayout<Int>.size)
ptr.storeBytes(of: 123, as: Int.self)
var bytes: UnsafeRawBufferPointer = UnsafeRawBufferPointer(start:ptr, count:MemoryLayout<Int>.size)
Array(bytes)
let i1 = ptr.load(as: Int.self)
let i2 = bytes.load(as: Int.self)
```

這邊的 calloc 就是 C 語言的 calloc，應該會回傳一個 pointer 回來，在 Swift 裡頭，就會包裝成 UnsafeMutableRawPointer 這種形態。我們在這邊，建立了只有一個整數大小的記憶體位置。

我們可以從 UnsafeMutableRawPointer 建立 UnsafeRawBufferPointer，但是在建立 UnsafeRawBufferPointer 的時候，除了指標的位置之外，還要提供這段記憶體的長度。

接著，無論是 UnsafeMutableRawPointer 或是 UnsafeRawBufferPointer，我們都可以透過呼叫 `.load(as:)`，宣告成我們所想要的形態。
