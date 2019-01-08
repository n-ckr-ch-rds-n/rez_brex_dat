const fs = require('fs');

class CSVProcessor {
    constructor(dataFile = "fitbitdata.csv") {
        this.dataFile = dataFile;
        this.cityIndex = 0;
        this.cityCount = 50;
    }

    async getData() {
        return fs.readFileSync(this.dataFile)
            .toString()
            .split('\n')
            .map(e => e.trim())
            .map(e => e.split(',').map(e => e.trim()));

    }

    replaceBlankCells(rows) {
        return rows.map(row => {
            return row
                .map(cell => cell.replace(/"/gi, ""))
                .map(cell => cell === "" ? "Unknown" : cell)
        })
    }

    filterUnwantedCities(rows, cities) {
        return rows.filter(row => cities.includes(row[this.cityIndex]));
    }

    //
    // filterUnknowns(rows) {
    //     return rows.filter(row => !row.includes("Unknown"));
    // }

    getCities(rows) {
        let cities = {};
        for (const row of rows) {
            cities[row[this.cityIndex]] = 0
        }
        return cities;
    }

    getAnswerCountByCity(rows) {
       const cities = this.getCities(rows);
       for (const row of rows) {
           cities[row[this.cityIndex]] += 1;
       }
       return cities;
    }

    getTopCities(rows, number) {
        const answerCountByCity = this.getAnswerCountByCity(rows);
        const sortedCities = Object.entries(answerCountByCity)
            .sort((a, b) => a[1] - b[1])
            .reverse()
            .map(cityCount => cityCount[0]);
        return sortedCities.filter(city => sortedCities.indexOf(city) < number);
    }

    async buildCSV() {
        const originalCSV = await this.getData();
        const blankCellsReplaced = this.replaceBlankCells(originalCSV);
        const topCities = this.getTopCities(blankCellsReplaced, this.cityCount);
        const filteredByCity = this.filterUnwantedCities(blankCellsReplaced, topCities);
        return filteredByCity.join("\n");
    }

    async writeCSV() {
        const csv = await this.buildCSV();
        await fs.writeFileSync("data.csv", csv);
    }
}

const csvp = new CSVProcessor();
const rows = [ [ 'city', 'pid', 'deviceType', 'ans' ],
    [ 'Hereford', 'www.horseandhound.co.uk', 'mobile', '1' ],
    [ 'Upper Beeding', 'www.whathifi.com', 'tablet', '0' ],
    [ 'Upper Beeding', 'www.whathifi.com', 'tablet', '0' ],
    [ 'Upper Beeding', 'www.whathifi.com', 'tablet', '0' ],
    [ 'Cardiff', 'www.independent.co.uk', 'tablet', '2' ],
    [ 'Norwich', 'www.pbo.co.uk', 'mobile', '2' ],
    [ 'Norwich', 'www.pbo.co.uk', 'mobile', '2' ],
    [ 'Brierley Hill', 'www.horseandhound.co.uk', 'mobile', '1' ]];

csvp.writeCSV();