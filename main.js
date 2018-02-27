/* global PDFJS, URL */

'use strict';

(function(window, undefined) {
  var Reader = function(el) {
    this.element = el;
    this.reader = Polymer.dom(el.root).querySelector('.calendar');
    this.testing = this.reader.querySelector('.testing');
  };

  Reader.prototype.readTextFile = function(file){
    var rawFile = new XMLHttpRequest();
    var allText = '';
        rawFile.open("GET", file, false);
        rawFile.onreadystatechange = function ()
        {
            if(rawFile.readyState === 4){
                if(rawFile.status === 200 || rawFile.status == 0){
                    allText = rawFile.responseText;
                    //console.log(allText);
                }
            }
        }

    rawFile.send(null);
    this.calendarText = allText;
    return allText;
};

  Reader.prototype.queueRenderPage = function() {
    this.createCalendar();
  };

  Reader.prototype.createCalendar = function() {

    var elem = document.getElementById("date");
    while(elem){
      elem.parentNode.removeChild(elem);
      console.log("ELEM: " + elem);
      elem = document.getElementById("date");
      console.log(elem);
    }

    //console.log("CREATE CALENDAR");
    //console.log(this.calendarText);
        var initialDayofWeek = this.currentDayofWeek;
        var days = 1;
        var pastDate = 0;

        //Determine how many days until the end of the week
        if(this.view == "week"){
          var count = 0;
          while(this.currentDayofWeek + count < 6){
            count = count + 1;
          }
          this.totalDays = count;
        }
        if(this.view == "month"){
          if(this.currentMonth == 1 || this.currentMonth == 3 || this.currentMonth == 5 || this.currentMonth == 7 || this.currentMonth == 8 || this.currentMonth == 10 || this.currentMonth == 12 ){
            this.totalDays = 31;
            this.totalDays = this.totalDays - this.startDay + 1;
          }
          else if(this.currentMonth == 4 || this.currentMonth == 6 || this.currentMonth == 9 || this.currentMonth == 11){
            this.totalDays = 30;
            this.totalDays = this.totalDays - this.startDay + 1;
          }
          else{
            this.totalDays = 29;
            this.totalDays = this.totalDays - this.startDay;
          }
        }
        //Sets up days before the actual day to display on calendar
        this.test = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);
        if(this.view == "month"){

          while(this.currentDate != 1){
            days = days - 1;

            if(this.currentMonth == 1 && this.currentDate == 1){
              this.currentYear = this.currentYear - 1;
              this.currentMonth = 12;
              this.currentDate = 31;
              this.test = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);
            }

            else {
              this.currentDate = this.currentDate - 1;

              this.test = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);

              if(this.test.getDate() != this.currentDate){
                //console.log("Date: " + this.currentDate + " Month: " + this.currentMonth);
                //31 day months
                if((this.currentDate == 0) && (this.currentMonth == 2 || this.currentMonth == 4 || this.currentMonth == 6 || this.currentMonth == 8 || this.currentMonth == 9 || this.currentMonth == 11 || this.currentMonth == 1 )){
                  this.test = new Date(this.currentYear + '/' + (this.currentMonth - 1) + '/' + 31);
                  this.currentDate = 31;
                }
                //30 day months
                if((this.currentDate == 0) && (this.currentMonth == 5 || this.currentMonth == 7 || this.currentMonth == 10 || this.currentMonth == 12)){
                  this.test = new Date(this.currentYear + '/' + (this.currentMonth - 1) + '/' + 30);
                  this.currentDate = 30;
                }
                //February
                if((this.currentDate == 0) && (this.currentMonth == 3)){
                  this.test = new Date(this.currentYear + '/' + 2 + '/' + 29);
                  this.currentDate = 29;
                  //console.log("This.test " + (this.test.getMonth() + 1));
                  if(this.test.getMonth() == 2){
                    //console.log("STILL MARCH");
                    this.test = new Date(this.currentYear + '/' + 2 + '/' + 28);
                    this.currentDate = 28;
                  }
                }
                //this.currentDate = 31;
                this.currentMonth = this.currentMonth - 1;
              }
            }

            
            if(this.currentDayofWeek == 0 || initialDayofWeek == 0){
              this.currentDayofWeek = 7;
              initialDayofWeek = -1;
            }
            this.currentDayofWeek = this.currentDayofWeek - 1;

          }
          
          if(this.currentDayofWeek == 7){
            this.currentDayofWeek = 0;
          }
        }

          while(this.currentDayofWeek != 0){
            days = days - 1;

            if(this.currentMonth == 1 && this.currentDate == 1){
              this.currentYear = this.currentYear - 1;
              this.currentMonth = 12;
              this.currentDate = 31;
              this.test = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);
            }

            else {
              this.currentDate = this.currentDate - 1;

              this.test = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);

              if(this.test.getDate() != this.currentDate){
                //31 day months
                if((this.currentDate == 0) && (this.currentMonth == 2 || this.currentMonth == 4 || this.currentMonth == 6 || this.currentMonth == 8 || this.currentMonth == 9 || this.currentMonth == 11 || this.currentMonth == 1 )){
                  this.test = new Date(this.currentYear + '/' + (this.currentMonth - 1) + '/' + 31);
                  this.currentDate = 31;
                }
                //30 day months
                if((this.currentDate == 0) && (this.currentMonth == 5 || this.currentMonth == 7 || this.currentMonth == 10 || this.currentMonth == 12)){
                  this.test = new Date(this.currentYear + '/' + (this.currentMonth - 1) + '/' + 30);
                  this.currentDate = 30;
                }
                //February
                if((this.currentDate == 0) && (this.currentMonth == 3)){
                  this.test = new Date(this.currentYear + '/' + 2 + '/' + 29);
                  this.currentDate = 29;
                  if(this.test.getMonth() == 2){
                    this.test = new Date(this.currentYear + '/' + 2 + '/' + 28);
                    this.currentDate = 28;
                  }
                }
                this.currentMonth = this.currentMonth - 1;
              }
            }

            this.currentDayofWeek = this.currentDayofWeek - 1;

          }
        //}


        //Creates first date element
        var dynamicEl = document.createElement("lrn-calendar-date");
        dynamicEl.date = this.test;    
        dynamicEl.firstWeek = true;
        dynamicEl.style.width = "14.25%";
        dynamicEl.style.display = "inline-block";
        dynamicEl.id = "date";

        //console.log("InitialDate: " + this.test);
        var eventList = getEvents(this.test, this.calendarText);
        //console.log(eventList);
        var eventsOnDay = eventCheck(eventList,this.test);
        //console.log("EventsONDAY");
        //console.log(eventsOnDay);
        var sendEvent = createReturn(eventsOnDay);
        dynamicEl.events = sendEvent;


        dynamicEl.valid = true;
        this.testing.appendChild(dynamicEl); 

        var firstWeekCount = 1;
        while(days<this.totalDays){
          //If 12/31
          if(this.currentMonth == 12 && this.currentDate == 31){
            this.currentYear = this.currentYear + 1;
            this.currentMonth = 1;
            this.currentDate = 1;
            this.newDay = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);
          }

          else {
            this.currentDate = this.currentDate + 1;
            this.newDay = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);

            if(this.newDay.getDate() != this.currentDate){
              if(this.currentMonth == 1 || this.currentMonth == 3 || this.currentMonth == 5 || this.currentMonth == 7 || this.currentMonth == 8 || this.currentMonth == 10 || this.currentMonth == 12 ){

                this.newDay = new Date(this.currentYear + '/' + (this.currentMonth + 1) + '/' + 1);
              }
              this.currentDate = 1;
              this.currentMonth = this.currentMonth + 1;
            }
          }
          var dynamicEl = document.createElement("lrn-calendar-date");
          dynamicEl.valid = true;
          dynamicEl.id = "date";
          dynamicEl.date = this.newDay; 
          dynamicEl.style.width = "14.25%";
          dynamicEl.style.display = "inline-block";

          
          var eventsOnDayMain = eventCheck(eventList,this.newDay);
          var sendEventMain = createReturn(eventsOnDayMain);
          dynamicEl.events = sendEventMain;

          if(firstWeekCount < 7){
            dynamicEl.firstWeek = true;
          }
          firstWeekCount = firstWeekCount + 1;
          dynamicEl.valid = true;

          this.testing.appendChild(dynamicEl);

          //console.log("day: " + days + ":  " + this.test);

          days = days + 1;
          if(days == this.totalDays  && this.newDay.getDay() != 6){
            days = days - 1;
            pastDate = 1;
          }
          

        }
      };
      /*Get events will get the events from a particular day and return an 

      */
      function getEvents(test, text){
        /*var iCalendarData = [
          'BEGIN:VCALENDAR',
          'VERSION:2.0',
          'CALSCALE:GREGORIAN',
          'BEGIN:VEVENT',
          'SUMMARY:Baseball',
          'DTSTART;TZID=America/New_York:20180701T103400',
          'DTEND;TZID=America/New_York:20180701T110400',
          'LOCATION:1000 Broadway Ave.\, Brooklyn',
          'DESCRIPTION: Access-A-Ride trip to 900 Jay St.\, Brooklyn',
          'STATUS:CONFIRMED',
          'SEQUENCE:3',
          'BEGIN:VALARM',
          'TRIGGER:-PT10M',
          'DESCRIPTION:Pickup Reminder',
          'ACTION:DISPLAY',
          'END:VALARM',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'SUMMARY:Football',
          'DTSTART;TZID=America/New_York:20180802T200000',
          'DTEND;TZID=America/New_York:20180802T203000',
          'LOCATION:900 Jay St.\, Brooklyn',
          'DESCRIPTION: Access-A-Ride trip to 1000 Broadway Ave.\, Brooklyn',
          'STATUS:CONFIRMED',
          'SEQUENCE:3',
          'BEGIN:VALARM',
          'TRIGGER:-PT10M',
          'DESCRIPTION:Pickup Reminder',
          'ACTION:DISPLAY',
          'END:VALARM',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180712',
          'DTEND;VALUE=DATE:20180712',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Soccer',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180713',
          'DTEND;VALUE=DATE:20180713',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Skiing',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180714',
          'DTEND;VALUE=DATE:20180714',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Hockey',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180512',
          'DTEND;VALUE=DATE:20180512',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Lacrosse',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180722',
          'DTEND;VALUE=DATE:20180722',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Test',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180724',
          'DTEND;VALUE=DATE:20180724',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Homework',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180702',
          'DTEND;VALUE=DATE:20180702',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Project',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'BEGIN:VEVENT',
          'UID:0@default',
          'CLASS:PUBLIC',
          'DESCRIPTION:This is the best day to demonstrate a single event.',
          'DTSTAMP;VALUE=DATE:20180712T115151',
          'DTSTART;VALUE=DATE:20180708',
          'DTEND;VALUE=DATE:201807028',
          'LOCATION:New York',
          'SUMMARY;LANGUAGE=en-us:Exam',
          'TRANSP:TRANSPARENT',
          'END:VEVENT',
          'END:VCALENDAR',
        ].join("\r\n"); */
        //console.log("CALENDAR TEST");
        //console.log(text);
        var iCalendarData = text;
        console.log("ICAL DATA");
        console.log(iCalendarData);




        var jcalData = ICAL.parse(iCalendarData);
        //console.log("jcalData: " + jcalData);
        var vcalendar = new ICAL.Component(jcalData);
        var vevent = vcalendar.getFirstSubcomponent('vevent');
        var summary = vevent.getFirstPropertyValue('summary');
        var vevents = vcalendar.getAllSubcomponents('vevent');
        var time = vevent.getFirstPropertyValue('dtstamp');
        var description = vevent.getFirstPropertyValue('description');

        var displayEvents = vevents.map(vevent=>{
          event = new ICAL.Event(vevent);
          return event;
        });
        var work = [];
        for(var i =0; i<displayEvents.length; i++){
          var startDay = createDate(displayEvents[i]);
          //console.log("startDay: " + startDay + " Test: " + test);
          if(startDay.getTime() >= test.getTime()){
            //console.log("AFTER START DATE: ");
            work.push(displayEvents[i]);
            //console.log(work);
          }
          else{
            //console.log("BEFORE DATE");
          }

        }


        var jCalData = ICAL.parse(iCalendarData);
        var comp = new ICAL.Component(jCalData);
        //console.log(jCalData);

        // Fetch the VEVENT part
        var vevent = comp.getFirstSubcomponent('vevent');
        var event = new ICAL.Event(vevent);

      
        //console.log( event);
        var startDate = event.startDate;

        return work;
      };

      function calenDate(icalStr)  {
        // icalStr = '20110914T184000Z'             
        var strYear = icalStr.substr(0,4);
        var strMonth = parseInt(icalStr.substr(4,2),10)-1;
        var strDay = icalStr.substr(6,2);
        var strHour = icalStr.substr(9,2);
        var strMin = icalStr.substr(11,2);
        var strSec = icalStr.substr(13,2);

        var oDate =  new Date(strYear,strMonth, strDay, strHour, strMin, strSec)

        return oDate;
      };

      function createDate(event){
        //this.test = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.currentDate);
        var year = event.startDate._time.year;
        var month = event.startDate._time.month;
        var day = event.startDate._time.day;
        var test = new Date(year + '/' + month + '/' + day);
        return test;
      };

      function eventCheck(event,date){
        var work = [];
        for(var i =0; i<event.length; i++){
          var startDay = createDate(event[i]);
          //console.log(startDay);
          //console.log("startDay: " + startDay + " Test: " + date);
          if(startDay.getTime() == date.getTime()){
            //console.log("Same Day");
            work.push(event[i]);
            //console.log(work);
          }
          else{
            //console.log("Not same day");
          }

        } 
        return work;
      };

      function createReturn(event){
        //console.log("CREATE RETURN \n\n\n");
        var test = [];
        for(var i =0; i<event.length; i++){
           test.push({"event": event[i].summary, "color": "red"});
        }
        return test;
      };


  window.Polymer.Reader = Reader;
})(window); 
