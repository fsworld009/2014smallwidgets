/* in an event function:
 * ev.target = the deppest element that triggers the event (always refer to that one)
 * this = current element that executes the event (refer to different elements when bubbling up)
 * <ex>
 *  <div onclick="func()"> <img> </div>
 *  when click on img, div executes func because of event bubbling
 *  and this = div, event.taget= img in func(event)
 */

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    $("div").data("dragged_img_id",ev.target.id);
    //ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    $(this).append($("#"+$("div").data("dragged_img_id")));
    /*var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));*/
}


$(document).ready(function(){
    $("img").attr("draggable","true").each(function(index){
        $(this).attr("id","img"+index); 
        
    });

    $("img").on("dragstart",drag);
    $("div").on("dragover",allowDrop);
    $("div").on("drop",drop);

});
//dragging and dropping image is done by recording the image id when dragging and using DOM to move that image when dropping on a div
