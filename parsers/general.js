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
    if ( $("#divisionTables").length !== 0 ) {
        containers.push("#divisionTables");
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

function setTitles(path,page) {
    if ( path.length !== 0 ) {
        $("h1 .eml").html(["European Mega League",...path].join(" / "));
        $("head title").html(["European Mega League",...path,page].join(" / "));
    } else {
        $("h1 .eml").html(["European Mega League"].join(" / "));
        $("head title").html(["European Mega League",page].join(" / "));
    }
    $("h1 .mainTitle").html(page);

}

function getCountry(code) {
    const countries = {
        "alb": "Albania",
        "and": "Andorra",
        "arm": "Armenia",
        "aut": "Austria",
        "aze": "Azerbaijan",
        "bel": "Belgium",
        "bgr": "Bulgaria",
        "bih": "Bosnia and Herzegovina",
        "blr": "Belarus",
        "che": "Switzerland",
        "csk": "Czechoslovakia",
        "cyp": "Cyprus",
        "cze": "Czechia",
        "ede": "East Germany",
        "eir": "Ireland",
        "eng": "England",
        "esp": "Spain",
        "est": "Estonia",
        "deu": "Germany",
        "dnk": "Denmark",
        "fin": "Finland",
        "fra": "France",
        "fro": "Faroe Islands",
        "geo": "Georgia",
        "gib": "Gibraltar",
        "grc": "Greece",
        "hrv": "Croatia",
        "hun": "Hungary",
        "irl": "Republic of Ireland",
        "isl": "Iceland",
        "isr": "Israel",
        "ita": "Italy",
        "kaz": "Kazakhstan",
        "kos": "Kosovo",
        "ltu": "Lithuania",
        "lux": "Luxembourg",
        "lva": "Latvia",
        "mda": "Moldova",
        "mkd": "North Macedonia",
        "mlt": "Malta",
        "mne": "Montenegro",
        "nir": "Northern Ireland",
        "nld": "Netherlands",
        "nor": "Norway",
        "pol": "Poland",
        "prt": "Portugal",
        "pse": "Palestine",
        "rou": "Romania",
        "rus": "Russia",
        "sam": "Serbia and Montegro",
        "sco": "Scotland",
        "smr": "San Marino",
        "sov": "Soviet Union",
        "srb": "Serbia",
        "svk": "Slovakia",
        "svn": "Slovenia",
        "swe": "Sweden",
        "tur": "Turkey",
        "ukr": "Ukraine",
        "wal": "Wales",
        "wde": "West Germany",
        "yug": "Yugoslavia"
    };

    return countries[code.toLowerCase()];
}