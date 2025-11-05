var missions = [
    {
        id: 1,
        in_favorite: 0,
        name: "Apollo 11",
        agency: "NASA",
        objective: "Premier alunissage habité",
        launchDate: "1969-07-16",
        image: "images/apollo11.png"
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
        in_favorite: 0,
        name: "Rosetta",
        agency: "ESA",
        objective: "Étude de la comète 67P/Churyumov-Gerasimenko",
        launchDate: "2004-03-02",
        image: "images/rosetta.png"
    },
    {
        id: 4,
        in_favorite: 1,
        name: "Curiosity",
        agency: "NASA",
        objective: "Exploration du cratère Gale sur Mars",
        launchDate: "2011-11-26",
        image: "images/curiosity.png"
    },
    {
        id: 5,
        in_favorite: 0,
        name: "Artemis I",
        agency: "NASA",
        objective: "Test du système de lancement SLS et du vaisseau Orion",
        launchDate: "2022-11-16",
        image: "images/artemis.png"
    }
];

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

var currentSearch = "";
var currentAgency = "";
var currentDate = "";
var isFilterVisible = false;

function alert_message(message,color_){
  const  alert_var =document.getElementById("alert__")
const  h1_msg_ =document.getElementById("h1_msg")
alert_var.style.display="flex"
alert_var.style.height="50px"
alert_var.style.backgroundColor =color_
alert_var.style.transition="3s";

h1_msg_.innerHTML = message
  setTimeout(function(){
alert_var.style.display="none"
  },2000);

}

function displayMissions(index, type, content, container_) {
    if (type == "one") {
        var isFavorite = missions[index].in_favorite == 1 ? "active" : "";
        var favoriteStyle = missions[index].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); width: 26px;"' : '';
        var cardHtml = '<div class="mission_card"><div class="mission_card-content"><div class="buttons-container"><button class="edit" onclick="edit(' + index + ')"></button><button class="delete" onclick="deleteMission(' + index + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + index + '" onclick="toggleFavorite(' + index + ')" ' + favoriteStyle + '></button></div><img class="misions_img" src="' + missions[index].image + '" alt=""><h2>' + missions[index].name + '</h2><h3 class="agency">' + missions[index].agency + '</h3><p class="description">' + missions[index].objective + '</p><span class="date">' + missions[index].launchDate + '</span></div></div>';
        container_.style.display = "flex";
        container_.innerHTML = container_.innerHTML + cardHtml;
    }

    if (type == "one_fvavorit") {
        var isFavorite = missions[index].in_favorite == 1 ? "active" : "";
        var favoriteStyle = missions[index].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); width: 26px;"' : '';
        var cardHtml = '<div class="mission_card" style="height: fit-content"><div class="mission_card-content" style="padding: 5px;"><div class="buttons-container"><button class="edit" onclick="edit(' + index + ')"></button><button class="delete" onclick="deleteMission(' + index + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + index + '" onclick="toggleFavorite(' + index + ')" ' + favoriteStyle + '></button></div><div style="display: flex; gap: 10px;"><img class="misions_img" src="' + missions[index].image + '" alt="" style="width: 100px; height: 100px;"><div><h2 style="margin: 5px">' + missions[index].name + '</h2><h3 class="agency" style="margin: 5px">' + missions[index].agency + '</h3><p class="description" style="margin: 5px">' + missions[index].objective + '</p><span class="date">' + missions[index].launchDate + '</span></div></div></div></div>';
        container_.style.display = "flex";
        container_.innerHTML = container_.innerHTML + cardHtml;
    }

    if (type == "all") {
        var allHtml = "";
        for (var t = 0; t < missions.length; t++) {
            var isFavorite = missions[t].in_favorite == 1 ? "active" : "";
            var favoriteStyle = missions[t].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png);"' : '';
            allHtml = allHtml + '<div class="mission_card"><div class="mission_card-content"><div class="buttons-container"><button class="edit" onclick="edit(' + t + ')"></button><button class="delete" onclick="deleteMission(' + t + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + t + '" onclick="toggleFavorite(' + t + ')" ' + favoriteStyle + '></button></div><img class="misions_img" src="' + missions[t].image + '" alt=""><h2>' + missions[t].name + '</h2><h3 class="agency">' + missions[t].agency + '</h3><p class="description">' + missions[t].objective + '</p><span class="date">' + missions[t].launchDate + '</span></div></div>';
        }
        container_.style.display = "flex";
        container_.innerHTML = allHtml;
    }

    // إضافة محتوى مخصص للمفضلات
    if (content != undefined && containerFv) {
        containerFv.style.display = "flex";
        containerFv.innerHTML = containerFv.innerHTML + content;
    }
}

