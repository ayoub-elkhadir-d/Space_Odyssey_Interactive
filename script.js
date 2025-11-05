// Array of space mission objects, each containing details like ID, favorite status, name, agency, objective, launch date, and image URL.
var missions = 
  [
    {
        id: 1,
        in_favorite: 0,
        name: "Sputnik 1",
        agency: "USSR",
        objective: "Premier satellite artificiel en orbite terrestre",
        launchDate: "1957-10-04",
        image: "https://th.bing.com/th/id/OIP.GLuvBP-uer-79BcQHcWCiQHaFA?w=276&h=187&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"
    },
    {
        id: 2,
        in_favorite: 0,
        name: "Voyager 1",
        agency: "NASA",
        objective: "Exploration du système solaire externe",
        launchDate: "1977-09-05",
        image: "images/voyager1.png"
    },
    {
        id: 3,
        in_favorite: 1,
        name: "Explorer 1",
        agency: "NASA",
        objective: "Premier satellite américain pour détecter les ceintures de Van Allen",
        launchDate: "1958-01-31",
        image: "https://th.bing.com/th/id/R.ddeef98ff46b89ac2a9e373ac8814ce1?rik=oizcTF39QVYj%2bA&pid=ImgRaw&r=0"
    },
    {
        id: 4,
        in_favorite: 0,
        name: "Vostok 1",
        agency: "USSR",
        objective: "Premier vol spatial habité autour de la Terre",
        launchDate: "1961-04-12",
        image: "https://cdnb.artstation.com/p/assets/images/images/008/331/651/large/bakhytzhan-shabdukarimov-new-demo-5-vostok.jpg?1512057321"
    },
    {
        id: 5,
        in_favorite: 1,
        name: "Apollo 11",
        agency: "NASA",
        objective: "Premier alunissage habité",
        launchDate: "1969-07-16",
        image: "https://media.defense.gov/2019/Jul/22/2002159803/1920/1080/0/190722-D-D0441-001.JPG"
    },
    {
        id: 6,
        in_favorite: 0,
        name: "Hubble Space Telescope",
        agency: "NASA/ESA",
        objective: "Observatoire spatial pour l'astronomie en lumière visible et ultraviolette",
        launchDate: "1990-04-24",
        image: "https://www.sun.org/uploads/images/James_Webb_Space_Telescope.jpg"
    },
    {
        id: 7,
        in_favorite: 1,
        name: "Cassini",
        agency: "NASA",
        objective: "Exploration détaillée du système de Saturne",
        launchDate: "1997-10-15",
        image: "https://cdn.mos.cms.futurecdn.net/sDD5eSNXjwRMtcdAkdzWVW.jpg"
    },
    {
        id: 8,
        in_favorite: 0,
        name: "Curiosity",
        agency: "NASA",
        objective: "Exploration du cratère Gale sur Mars",
        launchDate: "2011-11-26",
        image: "images/curiosity.png"
    },
    {
        id: 9,
        in_favorite: 1,
        name: "Juno",
        agency: "NASA",
        objective: "Étude de l'atmosphère et de la magnétosphère de Jupiter",
        launchDate: "2011-08-05",
        image: "https://tse2.mm.bing.net/th/id/OIP.gKX2NGtJVJ3IGaFbjLR-AgHaFj?rs=1&pid=ImgDetMain&o=7&rm=3"
    },
    {
        id: 10,
        in_favorite: 0,
        name: "Perseverance",
        agency: "NASA",
        objective: "Recherche de signes de vie ancienne sur Mars",
        launchDate: "2020-07-30",
        image: "images/perseverance.png"
    },
    {
        id: 11,
        in_favorite: 1,
        name: "James Webb Space Telescope",
        agency: "NASA",
        objective: "Observatoire infrarouge pour étudier l'univers primordial",
        launchDate: "2021-12-25",
        image: "https://www.sun.org/uploads/images/James_Webb_Space_Telescope.jpg"
    },
    {
        id: 12,
        in_favorite: 0,
        name: "Artemis I",
        agency: "NASA",
        objective: "Test du système de lancement SLS et du vaisseau Orion",
        launchDate: "2022-11-16",
        image: "images/artemis.png"
    }
  
];

