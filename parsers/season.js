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
            handleDiv(div,data["division_"+div]);
        } else {
            $("#div"+div).addClass("disabled").attr("disabled","true");
        }
    });

    $("#divisionsNav").removeClass("d-none");
    $("#divisionsTables").removeClass("d-none");
    $(".placeholder-glow").addClass("d-none");

    goTootlip();
}

function handleDiv(id,teams) {
    teams.forEach(team=>{
        thisTeam = $("<TR></TR>");

        thisTeam.append( $("<TD></TD>").html(team.place) );

        thisTeamCountry = getCountry(team.club.country);
        thisTeam.append( $("<TD></TD>").append(
            $("<IMG />")
                .attr("src","flags/"+team.club.country+".png")
                .attr("alt",thisTeamCountry)
                .attr("data-bs-toggle","tooltip")
                .attr("data-bs-title",thisTeamCountry)
        ));

        thisTeam.append( $("<TD></TD>").html(team.club.name) );

        thisTeam.append( $("<TD></TD>").html(team.p) );
        thisTeam.append( $("<TD></TD>").html(team.w) );
        thisTeam.append( $("<TD></TD>").html(team.d) );
        thisTeam.append( $("<TD></TD>").html(team.l) );
        thisTeam.append( $("<TD></TD>").html(team.f) );
        thisTeam.append( $("<TD></TD>").html(team.a) );
        thisTeam.append( $("<TD></TD>").html(team.pts) );
        thisTeam.append( $("<TD></TD>").html(team.gd) );
        thisTeam.append( $("<TD></TD>").html(team.f_p) );
        thisTeam.append( $("<TD></TD>").html(team.a_p) );
        thisTeam.append( $("<TD></TD>").html(team.win_percent) );
        thisTeam.append( $("<TD></TD>").html(team.gd_p) );
        thisTeam.append( $("<TD></TD>").html(team.pts_p) );

        $("tbody#league_"+id).append(thisTeam);
    });
}