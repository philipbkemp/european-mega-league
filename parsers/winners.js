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

    clubTable = $("<TABLE></TABLE>").addClass("table").addClass("table-hover").addClass("table-sm").attr("id","winners--club");
    clubHead = $("<THEAD></THEAD>");
    clubHeadRow = $("<TR></TR>")
        .append( $("<TH></TH>").attr("scope","col").addClass("d-none").addClass("d-sm-table-cell").html("") )
        .append( $("<TH></TH>").attr("scope","col").html("") )
        .append( $("<TH></TH>").attr("scope","col").html("Team") )
        .append( $("<TH></TH>").attr("scope","col").html("Titles") )
        .append( $("<TH></TH>").attr("scope","col").addClass("d-none").addClass("d-sm-table-cell").html("") )
        ;
    clubHead.append(clubHeadRow);
    clubTable.append(clubHead);
    clubBody = $("<TBODY></TBODY>");
    console.log(data);
    clubTable.append(clubBody);
    clubPanel.append(clubTable);
/*<table class="table table-hover table-sm" id="club-winners">
						<thead>
							<tr>
								<th scope="col" class="d-none d-sm-table-cell"></th>
								<th scope="col"></th>
								<th scope="col">Team</th>
								<th scope="col">Titles</th>
								<th scope="col" class="d-none d-sm-table-cell"></th>
							</tr>
						</thead>
						<tbody>
							
							<tr id="linfield_fc"><td class="d-none d-sm-table-cell">1</td><td><img src="flags/EIR.png" alt="Ireland" data-bs-toggle="tooltip" data-bs-title="Ireland"><img class="ms-1" src="flags/NIR.png" alt="Northern Ireland" data-bs-toggle="tooltip" data-bs-title="Northern Ireland"></td><th><a href="clubs/nir/linfield_fc.html">Linfield</a></th><td class="text-center">6</td><td class="d-none d-sm-table-cell"><a href="18/9/1-92.html" class="me-2">1891-92</a><a href="19/0/3-04.html" class="me-2">1903-04</a><a href="19/5/5-56.html" class="me-2">1955-56</a><a href="19/7/0-71.html" class="me-2">1970-71</a><a href="19/7/7-78.html" class="me-2">1977-78</a><a href="19/8/3-84.html" class="me-2">1983-84</a></td></tr>
							<tr id="knattspyrnufelagio_fram"><td class="d-none d-sm-table-cell">2</td><td><img src="flags/ISL.png" alt="Iceland" data-bs-toggle="tooltip" data-bs-title="Iceland"></td><th><a href="clubs/isl/knattspyrnufelagio_fram.html">Fram</a></th><td class="text-center">6</td><td class="d-none d-sm-table-cell"><a href="19/1/5-16.html" class="me-2">1915-16</a><a href="19/1/7-18.html" class="me-2">1917-18</a><a href="19/1/8-19.html" class="me-2">1918-19</a><a href="19/2/1-22.html" class="me-2">1921-22</a><a href="19/2/2-23.html" class="me-2">1922-23</a><a href="19/2/3-24.html" class="me-2">1923-24</a></td></tr>
                            </tbody>
						</table>*/

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