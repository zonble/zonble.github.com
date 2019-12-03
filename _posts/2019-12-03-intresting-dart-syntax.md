---
layout: post
title: 幾個有趣的 Dart 語法
date: 2019-12-03 23:39 +0800
---

從去年夏天 Dart 推出 2.0 版，目前穩定版本是 2.6 版，當中增加了幾個有趣的語法，而這幾個語法感覺起來都跟怎麼描述 Flutter 的宣告式 UI 有關。

比方說，在 Flutter 裡頭，我們往往要對一些集合性質的元件，像是 Column、Row、Stack、CustomScrollView 等等，要宣告底下的 children，很多時候，到底有哪些 children，會牽涉到一些複雜的商業邏輯，導致你不能夠一次把跟這段 children 有關的 code 直接寫在這個 widget 底下，而是必須要拆出一個 list 型態的變數，然後一直呼叫 `add()` 或是 `addAll()` 把 widget 加進去。

在 Dart 2.3 當中的一些語法，就可以讓你可以少寫 `add()` 與 `addAll()`。

## collection if

簡單講就是這樣

``` dart
[1, 2, if (true) 3]; //  <- 這樣是 [1, 2, 3]
[1, 2, if (false) 3]; // <- 這樣是 [1, 2]
```

不然你以前（或是在很多其他的語言中），你得寫成這樣；

``` dart
var a = [1, 2];
if (true) a.add(3);
```

## collection for

寫起來像這樣：

``` dart
 [1, 2, for (var i in List.generate(3, (x)=> x + 3))  i + 1];
```

結果是 `[1, 2, 4, 5, 6]`。

## 在 collection 前方加上三個點

在 list 中如果還有另外一個 list，我們可以在裡頭這個 list 前方加上三個點，然後就可以讓裡頭這個 list 展開。像是下面這段 code：

``` dart
[1, 2, ...[3, 4]]; // 會變成 [1, 2, 3, 4]
```

這個語法有什麼用途？比方說，在我們的 children 裡頭，有時候一些 widget，是從另外一個 function 建立的，像這樣：

``` dart
[1, 2, myFun()];
```

那，假如 `myFun()` 回傳的不是單一的 widget，而是放在一個 list 當中的多個 widget 呢？以前我們就得寫成：

``` dart
var a = [1, 2];
if (true) a.addAll(myFun());
```

但現在只需要寫成

```dart
[1, 2, ...myFun()];
```

## 綜合使用

我們也可以結合這幾種語法，像是可以寫成：

``` dart
[1, 2, if (true) ...myFun()];
```
