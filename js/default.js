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
var clockObj = new DYclock($("#dyclock-digital"));
clockObj.start();

//default: digital clock format: (hh:mm:ss a)
var clockObj2 = new DYclock($("#dyclock-digital-2"), {
    format : "hh:mm:ss a"
});
clockObj2.start();

//default: digital clock format: (hh:mm a)
var clockObj3 = new DYclock($("#dyclock-digital-3"), {
    format : "hh:mm a"
});
clockObj3.start();
