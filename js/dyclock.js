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
         * this will create the dyClock object based on the configuration
         * option passed by the user.
         *
         * option = {
         *  clock : "string"    //(optional) values: "analog|digital|both" default: digital
         *  format : "string"   //(optional) values: "(hh|HH):mm(:ss) (a|A)" default: "HH:mm:ss"
         *  hand : "string"     //(optional) values: "hm(s)" applicable: analog clock
         *  image : "string"    //(optional) value: /path/to/image file applicable: analog clock
         *  radius : integer    //(optional) values: integer min: 40px max: 150px applicable: analog clock
         *  showdigital : boolean   //(optional) values: true|false default: false applicable: analog clock
         * }
         *
         * @param object target
         * @param object options
         */
        dyClock = function (target, options) {

            //checking target
            if (typeof target === "undefined") {
                global.console.error("target undefined");
                return;
            }

            //checking radius - applicable for analog clock
            if (typeof options !== "undefined" && typeof options.radius !== "undefined") {

                options.radius = global.Math.ceil(options.radius);

                if (options.radius < 40) {
                    options.radius = 40;
                } else if (options.radius > 150) {
                    options.radius = 150;
                }
            }

            this.target = target;
            this.clockOption = (typeof options !== "undefined") ? this.extendSource(options, this.defaults) : this.defaults;
            this.tick = null;
            this.analogClockLinePrefix = this.target.selector.substring(1);
            this.setClockOptionFormat();

        };

        /**
         * defaults
         */
        dyClock.prototype.defaults = {
            clock : "digital",
            format : "HH:mm:ss",
            hand : "hms",
            radius : 150,
            showdigital : false
        };

        /**
         * this function will extend source object with defaults object.
         *
         * @param object source     this is the source object
         * @param object defaults   this is the default object
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
        dyClock.prototype.getTime = function () {

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
        dyClock.prototype.getTimeString = function (timeData, clockOption) {

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
        dyClock.prototype.start = function () {

            var self = this;

            if (this.clockOption.clock === "digital") {
                this.tick = global.setInterval( function() { self.runDigitalClock(); }, 1000);
            } else if (this.clockOption.clock === "analog") {
                this.drawAnalogClock();

                this.tick = global.setInterval( function() { self.runAnalogClock(); }, 1000);
            }

        };

        /**
         * this function will stop the clock
         */
         dyClock.prototype.stop = function () {

             global.clearInterval(this.tick);

         };

        /**
         * this function will run the digital clock
         */
        dyClock.prototype.runDigitalClock = function () {

            var
                html = "<div class='dyclock-digital-time'>" + this.getTimeString(this.getTime(), this.clockOption) + "</div>";

            this.target.html(html);

        };

        /**
         * this function will draw the analog clock
         */
        dyClock.prototype.drawAnalogClock = function () {

            var
                width = this.clockOption.radius * 2,
                height = width,
                cx = this.clockOption.radius,
                cy = cx,
                hlen = global.Math.ceil(this.clockOption.radius * 0.65),
                mlen = global.Math.ceil(this.clockOption.radius * 0.3),
                slen = global.Math.ceil(this.clockOption.radius * 0.1),
                stlen = global.Math.ceil(this.clockOption.radius * 0.9),
                clockStyle = "",
                hStyle = "",
                mStyle = "",
                sStyle = "",
                timeHTML = "",
                html;

            if (this.clockOption.showdigital === true) {
                timeHTML = "<div class='" + this.analogClockLinePrefix + "-time-string' style='text-align: center'></div>";
            } else {
                timeHTML = "<div class='" + this.analogClockLinePrefix + "-time-string' style='display: none; text-align: center'></div>";
            }

            if (typeof this.clockOption.image !== "undefined") {
                clockStyle = "style = 'background: url(" + this.clockOption.image + "); background-repeat: no-repeat; background-size: contain;'";
            }

            if (typeof this.clockOption.hand !== "undefined") {
                if (this.clockOption.hand[0] !== "h") {
                    hStyle = "style = 'display: none'";
                }

                if (this.clockOption.hand[1] !== "m") {
                    mStyle = "style = 'display: none'";
                }

                if (this.clockOption.hand[2] !== "s") {
                    sStyle = "style = 'display: none'";
                }
            }

            html = "<div class='dyclock-analog-time' " + clockStyle + ">" +
                "<svg width='" + width + "' height='" + height + "'>" +
                    "<line class='" + this.analogClockLinePrefix + "-h-hand dyclock-h-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + hlen + "' " + hStyle + "/>" +
                    "<line class='" + this.analogClockLinePrefix + "-m-hand dyclock-m-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + mlen + "' " + mStyle + " />" +
                    "<line class='" + this.analogClockLinePrefix + "-s-hand dyclock-s-hand' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + slen + "' " + sStyle + " />" +
                    "<line class='" + this.analogClockLinePrefix + "-s-tail dyclock-s-tail' x1='" + cx + "' y1='" + cy + "' x2='" + cx + "' y2='" + stlen + "' " + sStyle + " />" +
                "</svg>" +
            "</div>" +
            timeHTML;

            this.target.html(html);
        };

        /**
         * this function will run the analog clock
         */
        dyClock.prototype.runAnalogClock = function () {

            var
                d = this.getTime(),
                h = 30 * ((d.hour % 12) + d.minute / 60),
                m = 6 * d.minute,
                s = 6 * d.second;

            //clock-hands
            $("." + this.analogClockLinePrefix + "-h-hand").attr('transform', this.getRotateStr(h));
            $("." + this.analogClockLinePrefix + "-m-hand").attr('transform', this.getRotateStr(m));
            $("." + this.analogClockLinePrefix + "-s-hand").attr('transform', this.getRotateStr(s));
            $("." + this.analogClockLinePrefix + "-s-tail").attr('transform', this.getRotateStr(s+180));

            //time-string
            $("." + this.analogClockLinePrefix + "-time-string").html(this.getTimeString(this.getTime(), this.clockOption));
        };

        /**
         * this function will return the rotate string for transfrom
         */
        dyClock.prototype.getRotateStr = function (val) {

            var
                width = this.clockOption.radius * 2,
                height = width,
                cx = this.clockOption.radius,
                cy = cx;

            return "rotate(" + val + ", " + cx + ", " + cy + ")";
        };

    /**
     * attach to global
     */
     global.dyClock = dyClock;

}(typeof window !== "undefined" ? window : this,
typeof jQuery !== "undefined" ? jQuery : undefined));
