$(document).ready(function(){

    checkParams();

	if ( urlParams["country"] && urlParams["club"] ) {

        console.log("NEED CLUB");
    
    } else if ( urlParams["country"] ) {

        console.log("NEED COUNTRY");
    
    } else {

        console.log("NEED INTRO");
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