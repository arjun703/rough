const fs = require('fs');

// Read the content of mapping.json
const mappingContent = fs.readFileSync('mapping.json', 'utf8');

// Parse the JSON content from mapping.json
const mapping = JSON.parse(mappingContent);

// Read the content of merged-data.json
let mergedDataContent = fs.readFileSync('merged-data.json', 'utf8');

// Parse the JSON content from merged-data.json
let mergedData = JSON.parse(mergedDataContent);

// Loop through each key-value pair in the mapping
for (const mappingKey in mapping) {
  if (mapping.hasOwnProperty(mappingKey)) {
    const mappingValue = mapping[mappingKey];

    // Loop through each object in mergedData
    for (const url in mergedData) {
      if (mergedData.hasOwnProperty(url)) {
        const entry = mergedData[url];

        // Check if the "title" attribute contains the mappingKey
        if (entry.body && entry.body.includes(mappingKey)) {
          entry.body = entry.body.replaceAll(mappingKey, mappingValue);
        }

        // Check if the "thumbnail_path" attribute contains the mappingKey
        if (entry.thumbnail_path && entry.thumbnail_path.includes(mappingKey)) {
          entry.thumbnail_path = entry.thumbnail_path.replaceAll(mappingKey, mappingValue);
        }
      }
    }
  }
}

// Convert the modified mergedData back to JSON
const modifiedMergedDataContent = JSON.stringify(mergedData, null, 2);

// Write the modified content back to merged-data.json
fs.writeFileSync('merged-data-modified.json', modifiedMergedDataContent);

console.log('Replacement completed.');