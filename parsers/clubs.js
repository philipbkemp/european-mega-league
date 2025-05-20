$(document).ready(function(){

    checkParams();

	if ( urlParams["country"] && urlParams["club"] ) {

        console.log("TODO: NEED CLUB");

        $.ajax({
			url: "data/clubs/"+urlParams["country"].toLowerCase()+"/"+urlParams["club"].toLowerCase()+".json",
			success: function(data) {
                handleClub(data);
			},
            error: function(data) {
                $("#show-error").removeClass("d-none");
                $("#link-clubs").removeClass("d-none");
            }
		});
    
    } else if ( urlParams["country"] ) {

        $.ajax({
			url: "data/countries/"+urlParams["country"]+".json",
			success: function(data) {
				handleCountry(data);
			},
            error: function(data) {
                $("#show-error").removeClass("d-none");
                $("#link-clubs").removeClass("d-none");
            }
		});
    
    } else {

        goTootlip();
        $("#show-empty").removeClass("d-none");
        setTitles([],"Clubs");

    }

});

function handleClub(data) {
    setTitles(["Clubs",data.country.name],data.name);
    $("#link-clubs").removeClass("d-none");
    $("#link-country").removeClass("d-none").html(data.country.name).attr("href","clubs.html?country="+data.country.code.toLowerCase());
}

function handleCountry(data) {
    $("#active-clubs").html(data.league);
    setTitles(["Clubs"],data.name);
    data.current.forEach(activeClub=>{
        clubWrap = $("<DIV></DIV>").addClass("col");
        clubLink = $("<A></A>").addClass("btn").addClass("btn-outline-dark").addClass("w-100").attr("href","clubs.html?country="+data.country+"&club="+activeClub.code.toLowerCase());
        if ( activeClub.missing ) {
            clubLink.addClass("opacity-50");
        }
        clubLink.append(activeClub.name);
        clubWrap.append(clubLink);
        $(".club-list--active").append(clubWrap);
    });
    data.former.forEach(formerClub=>{
        clubWrap = $("<DIV></DIV>").addClass("col");
        clubLink = $("<A></A>").addClass("btn").addClass("btn-outline-dark").addClass("w-100").attr("href","clubs.html?country="+data.country+"&club="+formerClub.code.toLowerCase());
        if ( formerClub.missing ) {
            clubLink.addClass("opacity-50");
        }
        clubLink.append(formerClub.name);
        clubWrap.append(clubLink);
        $(".club-list--active").append(clubWrap);
    });
    $("#show-country").removeClass("d-none");
    $("#link-clubs").removeClass("d-none");
}