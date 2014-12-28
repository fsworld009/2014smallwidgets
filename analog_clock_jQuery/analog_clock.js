
$(document).ready(function(){
    analogClock();
    setInterval(function () {analogClock()}, 1000);
});

function analogClock() {
    var date = new Date();
    
    var analog_clock = $("#analog_clock");
    
    var second = date.getSeconds();
    var second_hand = analog_clock.find(".second_hand");
    second_hand.css("transform","rotate(" + (-90+second*6) + "deg)");
    
    
    var minute = date.getMinutes();
    analog_clock.find(".minute_hand").css("transform","rotate(" + (-90+minute*6) + "deg)");
    
    var hour = date.getHours();
    analog_clock.find(".hour_hand").css("transform","rotate(" + (-90+hour*30 + (minute/60)*30  ) + "deg)");
}
