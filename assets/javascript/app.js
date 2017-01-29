$(document).ready(function() {

//****************************// 

  //array of things I like
  var myStuff = ["puppies","dogs","mini horses","kittens","ferrets","baby goats","baby animals","tolkien","harry potter","star wars","star trek","galaxies","hawaii","beaches","mountains","stained glass","fused glass","art glass"]

//****************************// 
  
  //function to create buttons from array
  function makeButton() {
    for (i=0; i<myStuff.length; i++){
      $("#buttons").append('<button type="button" class="btn btn-default showGif">' + myStuff[i]);
    }
  }
 
//****************************// 

  //function to populate gifs and animate or still
  function makeGifs() { 
    //pull search term from button text
    searchName = $(this).text();
    //url to query Giphy API - puts search term in search string, other parameters are: limit 10 pictures, public key included
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=dc6zaTOxFJmzC"
    //run AJAX call
    $.ajax({url: queryURL, method: 'GET'})
      //create object
      .done(function(response) {
        //clears previous gifs
        $("img").remove()  
        //loop through Giphy object array
        for (i=0; i<response.data.length; i++){
          //creates variable to build image div
          var pic = $('<img class="still" id="' + i + '">')
          //adds url source for still picture
          $(pic).attr('src', response.data[i].images.fixed_height_still.url); 
          //adds data attributes for url's of both picture types for faster loading
          $(pic).attr('data-still', response.data[i].images.fixed_height_still.url);
          $(pic).attr('data-move', response.data[i].images.fixed_height.url);
          //adds pic to html
          $('#gifsHere').append(pic)
        }
        
        //animate gif on click
        //when div with still class is clicked
        $(document).on("click", ".still", function() {        
          //changes the img src to animated pic
          $(this).attr("src", $(this).data("move")); 
          //changes the class
          $(this).attr("class", "move");
        });  
        
        //stop gif on click
        //when div with move class is clicked  
        $(document).on("click", ".move", function() {        
          //changes the img src to still pic
          $(this).attr("src", $(this).data("still")); 
          //changes the class
          $(this).attr("class", "still");
        });          
      });
  }

//****************************//

function addButton() {
    //read value from form
    var newItem = $("#text").val().trim().toLowerCase();
    //check for invalid input (empty or only spaces)
    var notWS = /\S/g;
    var chkAns = newItem.match(notWS);
    //check for existing button
    var exists = myStuff.indexOf(newItem);
    if (chkAns != null && exists == -1) {
      //add value to array
      myStuff.push(newItem);
      //clear existing buttons
      $(".showGif").remove()
      //call 'buttons from array' function    
      makeButton();
      //clear form
      document.getElementById("newEntry").reset(); 
      //stop re-run of function at outer level (propogation!!)
      return false;
    } else {
      return false;
    } 
}

//****************************//

  //call 'buttons from array' function (automatic on page load)
  makeButton();

//****************************// 

  //when add button is clicked
  $("#add").on("click", addButton);

//****************************//

  //when gif button is clicked
  $(document).on("click", ".showGif", makeGifs);

//****************************//

});
