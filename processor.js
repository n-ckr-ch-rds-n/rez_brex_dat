const fs = require('fs');
const cities = require("./cities")

class CSVProcessor {
    constructor(dataFile = "FilletedData.csv", cityMap = cities.cities) {
        this.dataFile = dataFile;
        this.cityMap = cityMap;
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
            return row.map(cell => cell === "" ? "Unknown" : cell)
        })
    }

    filterUnwantedCities(rows, cities) {
        return rows.filter(row => cities.includes(row[2]));
    }

    filterUnknowns(rows) {
        return rows.filter(row => !row.includes("Unknown"));
    }

    async buildCSV() {
        const originalCSV = await this.getData();
        const filtered = this.filterUnwantedCities(originalCSV, this.cityMap);
        const cellsReplaced = this.replaceBlankCells(filtered);
        const noUnknowns = this.filterUnknowns(cellsReplaced);
        return noUnknowns.join("\n");
    }

    async writeCSV() {
        const csv = await this.buildCSV();
        await fs.writeFileSync("data.csv", csv);
    }
}

const csvp = new CSVProcessor();
csvp.writeCSV();
