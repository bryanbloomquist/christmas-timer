let year, month, day, deadline;

let interval;
let eventdate = "12-25";
let eventname = "Christmas";

// const checkRadio = ( radio ) => {
//   eventdate = radio.value.slice( 0, 5 );
//   eventname = radio.value.slice( 6 );
//   clearInterval( interval );
//   getDate( eventdate, eventname );
// }

// const getDate = ( date, name ) => {
//   let month = date.slice( 0, 2 )
//   let day = date.slice( 3, 5 );
//   let year = new Date().getFullYear();
//   currentdate = new Date().toJSON().slice( 5, 10 )
//   if ( currentdate >= date ) { year += 1; }
//   document.getElementById( "event" ).innerHTML = name;
//   document.getElementById( "year" ).innerHTML = year;
//   let deadline = new Date( month + " " + day + ", " + year + " 00:00:00" );
//   startClock( deadline );
// }

const getDate = () => {
  date = new Date().getDate();
  month = new Date().getMonth() + 1;
  year = new Date().getFullYear();
  console.log( date, month, year );
  if ( month === 12 && day >=25 ) {
    year +=1;
  }
  document.getElementById( "year" ).innerHTML = year;
  deadline = new Date( "Dec 25, " + year + " 00:00:00" );
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

// getDate( eventdate, eventname );
getDate();
