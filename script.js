var missions = [
    {
        id: 1,
        status: 1,
        in_favorite: 0,
        name: "Apollo 11",
        agency: "NASA",
        objective: "Premier alunissage habité",
        launchDate: "1969-07-16",
        image: "images/apollo11.png"
    },
    {
        id: 2,
        status: 1,
        in_favorite: 0,
        name: "Voyager 1",
        agency: "NASA",
        objective: "Exploration du système solaire externe",
        launchDate: "1977-09-05",
        image: "images/voyager1.png"
    },
    {
        id: 3,
        status: 1,
        in_favorite: 0,
        name: "Rosetta",
        agency: "ESA",
        objective: "Étude de la comète 67P/Churyumov-Gerasimenko",
        launchDate: "2004-03-02",
        image: "images/rosetta.png"
    },
    {
        id: 4,
        status: 1,
        in_favorite: 1,
        name: "Curiosity",
        agency: "NASA",
        objective: "Exploration du cratère Gale sur Mars",
        launchDate: "2011-11-26",
        image: "images/curiosity.png"
    },
    {
        id: 5,
        status: 1,
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
            if (missions[t].status == 1) {
                var isFavorite = missions[t].in_favorite == 1 ? "active" : "";
                var favoriteStyle = missions[t].in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png);"' : '';
                allHtml = allHtml + '<div class="mission_card"><div class="mission_card-content"><div class="buttons-container"><button class="edit" onclick="edit(' + t + ')"></button><button class="delete" onclick="deleteMission(' + t + ')"></button><button class="favorites ' + isFavorite + '" id="btn_' + t + '" onclick="toggleFavorite(' + t + ')" ' + favoriteStyle + '></button></div><img class="misions_img" src="' + missions[t].image + '" alt=""><h2>' + missions[t].name + '</h2><h3 class="agency">' + missions[t].agency + '</h3><p class="description">' + missions[t].objective + '</p><span class="date">' + missions[t].launchDate + '</span></div></div>';
            }
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

function setupFilters() {
    if (selectAgency) selectAgency.innerHTML = '<option value="">All Agencies</option>';
    if (selectDate) selectDate.innerHTML = '<option value="">All Dates</option>';
    for (var i = 0; i < missions.length; i++) {
        if (missions[i].status == 1) {
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
}
setupFilters();

function displayFavorites() {
    if (filterContainer) filterContainer.style.display = "none";

    var isVisible = containerFv && window.getComputedStyle(containerFv).display != "none";

    if (isVisible) {
        if (containerFv) {
            containerFv.style.display = "none";
            containerFv.innerHTML = "";
        }
        containerMissions.innerHTML = "";
        displayMissions(undefined, "all", undefined, containerMissions);
        labelTitle.innerHTML = "Missions";
    } else {
        if (containerFv) containerFv.innerHTML = "";
        labelTitle.innerHTML = "Favorites";

        var hasFavorites = false;
        for (var i = 0; i < missions.length; i++) {
            if (missions[i].in_favorite == 1 && missions[i].status == 1) {
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
        containerMissions.innerHTML = "";
    }
}

function displayEdit(index) {
    if (containerFv && containerFv.style.display == "flex") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    labelTitle.innerHTML = "Edit Mission";
    containerMissions.innerHTML = "";
    var mission = missions[index];
    var isFavorite = mission.in_favorite == 1 ? "active" : "";
    var favoriteStyle = mission.in_favorite == 1 ? 'style="background-image: url(images/in_favorite.png); background-size: cover;"' : '';
    var editHtml = '<div class="mission_card mission_card_edit" id="edit_card"><div class="container_label_button"><h1 class="label_edit">Edit Mission</h1><button id="button_cancel_edit" class="button_">Cancel</button></div><div class="choix_et_menu_div"><button class="btn_supprimer" onclick="deleteMission(' + index + ')"></button><button class="btn_favorit ' + isFavorite + '" id="btn_' + index + '" onclick="toggleFavorite(' + index + ')" ' + favoriteStyle + '></button></div><img class="misions_img" src="' + mission.image + '" alt=""><input type="text" id="input_name" value="' + mission.name + '"><input type="text" id="input_agency" value="' + mission.agency + '"><input type="text" id="input_objective" value="' + mission.objective + '"><input type="date" id="input_date" value="' + mission.launchDate + '"><button id="submit" onclick="save(' + index + ')" style="align-self: center;">Save</button></div>';
    containerMissions.innerHTML = editHtml;
    containerMissions.style.display = "flex";

    var cancelEditBtn = document.getElementById("button_cancel_edit");
    if (cancelEditBtn) {
        cancelEditBtn.addEventListener("click", function () {
            containerMissions.innerHTML = "";
            displayMissions(undefined, "all", undefined, containerMissions);
        });
    }
}

function edit(index) {
    displayEdit(index);
    if (containerFv) containerFv.innerHTML = "";
}

function cancelAddMission() {
    var overlay = document.getElementById("add_overlay");
    if (overlay) overlay.remove();
    containerMissions.innerHTML = "";
    displayMissions(undefined, "all", undefined, containerMissions);
    labelTitle.innerHTML = "Missions";
    buttonCancel.style.visibility = "hidden";
}

buttonAdd.addEventListener("click", function () {
    if (containerFv && window.getComputedStyle(containerFv).display != "none") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    if (filterContainer) filterContainer.style.display = "none";

    var addCard = document.getElementById("add_card");
    if (addCard) {
        cancelAddMission();
        return;
    }

    containerMissions.innerHTML = "";
    labelTitle.innerHTML = "Add Mission";
    buttonCancel.style.visibility = "visible";

    var addHtml = '<div id="add_overlay" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); z-index: 999; display: flex; justify-content: center; align-items: center;"><div class="mission_card mission_card_edit add" id="add_card" style="position: relative; max-width: 400px; width: 90%; background: white; border-radius: 10px; padding: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); z-index: 1000;"><div class="container_label_button"><h1 class="label_add">Add Mission</h1><button id="button_cancel_add" class="button_" onclick="cancelAddMission()" style="background: #ff4d4d; color: white; border: none; padding: 5px 10px; border-radius: 5px; cursor: pointer;">Cancel</button></div><input type="text" id="input_name_add" placeholder="Enter name" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="text" id="input_agency_add" placeholder="Enter agency" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="text" id="input_objective_add" placeholder="Enter objective" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><input type="date" id="input_date_add" style="width: 100%; margin: 10px 0; padding: 10px; border: 1px solid #ccc; border-radius: 5px;"><button id="submit_add" onclick="submitNewMission()" style="width: 100%; padding: 10px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer; margin-top: 10px;">Save</button></div></div>';
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

    var nameVal = inputName.value.trim();
    var agencyVal = inputAgency.value.trim();
    var objectiveVal = inputObjective.value.trim();
    var dateVal = inputDate.value;

    if (nameVal && agencyVal && objectiveVal && dateVal) {
        var newMission = {
            id: missions.length + 1,
            status: 1,
            in_favorite: 0,
            name: nameVal,
            agency: agencyVal,
            objective: objectiveVal,
            launchDate: dateVal,
            image: "images/rosetta.png"
        };
        missions.push(newMission);

        if (overlay) overlay.remove();
        containerMissions.innerHTML = "";
        displayMissions(undefined, "all", undefined, containerMissions);
        labelTitle.innerHTML = "Missions";
        buttonCancel.style.visibility = "hidden";

        inputName.value = "";
        inputAgency.value = "";
        inputObjective.value = "";
        inputDate.value = "";
    } else {
        var addCard = document.getElementById("add_card");
        if (addCard) {
            addCard.style.boxShadow = "0 0 10px 5px rgb(201, 0, 0)";
            setTimeout(function() { addCard.style.boxShadow = ""; }, 2000);
        }
    }
}

function deleteMission(index) {
    missions[index].status = 0;
    containerMissions.innerHTML = "";
    displayMissions(undefined, "all", undefined, containerMissions);
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
        } else {
            btn.style.backgroundImage = "";
            btn.style.backgroundSize = "";
            btn.style.backgroundColor = "";
        }
    }
    containerMissions.innerHTML = "";
    displayMissions(undefined, "all", undefined, containerMissions);
}


function save(index) {
    var card = document.getElementById("edit_card");
    var inputName = document.getElementById("input_name");
    var inputAgency = document.getElementById("input_agency");
    var inputObjective = document.getElementById("input_objective");
    var inputDate = document.getElementById("input_date");

    var nameVal = inputName.value.trim();
    var agencyVal = inputAgency.value.trim();
    var objectiveVal = inputObjective.value.trim();
    var dateVal = inputDate.value;

    if (nameVal && agencyVal && objectiveVal && dateVal) {
        missions[index].name = nameVal;
        missions[index].agency = agencyVal;
        missions[index].objective = objectiveVal;
        missions[index].launchDate = dateVal;
        containerMissions.innerHTML = "";
        displayMissions(undefined, "all", undefined, containerMissions);
    } else {
        if (card) card.style.boxShadow = "1px 1px 10px 5px rgb(201, 0, 0)";
    }
}


buttonCancel.addEventListener("click", function () {
    if (containerFv) {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    if (filterContainer) filterContainer.style.display = "none";
    containerMissions.innerHTML = "";
    displayMissions(undefined, "all", undefined, containerMissions);
    labelTitle.innerHTML = "Missions";
    buttonCancel.style.visibility = "hidden";
});


favLogo.addEventListener("click", displayFavorites);


searchInput.addEventListener("keyup", function () {
    var searchTerm = searchInput.value.toLowerCase().trim();
    if (containerFv && containerFv.style.display == "flex") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    if (filterContainer) filterContainer.style.display = "none";
    containerMissions.innerHTML = "";
    if (searchTerm) {
        buttonCancel.style.visibility = "visible";
        labelTitle.innerHTML = "Result Search";
        var hasResults = false;
        for (var i = 0; i < missions.length; i++) {
            var nameLower = missions[i].name.toLowerCase();
            if (nameLower.indexOf(searchTerm) != -1 && missions[i].status == 1) {
                displayMissions(i, "one", undefined, containerMissions);
                hasResults = true;
            }
        }
        if (!hasResults) labelTitle.innerHTML = "No Results Found";
    } else {
        displayMissions(undefined, "all", undefined, containerMissions);
        labelTitle.innerHTML = "Missions";
        buttonCancel.style.visibility = "hidden";
    }
});

selectAgency.addEventListener("change", function () {
    if (containerFv && containerFv.style.display == "flex") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    containerMissions.innerHTML = "";
    filterContainer.style.display = "none";
    var selectedValue = selectAgency.value;
    var hasResults = false;
    for (var i = 0; i < missions.length; i++) {
        if ((selectedValue == "" || missions[i].agency == selectedValue) && missions[i].status == 1) {
            buttonCancel.style.visibility = "visible";
            labelTitle.innerHTML = "Filter";
            displayMissions(i, "one", undefined, containerMissions);
            hasResults = true;
        }
    }
    if (!hasResults) labelTitle.innerHTML = "No Results Found";
});

selectDate.addEventListener("change", function () {
    if (containerFv && containerFv.style.display == "flex") {
        containerFv.style.display = "none";
        containerFv.innerHTML = "";
    }
    containerMissions.innerHTML = "";
    filterContainer.style.display = "none";
    var selectedValue = selectDate.value;
    var hasResults = false;
    for (var i = 0; i < missions.length; i++) {
        if ((selectedValue == "" || missions[i].launchDate == selectedValue) && missions[i].status == 1) {
            buttonCancel.style.visibility = "visible";
            labelTitle.innerHTML = "Filter";
            displayMissions(i, "one", undefined, containerMissions);
            hasResults = true;
        }
    }
    if (!hasResults) labelTitle.innerHTML = "No Results Found";
});

buttonFilter.addEventListener("click", function () {
    if (filterContainer.style.display == "flex") {
        filterContainer.style.display = "none";
    } else {
        filterContainer.style.display = "flex";
    }
});


document.addEventListener("click", function (e) {
    if (e.target.id == "button_cancel_add" || e.target.id == "add_overlay") {
        cancelAddMission();
    }
});


var style = document.createElement('style');
style.textContent = '.favorites { background-color: transparent; background-repeat: no-repeat; background-position: center; background-size: contain; transition: background-image 0.3s ease, transform 0.3s ease; width: 25px; height: 25px; } .favorites.active { background-image: url("images/in_favorite.png") !important; background-color: rgba(255, 0, 0, 0.1); } .mission_card button.edit, .mission_card button.delete, .mission_card button.favorites { background-repeat: no-repeat; background-position: center; width: 25px; height: 25px; padding: 0; border: none; cursor: pointer; }';
document.head.appendChild(style);

displayMissions(undefined, "all", undefined, containerMissions);