// DOM elements for UI components: popup for favorites, missions container, title label, buttons, search input, favorite logo, filter button, filter container, agency/date selects, and alert element.
var containerFv = document.getElementById("popup_fv");
var containerMissions = document.getElementById("misions_div");
var labelTitle = document.getElementById("labell");
var buttonCancel = document.getElementById("button_cancel");
var buttonAdd = document.getElementById("button_add");
var searchInput = document.getElementById("search");
var favLogo = document.getElementById("fav_logo");
var buttonFilter = document.getElementById("filter");
var filterContainer = document.getElementById("filter_container");
var selectAgency = document.getElementById("select_2");
var selectDate = document.getElementById("select_3");
var alert_ch = document.getElementById("alert_show_");

// Global variables to track current search term, agency filter, date filter, and filter visibility state.
var currentSearch = "";
var currentAgency = "";
var currentDate = "";
var isFilterVisible = false;

// Function to display a temporary alert message with a specified color (e.g., green for success, red for error).
function alert_message(message,color_){
  // Get alert container and message element.
  const  alert_var =document.getElementById("alert__")
  const  h1_msg_ =document.getElementById("h1_msg")
  // Show alert with styling and transition.
  alert_var.style.display="flex"
  alert_var.style.height="50px"
  alert_var.style.backgroundColor =color_
  alert_var.style.transition="3s";

  h1_msg_.innerHTML = message
  // Hide alert after 2 seconds.
  setTimeout(function(){
    alert_var.style.display="none"
  },2000);

}

// Function to generate and append HTML for displaying missions based on type (single mission, single favorite, or all missions).
function displayMissions(index, type, content, container_) {
    // Display a single mission card in the main view.
    if (type == "one") {
        var isFavorite = missions[index].in_favorite == 1 ? "active" : "";
        var favoriteStyle = missions[index].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); width: 26px;"' : '';
        // HTML template for a standard mission card with edit, delete, and favorite buttons.
        var cardHtml = '<div class="mission_card"><div class="mission_card-content"><div class="buttons-container"><button class="edit" onclick="edit(' + index + ')"></button><button class="delete" onclick="deleteMission(' + index + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + index + '" onclick="toggleFavorite(' + index + ')" ' + favoriteStyle + '></button></div><img class="misions_img" src="' + missions[index].image + '" alt=""><h2>' + missions[index].name + '</h2><h3 class="agency">' + missions[index].agency + '</h3><p class="description">' + missions[index].objective + '</p><span class="date">' + missions[index].launchDate + '</span></div></div>';
        container_.style.display = "flex";
        container_.innerHTML = container_.innerHTML + cardHtml;
    }

    // Display a single mission card in the favorites popup (compact style).
    if (type == "one_fvavorit") {
        var isFavorite = missions[index].in_favorite == 1 ? "active" : "";
        var favoriteStyle = missions[index].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); width: 26px;"' : '';
        // HTML template for a compact favorite mission card with side-by-side image and details.
        var cardHtml = '<div class="mission_card" style="height: fit-content"><div class="mission_card-content" style="padding: 5px;"><div class="buttons-container"><button class="edit" onclick="edit(' + index + ')"></button><button class="delete" onclick="deleteMission(' + index + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + index + '" onclick="toggleFavorite(' + index + ')" ' + favoriteStyle + '></button></div><div style="display: flex; gap: 10px;"><img class="misions_img" src="' + missions[index].image + '" alt="" style="width: 100px; height: 100px;"><div><h2 style="margin: 5px">' + missions[index].name + '</h2><h3 class="agency" style="margin: 5px">' + missions[index].agency + '</h3><p class="description" style="margin: 5px">' + missions[index].objective + '</p><span class="date">' + missions[index].launchDate + '</span></div></div></div></div>';
        container_.style.display = "flex";
        container_.innerHTML = container_.innerHTML + cardHtml;
    }

    // Display all missions as cards in the container.
    if (type == "all") {
        var allHtml = "";
        // Loop through all missions and build HTML for each.
        for (var t = 0; t < missions.length; t++) {
            var isFavorite = missions[t].in_favorite == 1 ? "active" : "";
            var favoriteStyle = missions[t].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png);"' : '';
            // Append standard mission card HTML to the full list.
            allHtml = allHtml + '<div class="mission_card"><div class="mission_card-content"><div class="buttons-container"><button class="edit" onclick="edit(' + t + ')"></button><button class="delete" onclick="deleteMission(' + t + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + t + '" onclick="toggleFavorite(' + t + ')" ' + favoriteStyle + '></button></div><img class="misions_img" src="' + missions[t].image + '" alt=""><h2>' + missions[t].name + '</h2><h3 class="agency">' + missions[t].agency + '</h3><p class="description">' + missions[t].objective + '</p><span class="date">' + missions[t].launchDate + '</span></div></div>';
        }
        container_.style.display = "flex";
        container_.innerHTML = allHtml;
    }

    // Append custom content to the favorites container if provided.
    // إضافة محتوى مخصص للمفضلات
    if (content != undefined && containerFv) {
        containerFv.style.display = "flex";
        containerFv.innerHTML = containerFv.innerHTML + content;
    }
}

