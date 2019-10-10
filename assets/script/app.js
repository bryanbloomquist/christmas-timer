let interval;
let eventdate = "12-25";
let eventname = "Christmas";

const checkRadio = ( radio ) => {
  eventdate = radio.value.slice( 0, 5 );
  eventname = radio.value.slice( 6 );
  clearInterval( interval );
  getDate( eventdate, eventname );
}

const getDate = ( eventdate, eventname ) => {
  let month = parseInt( eventdate.slice( 0, 2 ));
  let day = parseInt( eventdate.slice( 3, 5 ));
  let year = new Date().getFullYear();
  currentdate = new Date().toJSON().slice( 5, 10 )
  if ( currentdate >= eventdate ) { year += 1; }
  document.getElementById( "event" ).innerHTML = eventname;
  document.getElementById( "year" ).innerHTML = year;
  let deadline = new Date( month + " " + day + ", " + year + " 00:00:00" );
  startClock( deadline );
}

const startClock = ( deadline ) => {
  updateClock( deadline );
  interval = setInterval( function() {
    updateClock( deadline );
  }, 1000 );
}

const updateClock = ( deadline ) => {
  let time = remainingTime( deadline );
  document.getElementById( "days" ).innerHTML = time.days;
  document.getElementById( "hours" ).innerHTML = time.hours;
  document.getElementById( "minutes" ).innerHTML = time.minutes;
  document.getElementById( "seconds" ).innerHTML = time.seconds;
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

getDate( eventdate, eventname );
