$(document).ready(function() {
  // processing Icon
  function Processing(state) {
    if (state) {
      $("#processing").css("display", "block");
    } else {
      $("#processing").css("display", "none");
    }
  }

  $("#deleteEmail").on("click", function() {
    const deleteId = $(this).data("id");
    console.log(deleteId);
    console.log("delete");

    $.ajax({
      type: "POST",
      url: "/action/:id",
      beforeSend: function() {
        Processing(true);
      },
      data: {
        type: "delete",
        actionId: deleteId
      },
      dataType: "",
      success: function(response) {
        console.log(response);
        Processing(false);
        setTimeout(() => {
          window.location = "/";
        }, 500);
      },
      error: function(response) {
        console.log("Error");
        console.log(response);
      }
    });
  });

  $("#archiveEmail").on("click", function() {
    const archiveId = $(this).data("id");
    console.log(archiveId);

    $.ajax({
      type: "POST",
      url: "/action/:id",
      beforeSend: function() {
        Processing(true);
      },
      data: {
        type: "archive",
        actionId: archiveId
      },
      dataType: "",
      success: function(response) {
        console.log(response);
        Processing(false);
        setTimeout(() => {
          window.location = "/";
        }, 500);
      },
      error: function(response) {
        console.log("Error");
        console.log(response);
      }
    });
  });
});