function applyDisplay() {
    if (containerFv && window.getComputedStyle(containerFv).display != "none") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    containerMissions.innerHTML = "";
    containerMissions.style.display = "flex";

    var count = 0;
    var searchTerm = currentSearch.toLowerCase();
    var isSearching = currentSearch != "";
    var isFiltering = currentAgency != "" || currentDate != "";
    for (var i = 0; i < missions.length; i++) {
        var m = missions[i];
        var matchesFilter = (currentAgency == "" || m.agency == currentAgency) && (currentDate == "" || m.launchDate == currentDate);
        if (!matchesFilter) continue;
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
    if (isSearching || isFiltering) {
        buttonCancel.style.visibility = "visible";
    } else {
        buttonCancel.style.visibility = "hidden";
    }
}

function showAll() {
    currentSearch = "";
    currentAgency = "";
    currentDate = "";
    searchInput.value = "";
    selectAgency.value = "";
    selectDate.value = "";
    applyDisplay();
    if (filterContainer) filterContainer.style.display = isFilterVisible ? "flex" : "none";
}

function setupFilters() {
    if (selectAgency) selectAgency.innerHTML = '<option value="">All Agencies</option>';
    if (selectDate) selectDate.innerHTML = '<option value="">All Dates</option>';
    for (var i = 0; i < missions.length; i++) {
        var agencyOption = '<option value="' + missions[i].agency + '">' + missions[i].agency + '</option>';
        if (selectAgency.innerHTML.indexOf(agencyOption) == -1) {
            selectAgency.innerHTML = selectAgency.innerHTML + agencyOption;
        }
        var dateOption = '<option value="' + missions[i].launchDate + '">' + missions[i].launchDate + '</option>';
        if (selectDate.innerHTML.indexOf(dateOption) == -1) {
            selectDate.innerHTML = selectDate.innerHTML + dateOption;
        }
    }
}
setupFilters();

function displayFavorites() {
    var isVisible = containerFv && window.getComputedStyle(containerFv).display != "none";
    containerFv.style.transition="2s" ;
    if (isVisible) {
        if (containerFv) {
            containerFv.style.display = "none";
            containerFv.innerHTML = "";
        }
        showAll();
        labelTitle.innerHTML = "Missions";
        containerMissions.style.display = "flex";
    } else {
        containerMissions.style.display = "none";
        if (containerFv) containerFv.innerHTML = "";
        labelTitle.innerHTML = "Favorites";

        var hasFavorites = false;
        for (var i = 0; i < missions.length; i++) {
            if (missions[i].in_favorite == 1) {
                displayMissions(i, "one_fvavorit", undefined, containerFv);
                hasFavorites = true;
            }
        }

        if (!hasFavorites) {
            labelTitle.innerHTML = "No Favorites Found";
            if (containerFv) {
                containerFv.innerHTML = '<p style="color: white; text-align: center;">No favorites yet.</p>';
            }
        }

        if (containerFv) containerFv.style.display = "flex";
    }
}

function closeEditOrAdd() {
    var overlay = document.getElementById("edit_overlay") || document.getElementById("add_overlay");
    if (overlay) overlay.remove();
    containerMissions.innerHTML = "";
    showAll();
    labelTitle.innerHTML = "Missions";
    buttonCancel.style.visibility = "hidden";
}

function displayEdit(index) {
    if (containerFv && containerFv.style.display == "flex") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    if (filterContainer) filterContainer.style.display = isFilterVisible ? "flex" : "none";

    var mission = missions[index];
    var isFavorite = mission.in_favorite == 1 ? "active" : "";
    var favoriteStyle = mission.in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); background-size: cover;"' : '';
    var editHtml = '<div id="edit_overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: flex; justify-content: center; align-items: center;"><div class="mission_card mission_card_edit" id="edit_card" style="position: relative; max-width: 400px; width: 90%; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000;"><div class="container_label_button"><h1 class="label_edit">Edit Mission</h1><button id="button_cancel_edit" class="button_" onclick="closeEditOrAdd()" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Cancel</button></div><div class="choix_et_menu_div"></div><img class="misions_img" src="' + mission.image + '" alt=""><input type="text" id="input_name" value="' + mission.name + '"><input type="text" id="input_agency" value="' + mission.agency + '"><input type="text" id="input_objective" value="' + mission.objective + '"><input type="date" id="input_date" value="' + mission.launchDate + '"><input type="url" id="input_image" value="' + mission.image + '" placeholder="Enter image URL (optional)"><button id="submit" onclick="save(' + index + ')" style="align-self: center;">Save</button></div></div></div>';
    containerMissions.innerHTML = editHtml;
    containerMissions.style.display = "flex";
    containerMissions.style.position = "relative";
}

