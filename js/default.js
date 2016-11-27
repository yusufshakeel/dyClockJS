/*!
 * dyClock is a JavaScript library for creating clock.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyClockJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2014-01-29 Wednesday
 */

//default: digital clock default format: (HH:mm:ss)
var clockObj = new dyClock($("#dyclock-digital"));
clockObj.start();

//default: digital clock format: (hh:mm:ss a)
var clockObj2 = new dyClock($("#dyclock-digital-2"), {
    format : "hh:mm:ss a"
});
clockObj2.start();

//default: digital clock format: (hh:mm a)
var clockObj3 = new dyClock($("#dyclock-digital-3"), {
    format : "hh:mm a"
});
clockObj3.start();

//default: digital clock format: (hh:mm:ss a) by class
var clockObj4 = new dyClock($(".dyclock-digital-4"), {
    format : "hh:mm:ss a"
});
clockObj4.start();

//analog clock
var clockObj5 = new dyClock($("#dyclock-analog"), {
    clock : "analog"
});
clockObj5.start();

//analog clock with digital time string
var clockObj6 = new dyClock($("#dyclock-analog-2"), {
    clock : "analog",
    showdigital : true
});
clockObj6.start();

//analog clock with digital time string (hh:mm:ss a)
var clockObj7 = new dyClock($("#dyclock-analog-3"), {
    clock : "analog",
    format : "hh:mm:ss a",
    showdigital : true
});
clockObj7.start();

//analog clock with digital time string (hh:mm:ss a) radius 60px
var clockObj8 = new dyClock($("#dyclock-analog-4"), {
    clock : "analog",
    format : "hh:mm:ss a",
    showdigital : true,
    radius : 60
});
clockObj8.start();

//analog clock with digital time string (hh:mm:ss a) radius 60px with background-image
var clockObj9 = new dyClock($("#dyclock-analog-5"), {
    clock : "analog",
    format : "hh:mm:ss a",
    showdigital : true,
    radius : 60,
    image : "image/c01.png"
});
clockObj9.start();

//analog clock with digital time string (hh:mm:ss a) radius 150px with background-image
var clockObj10 = new dyClock($("#dyclock-analog-6"), {
    clock : "analog",
    format : "hh:mm:ss a",
    showdigital : true,
    radius : 100,
    image : "image/c02.png"
});
clockObj10.start();

//analog clock with digital time string (hh:mm:ss a) radius 150px with background-image
var clockObj11 = new dyClock($("#dyclock-analog-7"), {
    clock : "analog",
    format : "hh:mm:ss a",
    showdigital : true,
    radius : 150,
    image : "image/c03.png"
});
clockObj11.start();

//analog clock with digital time string (hh:mm:ss a) radius 150px with background-image - No second hand
var clockObj12 = new dyClock($("#dyclock-analog-8"), {
    clock : "analog",
    format : "hh:mm:ss a",
    showdigital : true,
    radius : 150,
    image : "image/c03.png",
    hand : "hm"
});
clockObj12.start();

//digital clock - font-5x and font family
var clockObj13 = new dyClock($(".dyclock-digital-9"), {
    clock : "digital",
    format : "HH:mm:ss A"
});
clockObj13.start();
