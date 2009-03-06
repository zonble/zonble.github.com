// Created by iWeb 2.0.4 local-build-20090307

setTransparentGifURL('Media/transparent.gif');function applyEffects()
{var registry=IWCreateEffectRegistry();registry.registerEffects({stroke_0:new IWStrokeParts([{rect:new IWRect(-5,5,10,377),url:'Welcome_files/stroke.png'},{rect:new IWRect(-5,-5,10,10),url:'Welcome_files/stroke_1.png'},{rect:new IWRect(5,-5,620,10),url:'Welcome_files/stroke_2.png'},{rect:new IWRect(625,-5,10,10),url:'Welcome_files/stroke_3.png'},{rect:new IWRect(625,5,10,377),url:'Welcome_files/stroke_4.png'},{rect:new IWRect(625,382,10,10),url:'Welcome_files/stroke_5.png'},{rect:new IWRect(5,382,620,10),url:'Welcome_files/stroke_6.png'},{rect:new IWRect(-5,382,10,10),url:'Welcome_files/stroke_7.png'}],new IWSize(630,387)),reflection_0:new IWReflection({opacity:0.18,offset:6.00})});registry.applyEffects();}
function hostedOnDM()
{return false;}
function onPageLoad()
{loadMozillaCSS('Welcome_files/WelcomeMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');adjustLineHeightIfTooBig('id2');adjustFontSizeIfTooBig('id2');Widget.onload();fixAllIEPNGs('Media/transparent.gif');fixupIECSS3Opacity('id3');applyEffects()}
function onPageUnload()
{Widget.onunload();}