function edit(index) {
    displayEdit(index);
    if (containerFv) containerFv.innerHTML = "";
}

function cancelAddMission() {
    closeEditOrAdd();
}

buttonAdd.addEventListener("click", function () {
    if (containerFv && window.getComputedStyle(containerFv).display != "none") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }

    var addCard = document.getElementById("add_card");
    if (addCard) {
        cancelAddMission();
        return;
    }

    containerMissions.innerHTML = "";
    labelTitle.innerHTML = "Add Mission";
    buttonCancel.style.visibility = "visible";

    var addHtml = '<div id="add_overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: flex; justify-content: center; align-items: center;"><div class="mission_card mission_card_edit add" id="add_card" style="position: relative; max-width: 400px; width: 90%; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000;"><div class="container_label_button"><h1 class="label_add">Add Mission</h1><button id="button_cancel_add" class="button_" onclick="cancelAddMission()" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Cancel</button></div><input type="text" id="input_name_add" placeholder="Enter name" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="text" id="input_agency_add" placeholder="Enter agency" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="text" id="input_objective_add" placeholder="Enter objective" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="date" id="input_date_add" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="url" id="input_image_add" placeholder="Enter image URL (optional)" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><button id="submit_add" onclick="submitNewMission()" style="width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">Save</button></div></div>';
    containerMissions.innerHTML = addHtml;
    containerMissions.style.display = "flex";
    containerMissions.style.position = "relative";

    var inputName = document.getElementById("input_name_add");
    if (inputName) inputName.focus();
});

function submitNewMission() {
    var overlay = document.getElementById("add_overlay");
    var inputName = document.getElementById("input_name_add");
    var inputAgency = document.getElementById("input_agency_add");
    var inputObjective = document.getElementById("input_objective_add");
    var inputDate = document.getElementById("input_date_add");
    var inputImage = document.getElementById("input_image_add");

    var nameVal = inputName.value.trim();
    var agencyVal = inputAgency.value.trim();
    var objectiveVal = inputObjective.value.trim();
    var dateVal = inputDate.value;
    var imageVal = inputImage ? inputImage.value.trim() : "";

    if (nameVal && agencyVal && objectiveVal && dateVal) {
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
        setupFilters();

        if (overlay) overlay.remove();
        containerMissions.innerHTML = "";

        showAll();
        alert_message("Added New Mission! " +`${newMission.name}` , "green")
        labelTitle.innerHTML = "Missions";
        buttonCancel.style.visibility = "hidden";

        inputName.value = "";
        inputAgency.value = "";
        inputObjective.value = "";
        inputDate.value = "";
        if (inputImage) inputImage.value = "";
    }
}

