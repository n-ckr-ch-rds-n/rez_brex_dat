const fs = require('fs');
const cities = require("./cities")

class CSVProcessor {
    async getData() {
        return fs.readFileSync('FilletedData.csv')
            .toString() // convert Buffer to string
            .split('\n') // split string to lines
            .map(e => e.trim()) // remove white spaces for each line
            .map(e => e.split(',').map(e => e.trim())); // split each line to array

    }

    replaceBlankCells(rows) {
        return rows.map(row => {
            return row.map(cell => cell === "" ? "Unknown" : cell)
        })
    }

    filterUnwantedCities(rows, cities) {
        return rows.filter(row => cities.includes(row[2]));
    }


}

const rows = [ [ 'pid', 'ans', 'city', 'deviceType' ],
    [ 'www.birminghampost.co.uk', '', 'Birmingham', 'mobile' ],
    [ 'www.mirror.co.uk', '', '', 'mobile' ],
    [ 'www.chroniclelive.co.uk', '', 'Wallsend', 'mobile' ],
    [ 'www.bristolpost.co.uk', '', 'Bristol', 'mobile' ],
    [ 'www.chroniclelive.co.uk', '', 'Solihull', '' ],
    [ 'www.chroniclelive.co.uk', '', 'Foobar', '' ]
];

const csvp = new CSVProcessor();
console.log(csvp.filterUnwantedCities(rows, cities.cities));

