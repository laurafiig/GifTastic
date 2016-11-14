$(document).ready(function() {

//****************************// 

  //array of things
  var myStuff = ["Puppies","Dogs","Mini Horses","Kittens","Ferrets","Baby Goats","Baby Animals","Tolkien","Harry Potter","Star Wars","Star Trek","Space","Galaxies","Hawaii","Beaches","Mountains","Stained Glass","Fused Glass","Art Glass"]

//****************************// 
  
  //create buttons from array function
  function makeButton() {
    for (i=0; i<myStuff.length; i++){
      $("#buttons").append('<button type="button" class="btn btn-default showGif">' + myStuff[i]);
    }
  }
 
//****************************// 

  //call 'buttons from array' function
  makeButton()

//****************************// 
  
  //when add button is clicked
  $("#add").on("click", function() {  
    //read value from form
    var newItem = $("#text").val();
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
  });

//****************************//

  //when gif button is clicked
  $(".showGif").on("click", function() {
    //pull search term from button text
    searchName = $(this).text();
    //log name
    console.log(searchName)
    //url to query Giphy API - put search term
    //in search string, other parameters are:
    //limit 10 pictures, public key included
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + searchName + "&limit=10&api_key=dc6zaTOxFJmzC"
    //run AJAX call
    $.ajax({url: queryURL, method: 'GET'})
      //create object
      .done(function(response) {
        //log response
        console.log(response);
        //clears previous gifs
        $(".gifPic").remove()
        //loop through object array to load gif in html
        for (i=0; i<response.data.length; i++){
          $("#gifsHere").append('<img src=' + response.data[i].images.fixed_height_still.url + ' class="gifPic">')
        }
    }); 

  });

//****************************//
  
});

//still to be done
//  add swap between still/annimated
//  1.  add id on creation of [i]
//  2.  on click replace with animated
//  how to switch back and forth? loop?
//  or 2 commands with different classes
//  for animated or still
//  OR
//  append both with separate classes
//  hide animated and toggle on click
//  $("img").toggle();
//issue to fix
//  button add breaks button on click
//  probably because of return false
//  can remedy by having two functions
//  or repeating the code, which is 
//  basically the same thing, but D.R.Y.
//can I define two functions at once?
//or define one as the other???