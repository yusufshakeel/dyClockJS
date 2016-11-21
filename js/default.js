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

//default digital clock
var clock_digital = new dyClock({
    target : "#dyclock-digital",
    clock : "digital"
});

console.log(clock_digital);

clock_digital.draw();

//digital clock hh:mm:ss a
//hh = 1-12
//a = am/pm
// dyclock.draw({
//     target : "#dyclock-digital-hh:mm:ss-a",
//     clock : "digital",
//     format : "hh:mm:ss a"
// });
