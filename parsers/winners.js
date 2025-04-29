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

    clubPanel.html("Clubs here");
    countryPanel.html("Countries here");

    $("#theTabContent").append(clubPanel);
    $("#theTabContent").append(countryPanel);

	$(".placeholder-glow").addClass("d-none");
	$(".displayAfterLoad").removeClass("d-none");
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