// Function to apply current search and filter criteria to display filtered missions.
function applyDisplay() {
    // Hide favorites popup if it's visible and clear its content.
    if (containerFv && window.getComputedStyle(containerFv).display != "none") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    // Clear and show main missions container.
    containerMissions.innerHTML = "";
    containerMissions.style.display = "flex";

    var count = 0;
    var searchTerm = currentSearch.toLowerCase();
    var isSearching = currentSearch != "";
    var isFiltering = currentAgency != "" || currentDate != "";
    // Loop through missions and check if they match filters and search.
    for (var i = 0; i < missions.length; i++) {
        var m = missions[i];
        // Check if mission matches agency and date filters.
        var matchesFilter = (currentAgency == "" || m.agency == currentAgency) && (currentDate == "" || m.launchDate == currentDate);
        if (!matchesFilter) continue;
        // Check if mission matches search term in name, agency, objective, or date.
        var matchesSearch = !isSearching ||
            m.name.toLowerCase().indexOf(searchTerm) != -1 ||
            m.agency.toLowerCase().indexOf(searchTerm) != -1 ||
            m.objective.toLowerCase().indexOf(searchTerm) != -1 ||
            m.launchDate.indexOf(searchTerm) != -1;
        if (matchesSearch) {
            displayMissions(i, "one", undefined, containerMissions);
            count++;
        }
    }
    // Set title based on search/filter state or no results.
    var title;
    if (count == 0 && (isSearching || isFiltering)) {
        title = "No Results Found";
    } else if (isSearching) {
        title = "Result Search";
    } else if (isFiltering) {
        title = "Filter";
    } else {
        title = "Missions";
    }
    labelTitle.innerHTML = title;
    // Show/hide cancel button based on active search/filter.
    if (isSearching || isFiltering) {
        buttonCancel.style.visibility = "visible";
    } else {
        buttonCancel.style.visibility = "hidden";
    }
}

// Function to reset all filters and search, then re-display all missions.
function showAll() {
    currentSearch = "";
    currentAgency = "";
    currentDate = "";
    searchInput.value = "";
    selectAgency.value = "";
    selectDate.value = "";
    applyDisplay();
    // Restore filter container visibility if it was open.
    if (filterContainer) filterContainer.style.display = isFilterVisible ? "flex" : "none";
}

// Function to populate agency and date dropdown filters with unique values from missions.
function setupFilters() {
    if (selectAgency) selectAgency.innerHTML = '<option value="">All Agencies</option>';
    if (selectDate) selectDate.innerHTML = '<option value="">All Dates</option>';
    // Loop through missions to add unique agency and date options.
    for (var i = 0; i < missions.length; i++) {
        var agencyOption = '<option value="' + missions[i].agency + '">' + missions[i].agency + '</option>';
        // Avoid duplicates by checking if option already exists.
        if (selectAgency.innerHTML.indexOf(agencyOption) == -1) {
            selectAgency.innerHTML = selectAgency.innerHTML + agencyOption;
        }
        var dateOption = '<option value="' + missions[i].launchDate + '">' + missions[i].launchDate + '</option>';
        // Avoid duplicates for dates.
        if (selectDate.innerHTML.indexOf(dateOption) == -1) {
            selectDate.innerHTML = selectDate.innerHTML + dateOption;
        }
    }
}
// Initialize filters on page load.
setupFilters();

