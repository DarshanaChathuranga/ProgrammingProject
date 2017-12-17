function Calendar(id, size, labelSettings, colors) {
  this.id = id;
  this.size = size;
  this.labelSettings = labelSettings;
  this.colors = colors;

  months = [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ]
  label = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];

  this.months = months;

  this.label = [];
  this.labels = [];
  for (var i = 0; i < 7; i++)

    this.label.push(label[(label.indexOf(labelSettings[0]) + this.label.length >= label.length) ? Math.abs(label.length - (label.indexOf(labelSettings[0]) + this.label.length)) : (label.indexOf(labelSettings[0]) + this.label.length)]);
  for (var i = 0; i < 7; i++)
    this.labels.push(this.label[i].substring(0, (labelSettings[1] > 3) ? 3 : labelSettings[1]));
  this.date = new Date();
  //console.log(this.date);
  this.draw();
  this.update();
}

Calendar.prototype.constructor = Calendar;

Calendar.prototype.draw = function () {
  backSvg = '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>';
  nextSvg = '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.colors[3] + '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>';

  theCalendar = document.createElement( "DIV");
  theCalendar.className = "calendar " + this.size;

  document.getElementById(this.id).appendChild(theCalendar);

  theContainers = [], theNames = [ 'year', 'month', 'labels', 'days' ];
  for (var i = 0; i < theNames.length; i++) {
    theContainers[i] = document.createElement( "DIV");
    theContainers[i].className = theNames[i];

    if (theNames[i] != "days") {
      if (theNames[i] != "month") {
        theContainers[i].style.backgroundColor = this.colors[1];
        theContainers[i].style.color = this.colors[3];

        if (theNames[i] != "labels") {
          backSlider = document.createElement("DIV");
          backSlider.id = this.id + "-year-back";
          backSlider.insertAdjacentHTML('beforeend', backSvg);
          theContainers[i].appendChild(backSlider);
          
          theText = document.createElement("SPAN");
          theText.id = this.id + "-" + theNames[i];
          theContainers[i].appendChild(theText);
          
          nextSlider = document.createElement("DIV");
          nextSlider.id = this.id + "-year-next";
          nextSlider.insertAdjacentHTML('beforeend', nextSvg);
          theContainers[i].appendChild(nextSlider);
        }
      } else {
        theContainers[i].style.backgroundColor = this.colors[0];
        theContainers[i].style.color = this.colors[2];

        backSlider = document.createElement("DIV");
        backSlider.id = this.id + "-month-back";
        backSlider.insertAdjacentHTML('beforeend', backSvg);
        theContainers[i].appendChild(backSlider);
        
        theText = document.createElement("SPAN");
        theText.id = this.id + "-" + theNames[i];
        theContainers[i].appendChild(theText);
        
        nextSlider = document.createElement("DIV");
        nextSlider.id = this.id + "-month-next";
        nextSlider.insertAdjacentHTML('beforeend', nextSvg);
        theContainers[i].appendChild(nextSlider);
      }
    }
  }

  for (var i = 0; i < this.labels.length; i++) {
    theLabel = document.createElement("SPAN");
    theLabel.id = this.id + "-label-" + (i + 1);
    theLabel.appendChild(document.createTextNode(this.labels[i]));
    theContainers[2].appendChild(theLabel);
  }

  theRows = [], theDays = [], theRadios = [];
  for (var i = 0; i < 6; i++) {
    theRows[i] = document.createElement("DIV");
    theRows[i].className = "row";
  }
  
  for (var i = 0, j = 0; i < 42; i++) {
    theRadios[i] = document.createElement("INPUT");
    theRadios[i].className = "day-radios";
    theRadios[i].type = "radio";
    theRadios[i].name = this.id + "-day-radios";
    theRadios[i].id = this.id + "-day-radio-" + (i + 1);

    theDays[i] = document.createElement("LABEL");
    theDays[i].className = "day";
    theDays[i].htmlFor = this.id + "-day-radio-" + (i + 1);
    theDays[i].id = this.id + "-day-" + (i + 1);

    theText = document.createElement("SPAN");
    theText.id = this.id + "-day-num-" + (i + 1);

    theDays[i].appendChild(theText);
  
    theRows[j].appendChild(theRadios[i]);
    theRows[j].appendChild(theDays[i]);

    if ((i + 1) % 7 == 0) {
      j++;
    }
  }

  for (var i = 0; i < 6; i++) {
    theContainers[3].appendChild(theRows[i]);
  }
  
  for (var i = 0; i < theContainers.length; i++) {
    theCalendar.appendChild(theContainers[i]);
  }

  document.getElementById(this.id).appendChild(theCalendar);
}

