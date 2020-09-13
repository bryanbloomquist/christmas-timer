const runApp = () => {

  const events = [
    ["01-01", "new year's day", "newyears"],
    ["02-14", "valentine's day", "valentines"],
    ["05-04", "may the fourth", "starwars"],
    ["07-04", "independance day", "independence"],
    ["10-31", "halloween", "halloween"],
    ["12-25", "christmas", "christmas"]
  ];
  let interval, deadline;
  let eventDate = events[5][0];
  let eventName = events[5][1];
  let eventStyle = events[5][2];
  const lastHoliday = localStorage.getItem('lastHoliday');
  const bodyEl = document.querySelector("body");
  const eventEl = document.getElementById("event");
  const yearEl = document.getElementById("year");
  const daysEl = document.querySelector(".timer__days");
  const hoursEl = document.querySelector(".timer__hours");
  const minutesEl = document.querySelector(".timer__minutes");
  const secondsEl = document.querySelector(".timer__seconds");

  const holiday = (num) => {
    clearInterval(interval);
    eventDate = events[num][0];
    eventName = events[num][1];
    eventStyle = events[num][2];
    getDate(eventDate, eventName, eventStyle);
  };

  const getDate = ( newDate, newName, newStyle ) => {
    bodyEl.className = newStyle;
    let month = parseInt( newDate.slice(0,2));
    let day = parseInt( newDate.slice(3,5));
    let year = new Date().getFullYear();
    currentDate = new Date().toJSON().slice(5,10);
    currentDate >= newDate ? year += 1 : null;
    eventEl.innerHTML = newName;
    yearEl.innerHTML = year;
    deadline = new Date( year, month-1, day, "00", "00", "00" );
    startClock( deadline );
  };

  const startClock = ( deadline ) => {
    updateClock( deadline );
    interval = setInterval( function() {
      updateClock( deadline );
    }, 1000 );
  };

  const updateClock = ( deadline ) => {
    const time = remainingTime( deadline );
    daysEl.innerHTML = time.days;
    hoursEl.innerHTML = time.hours;
    minutesEl.innerHTML = time.minutes;
    secondsEl.innerHTML = time.seconds;
  };

  const remainingTime = ( deadline ) => {
    let distance = Date.parse( deadline ) - Date.parse( new Date() );
    let days = Math.floor( distance / ( 1000 * 60 * 60 * 24 ));
    let hours = Math.floor(( distance / ( 1000 * 60 * 60 )) % 24 );
    let minutes = Math.floor(( distance / 1000 / 60 ) % 60);
    let seconds = Math.floor(( distance / 1000 ) % 60);
    return {
      "days": days, "hours": hours, "minutes": minutes, "seconds": seconds
    };
  };

  let buttonEls = document.querySelectorAll('.navigation__link');
  for (let i=0; i<buttonEls.length; i++) {
    buttonEls[i].addEventListener("click", (event) => {
      let x = buttonEls[i].getAttribute("rel");
      document.getElementById("nav-toggle").checked = false;
      localStorage.setItem('lastHoliday', x);
      holiday(x);
    });
  };

  holiday(lastHoliday ? lastHoliday : 5);

};