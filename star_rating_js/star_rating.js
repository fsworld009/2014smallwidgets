
var star_rating = {
    
    rating:0,
    stars : document.getElementById("star_rating").getElementsByClassName("star_rate"),
    
    reset : function(){
        for(i=0;i<this.stars.length;i++){
            this.stars[i].style.opacity = 0;
        }
    },
    
    hover : function (star_pos) {
        var i;
        this.reset();
        for(i=0;i<star_pos;i++){
            this.stars[i].style.opacity = 1;
        }
    },
    
    hover_out: function(){
        this.reset();
        for(i=0;i<this.rating;i++){
            this.stars[i].style.opacity = 1;
        }
    },
        
    rate: function(star_pos) {
        this.rating = star_pos;
        document.getElementById("rating_display").innerHTML = "You gave " + this.rating + " star(s)";
    }
};
