const showTable = document.getElementById("show-info-table");
function pullData(url) {

      fetch(url)
        .then(response => response.json())
        .then(data => renderShowtimes(data))
        .catch((err) => console.log(err));

  }
function renderShowtimesToDOM(obj) {

  
  //create elements
  const row = document.createElement("tr");
  const dateHeading = document.createElement("th");
  const locationHeading = document.createElement("th");
  const buttonHeading = document.createElement("th");
  const dateHold = document.createElement("h4");
  const placeHold = document.createElement("p");
  const locationHold = document.createElement("h4");
  const showbutton = document.createElement("button");

  //add classes
  row.className = "show-info-table__row";
  dateHeading.className = "show-info-table__date-heading";
  locationHeading.className = "show-info-table__location-heading";
  dateHold.className = "show-info-table__show-item--date";
  placeHold.className = "show-info-table__show-item--place";
  locationHold.className = "show-info-table__location";
  buttonHeading.className = "show-info-table__button-heading";
  showbutton.className = "show-info-table__show-item--button";

  //add inner text to elements/
  dateHold.innerHTML = obj.date;
  placeHold.innerHTML = obj.place;
  locationHold.innerHTML = obj.location;
  showbutton.innerHTML = "GET TICKETS";
  //append children
  dateHeading.appendChild(dateHold);
  dateHeading.appendChild(placeHold);
  locationHeading.appendChild(locationHold);
  buttonHeading.appendChild(showbutton);
  row.appendChild(dateHeading);
  row.appendChild(locationHeading);
  row.appendChild(buttonHeading);
  showTable.appendChild(row);
}

function renderShowtimes(data) {
  while (showTable.firstChild) {
    showTable.removeChild(showTable.firstChild);
  }
  console.log(data);
  
  data.forEach(element => {
    renderShowtimesToDOM(element);
  });
}
pullData('https://project-1-api.herokuapp.com/showdates?api_key=JakeLewochko');