var mongoose = require('mongoose')
var News = require('../models/news')

// Accordion
function myFunction() {
  var x = document.getElementById('alog');
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else { 
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-theme-d1", "");
  }
}
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}  
function stageOne(){
  document.getElementById('progress').innerHTML = '20%'
  var prog =document.getElementById('prog').innerHTML = '20%'
  var stat = document.getElementById('status').innerHTML = 'Attending'
  document.getElementById('stat').innerHTML = 'Attending'
  document.getElementById('progress').style.width = '20%'
  console.log(prog, stat)
}
function stageTwo(){
  document.getElementById('progress').innerHTML = '40%'
  var prog =document.getElementById('prog').innerHTML = '40%'
  var stat = document.getElementById('status').innerHTML = 'Attending'
  document.getElementById('stat').innerHTML = 'Attending'
  document.getElementById('progress').style.width = '40%'
  console.log(prog, stat)
}
function stageThree(){
  document.getElementById('progress').innerHTML = '60%'
  var prog =document.getElementById('prog').innerHTML = '60%'
  var stat = document.getElementById('status').innerHTML = 'Attending'
  document.getElementById('stat').innerHTML = 'Attending'
  document.getElementById('progress').style.width = '60%'
  console.log(prog, stat)
}
function stageFour(){
  document.getElementById('progress').innerHTML = '80%'
  var prog =document.getElementById('prog').innerHTML = '80%'
  var stat = document.getElementById('status').innerHTML = 'Attending'
  document.getElementById('stat').innerHTML = 'Attending'
  document.getElementById('progress').style.width = '80%'
  console.log(prog, stat)
}
function stageFive(){
  document.getElementById('progress').innerHTML = '100%'
  var prog =document.getElementById('prog').innerHTML = '100%'
  var stat = document.getElementById('status').innerHTML = 'Done'
  document.getElementById('stat').innerHTML = 'Done'
  document.getElementById('progress').style.width = '100%'
  console.log(prog, stat)
}
$(".custom-file-input").on("change", function() {
  var fileName = $(this).val().split("\\").pop();
  $(this).siblings(".custom-file-label").addClass("selected").html(fileName);
});
function deleteNews(){
  News.findByIdAndDelete({_id:req.params._id})
}
