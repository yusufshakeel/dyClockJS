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

/*! dyClockJS | (c) 2016 Yusuf Shakeel | https://github.com/yusufshakeel/dyClockJS */

(function (global, $) {

    "use strict";

    var
        /**
         * this will create the DYclock object based on the configuration
         * option passed by the user.
         *
         * option = {
         *  clock : "string"    //(optional) values: "analog|digital|both" default: digital
         *  format : "string"   //(optional) values: "(hh|HH):mm(:ss) (a|A)" default: "HH:mm:ss"
         *  hand : "string"     //(optional) values: "hm(s)" applicable: analog clock
         *  image : "string"    //(optional) value: /path/to/image file applicable: analog clock
         * }
         *
         * @param object target
         * @param object options
         */
        DYclock = function (target, options) {

            if (typeof target === "undefined") {
                global.console.error("target undefined");
                return;
            }

            this.target = target;
            this.clockOption = (typeof options !== "undefined") ? this.extendSource(options, this.defaults) : this.defaults;
            this.tick = null;
            this.setClockOptionFormat();

        };

        /**
         * defaults
         */
        DYclock.prototype.defaults = {
            clock : "digital",
            format : "HH:mm:ss",
            hand : "hms"
        };

        /**
         * this function will extend source object with defaults object.
         *
         * @param object source     this is the source object
         * @param object defaults   this is the default object
         * @return object
         */
        DYclock.prototype.extendSource = function (source, defaults) {
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
        DYclock.prototype.setClockOptionFormat = function () {

            var
                obj = {},
                format = [],
                time,
                ampm;

            //split format
            format = this.clockOption.format.split(" ");

            //get time format from format
            time = format[0].split(":");

            //get am/pm format from format
            ampm = (typeof format[1] !== "undefined") ? format[1] : false;

            //set format time
            if (time[0] === "hh") {
                obj.hour = "12";
            } else if (time[0] === "HH") {
                obj.hour = "24";
            }

            obj.showMinutes = true;

            if (typeof time[2] !== "undefined" && time[2] === "ss") {
                obj.showSeconds = true;
            } else {
                obj.showSeconds = false;
            }

            this.clockOption.format_time = obj;

            //set format ampm
            if (ampm === false) {
                this.clockOption.format_showam = false;
            } else {
                //if lowercase am/pm then 0, else 1
                this.clockOption.format_showam = true;
                this.clockOption.format_showamvalue = (ampm === "a") ? ["am", "pm"] : ["AM", "PM"];
            }
        };

        /**
         * get current time
         */
        DYclock.prototype.getTime = function () {

            var
                dateObj = new global.Date(),
                time = {};

            //set current time
            time.hour = dateObj.getHours();
            time.minute = dateObj.getMinutes();
            time.second = dateObj.getSeconds();

            return time;
        };

        /**
         * this function will return time string based on user option.
         *
         * @param object timeData
         * @param object clockOption
         * @return string
         */
        DYclock.prototype.getTimeString = function (timeData, clockOption) {

            var
                tmp,
                timeString = "";

            switch (clockOption.format_time.hour) {
            case "12":
                //set hour
                if (timeData.hour === 0) {
                    timeString = "12 ";
                } else if (timeData.hour > 12) {
                    tmp = (timeData.hour - 12);
                    timeString = (tmp < 10) ? "0" + tmp : tmp;
                } else {
                    timeString = (timeData.hour < 10) ? "0" + timeData.hour : timeData.hour;
                }

                break;

            case "24":
                //set hour
                timeString = (timeData.hour < 10) ? "0" + timeData.hour : timeData.hour;
                break;

            default:
                global.console.error("Invalid format: hour");
            }

            //set minute
            if (timeData.minute < 10) {
                timeString = timeString + " : 0" + timeData.minute;
            } else {
                timeString = timeString + " : " + timeData.minute;
            }

            //set second
            if (clockOption.format_time.showSeconds === true) {
                if (timeData.second < 10) {
                    timeString = timeString + " : 0" + timeData.second;
                } else {
                    timeString = timeString + " : " + timeData.second;
                }
            }

            //show am/pm
            if (clockOption.format_showam === true) {
                if (timeData.hour >= 12) {
                    timeString = timeString + " " + clockOption.format_showamvalue[1];
                } else {
                    timeString = timeString + " " + clockOption.format_showamvalue[0];
                }
            }

            return timeString;

        };

        /**
         * this function will start the clock
         */
        DYclock.prototype.start = function () {

            var self = this;

            if (this.clockOption.clock === "digital") {
                this.tick = global.setInterval( function() { self.drawDigitalClock(); }, 1000);
            } else if (this.clockOption.clock === "analog") {
                this.drawAnalogClock();
            }

        };

        /**
         * this function will stop the clock
         */
         DYclock.prototype.stop = function () {

             global.clearInterval(this.tick);

         };

        /**
         * this function will draw the digital clock
         */
        DYclock.prototype.drawDigitalClock = function () {

            var
                html = "<div class='dyclock-digital-time'>" + this.getTimeString(this.getTime(), this.clockOption) + "</div>";

            this.target.html(html);

        };

        /**
         * this function will draw the analog clock
         */
        DYclock.prototype.drawAnalogClock = function () {

        };

    /**
     * attach to global
     */
     global.DYclock = DYclock;

}(typeof window !== "undefined" ? window : this,
typeof jQuery !== "undefined" ? jQuery : undefined));
