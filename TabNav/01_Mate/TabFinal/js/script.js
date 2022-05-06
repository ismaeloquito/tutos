function openPest(evt, pestName) {
    var i, contenidopest, pestenlace;
    contenidopest = document.getElementsByClassName("contenidopest");
    for (i = 0; i < contenidopest.length; i++) {
      contenidopest[i].style.display = "none";
    }
    pestenlace = document.getElementsByClassName("pestenlace");
    for (i = 0; i < pestenlace.length; i++) {
      pestenlace[i].className = pestenlace[i].className.replace(" active", "");
    }
    document.getElementById(pestName).style.display = "block";
    evt.currentTarget.className += " active";
  }
  
  // Get the element with id="defaultOpen" and click on it
  document.getElementById("defaultOpen").click();