$(document).ready(function(){
  
  $("#small").click(function(event){
    event.preventDefault();
    $("h1").animate({"font-size":"24px"});
    $("h2").animate({"font-size":"16px"});
    $("p").animate({"font-size":"12px", "line-height":"16px"});
    
  });
  
  $("#medium").click(function(event){
    event.preventDefault();
    $("h1").animate({"font-size":"36px"});
    $("h2").animate({"font-size":"30px"});
    $("p").animate({"font-size":"14px", "line-height":"20px"});
	$("#subtitle").animate({"font-size":"14px", "line-height":"20px"});
	$("#talkbubbletext").animate({"font-size":"28px"});
    
  });
  
  $("#large").click(function(event){
    event.preventDefault();
    $("h1").animate({"font-size":"48px"});
    $("h2").animate({"font-size":"32px"});
    $("p").animate({"font-size":"18px", "line-height":"20px"});
    
  });
  
  $( "a" ).click(function() {
   $("a").removeClass("selected");
  $(this).addClass("selected");
  
 });

});
