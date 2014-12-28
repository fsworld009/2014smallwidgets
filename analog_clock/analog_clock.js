
function initAnalogClock(){
    analogClock();
    setInterval(function () {analogClock()}, 1000);
}

function analogClock() {
    var date = new Date();
    
    var analog_clock = document.getElementById("analog_clock");
    
    var second = date.getSeconds();
    var second_hand = analog_clock.getElementsByClassName("second_hand")[0];
    second_hand.style.transform = "rotate(" + (-90+second*6) + "deg)";
    
    
    var minute = date.getMinutes();
    var minute_hand = analog_clock.getElementsByClassName("minute_hand")[0];
    minute_hand.style.transform = "rotate(" + (-90+minute*6) + "deg)";
    
    var hour = date.getHours();
    var hour_hand = analog_clock.getElementsByClassName("hour_hand")[0];
    hour_hand.style.transform = "rotate(" + (-90+hour*30 + (minute/60)*30  ) + "deg)";
}