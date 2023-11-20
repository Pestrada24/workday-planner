// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
const localeSettings = {};
dayjs.locale(localeSettings);
//DOM must be loaded before any code is run
$(function () {
  //Get current time from dayjs
const currentHour = dayjs().format('H');
  //Following funtion changes the color of the text area based on the current time
  function hourlyColor() {
    $(".time-block").each(function () {
      const blockHour = parseInt(this.id);
      $(this).toggleClass("past", blockHour < currentHour);
      $(this).toggleClass("present", blockHour === currentHour);
      $(this).toggleClass("future", blockHour > currentHour);
    });
  }
  //Following function saves the user input to local storage
  function textEntry() {
    $(".saveBtn").on("click", function () {
      const key = $(this).parent().attr("id");
      const value = $(this).siblings(".description").val();
      localStorage.setItem(key, value);
    });
  }
  //Following function will refresh color of time block based on current time
  function refreshColor() {
    $('time-block').each(function () {
      const blockHour = parseInt(this.id);
      if (blockHour == currentHour) {
      $(this).removeClass("past future").addClass("present");
      } else if (blockHour < currentHour) {
      $(this).removeClass("future present").addClass("past");
      } else {
      $(this).toggleClass("past present").addClass("future");
    }
  });
  }

// This will get the user input from the localStorage and set textarea values for each time block.
$('.time-block').each(function() {
  const key = $(this).attr('id');
  const value = localStorage.getItem(key);
  $(this).children('.description').val(value);
});
function updateTime() {
  const dateElement = $('#date');
  const timeElement = $('#time');
  const currentDate = dayjs().format('dddd, MMMM D, YYYY');
  const currentTime = dayjs().format('hh:mm:ss A');
  dateElement.text(currentDate);
  timeElement.text(currentTime);
}
hourlyColor();
textEntry();
refreshColor();
setInterval(updateTime, 1000);
});