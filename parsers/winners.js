$(document).ready(function(){

	$.ajax({
        url: "data/winners.json",
        success: function(data) {
            parseWinners(data);
        }
    });

});

function parseWinners(data) {
    $("#theTabs").append(buildTabButton("clubs","Clubs",true));
    $("#theTabs").append(buildTabButton("countries","Countries"));

    clubPanel = buildTabPanel("clubs",true);
    countryPanel = buildTabPanel("countries");

    countryPanel.html("Countries here");

    clubTable = $("<TABLE></TABLE>").addClass("table").addClass("table-hover").addClass("table-sm").attr("id","winners--club");
    clubHead = $("<THEAD></THEAD>");
    clubHeadRow = $("<TR></TR>")
        .append( $("<TH></TH>").attr("scope","col").addClass("d-none").addClass("d-sm-table-cell").html("") )
        .append( $("<TH></TH>").attr("scope","col").html("") )
        .append( $("<TH></TH>").attr("scope","col").html("Team") )
        .append( $("<TH></TH>").attr("scope","col").addClass("text-center").html("Titles") )
        .append( $("<TH></TH>").attr("scope","col").addClass("d-none").addClass("d-sm-table-cell").html("") )
        ;
    clubHead.append(clubHeadRow);
    clubTable.append(clubHead);
    clubBody = $("<TBODY></TBODY>");
    rowNum = 1;
    data.winners.forEach(club=>{
        thisRow = $("<TR></TR>").attr("id",club.club);

        thisPos = $("<TD></TD>").addClass("d-none").addClass("d-sm-table-cell").html(rowNum);
        thisRow.append(thisPos);

        thisCountry = $("<TD></TD>");
        thisClub = $("<TH></TH>").attr("scope","row");
        if ( ! Array.isArray(club.country) ) {
            thisCountry.append(
                $("<IMG />")
                    .attr("src","flags/"+club.country+".png")
                    .attr("alt",allCountries[club.country])
                    .attr("data-bs-toggle","tooltip")
                    .attr("data-bs-title",allCountries[club.country])
            );
            thisClub.append(
                $("<A></A>").attr("href","club.html?country="+club.country+"&club="+club.club).html(club.name)
            );
        } else {
            club.country.forEach(c=>{
                thisCountry.append(
                    $("<IMG />")
                        .attr("src","flags/"+c+".png")
                        .attr("alt",allCountries[c])
                        .attr("data-bs-toggle","tooltip")
                        .attr("data-bs-title",allCountries[c])
                );
            });
            thisClub.append(
                $("<A></A>").attr("href","club.html?country="+club.country_link+"&club="+club.club).html(club.name)
            );
        }
        thisRow.append(thisCountry);
        thisRow.append(thisClub);

        thisCount = $("<TD></TD>").addClass("text-center").html(club.count);
        thisRow.append(thisCount);

        thisYears = $("<TD></TD>").addClass("d-none").addClass("d-sm-table-cell");
        if ( ! Array.isArray(club.country) ) {
            club.years.forEach(yr=>{
                thisYears.append(
                    $("<A></A>").attr("href","season.html?season="+yr).html(yr)
                );
            });
        } else {
            club.country.forEach(c=>{
                club["years_"+c.toLowerCase()].forEach(yr=>{
                    thisYears.append(
                        $("<A></A>").attr("href","season.html?season="+yr).html(yr)
                    );
                });
            });
        }
        thisRow.append(thisYears);

        clubBody.append(thisRow);
        rowNum++;
    });
    clubTable.append(clubBody);
    clubPanel.append(clubTable);

    $("#theTabContent").append(clubPanel);
    $("#theTabContent").append(countryPanel);

	$(".placeholder-glow").addClass("d-none");
	$(".displayAfterLoad").removeClass("d-none");
    goTootlip();
}



function buildTabButton(code,label,active=false,missing=false) {
	tabBtn = $("<LI></LI>")
		.addClass("nav-item")
		.attr("role","presentation")
		;
	
	tabBtnBtn = $("<BUTTON></BUTTON>")
		.addClass("nav-link")
		.attr("id",code+"-tab")
		.attr("data-bs-toggle","tab")
		.attr("data-bs-target","#"+code+"-tab-pane")
		.attr("type","button")
		.attr("role","tab")
		.attr("aria-controls",code+"-tab-pane")
		.html(label)
		;

	if ( missing ) {
		tabBtnBtn.addClass("opacity-25");
	}

	if ( active ) {
		tabBtnBtn
			.addClass("active")
			.attr("aria-selected","true")
			;
	}

	tabBtn.append(tabBtnBtn);

	return tabBtn;
}

function buildTabPanel(code,active=false) {
	panel = $("<DIV></DIV>")
		.addClass("tab-pane")
		.addClass("fade")
		.addClass("pt-4")
		.addClass("tab-pane__"+code)
		.attr("id",code+"-tab-pane")
		.attr("role","tabpanel")
		.attr("aria-labelledby",code+"-tab")
		.attr("tabindex",0)
		;
	
	if ( active ) {
		panel
			.addClass("show")
			.addClass("active")
			;
	}

	return panel;
}