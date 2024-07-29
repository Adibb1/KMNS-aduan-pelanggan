function searchData() {
  // Get the search term from the input box
  var searchTerm = document.getElementById("search-box").value;

  // Check if search term is empty
  if (!searchTerm) {
    // No search term, clear the container and exit
    document.getElementById("data-container").innerHTML = "";
    return;
  }

  // Construct the URL with search parameter
  var url =
    "https://script.google.com/macros/s/AKfycbzU9q9Xc08mIJ8JbrrGuky2lPGCLX1wgJ_AlJ_dIKs-7W-SPPJ9dBqGSjLVX7mqv7GW/exec?search=" +
    searchTerm;
  var container = document.getElementById("data-container");
  var error = document.getElementById("error-message");

  // Fetch data from the Google Apps Script web app
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      // Process and display the data
      if (data.length === 0) {
        error.classList.remove("hidden");
        container.classList.add("hidden");
      } else {
        error.classList.add("hidden");
        container.classList.remove("hidden");

        // Clear previous table content
        container.innerHTML = "";

        var table = document.createElement("table");
        table.classList.add("table-auto", "w-full");

        // Create table header
        var headerRow = document.createElement("tr");
        headerRow.classList.add("table-row");

        var headers = [
          "Bil",
          "Tarikh Terima",
          "Tarikh Tindakan",
          "Nama/kategori Pengadu",
          "PHONENUMBER",
          "Skop/Bahagian",
          "Perihal Aduan",
          "Status Aduan/Catatan",
        ];

        headers.forEach(function (headerText) {
          var headerCell = document.createElement("th");
          headerCell.textContent = headerText;
          headerCell.classList.add(
            "table-cell",
            "font-bold",
            "bg-gray-800",
            "text-white"
          );
          headerRow.appendChild(headerCell);
        });

        table.appendChild(headerRow);

        // Display data rows
        for (var i = 0; i < data.length; i++) {
          var row = document.createElement("tr");
          row.classList.add("table-row"); // Add margin bottom for spacing

          for (var j = 0; j < data[i].length; j++) {
            var cell = document.createElement("td");
            cell.textContent = data[i][j];
            cell.classList.add("table-cell"); // Apply padding class

            // Set green background for the last column
            if (j === data[i].length - 1) {
              cell.style.backgroundColor = "green";
            }

            row.appendChild(cell);
          }

          table.appendChild(row);
        }

        // Append the table to the container
        container.appendChild(table);
      }
    });
}
