const fs = require("fs");
const xml2js = require("xml2js");
const path = require('node:path')

// Function to read and parse the .resx file
var parseResxFile = function() {
    
    // Path to the .resx file
    const filePath = path.resolve(__dirname,"content/StaticTextResource.resx"); 


    return new Promise((resolve, reject) => {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) return reject(err);

            // Parse XML to JSON
            xml2js.parseString(data, { explicitArray: false }, (err, result) => {
                if (err) return reject(err);

                // Extract data from the resx file
                const resources = result.root.data || [];
                const formattedResources = resources.map((item) => ({
                    key: item.$.name,
                    value: item.value,
                }));

                resolve(formattedResources);
            });
        });
    });
}

module.exports = parseResxFile;

// Example usage
// parseResxFile()
//     .then((data) => {
//         console.log("Parsed Data:", data);
//     })
//     .catch((err) => console.error("Error parsing .resx file:", err));