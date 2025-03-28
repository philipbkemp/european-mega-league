console.clear();
grabLeague("a");
function grabLeague(div) {
    league = document.querySelectorAll("#league_"+div+" tr");
    division = [];
    league.forEach(row=>{
        cols = row.querySelectorAll("td,th");
        rowObj = {};
        rowObj.place = parseInt(cols[0].textContent);
        rowObj.club = {};
        rowObj.club.country = cols[1].querySelector("img").getAttribute("src").split("/").pop().split(".")[0];
        rowObj.club.id = row.getAttribute("id");
        rowObj.club.name = cols[2].textContent;
        flags = cols[2].querySelectorAll("img");
        if ( flags.length !== 0 || (rowObj.place === 1 && div === "a") ) {
            rowObj.flags = {}
        }
        if (rowObj.place === 1 && div === "a") {
            rowObj.flags.winner = true;
        }
        flags.forEach(f=>{
            flag = f.getAttribute("src").split("/").pop().split(".")[0];
            switch ( flag ) {
                case "trophy": rowObj.flags.domestic_champion = true; break;
                case "new": rowObj.flags.new_club = true; break;
                default: console.error("Unknown flag",flag);
            }
        });
        statInt = ["p","w","d","l","f","a","pts","gd"];
        for ( i=0 ; i!==statInt.length ; i++ ) {
            rowObj[statInt[i]] = parseInt( cols[i+3].textContent );
        }
        statFloat = ["f_p","a_p","win_percent","gd_p","pts_p"];
        for ( i=0 ; i!==statFloat.length ; i++ ) {
            rowObj[statFloat[i]] = parseFloat( cols[i+11].textContent );
        }
        division.push(rowObj);
    });
    console.log('\x1B[40;93;4m     division_'+div+'              \x1B[m');
    out = '';
    for ( i=0 ; i!==division.length ; i++ ) {
        item = division[i];
        out += '\t\t';
        out += JSON.stringify(item);
        if ( i+1 !== division.length ) {
            out += ',\n';
        }
    };
    console.log( out );
}