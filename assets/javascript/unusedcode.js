  // firebase.database.enableLogging(function(message){
  //   console.log('[FIREBASE]', message);
  // })

//===========================
// google calendar
//===========================
// var coordinates = ""
// //function for displaying a event on the custom calendar
// const apiKey = "AIzaSyDlb1yhyc9mgk-nrMHt3L9G1ZaqHXiYKag"

// const calenderId = "3tb9knpp56onmull6b22d4jgr4@group.calendar.google.com"

// const queryURL = "https://www.googleapis.com/calendar/v3/calendars/" + calenderId + "/events?key=" + apiKey
// console.log(queryURL)
// function displayNewDiv() {


//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {

// data for events are stored in items object
// var events = response.items

// create new card div for the length of events(JSON)
// for (let i = 0; i < events.length; i++) {

//variables for common input values from JSON
// const eventName = events[i].summary
// const description = events[i].description
// const location = events[i].location
// const startDateTime = events[i].start.dateTime
// const endDateTime = events[i].end.dateTime

// console.log(eventName)
// console.log(description)
// console.log(location)
// console.log(startDateTime)
// console.log(endDateTime)

//displayNewDiv()


//===========================
// google geolocator
//===========================


/* dont need this cuz it is all stored in the first one
  var markerEmp = {

    lat: latitude,
    lng: longitude,
    address: empEventAddress,
    description: empEventDescription
    // eventimage
}
  database.ref("/marker").push(markerEmp)

  push all input data to a new database child */

/* function GetCoordinates () {

   /*this function removes all space input from form sections address and city using jquery
       to not allow the user to have spaces in address for the query to work below. /*

   $(function(){
     $('#address').bind('input', function(){
       $(this).val(function(_, v){
         return v.replace(/\s+/g, '');
       });
     });
   });
   $(function(){
     $('#city').bind('input', function(){
       $(this).val(function(_, v){
         return v.replace(/\s+/g, '');
       });
     });
   });

   //identifying variables for query
 var empEventAddress = $("#address").val().trim();
 var empEventCity = $('#city').val().trim();
 var location = empEventAddress + empEventCity
 const geolocatorURL = 'https://maps.googleapis.com/maps/api/geocode/json?address='+
                         location + 'OH&key=AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'


 console.log(geolocatorURL);

 $.ajax({
   url: geolocatorURL,
   method: "GET"
 }).then(function(response){
   //console logging latitude and longitude of the address queried using google geocode
   var latitude = response.results[0].geometry.location.lat;
   var longitude = response.results[0].geometry.location.lng;

   console.log(latitude);
   console.log(longitude);

   database.ref().push(latitude);
   database.ref().push(longitude);
 })
 }

 */




//===========================
// google maps
//===========================
// var markers = [{
//   coords: {
//     lat: lat,
//     lng: lng
//   },
//   iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
//   content: '<h6>' + EventAddress + '</h6>'
// }]

// stuff from calendar api (old method)
// $.ajax({
//   url: queryURL,
//   method: "GET"
// }).then(function (response) {
//   var events = response.items

//   for (let i = 0; i < events.length; i++) {
//   var latitude = events[i].extendedProperties.private.lat
//   var longitude = events[i].extendedProperties.private.lng

//   console.log(latitude, longitude)

//array of markers

// loop through markers


/*

coords: {
  lat: 41.4969,
    lng: -81.6936
},
iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  content: '<h6>tower city</h6>'
    },
{
  coords: {
    lat: 41.5061,
      lng: -81.6995
  },
  iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h6>browns stadium</h6>'
},
{
  coords: {
    lat: 41.4962,
      lng: -81.6852
  },
  iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h6>progressive field</h6>'
},
{
  coords: {
    lat: Number(latitude),
      lng: Number(longitude)
  },
  iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    content: '<h6>science center</h6>'


//===========================
// rsvp button
//===========================

/ /var count = 0

    //   $('#rsvp').click(function () {
  //     count++;

  //     var empNewCount = {
  //       count: count
  //     };

  //     database.ref('/rsvp').push(empNewCount);
  //   });
  //   function storecount () {
  //   database.ref('/rsvp').on("child_added", function (childSnapshot) {
  //     var count = childSnapshot.val().count
  //     $('#rsvpbuttons').append("<br>" + EventName +  " = " + count + " People Attending");
  //   });
  // };

*/