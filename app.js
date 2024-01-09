$(document).ready(function () {
    // Display current day
    $("#currentDay").text(dayjs().format("dddd, MMMM D, YYYY"));
  
    // Function to update timeblocks based on current time
    function updateBlocks() {
      var currentHour = dayjs().hour();
  
      $(".time-block").each(function () {
        var blockHour = parseInt($(this).data("hour"));
  
        if (blockHour < currentHour) {
          $(this).addClass("past").removeClass("present future");
        } else if (blockHour === currentHour) {
          $(this).addClass("present").removeClass("past future");
        } else {
          $(this).addClass("future").removeClass("past present");
        }
      });
    }
  
    // Call the function to update blocks on page load
    updateBlocks();
  
    // Click event for time-blocks to enable editing
    $(".time-block").on("click", function () {
      // Remove the 'readonly' attribute from textarea to enable editing
      $(this).find(".description").removeAttr("readonly").focus();
    });
  
    // Blur event for textarea to save the edited event
    $(".description").on("blur", function () {
      var description = $(this).val();
      var hour = $(this).closest(".time-block").data("hour");
  
      // Save the edited event to local storage
      localStorage.setItem(hour, description);
  
      // Add 'readonly' attribute back to disable editing after saving
      $(this).attr("readonly", true);
    });
  
    // Load events from local storage
    $(".time-block").each(function () {
      var hour = $(this).data("hour");
      var savedEvent = localStorage.getItem(hour);
  
      if (savedEvent) {
        $(this).find(".description").val(savedEvent);
      }
    });
  
    // Set interval to update blocks every minute
    setInterval(updateBlocks, 60000);
  });
  