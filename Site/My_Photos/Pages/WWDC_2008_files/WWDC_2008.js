// Created by iWeb 2.0.4 local-build-20090307

function createMediaStream_id2()
{return IWCreatePhotocast("file://localhost/Users/zonble/Sites/zonble.github.com/Site/My_Photos/Pages/WWDC_2008_files/rss.xml",true,true);}
function initializeMediaStream_id2()
{createMediaStream_id2().load('file://localhost/Users/zonble/Sites/zonble.github.com/Site/My_Photos/Pages',function(imageStream)
{var entryCount=imageStream.length;var headerView=widgets['widget1'];headerView.setPreferenceForKey(imageStream.length,'entryCount');NotificationCenter.postNotification(new IWNotification('SetPage','id2',{pageIndex:0}));});}
function layoutMediaGrid_id2(range)
{createMediaStream_id2().load('file://localhost/Users/zonble/Sites/zonble.github.com/Site/My_Photos/Pages',function(imageStream)
{if(range==null)
{range=new IWRange(0,imageStream.length);}
IWLayoutPhotoGrid('id2',new IWPhotoGridLayout(4,new IWSize(125,125),new IWSize(125,32),new IWSize(153,172),27,27,0,new IWSize(20,14)),new IWPhotoFrame([IWCreateImage('WWDC_2008_files/Portfolio_Frame_01.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_02.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_03.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_06.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_09.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_08.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_07.png'),IWCreateImage('WWDC_2008_files/Portfolio_Frame_04.png')],null,2,0.600000,0.000000,20.000000,10.000000,20.000000,22.000000,31.000000,19.000000,31.000000,407.000000,320.000000,407.000000,320.000000,null,null,null,0.100000),imageStream,range,null,null,1.000000,null,'../../Media/slideshow.html','widget1','widget2','widget3')});}
function relayoutMediaGrid_id2(notification)
{var userInfo=notification.userInfo();var range=userInfo['range'];layoutMediaGrid_id2(range);}
function onStubPage()
{var args=getArgs();parent.IWMediaStreamPhotoPageSetMediaStream(createMediaStream_id2(),args.id);}
if(window.stubPage)
{onStubPage();}
setTransparentGifURL('../../Media/transparent.gif');function hostedOnDM()
{return false;}
function onPageLoad()
{IWRegisterNamedImage('comment overlay','../../Media/Photo-Overlay-Comment.png')
IWRegisterNamedImage('movie overlay','../../Media/Photo-Overlay-Movie.png')
IWRegisterNamedImage('contribution overlay','../../Media/Photo-Overlay-Contribution.png')
loadMozillaCSS('WWDC_2008_files/WWDC_2008Moz.css')
adjustLineHeightIfTooBig('id1');adjustFontSizeIfTooBig('id1');NotificationCenter.addObserver(null,relayoutMediaGrid_id2,'RangeChanged','id2')
adjustLineHeightIfTooBig('id3');adjustFontSizeIfTooBig('id3');Widget.onload();fixAllIEPNGs('../../Media/transparent.gif');fixupIECSS3Opacity('id4');initializeMediaStream_id2()
performPostEffectsFixups()}
function onPageUnload()
{Widget.onunload();}