// Function to toggle between showing all missions and only favorites in a popup.
function displayFavorites() {
    // Check if favorites popup is currently visible.
    var isVisible = containerFv && window.getComputedStyle(containerFv).display != "none";
    containerFv.style.transition="2s" ;
    if (isVisible) {
        // Hide favorites and show all missions.
        if (containerFv) {
            containerFv.style.display = "none";
            containerFv.innerHTML = "";
        }
        showAll();
        labelTitle.innerHTML = "Missions";
        containerMissions.style.display = "flex";
    } else {
        // Hide main missions and show favorites.
        containerMissions.style.display = "none";
        if (containerFv) containerFv.innerHTML = "";
        labelTitle.innerHTML = "Favorites";

        var hasFavorites = false;
        // Loop to display only favorite missions in compact format.
        for (var i = 0; i < missions.length; i++) {
            if (missions[i].in_favorite == 1) {
                displayMissions(i, "one_fvavorit", undefined, containerFv);
                hasFavorites = true;
            }
        }

        // Handle case with no favorites.
        if (!hasFavorites) {
            labelTitle.innerHTML = "No Favorites Found";
            if (containerFv) {
                containerFv.innerHTML = '<p style="color: white; text-align: center;">No favorites yet.</p>';
            }
        }

        if (containerFv) containerFv.style.display = "flex";
    }
}

// Function to close edit or add overlay and reset to all missions view.
function closeEditOrAdd() {
    var overlay = document.getElementById("edit_overlay") || document.getElementById("add_overlay");
    if (overlay) overlay.remove();
    containerMissions.innerHTML = "";
    showAll();
    labelTitle.innerHTML = "Missions";
    buttonCancel.style.visibility = "hidden";
}

// Function to generate and display the edit form overlay for a specific mission.
function displayEdit(index) {
    // Hide favorites if visible.
    if (containerFv && containerFv.style.display == "flex") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    // Restore filter visibility.
    if (filterContainer) filterContainer.style.display = isFilterVisible ? "flex" : "none";

    var mission = missions[index];
    var isFavorite = mission.in_favorite == 1 ? "active" : "";
    var favoriteStyle = mission.in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); background-size: cover;"' : '';
    // HTML template for edit overlay with pre-filled form fields.
    var editHtml = '<div id="edit_overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: flex; justify-content: center; align-items: center;"><div class="mission_card mission_card_edit" id="edit_card" style="position: relative; max-width: 400px; width: 90%; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000;"><div class="container_label_button"><h1 class="label_edit">Edit Mission</h1><button id="button_cancel_edit" class="button_" onclick="closeEditOrAdd()" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Cancel</button></div><div class="choix_et_menu_div"></div><img class="misions_img" src="' + mission.image + '" alt=""><input type="text" id="input_name" value="' + mission.name + '"><input type="text" id="input_agency" value="' + mission.agency + '"><input type="text" id="input_objective" value="' + mission.objective + '"><input type="date" id="input_date" value="' + mission.launchDate + '"><input type="url" id="input_image" value="' + mission.image + '" placeholder="Enter image URL (optional)"><button id="submit" onclick="save(' + index + ')" style="align-self: center;">Save</button></div></div></div>';
    containerMissions.innerHTML = editHtml;
    containerMissions.style.display = "flex";
    containerMissions.style.position = "relative";
}

// Wrapper function to open the edit form for a mission by index.
function edit(index) {
    displayEdit(index);
    if (containerFv) containerFv.innerHTML = "";
}

// Function to close the add mission overlay.
function cancelAddMission() {
    closeEditOrAdd();
}

