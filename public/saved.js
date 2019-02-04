$(document).ready( function() {
    $.ajax({
      method: "GET",
      url: "/saved"
    })
    .then($.getJSON("/saved", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $(".saved-article-container").append("<div class = 'card' data-id='" + data[i]._id + "'><h3><a class='article-link' href='" + data[i].link + "'" + data[i].title + "'</h3><br />" + data[i].title + "</a><a class='btn btn-danger delete' id='" + data[i]._id + "'>Delete Article</a></div>");
    }
  }));
  });