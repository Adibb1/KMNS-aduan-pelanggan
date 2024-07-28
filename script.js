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
      console.log("test");

      if (data.length === 0) {
        error.classList.remove("hidden");
        container.classList.add("hidden");

        console.log("not match");
      } else {
        error.classList.add("hidden");
        container.classList.remove("hidden");
        console.log("match");
        // Clear previous table content
        container.innerHTML = "";

        var table = document.createElement("table");
        table.classList.add(
          "table-auto",
          "w-full",
          "sm:overflow-x-auto",
          "flex",
          "item-center"
        ); // Set table styles

        // Display data rows
        for (var i = 0; i < data.length; i++) {
          console.log("print");
          var row = document.createElement("tr");
          row.classList.add("flex", "item-center");

          // Create a container element for horizontal layout
          var rowContainer = document.createElement("div");
          rowContainer.classList.add("row-container", "flex", "item-center"); // Add a custom class for styling

          for (var j = 0; j < data[i].length; j++) {
            console.log("print2");
            var cell = document.createElement("td");
            cell.textContent = data[i][j];

            // Apply horizontal styling to cells
            cell.classList.add("horizontal-cell");

            // Set green background for the last column
            if (j === data[i].length - 1) {
              cell.style.backgroundColor = "green";
            }

            rowContainer.appendChild(cell);
          }

          // Append the row (with cells) to the container
          row.appendChild(rowContainer);

          // Append the container (with horizontal row) to the table
          table.appendChild(row);
        }

        // Append the table to the container
        container.appendChild(table);
        console.log("print3");
        // Add wrapper element with maximum height and overflow (if needed)
        var tableWrapper = document.createElement("div");
        tableWrapper.classList.add(
          "h-60",
          "w-72",
          "md:w-[100%]",
          "overflow-auto",
          "flex",
          "justify-center",
          "item-center"
        ); // Adjust height as needed

        tableWrapper.appendChild(table);
        container.appendChild(tableWrapper);
      }
    });
}
