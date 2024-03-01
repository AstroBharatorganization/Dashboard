const formatTime = (totalSeconds: number) => {
  if (totalSeconds <= 60) {
    return `${totalSeconds} secs`;
  } else {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} min ${seconds} sec`;
  }
};

const jsonToCsv = (jsonData: any) => {
  let csv = "";

  // Get the headers
  let headers = Object.keys(jsonData[0]);
  csv += headers.join(",") + "\n";

  // Add the data
  jsonData.forEach(function (row: any) {
    let data = headers.map((header) => row[header]).join(",");
    csv += data + "\n";
  });

  return csv;
};

const downloadJSONAsCSV = (jsonData: any) => {
  // Convert JSON data to CSV
  let csvData = jsonToCsv(jsonData);

  // Create a CSV file and allow the user to download it
  let blob = new Blob([csvData], { type: "text/csv" });
  let url = window.URL.createObjectURL(blob);
  let a = document.createElement("a");
  a.href = url;
  a.download = "data.csv";
  document.body.appendChild(a);
  a.click();
};

export { formatTime, jsonToCsv, downloadJSONAsCSV };
