history.scrollRestoration = 'manual';

allCountries = {
    "ALB": "Albania",
    "AND": "Andorra",
    "AUT": "Austria",
    "BEL": "Belgium",
    "BGR": "Bulgaria",
    "CSK": "Czechoslovakia",
    "CYP": "Cyprus",
    "DEU": "Germany",
    "DNK": "Denmark",
    "EDE": "East Germany",
    "EIR": "Ireland",
    "ENG": "England",
    "EST": "Estonia",
    "FRO": "Faroe Islands",
    "GIB": "Gibraltar",
    "GRC": "Greece",
    "HRV": "Croatia",
    "HUN": "Hungary",
    "ISL": "Iceland",
    "LUX": "Luxembourg",
    "LVA": "Latvia",
    "MLT": "Malta",
    "NIR": "Northern Ireland",
    "NLD": "Netherlands",
    "PRT": "Portugal",
    "ROU": "Romania",
    "SCO": "Scotland",
    "SRB": "Serbia",
    "SWE": "Sweden",
    "TUR": "Turkey",
    "UKR": "Ukraine",
    "WAL": "Wales"
};

function goTootlip() {
    containers = [];

    if ( $("#tabContent").length !== 0 ) {
        containers.push("#tabContent");
    }
    if ( $(".country-list").length !== 0 ) {
        containers.push(".country-list");
    }

    if ( containers.length !== 0 ) {
        $('[data-bs-toggle="tooltip"]').tooltip({
            container: containers.join(", "),
            html: true
        });
    }
}

urlParams = {};
function checkParams(required=[]) {
	paramsOk = true;

	queryString = window.location.search.replace("?","");
	if ( queryString === "" ) {
		if ( required.length !== 0 ) {
			invalid();
			return false;
		}
	}
	queryArray = queryString.split("&");
	queryArray.forEach(q=>{
		key = q.split("=")[0];
		value =  q.split("=")[1];
		urlParams[key] = value;
	});
	
	required.forEach(q=>{
		if ( ! urlParams[q] || urlParams[q] === "" ) {
			invalid();
			paramsOk = false;
		}
	});

	return paramsOk;
}