document.onscroll=function() {
    navbar = document.getElementById("navbar");
    navGrid = document.getElementById("nav-grid");
    navBtns = navGrid.getElementsByTagName("*");
    animChange = "to-opaque"
    if (window.pageYOffset != 0) {
        animChange = "to-transparent";
    }
    navbar.style.animationName="navbar-"+animChange;
    navbar.style.animationPlayState="running";
}

var ctrlState = "none";

document.addEventListener("DOMContentLoaded", function(){
    main = document.getElementById("main");
    ctrlDiv = document.getElementById("ctrl-div");
    play = document.getElementById("btn-play");
    play.onclick = function(){ ctrlState="play"};
    pause = document.getElementById("btn-pause");
    pause.onclick = function(){ ctrlState="pause";}
    next = document.getElementById("btn-next");
    next.onclick = function(){ ctrlState="next";}
});