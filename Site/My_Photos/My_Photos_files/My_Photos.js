// Created by iWeb 2.0.4 local-build-20090307

function createMediaStream_id2()
{return IWCreateMediaCollection("file://localhost/Users/zonble/Sites/zonble.github.com/Site/My_Photos/My_Photos_files/rss.xml",true,6,["No photos yet","%d photo","%d photos"],["","%d clip","%d clips"]);}
function initializeMediaStream_id2()
{createMediaStream_id2().load('file://localhost/Users/zonble/Sites/zonble.github.com/Site/My_Photos',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget7'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id2',{pageIndex:0}));});}
function layoutMediaGrid_id2(range)
{createMediaStream_id2().load('file://localhost/Users/zonble/Sites/zonble.github.com/Site/My_Photos',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id2',new IWPhotoGridLayout(2,new IWSize(259,194),new IWSize(259,34),new IWSize(309,243),27,27,0,new IWSize(89,74)),new IWPhotoFrame([IWCreateImage('My_Photos_files/spiralboook_ul.png'),IWCreateImage('My_Photos_files/spiralboook_top.png'),IWCreateImage('My_Photos_files/spiralboook_ur.png'),IWCreateImage('My_Photos_files/spiralboook_right.png'),IWCreateImage('My_Photos_files/spiralboook_lr.png'),IWCreateImage('My_Photos_files/spiralboook_bottom.png'),IWCreateImage('My_Photos_files/spiralboook_ll.png'),IWCreateImage('My_Photos_files/spiralboook_left.png')],null,1,0.800000,0.000000,10.000000,0.000000,19.000000,62.000000,49.000000,48.000000,72.000000,20.000000,1.000000,20.000000,1.000000,null,null,null,0.100000),imageStream,range,(null),null,1.000000,null,'../Media/slideshow.html','widget7',null,'widget8',{showTitle:true,showMetric:false})});}
function relayoutMediaGrid_id2(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id2(range);}
function onStubPage()
{var args=getArgs();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id2(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('../Media/transparent.gif');function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','../Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','../Media/Photo-Overlay-Movie.png')
IWRegisterNamedImage('contribution overlay','../Media/Photo-Overlay-Contribution.png')
loadMozillaCSS('My_Photos_files/My_PhotosMoz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');NotificationCenter.addObserver(null,relayoutMediaGrid_id2,'RangeChanged','id2')
adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixAllIEPNGs('../Media/transparent.gif');fixupAllIEPNGBGs();fixupIECSS3Opacity('id4');initializeMediaStream_id2()
performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
