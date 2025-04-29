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
	$('[data-bs-toggle="tooltip"]').tooltip({
		container: '#theTabContent',
		html: true
	});
}