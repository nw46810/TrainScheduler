 
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAPKv8N0Tk2nggA2KfataD5uEuT2f4-z1M",
    authDomain: "trainapp-461d7.firebaseapp.com",
    databaseURL: "https://trainapp-461d7.firebaseio.com",
    projectId: "trainapp-461d7",
    storageBucket: "trainapp-461d7.appspot.com",
    messagingSenderId: "43277071188"
  };
  firebase.initializeApp(config);

var database = firebase.database();
$('#addTrainBtn').on("click", function() {
  // user input
  var trainName = $("#trainNameInput").val().trim();
  var destination = $("#destinationInput").val().trim();
  var firstTrain = moment($("#timeInput").val().trim(), "HH:mm").format("HH:mm");
  var frequency = $("#frequencyInput").val().trim();
  // train data
  var newTrain = {
      name: trainName,
      place: destination,
      ftrain: firstTrain,
      freq: frequency
    }
    // pushes data to firebase
  database.ref().push(newTrain);
  console.log(newTrain.name);
  // clears input
  $("#trainNameInput").val("");
  $("#destinationInput").val("");
  $("#timeInput").val("");
  $("#frequencyInput").val("");
  return false;
});
//  creating train information to the page
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
  
  var trainName = childSnapshot.val().name;
  var destination = childSnapshot.val().place;
  var firstTrain = childSnapshot.val().ftrain;
  var frequency = childSnapshot.val().freq;
  
  var firstTimeConverted = moment(firstTrain, "HH:mm");
  console.log(firstTimeConverted);
  var currentTime = moment().format("HH:mm");
  console.log("CURRENT TIME: " + currentTime);
  // store difference between currentTime and fisrt train converted in a variable.
  var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(firstTrain);
  console.log("Difference in Time: " + timeDiff);
  // find Remainder of the time left and store in a variable
  var timeRemainder = timeDiff % frequency;
  console.log(timeRemainder);
  // to calculate minutes till train,we store it in a variable
  var minToTrain = frequency - timeRemainder;
  // next train
  var nxTrain = moment().add(minToTrain, "minutes").format("HH:mm");
  $("#trainTable>tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>"
   + nxTrain + "</td><td>" + frequency + "</td><td>" + minToTrain + "</td></tr>");
});