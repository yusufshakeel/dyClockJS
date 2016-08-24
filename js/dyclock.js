/*!
 * dyclock is a JavaScript library for creating clock.
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

        //this will be used by the user
        dyclock = {},

        //options for the date
        dateOption = {},

        //the date object
        dateObj,

        //this holds the date data
        dateData = {},

        //date string
        dateString;

    /**
     * this function will extend source object with defaults object.
     *
     * @param object source     this is the source object
     * @param object defaults   this is the default object
     * @return object
     */
    function extendSource (source, defaults) {
        var property;
        for (property in defaults) {
            if (source.hasOwnProperty(property) === false) {
                source[property] = defaults[property];
            }
        }
        return source;
    }

    /**
     * this function will return time string based on user option.
     *
     * @return string
     */
    function getTimeString () {

        //variable
        var
            tmp;

        switch (dateOption.hour) {
        case "12":
            //set hour
            if (dateData.hour === 0) {
                dateString = "12 : ";
            } else if (dateData.hour > 12) {
                tmp = (dateData.hour - 12);
                dateString = (tmp < 10) ? "0" + tmp + " : " : tmp + " : ";
            }

            break;

        case "24":
            //set hour
            dateString = (dateData.hour < 10) ? "0" + dateData.hour : dateData.hour;
            break;

        default:
            return "Error: hour";
        }

        //set minute
        if (dateData.minute < 10) {
            dateString = dateString + " : 0" + dateData.minute;
        } else {
            dateString = dateString + " : " + dateData.minute;
        }

        //set second
        if (dateData.second < 10) {
            dateString = dateString + " : 0" + dateData.second;
        } else {
            dateString = dateString + " : " + dateData.second;
        }

        return dateString;

    }

    /**
     * this function will initialize the dateData.
     */
    function initTime () {

        dateObj = new Date();
        dateData.hour = dateObj.getHours();
        dateData.minute = dateObj.getMinutes();
        dateData.second = dateObj.getSeconds();

    }

    /**
     * This function will create Analog clock.
     */
    function tickAnalog () {

    }

    /**
     * This function will create Digital clock.
     */
    function tickDigital () {

        updateDateData();

        document.getElementById(dateOption.target).innerHTML = getTimeString(dateData);

        setTimeout(tickDigital, 1000);
    }

    /**
     * This function will update dateData.
     */
    function updateDateData() {

        dateData.second = dateData.second + 1;
        if (dateData.second === 60) {
            dateData.second = 0;
            dateData.minute = dateData.minute + 1;
            if (dateData.minute === 60) {
                dateData.minute = 0;
                dateData.hour = dateData.hour + 1;
                if (dateData.hour === 0) {
                    dateData.hour = 0;
                }
            }
        }

    }

    //------------------------------ dyclock.draw() ----------------------

    /**
     * this function will create the clock based on the configuration
     * option passed by the user.
     *
     * option = {
     *  target : "string"   //(mandatory) for id use #id | for class user .class
     *  clock : "string"    //(optional) values: "analog|digital" default: digital
     *  hour : "string"     //(optional) values: "12|24" default: "24"
     * }
     */
    dyclock.draw = function (option) {

        //check if option is passed or not
        if(typeof option === "undefined") {
            return false;
        }

        var
            self = this,    //pointing at dyclock object

            //default settings
            defaults = {
                clock : "digital",
                hour : "24",
            };

        //find target element by
        if (option.target[0] === "#") {
            //targetedElementBy = "id";
        } else if (option.target[0] === ".") {
            //targetedElementBy = "class";
        }
        option.target = option.target.substring(1);

        //extend user options with predefined options
        dateOption = extendSource(option, defaults);

        //initialize time
        initTime();

        if (dateOption.clock === "digital") {
            tickDigital();
        } else if (dateOption.clock === "analog") {
            tickAnalog();
        }

    };


    //------------------------------ dyclock.draw() ends here ------------

    //attach to global window object
    global.dyclock = dyclock;

}(typeof window !== "undefined" ? window : this));