// Event listener for the add button: shows the add mission form if not already open.
buttonAdd.addEventListener("click", function () {
    // Hide favorites if visible.
    if (containerFv && window.getComputedStyle(containerFv).display != "none") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }

    var addCard = document.getElementById("add_card");
    if (addCard) {
        // If already open, close it.
        cancelAddMission();
        return;
    }

    containerMissions.innerHTML = "";
    labelTitle.innerHTML = "Add Mission";
    buttonCancel.style.visibility = "visible";

    // HTML template for add overlay with empty form fields.
    var addHtml = '<div id="add_overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: flex; justify-content: center; align-items: center;"><div class="mission_card mission_card_edit add" id="add_card" style="position: relative; max-width: 400px; width: 90%; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000;"><div class="container_label_button"><h1 class="label_add">Add Mission</h1><button id="button_cancel_add" class="button_" onclick="cancelAddMission()" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Cancel</button></div><input type="text" id="input_name_add" placeholder="Enter name" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="text" id="input_agency_add" placeholder="Enter agency" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="text" id="input_objective_add" placeholder="Enter objective" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="date" id="input_date_add" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="url" id="input_image_add" placeholder="Enter image URL (optional)" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><button id="submit_add" onclick="submitNewMission()" style="width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">Save</button></div></div>';
    containerMissions.innerHTML = addHtml;
    containerMissions.style.display = "flex";
    containerMissions.style.position = "relative";

    // Focus on the name input for better UX.
    var inputName = document.getElementById("input_name_add");
    if (inputName) inputName.focus();
});

// Function to validate and add a new mission from the add form.
function submitNewMission() {
    var overlay = document.getElementById("add_overlay");
    var inputName = document.getElementById("input_name_add");
    var inputAgency = document.getElementById("input_agency_add");
    var inputObjective = document.getElementById("input_objective_add");
    var inputDate = document.getElementById("input_date_add");
    var inputImage = document.getElementById("input_image_add");

    // Trim input values.
    var nameVal = inputName.value.trim();
    var agencyVal = inputAgency.value.trim();
    var objectiveVal = inputObjective.value.trim();
    var dateVal = inputDate.value;
    var imageVal = inputImage ? inputImage.value.trim() : "";

    // Validate required fields.
    if (nameVal && agencyVal && objectiveVal && dateVal) {
        // Create new mission object with default image if none provided.
        var newMission = {
            id: missions.length + 1,
            in_favorite: 0,
            name: nameVal,
            agency: agencyVal,
            objective: objectiveVal,
            launchDate: dateVal,
            image: imageVal || "images/rosetta.png"
        };
        missions.push(newMission);
        // Update filters with new data.
        setupFilters();

        if (overlay) overlay.remove();
        containerMissions.innerHTML = "";

        showAll();
        // Show success alert with mission name.
        alert_message("Added New Mission! " +`${newMission.name}` , "green")
        labelTitle.innerHTML = "Missions";
        buttonCancel.style.visibility = "hidden";

        // Clear form inputs.
        inputName.value = "";
        inputAgency.value = "";
        inputObjective.value = "";
        inputDate.value = "";
        if (inputImage) inputImage.value = "";
    }
}

// Function to delete a mission after user confirmation.
function deleteMission(index) {
   // Prompt user for confirmation (note: typo in original "delet" should be "delete").
   let userConfirmed = confirm("Are you sure you want to delet?");
   
            if (userConfirmed) {
                // Remove mission from array by index.
                missions.splice(index, 1);
                setupFilters();
                // Clear and refresh display.
    containerMissions.innerHTML = "";
    showAll();
    // Show deletion alert (note: references deleted mission's name, which is now invalid; should use a copy before splice).
    alert_message("deleted !" + `${missions[index].name}`, "red")
            } else {  
                return;
            } 
    
}

// Function to toggle a mission's favorite status and update UI.
function toggleFavorite(d) {
    // Flip favorite flag (0 to 1 or 1 to 0).
    missions[d].in_favorite = missions[d].in_favorite == 0 ? 1 : 0;
    var btn = document.getElementById("btn_" + d);
    if (btn) {
        // Toggle active class for styling.
        if (btn.classList) {
            btn.classList.toggle("active");
        }
        if (missions[d].in_favorite == 1) {
            // Set filled heart icon and show add-to-favorites alert.
            btn.style.backgroundImage = "url('images/in_favorite.png')";
            btn.style.backgroundSize = "cover";
            btn.style.backgroundColor = "";
            alert_message("Added to favorite ! " +` ${missions[d].name}`, "green")
        } else {
            // Clear heart icon and show remove-from-favorites alert.
            btn.style.backgroundImage = "";
            btn.style.backgroundSize = "";
            btn.style.backgroundColor = "";
            alert_message('Removed from favorites! ' +`${missions[d].name}` , "red")
        }
    }
    // Refresh main display.
    showAll();
    // If favorites popup is open, refresh its content.
    if (containerFv && window.getComputedStyle(containerFv).display != "none") {
        containerFv.innerHTML = "";
        var hasFavorites = false;
        for (var i = 0; i < missions.length; i++) {
            if (missions[i].in_favorite == 1) {
                displayMissions(i, "one_fvavorit", undefined, containerFv);
                hasFavorites = true;
            }
        }
        if (!hasFavorites) {
            labelTitle.innerHTML = "No Favorites Found";
            containerFv.innerHTML = `<p style="color: white; text-align: center;">No favorites yet.</p>`;
        } else {
            labelTitle.innerHTML = "Favorites";
        }
    }
}