Calendar.prototype.update = function () {
  document.getElementById(this.id + '-year').innerHTML = this.date.getFullYear();
  document.getElementById(this.id + '-month').innerHTML = months[this.date.getMonth()];

  for (i = 1; i <= 42; i++) {
    document.getElementById(this.id + '-day-num-' + i).innerHTML = "";
    document.getElementById(this.id + '-day-' + i).className = this.id + " day";
  }

  firstDay = new Date(this.date.getFullYear(), this.date.getMonth(), 1).getDay();
  lastDay = new Date((this.date.getMonth() + 1 > 11) ? this.date.getFullYear() + 1 : this.date.getFullYear(), (this.date.getMonth() + 1 > 12) ? 0 : this.date.getMonth() + 1, 0).getDate();

  previousLastDay = new Date((this.date.getMonth() < 0) ? this.date.getFullYear() - 1 : this.date.getFullYear(), (this.date.getMonth() < 0) ? 11 : this.date.getMonth(), 0).getDate();

  if (firstDay != 0)
    for (i = 0, j = previousLastDay; i < this.label.indexOf(label[firstDay]); i++, j++) {
      k = j - this.label.indexOf(label[firstDay]) + 1;
      document.getElementById(this.id + '-day-num-' + (1 + i)).innerHTML = k;
      document.getElementById(this.id + '-day-' + (1 + i)).className = this.id + " day diluted";
    }
  for (i = 1; i <= lastDay; i++) {
    document.getElementById(this.id + '-day-num-' + (this.label.indexOf(label[firstDay]) + i)).innerHTML = i;
    if (i == this.date.getDate())
      document.getElementById(this.id + '-day-radio-' + (this.label.indexOf(label[firstDay]) + i)).checked = true;
  }

  for (i = lastDay + 1, j = 1; (this.label.indexOf(label[firstDay]) + i) <= 42; i++, j++) {
    document.getElementById(this.id + '-day-num-' + (this.label.indexOf(label[firstDay]) + i)).innerHTML = j;
    document.getElementById(this.id + '-day-' + (this.label.indexOf(label[firstDay]) + i)).className = this.id + " day diluted";
  }
}
/*************organizer*****************************/
function Organizer(id, calendar) {
  this.id = id;
  this.calendar = calendar;

  

  this.draw();
  this.update();
}

Organizer.prototype = {
  constructor: Organizer,
  back: function (func) {
    date = this.calendar.date;
    
    lastDay = new Date((date.getMonth() + 1 > 11) ? date.getFullYear() + 1 : date.getFullYear(), (date.getMonth() + 1 > 12) ? 0 : date.getMonth() + 1, 0).getDate();
    previousLastDay = new Date((date.getMonth() < 0) ? date.getFullYear() - 1 : date.getFullYear(), (date.getMonth() < 0) ? 11 : date.getMonth(), 0).getDate();

   
    
    if (func == "day") {
      if (date.getDate() != 1) {
        this.changeDateTo(date.getDate() - 1);
      } else {
        this.back('month');
        this.changeDateTo(lastDay);
      }
    } else {
      if (func == "month") {
        if (date.getDate() > previousLastDay) {
          this.changeDateTo(previousLastDay);
        }
        if (date.getMonth() != 0)
          date.setMonth(date.getMonth() - 1);
        else {
          date.setMonth(11);
          date.setFullYear(date.getFullYear() - 1);
        }
      } else
        date.setFullYear(date.getFullYear() - 1);
    }
    
    this.calendar.update();  
    this.update();
  },
  next: function (func) {
    date = this.calendar.date;
    lastDay = new Date((date.getMonth() + 1 > 11) ? date.getFullYear() + 1 : date.getFullYear(), (date.getMonth() + 1 > 12) ? 0 : date.getMonth() + 1, 0).getDate();
    soonLastDay = new Date((date.getMonth() + 2 > 11) ? date.getFullYear() + 1 : date.getFullYear(), (date.getMonth() + 2 > 12) ? 0 : date.getMonth() + 2, 0).getDate();

    if (func == "day") {
      if (date.getDate() != lastDay) {
        date.setDate(date.getDate() + 1);
      } else {
        this.next('month');
        date.setDate(1);        
      }
    } else {
      if (func == "month") {
        if (date.getDate() > soonLastDay) {
          this.changeDateTo(soonLastDay);
        }
        if (date.getMonth() != 11)
          date.setMonth(date.getMonth() + 1);
        else {
          date.setMonth(0);
          date.setFullYear(date.getFullYear() + 1);
        }
      } else
        date.setFullYear(date.getFullYear() + 1);
    }
    
    this.calendar.update();
    this.update();
  },
  changeDateTo: function (theDay, theBlock) {
    if ((theBlock >= 31 && theDay <= 11) || (theBlock <= 6 && theDay >= 8)) {
      if (theBlock >= 31 && theDay <= 11)
        this.next('month');
      else if (theBlock <= 6 && theDay >= 8)
        this.back('month');
    }
    this.calendar.date.setDate(theDay);
    this.calendar.update();
    this.update();
    calendar = this.calendar;
    setTimeout(function () { calendar.update(); }, 10);
  }
}

