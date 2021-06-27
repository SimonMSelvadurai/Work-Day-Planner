// save reference to important DOM elements
var timeDisplayEl = $("#currentDay");

// handle displaying the time
function displayTime() {
  var rightNow = moment().format("MMM DD, YYYY hh:mm:ss a");
  timeDisplayEl.text(rightNow);
}
loadStoredAppointments();
// function will be called once the html page loaded...
$(document).ready(function () {
  setInterval(displayTime, 1000);
  time();
});

$(".container").on("click", ".saveBtn", function () {
  const element = $(this);
  console.log(" Time Element : " + element.data("time"));
  const appointmentTime = element.parent().attr("id");
  // const hourhour = element.parent().attr("time-block");
  var appointmentDetails = element.siblings(".description").val();
  // var hour = element.siblings("time-block").val();

  var hour = element.parent().attr(".hour");
  // var timeBlock = $(".time-block");
  console.log(" hour : = " + hour);

  if (appointmentDetails != null && appointmentDetails.length > 0) {
    console.log(" Text  : = " + appointmentDetails);
    console.log(" ID : = " + appointmentTime);
    // console.log(" hour : = " + hour);
    // var appointmentTime1 = $("#id").val();
    // console.log(" appointmentTime1 : = " + appointmentTime1);

    localStorage.setItem(appointmentTime, appointmentDetails);
  } else {
    window.alert("Please enter a task and press the save button");
  }
});

function time() {
  var currentTime;
  var currentHour = moment().hour();
  // currentHour = 10;
  var timeBlock = $(".time-block");
  for (var i = 0; i < timeBlock.length; i++) {
    var block = timeBlock[i];
    // console.log("block >>>>>>>>>>>>>" + block.val());
    if (parseInt(block.id.split("-")[0]) < currentHour) {
      $(block).addClass("past");
    } else if (parseInt(block.id.split("-")[0]) === currentHour) {
      $(block).removeClass("past");
      $(block).addClass("present");
    } else {
      $(block).removeClass("past");
      $(block).removeClass("present");
      $(block).addClass("future");
    }
  }
}
/*
$(".container").on("click", ".saveBtn", function () {
  var text = $(this).siblings(".description").val(); // taken the change from the sibling html description attribute
  var time = $(this).parent().attr("id");
  console.log(" Text  : = " + text);
  console.log(" ID : = " + time);
});
*/
function clearLocalStorage() {
  localStorage.clear();
}

//load any saved data from LocalStorage - do this for each hour created. Should follow html 24 hour to 12 hour conversion.
//Load data from local storage to each time block
function loadStoredAppointments() {
  console.log("loadStoredAppointments");
  $("#9AM .description").val(localStorage.getItem("9AM"));
  $("#10AM .description").val(localStorage.getItem("10AM"));
  $("#11AM .description").val(localStorage.getItem("11AM"));
  $("#12PM .description").val(localStorage.getItem("12PM"));
  $("#13PM .description").val(localStorage.getItem("13PM"));
  $("#14PM .description").val(localStorage.getItem("14PM"));
  $("#15PM .description").val(localStorage.getItem("15PM"));
  $("#16PM .description").val(localStorage.getItem("16PM"));
  $("#17PM .description").val(localStorage.getItem("17PM"));
}
//Clear button click listener
$(".clearBtn").on("click", clearClick);

//Save input to local storage
function clearClick(event) {
  var clear = confirm("Are you sure to clear all the appointments");

  if (clear) {
    localStorage.clear();
    loadStoredAppointments();
  }
}
