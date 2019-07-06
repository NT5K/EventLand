
$(document).ready(function () {

  //===========================
  // Linking Firebase
  //===========================

  const config = {
    apiKey: "AIzaSyC7Xz35oka7Bdi2g9z76jH8ST2__SirsGI",
    authDomain: "group-project-1-1d394.firebaseapp.com",
    databaseURL: "https://group-project-1-1d394.firebaseio.com",
    projectId: "group-project-1-1d394",
    storageBucket: "group-project-1-1d394.appspot.com",
    messagingSenderId: "294467336879",
    appId: "1:294467336879:web:579c3df4729a0b85"
  };

  firebase.initializeApp(config);

  const database = firebase.database();

  //==============================
  // Submit form button function
  //==============================

  // submit button that uploads data to new child on firebase
  $('#submit-button').click(function (event) {
    event.preventDefault();

    //prevent form from submitting if input fields are empty
    if ($("#name").val().trim() === "" ||
        $("#email").val().trim() === "" ||
        $("#event").val().trim() === "" ||
        $("#city").val().trim() === "" ||
        $("#date").val().trim() === "" ||
        $("#input-state").val().trim() === "void" ||
        $("#startTime").val().trim() === "" ||
        $("#endTime").val().trim() === "" ||
        $("#exampleFormControlTextarea1").val().trim() === "" ||
        $("#address").val().trim() === "") {

          // inform user that fields are empty
        $("#empty-fields-alert").text("PLEASE FILL OUT ALL FORM INFORMATION")

    } else {
      // store data from input fields
      const empName = $("#name").val().trim();
      const empUserEmail = $('#email').val().trim();
      const empEventName = $("#event").val().trim();
      const empEventAddress = $("#address").val().trim();
      const empEventCity = $('#city').val().trim();
      const empEventDate = $('#date').val().trim();
      const empStartTime = $("#startTime").val().trim();
      const state = $("#input-state").val().trim();
      const sAmPm = $("#sAmPm").val().trim();
      const empEndTime = $("#endTime").val().trim();
      const eAmPm = $("#eAmPm").val().trim();
      const empExternalLink = $("#externalLinks").val().trim();
      // const empEventImage = $('#image').val().trim();
      const empEventDescription = $('#exampleFormControlTextarea1').val().trim();

//===========================================================================
// google geolocator (inside button click, before pushing data to firebase)
//===========================================================================

      //functions for removing spaces for geolocation api
      $(function () {
        $(empEventCity).val(function (_, v) {
          return v.replace(/\s+/g, '');
        });
      });
      $(function () {
        $(empEventAddress).val(function (_, v) {
          return v.replace(/\s+/g, '');
        });
      });
    
      //identifying variables for query
      const location = empEventAddress + empEventCity + state
      const geolocatorURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        location + '&key=AIzaSyAJRWCPrSP6XMDKu-wlDMZy0rBNhPQjo4g'
      console.log(geolocatorURL);

      // query geolocatorURL
      $.ajax({
        url: geolocatorURL,
        method: "GET"
      }).then(function (response) {

        // json variables for lng,lat
        const latitude = response.results[0].geometry.location.lat;
        const longitude = response.results[0].geometry.location.lng;

        // temp data before pushing to database, once lng/lat are created
        const newEmp = {
          
          Name: empName,
          UserEmail: empUserEmail,
          EventName: empEventName,
          EventAddress: empEventAddress,
          EventCity: empEventCity,
          EventDate: empEventDate,
          StartTime: empStartTime,
          state: state,
          sAmPm: sAmPm,
          eAmPm: eAmPm,
          EndTime: empEndTime,
          // EventImage: empEventImage,
          EventDescription: empEventDescription,
          ExternalLink: empExternalLink,
          lat: latitude,
          lng: longitude,
        };

        // push all input data to a new database child
        database.ref().push(newEmp);
        //error catch
        }).catch(e => {
          console.log(e);
        });

      // clears form once submitted
      clearForm();
            

    // end if/else  
    };

    console.log("new event created on database!")
  // end button click
  });

  //===============================
  // custom calendar from firebase 
  //===============================

  database.ref().on("child_added", function (childSnapshot) {
    //variables for calendar from firebase
    var Name = childSnapshot.val().Name
    var UserEmail = childSnapshot.val().UserEmail
    var EventName = childSnapshot.val().EventName
    var EventAddress = childSnapshot.val().EventAddress
    var EventCity = childSnapshot.val().EventCity
    var State = childSnapshot.val().state
    var EventDate = childSnapshot.val().EventDate
    var StartTime = childSnapshot.val().StartTime
    var sAmPm = childSnapshot.val().sAmPm
    var EndTime = childSnapshot.val().EndTime
    var eAmPm = childSnapshot.val().eAmPm
    // var EventImage = childSnapshot.val().EventImage
    var EventDescription = childSnapshot.val().EventDescription
    var ExternalLink = childSnapshot.val().ExternalLink
    
    // push new child data to custom calendar
    $("#custom-calendar").prepend(
      "<div class='card mb-1'>" +
      "<h5 class='card-header'>" + EventName + "</h5>" +
      "<div class='card-body'>" +
      "<h6 class='card-text'><strong> Address:</strong><br>" + EventAddress + "<br>" + EventCity + ", " + State + "</h6><hr>" +
      "<h6 class='card-text'><strong>Description:</strong><p>" + EventDescription + "</p></h6><hr>" +
      "<h6 class='card-text'><strong>Date:</strong><p>" + EventDate + "</p></h6><hr>" +
      "<h6 class='card-text'><strong>Time:</strong><br><p>" + StartTime + sAmPm + " - " + EndTime + eAmPm + "</p></h6><hr>" +
      "<h6 class='card-text'><strong>Contact " + Name + " at: <br></strong><p>" + UserEmail + "</p></h6><hr>" +
      "<a target='blank' href=" + ExternalLink + "><span title=" + ExternalLink + ">Event Link</a>" +
      // "<button id='rsvpButton'>RSVP</button><span>" + count + "</span>" +
      "</div>" +
      "</div>");
  
    //===========================================
    // google maps from firebase function (NOT IN BUTTON CLICK)
    //===========================================

    //function to initialize map api
    function initMap() {
      // default map view
      const options = {
        scrollwheel: true,
        center: {
          lat: 41.4993,
          lng: -81.6944
        },
        zoom: 11
      }

      // new map
      const map = new google.maps.Map(document.getElementById('map'), options)

      // database listener for popup information
      database.ref().on("child_added", function (childSnapshot) {
    
        //variables for map from latest firebase child
        const lat = childSnapshot.val().lat
        const lng = childSnapshot.val().lng
        var date = childSnapshot.val().EventDate
        var startTime = childSnapshot.val().StartTime
        var endTime = childSnapshot.val().EndTime
        var description = childSnapshot.val().EventDescription
        var address = childSnapshot.val().EventAddress
        var state = childSnapshot.val().state
        var city = childSnapshot.val().EventCity
        
        // how the map grabs data for displaying content popup
        const markers = [{
          // coordinates from geolocation api
          coords: {
            lat: Number(lat),
            lng: Number(lng)
          },
          // flag icon image
          iconImage: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // new infoWindow data
          content: "<div>" +
            "<p><strong> Address: </strong><br>" + address + "<br>" + city + ", " + state + "</p><hr>" +
            "<p><strong>Description: </strong><br>" + description + "</p><hr>" +
            "<p><strong>Date: </strong>" + date + "</p><hr>" +
            "<p><strong>Time: </strong>" + startTime + sAmPm + " - " + endTime + eAmPm + "</p>" +
            "</div>"
        }];

        // for the length of markers array
        for (let i = 0; i < markers.length; i++) {
          //make a new marker
          addMarker(markers[i]);

          //add marker function
          function addMarker(props) {
            // add marker
            const marker = new google.maps.Marker({
              position: props.coords,
              map: map,
              //icon: props.iconImage
            });

            //check for custom icon
            if (props.iconImage) {
              //set icon image
              marker.setIcon(props.iconImage)
            };
            // check for content
            if (props.content) {
              //create new popup for location
              const infoWindow = new google.maps.InfoWindow({
                content: props.content
              });

              //functions for when you click on map, close infoWindow
              google.maps.event.addListener(marker, 'click', function () {
                if (!marker.open) {
                  infoWindow.open(map, marker);
                  marker.open = true;
                }
                else {
                  infoWindow.close();
                  marker.open = false;
                }
                google.maps.event.addListener(map, 'click', function () {
                  infoWindow.close();
                  marker.open = false;
                });
              });
            };
          };
        };
      });
    };
    //run the start map function
    initMap();

  // end calendar and map functions
  });

  //===========================
  // new event form
  //===========================

  // show the form when create new form button is clicked
  $('#create-new-project').click(function (e) {
    e.preventDefault();
    document.getElementById("create-form").style.display = "block";
  });

  // if button cancel is clicked, clear values and close form
  $('#btn-cancel').click(function () {
    $('#email').val('');
    $('#name').val('');
    $('#event').val('');
    $('#address').val('');
    $('#city').val('');
    $('#date').val('');
    $('#startTime').val('');
    $('#endTime').val('');
    // $('#image').val('');
    document.getElementById("create-form").style.display = "none";
  });

  //=============================
  // cleave.js input formatting
  //=============================

  new Cleave('.input-date', {
    date: true,
    delimiter: '-',
    datePattern: ['m', 'd', 'Y']
  });

  new Cleave('.start-time', {
    time: true,
    timeFormat: '12',
    timePattern: ['h', 'm']
  });

  new Cleave('.end-time', {
    time: true,
    timeFormat: '12',
    timePattern: ['h', 'm']
  });

  new Cleave('.input-html', {
    prefix: 'https://',
    delimiter: '-',
    uppercase: false
  });

// clears form once submitted

      function clearForm () {
      $('#email').val('');
      $('#name').val('');
      $('#event').val('');
      $('#address').val('');
      // $('#image').val('');
      $('#date').val('');
      $('#city').val('');
      $('#input-state').val('void');
      $('#startTime').val('');
      $('#endTime').val('');
      $('#exampleFormControlTextarea1').val('');
      $('#externalLinks').val('');
      //makes form go away when someone hits submit
      document.getElementById("create-form").style.display = "none";
      };

//doc ready end
});