Organizer.prototype.draw = function () {
  backSvg = '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.calendar.colors[3] + '" d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path></svg>';
  nextSvg = '<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24"><path fill="' + this.calendar.colors[3] + '" d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path></svg>';
  
  theOrganizer = document.createElement( "DIV");
  theOrganizer.className = "events " + this.calendar.size;

  theDate = document.createElement( "DIV");
  theDate.className = "date";
  theDate.style.backgroundColor = this.calendar.colors[1];
  theDate.style.color = this.calendar.colors[3];

  backSlider = document.createElement("DIV");
  backSlider.id = this.id + "-day-back";
  backSlider.insertAdjacentHTML('beforeend', backSvg);
  theDate.appendChild(backSlider);
  
  theText = document.createElement("SPAN");
  theText.id = this.id + "-date";
  theDate.appendChild(theText);
  
  nextSlider = document.createElement("DIV");
  nextSlider.id = this.id + "-day-next";
  nextSlider.insertAdjacentHTML('beforeend', nextSvg);
  theDate.appendChild(nextSlider);

  theRows = document.createElement( "DIV");
  theRows.className = "rows";

  theList = document.createElement("OL");
  theList.className = "list";
  theList.id = this.id + "-list";

  theRows.appendChild(theList);
  
  theOrganizer.appendChild(theDate);
  theOrganizer.appendChild(theRows);

  document.getElementById(this.id).appendChild(theOrganizer);
}

Organizer.prototype.update = function () {
  document.getElementById(this.id + "-date").innerHTML = this.calendar.months[this.calendar.date.getMonth()] + " " + this.calendar.date.getDate() + ", " + this.calendar.date.getFullYear();
  document.getElementById(this.id + "-list").innerHTML = "";
}

Organizer.prototype.list = function (data) {
  document.getElementById(this.id + "-list").innerHTML = "";
  //console.log("hi");
  var gap =["10 am - 12 pm","1 pm - 3 pm", "3 pm - 5 pm","5 pm - 7 pm","7 pm - 9 pm"];

  content = ""; 
  var k = 0;
  max_count = 20;
  var countSet =[];
  //console.log(data.length);
  for (var i = 0; i < 5; i++) {
    var count = 0;

    for(var j=0;j<data.length;j++){
      if(data[j].slot == i){
        count++;
      }
    }

    countSet[i] = count;
    
    if(k < data.length && data[k].slot == i && count == max_count){
      
      content += '<li id="' + this.id + '-list-item-' + i + '">'+
      '<div>'+
        '<div class="' + this.id + ' time" id="' + this.id + '-list-item-' + i + '-time">' + gap[i]+'</div>'+
      '</div>'+
      '<div class="booked" id="' + this.id + '-list-item-' + i + '-text">' + "Booked"+ '</div>'+
      '</li>';
      k++;
    }else{
      content += '<li id="' + this.id + '-list-item-' + i + '">'+
      '<div>'+
        '<div class="' + this.id + ' time " id="' + this.id + '-list-item-' + i + '-time">' + gap[i] + '</div>'+
      '</div>'+
      '<div class="prog" id="' + this.id + '-list-item-' + i + '-prog">'+
      '<div class="text" id="' + this.id + '-list-item-' + i + '-text">' +(max_count-count)+ " Spaces Available" + '</div>'+
      '</div>'+
      '</li>';
    }
    document.getElementById(this.id + "-list").innerHTML = content;
  }

  for(var p=0;p<countSet.length;p++){
    if(countSet[p] < 6){
      $('#organizerContainer-list-item-'+p+'-prog').css('background','#20df20');
    }else if(countSet[p] < 10){
      $('#organizerContainer-list-item-'+p+'-prog').css('background','#ffbf00');
    }else if(countSet[p] < 14){
      $('#organizerContainer-list-item-'+p+'-prog').css('background','#ff8000');
    }else if(countSet[p] < 20){
      $('#organizerContainer-list-item-'+p+'-prog').css('background','#ff4000');
    }
    var filler = document.getElementById("organizerContainer-list-item-"+p+"-prog");
    percentage = ((countSet[p]/max_count)*100)/2;
    filler.style.width = percentage + "%";
  }

  
}

Organizer.prototype.setupBlock = function (blockId, theOrganizer, callback) {
  document.getElementById(calendarId + "-day-" + blockId).addEventListener('click', function () {
    if (document.getElementById(calendarId + "-day-num-" + blockId).innerHTML.length > 0) {

      theOrganizer.changeDateTo(document.getElementById(calendarId + "-day-num-" + blockId).innerHTML, blockId);
      callback();
    }
  });
}

