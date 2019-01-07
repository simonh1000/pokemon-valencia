const fs = require("fs");

const data = fs.readFileSync("./gyms.tsv", "utf-8").split("\n");

fs.writeFileSync("./gyms.json", JSON.stringify(convertToJson(data)));
fs.writeFileSync("./gyms.csv", convertToCsv(data));

function convertToCsv(lst) {
    return "name, lat, lng\n" + lst.reduce(convertRowCsv, "");
}

function convertRowCsv(acc, s) {
    const elems = s.split("\t");
    if (elems[1]) {
      return (acc + `${elems[0]}, ${elems[1]}, ${elems[2]}\n`);
    } else {
        return acc;
    }
  }
  
// JSON 
function convertToJson(lst) {
  return lst.reduce(convertRowJson, {});
}

function convertRowJson(acc, s) {
  const elems = s.split("\t");
  if (elems[1]) {
    acc[elems[0]] = {
      lat: parseFloat(elems[1]),
      lng: parseFloat(elems[2])
    };
  }
  return acc;
}
