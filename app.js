let date, month, day, year, deadline;
let eventdate = "12-25";
let event = "Christmas";
// let variable1 = "02-15 Bryan's Birthday";
// let variabledate = variable1.slice( 0, 5 );
// let variableevent = variable1.slice( 6 );
// console.log( variabledate );
// console.log( variableevent );

const checkRadio = ( radio ) => {
  eventdate = radio.value.slice( 0, 5 );
  event = radio.value.slice( 6 );
  getDate();
}

const getDate = () => {
  month = eventdate.slice( 0, 2 )
  day = eventdate.slice( 3, 5 );
  year = new Date().getFullYear();
  currentdate = new Date().toJSON().slice( 5, 10 )
  if ( currentdate >= eventdate ) {
    year += 1;
  }
  document.getElementById( "event" ).innerHTML = event;
  document.getElementById( "year" ).innerHTML = year;
  deadline = new Date( month + " " + day + ", " + year + " 00:00:00" );
  console.log( deadline );
  startClock( "container", deadline );
}

const remainingTime = ( endtime ) => {
  let time = Date.parse( endtime ) - Date.parse( new Date() );
  let seconds = Math.floor(( time / 1000 ) % 60);
  let minutes = Math.floor(( time / 1000 / 60 ) % 60);
  let hours = Math.floor(( time / ( 1000 * 60 * 60 )) % 24 );
  let days = Math.floor( time / ( 1000 * 60 * 60 * 24 ));
  return {
    "total": time,
    "days": days,
    "hours": hours,
    "minutes": minutes,
    "seconds": seconds
  };
}

const startClock = ( id, endtime ) => {
  let clock = document.getElementById( id );
  let daysSpan = clock.querySelector( ".days" );
  let hoursSpan = clock.querySelector( ".hours" );
  let minutesSpan = clock.querySelector( ".minutes" );
  let secondsSpan = clock.querySelector( ".seconds" );
  const updateClock = () => {
    let time = remainingTime( endtime );
    daysSpan.innerHTML = time.days;
    hoursSpan.innerHTML = ( "0" + time.hours ).slice( -2 );
    minutesSpan.innerHTML = ( "0" + time.minutes ).slice( -2 );
    secondsSpan.innerHTML = ( "0" + time.seconds ).slice( -2 );
    if ( time.total <= 0 ) {
      clearInterval( timeinterval );
    }
  }
  updateClock();
  let timeinterval = setInterval( updateClock, 1000 );
}

getDate();