$(document).ready(function(){

    checkParams();

	if ( urlParams["country"] && urlParams["club"] ) {

        console.log("TODO: NEED CLUB");
    
    } else if ( urlParams["country"] ) {

        console.log("TODO: NEED COUNTRY");
    
    } else {

        console.log("TODO: NEED INTRO");
        goTootlip();

    }
	
	/*	$.ajax({
			url: "data/teams.json",
			success: function(data) {
				parseTeams(data);
			}
		});

	}*/

});