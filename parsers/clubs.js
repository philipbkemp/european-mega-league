$(document).ready(function(){

    checkParams();

	if ( urlParams["country"] && urlParams["club"] ) {

        console.log("TODO: NEED CLUB");
    
    } else if ( urlParams["country"] ) {

        $.ajax({
			url: "data/countries/"+urlParams["country"]+".json",
			success: function(data) {
				handleCountry(data);
			},
            error: function(data) {
                $("#show-error").removeClass("d-none");
            }
		});
    
    } else {

        goTootlip();
        $("#show-empty").removeClass("d-none");
        setTitles([],"Clubs");

    }

});

function setTitles(path,page) {
    if ( path.length !== 0 ) {
        $("h1 .eml").html(["European Mega League",...path].join(" / "));
    } else {
        $("h1 .eml").html(["European Mega League"].join(" / "));
    }
    $("h1 .mainTitle").html(page);
}

function handleCountry(data) {
    $("#active-clubs").html(data.league);
    setTitles(["Clubs"],data.name);
    data.current.forEach(activeClub=>{
        clubWrap = $("<DIV></DIV>").addClass("col");
        clubLink = $("<A></A>").addClass("btn").addClass("btn-outline-dark").addClass("w-100").attr("href","clubs.html?country="+data.country+"&club="+activeClub.code);
        if ( activeClub.missing ) {
            clubLink.addClass("opacity-50");
        }
        clubLink.append(activeClub.name);
        clubWrap.append(clubLink);
        $(".club-list--active").append(clubWrap);
    });
    data.former.forEach(formerClub=>{
        clubWrap = $("<DIV></DIV>").addClass("col");
        clubLink = $("<A></A>").addClass("btn").addClass("btn-outline-dark").addClass("w-100").attr("href","clubs.html?country="+data.country+"&club="+formerClub.code);
        if ( formerClub.missing ) {
            clubLink.addClass("opacity-50");
        }
        clubLink.append(formerClub.name);
        clubWrap.append(clubLink);
        $(".club-list--active").append(clubWrap);
    });
    $("#show-country").removeClass("d-none");
}