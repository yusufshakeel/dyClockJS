/*!
 * dyClockJS is a JavaScript library for creating clock.
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
/**
 * The dyClockJS class.
 */
var dyClock = /** @class */ (function () {
    /**
     * This will create the dyClock object based on the configuration
     * options passed by the user.
     *
     * option = {
     *  clock : "string"    //(optional) values: "analog|digital|both" default: "digital"
     *  format : "string"   //(optional) values: "(hh|HH):mm(:ss) (a|A)" default: "HH:mm:ss"
     *  hand : "string"     //(optional) values: "hm(s)" applicable: analog clock
     *  image : "string"    //(optional) value: /path/to/image-file applicable: analog clock
     *  radius : integer    //(optional) values: integer min: 30px max: 150px applicable: analog clock
     *  showdigital : boolean   //(optional) values: true|false default: false applicable: analog clock
     * }
     *
     * @param target
     * @param options
     */
    function dyClock(target, options) {
        // this is the default options
        this.defaults = {
            // clock type
            clock: "digital",
            // for digital clock
            format: "HH:mm:ss",
            digitalStyle: {
                backgroundColor: "#fff",
                border: "none",
                fontColor: "#000",
                fontFamily: "Arial",
                fontSize: 16
            },
            // for analog clock
            hand: "hms",
            radius: 150,
            showdigital: false,
            image: false,
            analogStyle: {
                backgroundColor: "#fff",
                border: "none",
                handsColor: {
                    h: "#000",
                    m: "#000",
                    s: "#000"
                },
                handsWidth: {
                    h: 3,
                    m: 2,
                    s: 1
                },
                roundHands: false,
                shape: "circle"
            }
        };
        // target elements
        this.target = '';
        this.targetElemBy = '';
        this.targetPrefix = '';
        // checking target
        if (typeof target === "undefined") {
            console.error("target undefined");
            return;
        }
        // checking radius - applicable for analog clock
        if (typeof options !== "undefined" && typeof options.radius !== "undefined") {
            options.radius = Math.ceil(options.radius);
            if (options.radius < 30) {
                options.radius = 30;
            }
            else if (options.radius > this.defaults.radius) {
                options.radius = this.defaults.radius;
            }
        }
        // find target element by
        if (target[0] === "#") {
            this.targetElemBy = "id";
        }
        else if (target[0] === ".") {
            this.targetElemBy = "class";
        }
        // prefix to be used in clock elements creation
        this.targetPrefix = target.substring(1);
        // target element
        this.target = this.targetPrefix;
        /**
         * user configuration extends defaults configuration
         */
        this.clockOption = (typeof options !== "undefined") ? this.extendSource(options, this.defaults) : this.defaults;
        /**
         * to start stop clock
         */
        this.tick = null;
        /**
         * to set the clock options format like time string, time ocject
         */
        this.setClockOptionFormat();
    }
    /**
     * This will extend source object with defaults object.
     *
     * @param source     this is the source object
     * @param defaults   this is the default object
     * @return object
     */
    dyClock.prototype.extendSource = function (source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    };
    /**
     * set clock options format
     */
    dyClock.prototype.setClockOptionFormat = function () {
        var obj = {
            hour: "",
            showMinutes: false,
            showSeconds: false
        }, format, time, ampm;
        //split format
        format = this.clockOption.format.split(" ");
        //get time format from format
        time = format[0].split(":");
        //get am/pm format from format
        ampm = (typeof format[1] !== "undefined") ? format[1] : false;
        //set format time
        if (time[0] === "hh") {
            obj.hour = "12";
        }
        else if (time[0] === "HH") {
            obj.hour = "24";
        }
        obj.showMinutes = true;
        if (typeof time[2] !== "undefined" && time[2] === "ss") {
            obj.showSeconds = true;
        }
        else {
            obj.showSeconds = false;
        }
        this.clockOption.format_time = obj;
        //set format ampm
        if (ampm === false) {
            this.clockOption.format_showam = false;
        }
        else {
            //if lowercase am/pm then 0, else 1
            this.clockOption.format_showam = true;
            this.clockOption.format_showamvalue = (ampm === "a") ? ["am", "pm"] : ["AM", "PM"];
        }
    };
    /**
     * Get the current time.
     */
    dyClock.prototype.getTime = function () {
        var dateObj = new Date(), time = {
            hour: null,
            minute: null,
            second: null
        };
        // set current time
        time.hour = dateObj.getHours();
        time.minute = dateObj.getMinutes();
        time.second = dateObj.getSeconds();
        return time;
    };
    /**
     * This will return time string based on user option.
     *
     * @param timeData
     * @param clockOption
     * @return string
     */
    dyClock.prototype.getTimeString = function (timeData, clockOption) {
        var tmp, timeString = "";
        switch (clockOption.format_time.hour) {
            case "12":
                // set hour
                if (timeData.hour === 0) {
                    timeString = "12 ";
                }
                else if (timeData.hour > 12) {
                    tmp = (timeData.hour - 12);
                    timeString = (tmp < 10) ? "0" + tmp : tmp;
                }
                else {
                    timeString = (timeData.hour < 10) ? "0" + timeData.hour : timeData.hour;
                }
                break;
            case "24":
                // set hour
                timeString = (timeData.hour < 10) ? "0" + timeData.hour : timeData.hour;
                break;
            default:
                console.error("Invalid format: hour");
        }
        // set minute
        if (timeData.minute < 10) {
            timeString = timeString + " : 0" + timeData.minute;
        }
        else {
            timeString = timeString + " : " + timeData.minute;
        }
        // set second
        if (clockOption.format_time.showSeconds === true) {
            if (timeData.second < 10) {
                timeString = timeString + " : 0" + timeData.second;
            }
            else {
                timeString = timeString + " : " + timeData.second;
            }
        }
        // show am/pm
        if (clockOption.format_showam === true) {
            if (timeData.hour >= 12) {
                timeString = timeString + " " + clockOption.format_showamvalue[1];
            }
            else {
                timeString = timeString + " " + clockOption.format_showamvalue[0];
            }
        }
        return timeString;
    };
    /**
     * This will start the clock.
     */
    dyClock.prototype.start = function () {
        var self = this;
        if (this.clockOption.clock === "digital") {
            this.drawDigitalClock();
            this.tick = setInterval(function () {
                self.runDigitalClock();
            }, 1000);
        }
        else if (this.clockOption.clock === "analog") {
            // this.drawAnalogClock();
            // this.tick = setInterval(function () {
            //     self.runAnalogClock();
            // }, 1000);
        }
    };
    /**
     * This will stop the clock.
     */
    dyClock.prototype.stop = function () {
        clearInterval(this.tick);
    };
    /**
     * This will draw the digital clock.
     */
    dyClock.prototype.drawDigitalClock = function () {
        console.log(this.clockOption);
        console.log(this.target);
        console.log(this.targetElemBy);
        console.log(this.targetPrefix);
        // create the digital clock container
        var html = "<div class='" + this.targetPrefix + "-digital-time-string dyclock-digital-time'></div>";
        // draw clock
        if (this.targetElemBy === "id") {
            document.getElementById(this.target).innerHTML = html;
        }
        else if (this.targetElemBy === "class") {
            var elArr = document.getElementsByClassName(this.target);
            for (var i = 0, len = elArr.length; i < len; i++) {
                elArr[i].innerHTML = html;
            }
        }
        // style
        this.styleDigitalClock();
    };
    /**
     * Style the digital clock time string.
     */
    dyClock.prototype.styleDigitalClock = function () {
        var elClass = this.target + "-digital-time-string", digitalStyle = this.clockOption.digitalStyle;
        /**
         * backgroundColor style
         */
        if (typeof digitalStyle.backgroundColor !== "undefined") {
            this.setCSSByClass('backgroundColor', digitalStyle.backgroundColor, elClass);
        }
        else {
            this.setCSSByClass('backgroundColor', this.defaults.digitalStyle.backgroundColor, elClass);
        }
        /**
         * border style
         */
        if (typeof digitalStyle.border !== "undefined") {
            this.setCSSByClass('border', digitalStyle.border, elClass);
        }
        else {
            this.setCSSByClass('border', this.defaults.digitalStyle.border, elClass);
        }
        /**
         * fontColor style
         */
        if (typeof digitalStyle.fontColor !== "undefined") {
            this.setCSSByClass('color', digitalStyle.fontColor, elClass);
        }
        else {
            this.setCSSByClass('color', this.defaults.digitalStyle.fontColor, elClass);
        }
        /**
         * fontFamily style
         */
        if (typeof digitalStyle.fontFamily !== "undefined") {
            this.setCSSByClass('fontFamily', digitalStyle.fontFamily, elClass);
        }
        else {
            this.setCSSByClass('fontFamily', this.defaults.digitalStyle.fontFamily, elClass);
        }
        /**
         * fontSize style
         */
        if (typeof digitalStyle.fontSize !== "undefined") {
            this.setCSSByClass('fontSize', digitalStyle.fontSize + 'px', elClass);
        }
        else {
            this.setCSSByClass('fontSize', this.defaults.digitalStyle.fontSize + 'px', elClass);
        }
    };
    /**
     * This is will set the CSS.
     * @param {string} property
     * @param {string | number} value
     */
    dyClock.prototype.styleDigitalClock_setCSS = function (property, value) {
        var elemArr = document.getElementsByClassName(this.target + "-digital-time-string");
        for (var i = 0, len = elemArr.length; i < len; i++) {
            elemArr[i].style[property] = value;
        }
    };
    /**
     * This will run the digital clock.
     */
    dyClock.prototype.runDigitalClock = function () {
        var elemArr = document.getElementsByClassName(this.target + "-digital-time-string");
        for (var i = 0, len = elemArr.length; i < len; i++) {
            elemArr[i].innerHTML = this.getTimeString(this.getTime(), this.clockOption);
        }
    };
    /**
     * This will draw the analog clock.
     */
    dyClock.prototype.drawAnalogClock = function () {
        var width = this.clockOption.radius * 2, height = this.clockOption.radius * 2, cx = this.clockOption.radius, cy = cx, hlen = Math.ceil(this.clockOption.radius * 0.65), mlen = Math.ceil(this.clockOption.radius * 0.3), slen = Math.ceil(this.clockOption.radius * 0.1), stlen = Math.ceil(this.clockOption.radius * 0.9), clockStyle = "", timeHTML = "", html;
        /**
         * show digital clock time string
         */
        if (this.clockOption.showdigital === true) {
            timeHTML = "<div class='" + this.targetPrefix + "-digital-time-string dyclock-digital-time' style='text-align: center; margin-top: 15px;'></div>";
        }
        else {
            timeHTML = "<div class='" + this.targetPrefix + "-digital-time-string dyclock-digital-time' style='display: none; text-align: center; margin-top: 15px;'></div>";
        }
        /**
         * if analog clock face image is provided then use that
         */
        if (typeof this.clockOption.image !== "undefined" && this.clockOption.image !== false) {
            clockStyle = "style = 'background: url(" + this.clockOption.image + "); background-repeat: no-repeat; background-size: contain;'";
        }
        /**
         * create the analog clock html
         */
        html = "<div class='dyclock-analog-time " + this.targetPrefix + "-analog-clock'" + clockStyle + ">" +
            "<svg width='" + width + "' height='" + height + "'>" +
            "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-h-hand dyclock-h-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + hlen + "'/>" +
            "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-m-hand dyclock-m-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + mlen + "'/>" +
            "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-s-hand dyclock-s-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + slen + "'/>" +
            "<line class='" + this.targetPrefix + "-analog-hand " + this.targetPrefix + "-s-tail dyclock-s-tail' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + stlen + "'/>" +
            "</svg>" +
            "</div>" +
            timeHTML;
        // draw clock
        if (this.targetElemBy === "id") {
            document.getElementById(this.target).innerHTML = html;
        }
        else if (this.targetElemBy === "class") {
            var elArr = document.getElementsByClassName(this.target);
            for (var i = 0, len = elArr.length; i < len; i++) {
                elArr[i].innerHTML = html;
            }
        }
        this.styleDigitalClock();
        // this.styleAnalogClock();
    };
    /**
     * This will style the analog clock.
     */
    dyClock.prototype.styleAnalogClock = function () {
        // let
        //     analogStyle = this.clockOption.analogStyle;
        //
        // /**
        //  * backgroundColor style
        //  */
        // if (typeof analogStyle.backgroundColor !== "undefined") {
        //     this.styleAnalogClock_setCSS('backgroundColor', analogStyle.backgroundColor);
        // } else {
        //     this.styleAnalogClock_setCSS('backgroundColor', this.defaults.analogStyle.backgroundColor);
        // }
        //
        // /**
        //  * border style
        //  */
        // if (typeof analogStyle.border !== "undefined") {
        //     this.styleAnalogClock_setCSS('border', analogStyle.border);
        // } else {
        //     this.styleAnalogClock_setCSS('border', this.defaults.analogStyle.border);
        // }
        //
        // /**
        //  * handsColor style
        //  */
        // if (typeof analogStyle.handsColor !== "undefined") {
        //
        //     //hour hand
        //     if (typeof analogStyle.handsColor.h !== "undefined") {
        //         $("." + this.targetPrefix + "-h-hand").css('stroke', analogStyle.handsColor.h);
        //     } else {
        //         $("." + this.targetPrefix + "-h-hand").css('stroke', self.defaults.analogStyle.handsColor.h);
        //     }
        //
        //     //minute hand
        //     if (typeof analogStyle.handsColor.m !== "undefined") {
        //         $("." + this.targetPrefix + "-m-hand").css('stroke', analogStyle.handsColor.m);
        //     } else {
        //         $("." + this.targetPrefix + "-m-hand").css('stroke', self.defaults.analogStyle.handsColor.m);
        //     }
        //
        //     //second hand
        //     if (typeof analogStyle.handsColor.s !== "undefined") {
        //         $("." + this.targetPrefix + "-s-hand").css('stroke', analogStyle.handsColor.s);
        //         $("." + this.targetPrefix + "-s-tail").css('stroke', analogStyle.handsColor.s);
        //     } else {
        //         $("." + this.targetPrefix + "-s-hand").css('stroke', self.defaults.analogStyle.handsColor.s);
        //         $("." + this.targetPrefix + "-s-tail").css('stroke', self.defaults.analogStyle.handsColor.s);
        //     }
        //
        // } else {
        //
        //     //hour hand
        //     $("." + this.targetPrefix + "-h-hand").css('stroke', self.defaults.analogStyle.handsColor.h);
        //
        //     //minute hand
        //     $("." + this.targetPrefix + "-m-hand").css('stroke', self.defaults.analogStyle.handsColor.m);
        //
        //     //second hand
        //     $("." + this.targetPrefix + "-s-hand").css('stroke', self.defaults.analogStyle.handsColor.s);
        //     $("." + this.targetPrefix + "-s-tail").css('stroke', self.defaults.analogStyle.handsColor.s);
        //
        // }
        //
        // /**
        //  * handsWidth style
        //  */
        // if (typeof analogStyle.handsWidth !== "undefined") {
        //
        //     //hour hand
        //     if (typeof analogStyle.handsWidth.h !== "undefined") {
        //         $("." + this.targetPrefix + "-h-hand").css('stroke-width', analogStyle.handsWidth.h);
        //     } else {
        //         $("." + this.targetPrefix + "-h-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.h);
        //     }
        //
        //     //minute hand
        //     if (typeof analogStyle.handsWidth.m !== "undefined") {
        //         $("." + this.targetPrefix + "-m-hand").css('stroke-width', analogStyle.handsWidth.m);
        //     } else {
        //         $("." + this.targetPrefix + "-m-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.m);
        //     }
        //
        //     //second hand
        //     if (typeof analogStyle.handsWidth.s !== "undefined") {
        //         $("." + this.targetPrefix + "-s-hand").css('stroke-width', analogStyle.handsWidth.s);
        //         $("." + this.targetPrefix + "-s-tail").css('stroke-width', analogStyle.handsWidth.s);
        //     } else {
        //         $("." + this.targetPrefix + "-s-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
        //         $("." + this.targetPrefix + "-s-tail").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
        //     }
        //
        // } else {
        //
        //     //hour hand
        //     $("." + this.targetPrefix + "-h-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.h);
        //
        //     //minute hand
        //     $("." + this.targetPrefix + "-m-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.m);
        //
        //     //second hand
        //     $("." + this.targetPrefix + "-s-hand").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
        //     $("." + this.targetPrefix + "-s-tail").css('stroke-width', self.defaults.analogStyle.handsWidth.s);
        //
        // }
        //
        // /**
        //  * roundHands style
        //  */
        // if (typeof analogStyle.roundHands !== "undefined" && analogStyle.roundHands === true) {
        //     $("." + this.targetPrefix + "-analog-hand").css('stroke-linecap', 'round');
        // }
        //
        // /**
        //  * shape style
        //  */
        // if (typeof analogStyle.shape !== "undefined" && analogStyle.shape === "circle") {
        //     this.styleAnalogClock_setCSS('borderRadius', '50%');
        // }
    };
    /**
     * This is will set the CSS.
     * @param {string} property
     * @param {string | number} value
     */
    dyClock.prototype.styleAnalogClock_setCSS = function (property, value) {
        var elemArr = document.getElementsByClassName(this.target + "-analog-clock");
        for (var i = 0, len = elemArr.length; i < len; i++) {
            elemArr[i].style[property] = value;
        }
    };
    /**
     * This is will set the CSS.
     * @param {string} property
     * @param {string | number} value
     * @param {string} elClass
     */
    dyClock.prototype.setCSSByClass = function (property, value, elClass) {
        var elemArr = document.getElementsByClassName(elClass);
        for (var i = 0, len = elemArr.length; i < len; i++) {
            elemArr[i].style[property] = value;
        }
    };
    return dyClock;
}());
