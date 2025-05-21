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

thisSeasonData = {};
function parseSeason(data) {

    thisSeasonData = data;

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
        supportedKeys = ["place","club","p","w","d","l","a","f","a","pts","gd","f_p","a_p","win_percent","gd_p","pts_p","division","flags","deduct","info"]
        Object.keys(team).forEach(k=>{
            if ( ! supportedKeys.includes(k) ) {
                console.error(k);
            }
        });
        supportedClubKeys = ["country","name","id"];
        Object.keys(team.club).forEach(ck=>{
            if ( ! supportedClubKeys.includes(ck) ) {
                console.error("club",ck);
            }
        });
        if (team.flags) {
            supportedFlagKeys = ["new_club","winner","domestic_champion","removed","expunged","returning_club"];
            Object.keys(team.flags).forEach(fk=>{
                if ( ! supportedFlagKeys.includes(fk) ) {
                    console.error("flags",fk);
                }
            });
        }
        if (team.deduct) {
            supportedFlagKeys = ["points","reason"];
            Object.keys(team.deduct).forEach(fk=>{
                if ( ! supportedFlagKeys.includes(fk) ) {
                    console.error("deduct",fk);
                }
            });
        }

        thisTeam = $("<TR></TR>").attr("id",team.club.id);

        thisTeam.append( $("<TD></TD>").html(team.place) );

        thisTeamCountry = getCountry(team.club.country);
        thisTeam.append( $("<TD></TD>").append(
            $("<IMG />")
                .attr("src","flags/"+team.club.country+".png")
                .attr("alt",thisTeamCountry)
                .attr("data-bs-toggle","tooltip")
                .attr("data-bs-title",thisTeamCountry)
        ));

        thisTeamName =  $("<TH></TH>").attr("scope","row");
        if ( supportedClubs.includes(team.club.id) ) {
            thisTeamName.append( $("<A></A>").html(team.club.name).attr("href","clubs.html?country="+team.club.country.toLowerCase()+"&club="+team.club.id.toLowerCase()) );
        } else {
            thisTeamName.html(team.club.name);
        }

        if ( team.flags) {
            if ( team.flags.new_club ) {
                thisTeamName.append( makeIcon("new") );
            }
            if ( team.flags.domestic_champion ) {
                thisTeamName.append( makeIcon("trophy") );
                thisTeam.addClass("is-domestic_champion");
            }
            if ( team.flags.removed ) {
                thisTeamName.append( makeIcon("removed") );
                thisTeam.addClass("is-removed");
            }
            if ( team.flags.returning_club ) {
                thisTeamName.append( makeIcon("returning") );
            }
        }
        if ( team.deduct ) {
            deductMsg = "Deducted " + team.deduct.points + " point" + (team.deduct.points === 1 ? '' : 's');
            if ( team.deduct.reason ) {
                deductMsg += "<br />" + team.deduct.reason;
            }
            thisTeamName.append( makeIcon("deduction",deductMsg) );
        }
        if ( team.info ) {
            thisTeamName.append( makeIcon("info",team.info) );
        }
        thisTeam.append(thisTeamName);

        if ( team.flags && team.flags.expunged ) {
            for ( i=0 ; i!==13 ; i++ ) {
                thisTeam.append( $("<TD></TD>").html("-") );
            }
        } else {
            thisTeam.append( $("<TD></TD>").html(team.p) );
            thisTeam.append( $("<TD></TD>").html(team.w) );
            thisTeam.append( $("<TD></TD>").html(team.d) );
            thisTeam.append( $("<TD></TD>").html(team.l) );
            thisTeam.append( $("<TD></TD>").html(team.f) );
            thisTeam.append( $("<TD></TD>").html(team.a) );
            thisTeam.append( $("<TD></TD>").html(team.pts) );
            thisTeam.append( $("<TD></TD>").html(team.gd) );
            thisTeam.append( $("<TD></TD>").html(team.f_p.toFixed(2)) );
            thisTeam.append( $("<TD></TD>").html(team.a_p.toFixed(2)) );
            thisTeam.append( $("<TD></TD>").html(team.win_percent.toFixed(2)) );
            thisTeam.append( $("<TD></TD>").html(team.gd_p.toFixed(2)) );
            thisTeam.append( $("<TD></TD>").html(team.pts_p.toFixed(2)) );
        }

        $("tbody#league_"+id).append(thisTeam);
    });
}

function makeIcon(code,msg="") {
    altText = "";
    switch (code) {
        case "deduction":   altText = msg; break;
        case "info":        altText = msg; break;
        case "new":         altText = "New Club"; break;
        case "removed":     altText = "Relegated from Top Flight"; break;
        case "returning":   altText = "Returning Club"; break;
        case "trophy":      altText = "Domestic Champions"; break;
        default:            altText = code; break;
    }
            
    img = $("<IMG />")
        .attr("src","assets/"+code+".png")
        .attr("alt",altText)
        .attr("data-bs-toggle","tooltip")
        .attr("data-bs-title",altText)
        ;

    return img;
}