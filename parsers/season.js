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

    setTitles([],data.season);

    $("#goPrev").html(data.prev).attr("href","season.html?season="+data.prev);
    if ( data.prevMissing ) {
        $("#goPrev").addClass("disabled").attr("disabled","true");
    }
    $("#goNext").html(data.next).attr("href","season.html?season="+data.next);
    if ( data.nextMissing ) {
        $("#goNext").addClass("disabled").attr("disabled","true");
    }

    ["a","b","c","d","e","f","g","h"].forEach(div=>{
        if ( data["division_"+div] ) {
            handleDiv(data["division_"+div]);
        } else {
            $("#div"+div).addClass("disabled").attr("disabled","true");
        }
    });

    $("#divisionsNav").removeClass("d-none");
    $("#divisionsTables").removeClass("d-none");
    $(".placeholder-glow").addClass("d-none");

}

function handleDiv(teams) {
    console.log(teams);
}