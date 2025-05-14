$(document).ready(function(){

    checkParams();

    seasonPath = urlParams["season"].split("");
    folder = seasonPath[0] + seasonPath[1];
    subfolder = seasonPath[2];
    file = seasonPath[3] + seasonPath[4] + seasonPath[5] + seasonPath[6];

	$.ajax({
        url: "seasons/"+folder+"/"+subfolder+"/"+file+".json",
        success: function(data) {
            parseSeason(data);
        },
        error: function(data) {
            $("#show-error").removeClass("d-none");
            $(".placeholder-glow").addClass("d-none");
        }
    });

});

function parseSeason(data) {

    console.log(data);
    
    $(".placeholder-glow").addClass("d-none");

}