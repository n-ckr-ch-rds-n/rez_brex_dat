const fs = require('fs');
const cities = require("./cities")

class CSVProcessor {
    async getData() {
        return fs.readFileSync('FilletedData.csv')
            .toString()
            .split('\n')
            .map(e => e.trim())
            .map(e => e.split(',').map(e => e.trim()));

    }

    replaceBlankCells(rows) {
        return rows.map(row => {
            return row.map(cell => cell === "" ? "Unknown" : cell)
        })
    }

    filterUnwantedCities(rows, cities) {
        return rows.filter(row => cities.includes(row[2]));
    }

    async buildCSV() {
        const originalCSV = await this.getData();
        const filtered = this.filterUnwantedCities(originalCSV, cities.cities);
        const cellsReplaced = this.replaceBlankCells(filtered);
        return cellsReplaced.join("\n");
    }

    async writeCSV() {
        const csv = await this.buildCSV();
        await fs.writeFileSync("data.csv", csv);
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
csvp.writeCSV();