// Function to save edited mission details after confirmation.
function save(index) {
    var card = document.getElementById("edit_card");
    var inputName = document.getElementById("input_name");
    var inputAgency = document.getElementById("input_agency");
    var inputObjective = document.getElementById("input_objective");
    var inputDate = document.getElementById("input_date");
    var inputImage = document.getElementById("input_image");

    // Trim input values.
    var nameVal = inputName.value.trim();
    var agencyVal = inputAgency.value.trim();
    var objectiveVal = inputObjective.value.trim();
    var dateVal = inputDate.value;
    var imageVal = inputImage ? inputImage.value.trim() : missions[index].image;

    // Validate required fields.
    if (nameVal && agencyVal && objectiveVal && dateVal) {
        // Update mission object with new values.
        missions[index].name = nameVal;
        missions[index].agency = agencyVal;
        missions[index].objective = objectiveVal;
        missions[index].launchDate = dateVal;
        missions[index].image = imageVal;
        containerMissions.innerHTML = "";
        // Prompt user for save confirmation.
        let userConfirmed = confirm("Are you sure you want to save changes ?");
   
            if (userConfirmed) {
                setupFilters();
                showAll();
                // Show edit success alert.
                alert_message("Edited !", "green")
            }else ;
    }
}

// Event listener for cancel button: resets to all missions view.
buttonCancel.addEventListener("click", function () {
    showAll();
    if (containerFv) {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
});

// Event listener for favorites logo: toggles favorites display.
favLogo.addEventListener("click", displayFavorites);

// Event listener for search input: applies search on keyup.
searchInput.addEventListener("keyup", function () {
    var searchTerm = searchInput.value.toLowerCase().trim();
    currentSearch = searchTerm;
    applyDisplay();
});

// Event listener for agency filter: applies filter on change.
selectAgency.addEventListener("change", function () {
    currentAgency = selectAgency.value;
    applyDisplay();
});

// Event listener for date filter: applies filter on change.
selectDate.addEventListener("change", function () {
    currentDate = selectDate.value;
    applyDisplay();
});

// Event listener for filter button: toggles filter container visibility.
buttonFilter.addEventListener("click", function () {
    isFilterVisible = !isFilterVisible;
    if (filterContainer) filterContainer.style.display = isFilterVisible ? "flex" : "none";
});

// Global click listener to close overlays if clicking outside, or handle specific button clicks.
document.addEventListener("click", function (e) {
    var overlay = document.getElementById("edit_overlay") || document.getElementById("add_overlay");
    // Close overlay if clicking on the background.
    if (overlay && e.target === overlay) {
        closeEditOrAdd();
    }
    // Handle add cancel button click.
    if (e.target.id == "button_cancel_add") {
        cancelAddMission();
    }
});

// Dynamically add CSS styles for favorite buttons and other mission card buttons.
var style = document.createElement('style');
style.textContent = '.favorites { background-color: transparent; background-repeat: no-repeat; background-position: center; background-size: contain; transition: background-image 0.3s ease, transform 0.3s ease; width: 25px; height: 25px; } .favorites.active { background-image: url("images/in_favorite.png") !important; background-color: rgba(255, 0, 0, 0.1); } .mission_card button.edit, .mission_card button.delete, .mission_card button.favorites { background-repeat: no-repeat; background-position: center; width: 25px; height: 25px; padding: 0; border: none; cursor: pointer; }';
document.head.appendChild(style);

// Initialize the app by showing all missions.
showAll();