$(document).ready(function() {

  //array of things
  var myStuff = ["Puppies","Dogs","Horses","Kittens","Ferrets","Goats","Baby Animals","Tolkien","Harry Potter","Star Wars","Star Trek","Science","Space","Galaxies","Hawaii","Beaches","Mountains","Stained Glass","Art","Fused Glass","Dichroic","Art Glass"]
  
  //create buttons from array function
  function makeButton() {
    for (i=0; i<myStuff.length; i++){
      $("#buttons").append('<button type="button" class="btn btn-default showGif">' + myStuff[i]);
    }
  }
  //call buttons from array function
  makeButton()
  
  //when add button is clicked
  $("#add").on("click", function() {
  //$("form-group").submit(function(){  
    //read value from form
    var newItem = $("#text").val();
    //add value to array
    myStuff.push(newItem);
    //clear existing buttons
    $(".showGif").remove()
    //call buttons from array function    
    makeButton();
    //clear form
    document.getElementById("newEntry").reset(); 
    //stop re-run of function at outer level (propogation!!)
    return false;
  });

  //when gif button is clicked
  //$("#start").click(function() {
    //query giph and load pictures
    //how to stop/start animation    
    
  //});
  
});