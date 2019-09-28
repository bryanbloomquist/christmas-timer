let year, month, day, deadline;

const getDate = () => {
  year = new Date().getFullYear();
  month = new Date().getMonth() + 1;
  day = new Date().getDate();
  if ( month === 12 && day > 24 ) {
    year = year + 1;
  }
  document.getElementById( "year" ).innerHTML = year;
  deadline = new Date( "Dec 24, " + year + " 23:59:59" );
  startClock( "countdown", deadline );
}

remainingTime = ( endtime ) => {
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