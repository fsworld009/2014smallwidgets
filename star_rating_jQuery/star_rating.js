//module pattern suggested by jQuery tutorial
var star_rating = function(){
    var rating = 0;
    var stars = $("#star_rating").find(".star_rate");
    
    function reset(){
        stars.css("opacity","0");
    }

    function hover(star_pos){
        reset();
        stars.slice(0,star_pos).css("opacity","1");
    }

    function hover_out(){
        reset();
        stars.slice(0,rating).css("opacity","1");
    } 

    function rate(star_pos){
        rating = star_pos;
        $("#rating_display").html("You gave " + rating + " star(s)");
    }
    return {
        hover: hover,
        hover_out: hover_out,
        rate: rate
    };
}();

$(document).ready(function(){
    var i =0;

    $(".star_rate").each(function(index){
        var jq_obj = $(this);

        jq_obj.on("click",{index: index},function(event){
            star_rating.rate(event.data.index+1);
        });
        jq_obj.on("mouseenter",{index: index},function(event){
            star_rating.hover(event.data.index+1);
        });
        jq_obj.on("mouseleave",{index: index},function(event){
            star_rating.hover_out(event.data.index+1);
        });
    });
});
