const runApp = () => {

  const events = [
    ["12-25", "christmas", "christmas"],
    ["10-31", "halloween", "halloween"],
    ["07-04", "independance day", "independance"],
    ["05-04", "may the fourth", "starwars"],
    ["02-14", "valentine's day", "valentines"]
  ];
  let interval, deadline;
  let eventDate = events[0][0];
  let eventName = events[0][1];
  let eventStyle = events[0][2];
  const bodyEl = document.querySelector("body");
  const eventEl = document.getElementById("event");
  const yearEl = document.getElementById("year");
  const daysEl = document.querySelector(".timer__days");
  const hoursEl = document.querySelector(".timer__hours");
  const minutesEl = document.querySelector(".timer__minutes");
  const secondsEl = document.querySelector(".timer__seconds");


  const getDate = ( eventDate, eventName ) => {
    bodyEl.classList.add(eventStyle);
    let month = parseInt( eventDate.slice(0,2));
    let day = parseInt( eventDate.slice(3,5));
    let year = new Date().getFullYear();
    currentDate = new Date().toJSON().slice(5,10);
    currentDate >= eventDate ? year += 1 : null;
    eventEl.innerHTML = eventName;
    yearEl.innerHTML = year;
    deadline = new Date( year, month-1, day, "00", "00", "00" );
    startClock( deadline );
  }

  const startClock = ( deadline ) => {
    updateClock( deadline );
    interval = setInterval( function() {
      updateClock( deadline );
    }, 1000 );
  }

  const updateClock = ( deadline ) => {
    const time = remainingTime( deadline );
    daysEl.textContent != time.days ? daysEl.innerHTML = time.days : null;
    hoursEl.textContent != time.hours ? hoursEl.innerHTML = time.hours :null;
    minutesEl.textContent != time.minutes ? minutesEl.innerHTML = time.minutes : null;
    secondsEl.innerHTML = time.seconds;
  }

  const remainingTime = ( deadline ) => {
    let distance = Date.parse( deadline ) - Date.parse( new Date() );
    let days = Math.floor( distance / ( 1000 * 60 * 60 * 24 ));
    let hours = Math.floor(( distance / ( 1000 * 60 * 60 )) % 24 );
    let minutes = Math.floor(( distance / 1000 / 60 ) % 60);
    let seconds = Math.floor(( distance / 1000 ) % 60);
    return {
      "days": days, "hours": hours, "minutes": minutes, "seconds": seconds
    };
  }

  const checkForDST = () => {
    Date.prototype.stdTimezoneOffset = function() {
      var jan = new Date(this.getFullYear(), 0, 1);
      var jul = new Date(this.getFullYear(), 6, 1);
      return Math.max(jan.getTimezoneOffset(), jul.getTimezoneOffset());
    }
    Date.prototype.dst = function() {
      return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }
    Date.prototype.dst = function() {
      return this.getTimezoneOffset() < this.stdTimezoneOffset();
    }
    var date = new Date(); 
    if (date.dst()) { 
      return true; 
    } else { 
      return false; 
    }
  }

  getDate( eventDate, eventName );

};