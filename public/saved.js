$(document).ready( function() {
    $.ajax({
      method: "GET",
      url: "/saved"
    })
    .then($.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".saved-article-container").append("<div class = 'card pl-5 py-3' data-id='" + data[i]._id + "'><img src='"+data[i].image+"' class = 'float-none' style='width:192px;height:123px;' id='" + data[i]._id + "'></img><br /><h3><a class='article-link' href='" + data[i].link + "'" + data[i].title + "'</h3><br />" + data[i].title + "</a><br><br><p>"+data[i].summary+"</p><a class='btn btn-danger delete float-none mr-3 mb-3' id='" + data[i]._id + "'>Unsave Article</a><a class='btn btn-info note float-none mr-3 mb-3' id='" + data[i]._id + "'>Add Note</a></div>");
    }
  }));
  });

  // When you click the savenote button
  $(document).on("click", "a.note", function() {

    var thisId = $(this).attr("id");
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
    .then($.getJSON("/articles/" + thisId, function(data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
          // Display the apropos information on the page
          $(this).parent().append("<div class = 'card' data-id='" + data[i]._id + "'><h3 class = 'ml-3'><a class=' note-title'</h3><br />" + data[i].note.title + "</a><h6 class = 'ml-3'><a class=' note-body'</h6><br />" + data[i].note.body + "</a></div>");
        }
      }))
    .then($(this).hide()
    .then($(this).parent().append("<div><form data-id='" + thisId + " id='notes'>Note Title:<br><input type='text' id= 'titleinput' value='Title'><br>Note:<br><input type='text' id='bodyinput' value='Article Note'><br><br><a class='btn btn-success float-left save-note' id='" + thisId + "'>Save Note!</a></form></div>")))
    })
    // Grab the id associated with the article from the submit button
//     var thisId = $(this).attr("data-id");
$(document).on("click", "a.save-note", function() {
    var thisId = $(this).attr("id");
    var title = $("#titleinput").val()
    var body = $("#bodyinput").val()
//     // Run a POST request to change the note, using what's entered in the inputs
    $.ajax({
      method: "POST",
      url: "/articles/" + thisId,
      data: {
        // Value taken from title input
        title: $("#titleinput").val(),
        // Value taken from note textarea
        body: $("#bodyinput").val()
      }
    })
      // With that done
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  })


  $(document).on("click", "a.delete", function() {

    var thisId = $(this).attr("id");
    $.ajax({
      method: "PUT",
      url: "/unsave/" + thisId
    })
    .then($(this).parent().hide())
    .then($(this).child().hide())
    .then($(this).sibling().hide())
  })




//   .then($.ajax({
//     method: "GET",
//     url: "/articles/" + thisId
//   }))
//   .then($.getJSON("/articles/" + thisId, function(data) {
//       console.log("Get article by ID data: " + JSON.stringify(data));
//       $(this).parent().append("<div><h3>Note Saved!</h3><br /><h2>"+ data.note.title +"</h2><br /><p>"+ data.note.body +"</p></div>")
//   }))