function deleteMission(index) {
   let userConfirmed = confirm("Are you sure you want to delet?");
   
            if (userConfirmed) {
                missions.splice(index, 1);
                setupFilters();
    containerMissions.innerHTML = "";
    showAll();
    alert_message("deleted !" + `${missions[index].name}`, "red")
            } else {  
                return;
            } 
    
}

function toggleFavorite(d) {
    missions[d].in_favorite = missions[d].in_favorite == 0 ? 1 : 0;
    var btn = document.getElementById("btn_" + d);
    if (btn) {
        if (btn.classList) {
            btn.classList.toggle("active");
        }
        if (missions[d].in_favorite == 1) {
            btn.style.backgroundImage = "url('images/in_favorite.png')";
            btn.style.backgroundSize = "cover";
            btn.style.backgroundColor = "";
            alert_message("Added to favorite ! " +` ${missions[d].name}`, "green")
        } else {
            btn.style.backgroundImage = "";
            btn.style.backgroundSize = "";
            btn.style.backgroundColor = "";
            alert_message('Removed from favorites! ' + `${missions[d].name}`, "red")
        }
    }
    showAll();
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
            containerFv.innerHTML = '<p style="color: white; text-align: center;">No favorites yet.</p>';
        } else {
            labelTitle.innerHTML = "Favorites";
        }
    }
}

function save(index) {
    var card = document.getElementById("edit_card");
    var inputName = document.getElementById("input_name");
    var inputAgency = document.getElementById("input_agency");
    var inputObjective = document.getElementById("input_objective");
    var inputDate = document.getElementById("input_date");
    var inputImage = document.getElementById("input_image");

    var nameVal = inputName.value.trim();
    var agencyVal = inputAgency.value.trim();
    var objectiveVal = inputObjective.value.trim();
    var dateVal = inputDate.value;
    var imageVal = inputImage ? inputImage.value.trim() : missions[index].image;

    if (nameVal && agencyVal && objectiveVal && dateVal) {
        missions[index].name = nameVal;
        missions[index].agency = agencyVal;
        missions[index].objective = objectiveVal;
        missions[index].launchDate = dateVal;
        missions[index].image = imageVal;
        containerMissions.innerHTML = "";
        let userConfirmed = confirm("Are you sure you want to save changes ?");
   
            if (userConfirmed) {
                setupFilters();
            showAll();
            alert_message("Edited !", "green")
            }else ;
    }
}

buttonCancel.addEventListener("click", function () {
    showAll();
    if (containerFv) {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
});

favLogo.addEventListener("click", displayFavorites);

searchInput.addEventListener("keyup", function () {
    var searchTerm = searchInput.value.toLowerCase().trim();
    currentSearch = searchTerm;
    applyDisplay();
});

selectAgency.addEventListener("change", function () {
    currentAgency = selectAgency.value;
    applyDisplay();
});

selectDate.addEventListener("change", function () {
    currentDate = selectDate.value;
    applyDisplay();
});

buttonFilter.addEventListener("click", function () {
    isFilterVisible = !isFilterVisible;
    if (filterContainer) filterContainer.style.display = isFilterVisible ? "flex" : "none";
});

document.addEventListener("click", function (e) {
    var overlay = document.getElementById("edit_overlay") || document.getElementById("add_overlay");
    if (overlay && e.target === overlay) {
        closeEditOrAdd();
    }
    if (e.target.id == "button_cancel_add") {
        cancelAddMission();
    }
});

var style = document.createElement('style');
style.textContent = '.favorites { background-color: transparent; background-repeat: no-repeat; background-position: center; background-size: contain; transition: background-image 0.3s ease, transform 0.3s ease; width: 25px; height: 25px; } .favorites.active { background-image: url("images/in_favorite.png") !important; background-color: rgba(255, 0, 0, 0.1); } .mission_card button.edit, .mission_card button.delete, .mission_card button.favorites { background-repeat: no-repeat; background-position: center; width: 25px; height: 25px; padding: 0; border: none; cursor: pointer; }';
document.head.appendChild(style);

showAll();