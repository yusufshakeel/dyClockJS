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

(function (global) {

    "use strict";

    var
        document = global.document,

        //default settings
        defaults = {
            clock : "digital",
            format : "hh:mm:ss",
            face : "4",
            numeral : "decimal",
            hand : "hms"
        },

        /**
         * this function will extend source object with defaults object.
         *
         * @param object source     this is the source object
         * @param object defaults   this is the default object
         * @return object
         */
        extendSource = function (source, defaults) {
            var property;
            for (property in defaults) {
                if (source.hasOwnProperty(property) === false) {
                    source[property] = defaults[property];
                }
            }
            return source;
        },

        /**
         * This method will draw Analog clock.
         */
        drawAnalog = function () {

        },

        /**
         * This method will draw Digital clock.
         */
        drawDigital = function (clockOption) {

            var
                elemArr, i, len,
                dateObj = new global.Date(),
                dateData = {};

            //get current time
            dateData.hour = dateObj.getHours();
            dateData.minute = dateObj.getMinutes();
            dateData.second = dateObj.getSeconds();

            if (clockOption.target_elementBy === "id") {

                document.getElementById(clockOption.target).innerHTML = "<div class='dyclock-digital-time'>" + getTimeString(dateData, clockOption) + "</div>";

            } else if (clockOption.target_elementBy === "class") {

                elemArr = document.getElementsByClassName(clockOption.target);
                for (i = 0, len = elemArr.length; i < len; i = i + 1) {
                    elemArr[i].innerHTML = "<div class='dyclock-digital-time'>" + getTimeString(dateData, clockOption) + "</div>";
                }

            }

            setTimeout(drawDigital(clockOption), 1000);
        },

        /**
         * this function will return time string based on user option.
         *
         * @param object dateData
         * @param object clockOption
         * @return string
         */
        getTimeString = function (dateData, clockOption) {

            //variable
            var
                tmp,
                timeString = "";

            switch (clockOption.format_time.hour) {
            case "12":
                //set hour
                if (dateData.hour === 0) {
                    timeString = "12 ";
                } else if (dateData.hour > 12) {
                    tmp = (dateData.hour - 12);
                    timeString = (tmp < 10) ? "0" + tmp : tmp;
                } else {
                    timeString = (dateData.hour < 10) ? "0" + dateData.hour : dateData.hour;
                }

                break;

            case "24":
                //set hour
                timeString = (dateData.hour < 10) ? "0" + dateData.hour : dateData.hour;
                break;

            default:
                global.console.error("Invalid format: hour");
            }

            //set minute
            if (dateData.minute < 10) {
                timeString = timeString + " : 0" + dateData.minute;
            } else {
                timeString = timeString + " : " + dateData.minute;
            }

            //set second
            if (clockOption.format_time.showSeconds === true) {
                if (dateData.second < 10) {
                    timeString = timeString + " : 0" + dateData.second;
                } else {
                    timeString = timeString + " : " + dateData.second;
                }
            }

            //show am/pm
            if (clockOption.format_showam === true) {
                if (dateData.hour >= 12) {
                    timeString = timeString + " " + clockOption.format_showamvalue[1];
                } else {
                    timeString = timeString + " " + clockOption.format_showamvalue[0];
                }
            }

            return timeString;

        },

        //------------------------------ dyClock ----------------------

        /**
         * this will create the dyclock object based on the configuration
         * option passed by the user.
         *
         * option = {
         *  target : "string"   //(mandatory) for id use #id | for class use .class
         *  clock : "string"    //(optional) values: "analog|digital|both" default: digital
         *  format : "string"   //(optional) values: "(hh|HH):mm(:ss) (a|A)" default: "HH:MM:SS"
         *  face : "string"     //(optional) values: "4|12" default: "4" applicable: analog clock
         *  numeral : "string"  //(optional) values: "dot|decimal" applicable: analog clock
         *  hand : "string"     //(optional) values: "hm(s)" applicable: analog clock
         * }
         */
        dyClock = function (option) {

            //check if option is passed or not
            if(typeof option === "undefined") {
                global.console.error("Option missing.");
            }

            //extend user options with predefined options
            this.clockOption = extendSource(option, defaults);

            //initialize clock option format
            this.initClockOption_format();

            //set target
            if (this.clockOption.target[0] === "#") {
                this.clockOption.target_elementBy = "id";
            } else if (this.clockOption.target[0] === ".") {
                this.clockOption.target_elementBy = "class";
            } else {
                global.console.error("Invalid target value");
            }
            this.clockOption.target = this.clockOption.target.substring(1);

        };

        //------------------------------ dyClock ends here ------------

    //--------------------------------- dyClock methods ---------------

    dyClock.prototype = {

        /**
         * this will draw the clock
         */
        draw : function () {

            var
                self = this;

            if (self.clockOption.clock === "digital") {

                drawDigital(self.clockOption);

            } else if (self.clockOption.clock === "analog") {

                drawAnalog(self.clockOption);

            } else if (self.clockOption.clock === "both") {

                drawAnalog(self.clockOption);

            } else {

                global.console.error("Invalid clock type");

            }

        },

        /**
         * this method will initialize the clock option format
         */
        initClockOption_format : function () {

            var
                self = this,
                obj = {},
                format = [],
                time,
                ampm;

            //split format
            format = self.clockOption.format.split(" ");

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

            self.clockOption.format_time = obj;

            //set format ampm
            if (ampm === false) {
                self.clockOption.format_showam = false;
            } else {
                //if lowercase am/pm then 0, else 1
                self.clockOption.format_showam = true;
                self.clockOption.format_showamvalue = (ampm === "a") ? ["am", "pm"] : ["AM", "PM"];
            }
        }

    };

    //--------------------------------- dyClock methods ends here -----

    //attach to global window object
    global.dyClock = dyClock;

}(typeof window !== "undefined" ? window : this));