Organizer.prototype.setOnClickListener = function (theCase, backCallback, nextCallback) {
  calendarId = this.calendar.id;
  organizerId = this.id;

  theOrganizer = this;

  switch (theCase) {
    case "days-blocks":
      
      for (i = 1; i <= 42; i++) {
        theOrganizer.setupBlock(i, theOrganizer, backCallback);
        document.getElementById(calendarId + "-day-" + i).addEventListener('click', function () {
          theOrganizer.printer();
        });
      }
      
      break;
    case "day-slider":
     
      document.getElementById(organizerId + "-day-back").addEventListener('click', function () {
        theOrganizer.back('day');
        theOrganizer.printer();
        backCallback();  
      });
      document.getElementById(organizerId + "-day-next").addEventListener('click', function () {
        theOrganizer.next('day');
        theOrganizer.printer();
        nextCallback();
      });
      break;
    case "month-slider":
      document.getElementById(calendarId + "-month-back").addEventListener('click', function () {
        theOrganizer.back('month');
        theOrganizer.printer();
        backCallback();
      });
      document.getElementById(calendarId + "-month-next").addEventListener('click', function () {
        theOrganizer.next('month');
        theOrganizer.printer();
        nextCallback();
      });
      break;
    case "year-slider":
      document.getElementById(calendarId + "-year-back").addEventListener('click', function () {
        theOrganizer.back('year');
        theOrganizer.printer();
        backCallback();
      });
      document.getElementById(calendarId + "-year-next").addEventListener('click', function () {
        theOrganizer.next('year');
        theOrganizer.printer();
        nextCallback();
      });
      break;
  }
};

Organizer.prototype.printer = function (){
  current = this.calendar.date;
  var clicked_date = current.getFullYear() + "-" + (current.getMonth() + 1) + "-" +  current.getDate();

  $.ajax({
    type: 'post',
    url: 'booking/values',
    dataType: 'json',
    data: {'date' : clicked_date },
    success: function( response ) {
      //alert(data.length);
      showEvents(response);
    },
		error: function(response){
			alert("error");
		}
    
 });
  //console.log($('#calendarContainer-year').text() + "-" + $('#calendarContainer-month').text() + "-" + blockId);
};

// end of library


/* end of library; everything is explained below; i'm sorry for the messy code and my bad practices; please criticise me */

var calendar = new Calendar("calendarContainer", "large", [ "Monday", 3 ], [ "#009999", "#009999", "#ffffff", "#fff" ]);
var organizer = new Organizer("organizerContainer", calendar);

currentDay = calendar.date.getDate(); // used this in order to make anyday today depending on the current today



function showEvents(response) {
  //console.log("hihi");
  if(response.length > 0){
    //alert("already booked");
  }
  /*
  theYear = -1, theMonth = -1, theDay = -1;
  for (i = 0; i < data.years.length; i++) {
    //console.log(calendar.date);
    if (calendar.date.getFullYear() == data.years[i].int) {
      theYear = i;
      //console.log(data.years);
      
      break;
    }
  }
  if (theYear == -1) return;
  for (i = 0; i < data.years[theYear].months.length; i++) {
    if ((calendar.date.getMonth() + 1) == data.years[theYear].months[i].int) {
      theMonth = i;
      break;
    }
  }
  if (theMonth == -1) return;
  for (i = 0; i < data.years[theYear].months[theMonth].days.length; i++) {
    if (calendar.date.getDate() == data.years[theYear].months[theMonth].days[i].int) {
      theDay = i;
      break;
    }
  }
  if (theDay == -1) return;
  //console.log(calendar.date.getFullYear() + " " + (calendar.date.getMonth() + 1) + " " + calendar.date.getDate());
  theEvents = data.years[theYear].months[theMonth].days[theDay].events;  
  */
  organizer.list(response);
}

//showEvents();
organizer.printer();

organizer.setOnClickListener('day-slider', function () { 
  //showEvents(); 
  console.log("Day back slider clicked"); }, 
  function () { 
  //showEvents(); 
  console.log("Day next slider clicked"); 
});

organizer.setOnClickListener('days-blocks', function () { 
  //showEvents(); 
  console.log("Day block clicked"); 
},  function () {
  //showEvents();
});

organizer.setOnClickListener('month-slider', function () { 
  //showEvents(); 
  console.log("Month back slider clicked"); 
}, function () { 
  //showEvents(); 
  console.log("Month next slider clicked"); 
});

organizer.setOnClickListener('year-slider', function () { 
  //showEvents(); 
  console.log("Year back slider clicked"); 
}, function () { 
  //showEvents(); 
  console.log("Year next slider clicked"); 
});

