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
  checkTimeBlock();
});
/**
 * On click - Save button function
 * Gets the time from the ID(Time) and the tasks
 * Save it in local storage
 */

$(".container").on("click", ".saveBtn", function () {
  const element = $(this);
  const appointmentTime = element.parent().attr("id");
  var appointmentDetails = element.siblings(".description").val();

  // checks if the field is empty
  if (appointmentDetails != null && appointmentDetails.length > 0) {
    localStorage.setItem(appointmentTime, appointmentDetails);
    window.alert("The entered Task(s) has been saved successfully!!!");
  } else {
    window.alert("Please enter a task and press the save button");
  }
});
/**
 * Check the current hour with the callender and color code them
 */
function checkTimeBlock() {
  var currentTime;
  var currentHour = moment().hour();
  currentHour = 10;
  var timeBlock = $(".time-block");
  for (var i = 0; i < timeBlock.length; i++) {
    var block = timeBlock[i];
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

// Clear the local storege contents...
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
  var clear = confirm("Are you sure to clear all the tasks for the day");

  if (clear) {
    localStorage.clear();
    loadStoredAppointments();
  }
}
