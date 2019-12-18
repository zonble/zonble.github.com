---
layout: post
title: 升級到 Flutter 1.12
date: 2019-12-18 15:28 +0800
---

上週 [Flutter Interact](https://developers.google.com/events/flutter-interact) 時發佈了 Flutter 1.12 版，這周把目前手上的專案也升級上去。Flutter 1.12 除了官方所宣稱的那些新功能之外，也改動了一些基本的 API 介面，所以一升上去…果然編不起來，需要手動修改一下目前的專案，其中不少跟單元測試相關，所以說，如果想要無痛升級，最好的方法就是一開始就不要寫測試（咦）。

這邊簡單記錄一下我所遇到的狀況：

## TypeMatcher

在寫 Flutter 的時候，你可能會遇到一件很討厭的事情：在你可能會用到的 Flutter 套件當中，有兩個東西都叫做 TypeMatcher，一個出現在 [matcher](https://pub.dev/packages/matcher) package 裡頭（參見[文件](https://pub.dev/documentation/matcher/latest/matcher/TypeMatcher-class.html)），另外一個 TypeMatcher 則出現在 Flutter 本身所提供的 [material] library 中（參見[文件](https://api.flutter.dev/flutter/widgets/TypeMatcher-class.html)）。最討厭的地方在於，這兩個東西都很常用：

* material 當中的 Type Matcher 讓你用來在 Flutter 的 Widget Tree 當中上下尋找 Widget，像是我們需要 Navigator 或是 Theme 的時候，需要向上尋找 NavigatorState，我們就得透過一個 TypeMatcher 去尋找符合 NavigatorState 型態的物件
* matcher 裡頭的 Type Matcher 則往往用到單元測試上，用來檢查某個行為的回傳的結果是否屬於某個型態

因為這兩個東西同名，所以你在寫單元測試的時候，為了要使用 matcher 的 TypeMatcher，結果 IDE 反而幫你 import 了 material，搞得你一肚子火。

Flutter 1.12 當中把 material 當中的 TypeMatcher 給 deprecate 了，但相對地，一些原本用到 material TypeMatcher 的 API 也要跟著調整，這些新 API 出現在 Flutter 的 PR [44189](https://github.com/flutter/flutter/pull/44189)，像是，你原本寫成：

``` dart
var state = context.ancestorStateOfType(const TypeMatcher<MyState>());
```

要改成：

``` dart
var state = context.findAncestorStateOfType<MyState>();
```

## 在 Mock Plugin 的時候的注意事項

Flutter 的單元測試只能夠在 Dart 的 virtual machine 上執行，但你的一些程式可能用到了 native plugin，所以，你在寫單元測試的時候，一旦遇到呼叫 native plugin 的地方，就得把這些 plugin 的呼叫變成 mock。我們可以對 method channel 呼叫 `setMockMethodCallHandler` 做到這件事情：

``` dart
var channel = MethodChannel('some_method_channel');
channel.setMockMethodCallHandler((call) async {
    return null;
});
```

Flutter 1.12 之後，你必須要先呼叫 `runApp` 或是 `TestWidgetsFlutterBinding.ensureInitialized()` 被呼叫之後，才可以呼叫 method channel。所以你就得在一堆單元測試中補上 `TestWidgetsFlutterBinding.ensureInitialized()`。

## 禁止呼叫 test_api

如果你 import 了 [test_api](https://pub.dev/packages/test_api) package，現在會發出警告。你只需要 import flutter_test 就可以了。

## ImageProvider 的改動

[ImageProvider](https://api.flutter.dev/flutter/painting/ImageProvider-class.html) 的 `load` method 以前只需要 key 這個參數，現在需要第二個參數 decoder callback。 大概就是，你以前寫成

```dart
imageProvider.load(key);
```

現在寫成：

```dart
imageProvider.load(key, PaintingBinding.instance.instantiateImageCodec);
```

## Dart 2.7 的 Linter

現在在寫 code 的時候會多出一些提示：

* 避免不必要的 `this` 呼叫
* 如果你寫了 `Set()`，會叫你改寫成 `{}`
* 避免撰寫重複的形態呼叫
* 在有必要標明型態的地方，會叫你補上去

基本上就是跳出什麼警告就修什麼。
