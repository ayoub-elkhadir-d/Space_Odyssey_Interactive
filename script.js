// مصفوفة المهام الفضائية - كل مهمة تحتوي على بيانات أساسية
let missions = [
  {
    id: 1,
    status: 1,
    in_favorite: 0,
    name: "Apollo 11",
    agency: "NASA",
    objective: "Premier alunissage habité",
    launchDate: "1969-07-16",
    image: "images/apollo11.png",
  },
  {
    id: 2,
    status: 1,
    in_favorite: 0,
    name: "Voyager 1",
    agency: "NASA",
    objective: "Exploration du système solaire externe",
    launchDate: "1977-09-05",
    image: "images/voyager1.png",
  },
  {
    id: 3,
    status: 1,
    in_favorite: 0,
    name: "Rosetta",
    agency: "ESA",
    objective: "Étude de la comète 67P/Churyumov-Gerasimenko",
    launchDate: "2004-03-02",
    image: "images/rosetta.png",
  },
  {
    id: 4,
    status: 1,
    in_favorite: 1,
    name: "Curiosity",
    agency: "NASA",
    objective: "Exploration du cratère Gale sur Mars",
    launchDate: "2011-11-26",
    image: "images/curiosity.png",
  },
  {
    id: 5,
    status: 1,
    in_favorite: 0,
    name: "Artemis I",
    agency: "NASA",
    objective: "Test du système de lancement SLS et du vaisseau Orion",
    launchDate: "2022-11-16",
    image: "images/artemis.png",
  },
];

/************************************ الجزء الرئيسي ***************************************/
// الحصول على العناصر من الصفحة (DOM)
const containerFv = document.getElementById("popup_fv");
const containerMissions = document.getElementById("misions_div");
const labelTitle = document.getElementById("labell");
const buttonCancel = document.getElementById("button_cancel");
const buttonAdd = document.getElementById("button_add");
const searchInput = document.getElementById("search");
const favLogo = document.getElementById("fav_logo");
const buttonFilter = document.getElementById("filter");
const filterContainer = document.getElementById("filter_container");
const selectAgency = document.getElementById("select_2");
const selectDate = document.getElementById("select_3");

// عرض المهام الأولية
displayMissions(undefined, "all", undefined, containerMissions);

/********************************** دالة عرض المهام ************************************/
// دالة لعرض المهام (one لمهمة واحدة، all للجميع)
function displayMissions(index, type, content, container_) {
  if (type === "one") {
    const isFavorite = missions[index].in_favorite === 1 ? "active" : "";
    // تصحيح: استخدم background-image فقط، واعتمد على CSS للـ active
    const favoriteStyle = missions[index].in_favorite === 1 ? 'style="background-image: url(\'images/in_favorite.png\'); background-size: cover;"' : '';
    /*
   
    */
    const cardHtml = `
      <div class="mission_card">  
    <div class="mission_card-content">
      <div class="buttons-container">
        <button class="edit" onclick="edit(${index})"></button>   
          <button class="delete" onclick="deleteMission(${index})"></button>   
          <button class="favorites ${isFavorite}" id="btn_${index}" onclick="toggleFavorite(${index})" ${favoriteStyle}></button>  
      </div>
       <img class="misions_img" src="${missions[index].image}" alt="">  
      <h2>${missions[index].name}</h2>
      <h3 class="agency">${missions[index].agency}</h3>
      <p class="description">
        ${missions[index].objective}
      </p>
      <span class="date">${missions[index].launchDate}/span>
    </div>
  </div>
      `;
    container_.style.display = "flex";
   
    container_.innerHTML += cardHtml;
  }

  if (type === "all") {
    let allHtml = "";
    for (let t = 0; t < missions.length; t++) {
      if (missions[t].status === 1) {
        const isFavorite = missions[t].in_favorite === 1 ? "active" : "";
        const favoriteStyle = missions[t].in_favorite === 1 ? 'style="background-image: url(\'images/in_favorite.png\'); background-size: cover;"' : '';
        allHtml += `
          <div class="mission_card" style="width:200px;">
            <div class="choix_et_menu_div">  
              <button class="btns" onclick="edit(${t})"></button>   
              <button class="btn_supprimer" onclick="deleteMission(${t})">k</button> 
              <button class="btn_favorit ${isFavorite}" id="btn_${t}" onclick="toggleFavorite(${t})" ${favoriteStyle}></button>  
            </div>  
            <img class="misions_img" src="${missions[t].image}" alt="">  
            <h3>${missions[t].name}</h3>  
            <h3>${missions[t].agency}</h3>  
            <h3>${missions[t].objective}</h3>  
            <h3>${missions[t].launchDate}</h3> 
          </div>`;
      }
    }
    container_.style.display = "flex";
    container_.innerHTML = allHtml;
  }

  if (content !== undefined && containerFv) {
    containerFv.style.display = "flex";
    containerFv.innerHTML += content;
  }
}

/************************************ أحداث الصفحة (مرة واحدة فقط) ***************************************/
// زر الإلغاء - مُكمل لإغلاق الـ popup والتصفية والإعادة إلى الوضع الافتراضي
buttonCancel.addEventListener("click", function () {
  // إغلاق الـ popup
  if (containerFv) {
    containerFv.style.display = "none";
    containerFv.innerHTML = "";
  }
  // إغلاق حاوية التصفية
  if (filterContainer) {
    filterContainer.style.display = "none";
  }
  // إعادة عرض جميع المهام
  containerMissions.innerHTML = "";
  displayMissions(undefined, "all", undefined, containerMissions);
  // إعادة الإعدادات الافتراضية
  labelTitle.innerHTML = "Missions";
  buttonCancel.style.visibility = "hidden";
});

// أيقونة المفضلات
favLogo.addEventListener("click", displayFavorites);

// البحث (case-insensitive) - مُكمل للتعامل مع الحالة الفارغة وإغلاق الـ popup
searchInput.addEventListener("keyup", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();
  // إغلاق الـ popup إذا كان مفتوحاً
  if (containerFv && containerFv.style.display === "flex") {
    containerFv.style.display = "none";
    containerFv.innerHTML = "";
  }
  // إغلاق التصفية
  if (filterContainer) {
    filterContainer.style.display = "none";
  }
  containerMissions.innerHTML = "";
  if (searchTerm) {
    buttonCancel.style.visibility = "visible";
    labelTitle.innerHTML = "Result Search";
    let hasResults = false;
    for (let z = 0; z < missions.length; z++) {
      const nameLower = missions[z].name.toLowerCase();
      if (nameLower.includes(searchTerm) && missions[z].status === 1) {
        displayMissions(z, "one", undefined, containerMissions);
        hasResults = true;
      }
    }
    if (!hasResults) {
      labelTitle.innerHTML = "No Results Found";
    }
  } else {
    // إذا كان البحث فارغاً، أعد عرض الجميع
    displayMissions(undefined, "all", undefined, containerMissions);
    labelTitle.innerHTML = "Missions";
    buttonCancel.style.visibility = "hidden";
  }
});

// التصفية (ملء مرة واحدة، listeners مرة واحدة)
function setupFilters() {
  if (selectAgency) selectAgency.innerHTML = '<option value="">All Agencies</option>';
  if (selectDate) selectDate.innerHTML = '<option value="">All Dates</option>';
  for (let aa = 0; aa < missions.length; aa++) {
    if (missions[aa].status === 1) {
      const agencyOption = `<option value="${missions[aa].agency}">${missions[aa].agency}</option>`;
      if (!selectAgency.innerHTML.includes(agencyOption)) {
        selectAgency.innerHTML += agencyOption;
      }
      const dateOption =`<option value="${missions[aa].launchDate}">${missions[aa].launchDate}</option>` ;
      if (!selectDate.innerHTML.includes(dateOption)) {
        selectDate.innerHTML += dateOption;
      }
    }
  }
}
setupFilters();

selectAgency.addEventListener("change", function () {
  // إغلاق الـ popup إذا كان مفتوحاً
  if (containerFv && containerFv.style.display === "flex") {
    containerFv.style.display = "none";
    containerFv.innerHTML = "";
  }
  containerMissions.innerHTML = "";
  filterContainer.style.display = "none";
  const selectedValue = selectAgency.value;
  let hasResults = false;
  for (let ar = 0; ar < missions.length; ar++) {
    if ((selectedValue === "" || missions[ar].agency === selectedValue) && missions[ar].status === 1) {
      buttonCancel.style.visibility = "visible";
      labelTitle.innerHTML = "Filtre";
      displayMissions(ar, "one", undefined, containerMissions);
      hasResults = true;
    }
  }
  if (!hasResults) {
    labelTitle.innerHTML = "No Results Found";
  }
});

selectDate.addEventListener("change", function () {
  // إغلاق الـ popup إذا كان مفتوحاً
  if (containerFv && containerFv.style.display === "flex") {
    containerFv.style.display = "none";
    containerFv.innerHTML = "";
  }
  containerMissions.innerHTML = "";
  filterContainer.style.display = "none";
  const selectedValue = selectDate.value;
  let hasResults = false;
  for (let ay = 0; ay < missions.length; ay++) {
    if ((selectedValue === "" || missions[ay].launchDate === selectedValue) && missions[ay].status === 1) {
      buttonCancel.style.visibility = "visible";
      labelTitle.innerHTML = "Filtre";
      displayMissions(ay, "one", undefined, containerMissions);
      hasResults = true;
    }
  }
  if (!hasResults) {
    labelTitle.innerHTML = "No Results Found";
  }
});

// زر التصفية
buttonFilter.addEventListener("click", function () {
  if (filterContainer.style.display === "flex") {
    filterContainer.style.display = "none";
  } else {
    filterContainer.style.display = "flex";
  }
});

// زر الإضافة
buttonAdd.addEventListener("click", function () {
  // إغلاق إذا كان مفتوحاً
  const isVisible = window.getComputedStyle(containerFv).display === "flex";
  if (isVisible) {
    containerFv.style.display = "none";
    containerFv.innerHTML = "";
  } else {
    // إغلاق التصفية إذا مفتوحة
    if (filterContainer) {
      filterContainer.style.display = "none";
    }
    containerFv.innerHTML = "";
    containerFv.style.display = "flex";
    displayMissions(undefined, undefined, contentAddCard);
    const inputName = document.getElementById("input_name_add");
    if (inputName) inputName.focus();
  }
});

/************************************ عرض المفضلات - مُكمل لإفراغ الـ popup قبل الإضافة ***************************************/
function displayFavorites() {
  // إغلاق التصفية
  if (filterContainer) {
    filterContainer.style.display = "none";
  }
  buttonCancel.style.visibility = "visible";
  containerMissions.innerHTML = "";
  labelTitle.innerHTML = "Favorites";
  // إفراغ الـ popup قبل إضافة الكروت الجديدة
  if (containerFv) {
    containerFv.innerHTML = "";
  }
  let hasFavorites = false;
  for (let b = 0; b < missions.length; b++) {
    if (missions[b].in_favorite === 1 && missions[b].status === 1) {
      displayMissions(b, "one", undefined, containerFv);
      hasFavorites = true;
    }
  }
  if (!hasFavorites) {
    labelTitle.innerHTML = "No Favorites Found";
    if (containerFv) {
      containerFv.innerHTML = '<p style="color: white; text-align: center;">No favorites yet.</p>';
      containerFv.style.display = "flex";
    }
  }
}

/************************************ التحرير ***************************************/
function displayEdit(index) {
  // إغلاق الـ popup إذا كان مفتوحاً
  if (containerFv && containerFv.style.display === "flex") {
    containerFv.style.display = "none";
    containerFv.innerHTML = "";
  }
  buttonCancel.style.visibility = "hidden";
  labelTitle.innerHTML = "Edit Mission";
  containerMissions.innerHTML = "";
  const mission = missions[index];
  const isFavorite = mission.in_favorite === 1 ? "active" : "";
  // تصحيح: استخدم background-image مع background-size لتغطية الزر
  const favoriteStyle = mission.in_favorite === 1 ? 'style="background-image: url(\'images/in_favorite.png\'); background-size: cover;"' : '';
  const editHtml = `
    <div class="mission_card mission_card_edit" id="edit_card">  
      <div class="container_label_button">
        <h1 class="label_edit">Edit Mission</h1>
        <button id="button_cancel_edit" class="button_">Cancel</button>
      </div>
      <div class="choix_et_menu_div">  
        <button class="btn_supprimer" onclick="deleteMission(${index})"></button>   
        <button class="btn_favorit ${isFavorite}" id="btn_${index}" onclick="toggleFavorite(${index})" ${favoriteStyle}></button>  
      </div>  
      <img class="misions_img" src="${mission.image}" alt="">  
      <input type="text" id="input_name" value="${mission.name}">
      <input type="text" id="input_agency" value="${mission.agency}">
      <input type="text" id="input_objective" value="${mission.objective}">  
      <input type="date" id="input_date" value="${mission.launchDate}">
      <button id="submit" onclick="save(${index})" style="align-self: center;">Save</button>
    </div>`;
  containerMissions.innerHTML = editHtml;
  containerMissions.style.display = "flex";

  const cancelEditBtn = document.getElementById("button_cancel_edit");
  if (cancelEditBtn) {
    cancelEditBtn.addEventListener("click", function () {
      containerMissions.innerHTML = "";
      if (containerFv) {
        containerFv.style.display = "none";
      }
      displayMissions(undefined, "all", undefined, containerMissions);
    });
  }
}

function edit(index) {
  displayEdit(index);
  if (containerFv) {
    containerFv.innerHTML = "";
  }
}

/************************************ الإضافة ***************************************/
const contentAddCard = `
<div class="mission_card mission_card_edit add" id="add_card">   
  <div class="container_label_button">
    <h1 class="label_add">Add Mission</h1>
    <button id="button_cancel_add" class="button_">Cancel</button>
  </div>
  <input type="text" id="input_name_add" placeholder="Enter name">
  <input type="text" id="input_agency_add" placeholder="Enter agency">
  <input type="text" id="input_objective_add" placeholder="Enter objective">
  <input type="date" id="input_date_add">
  <button id="submit_add" onclick="submitNewMission()">Save</button>
</div>`;

document.addEventListener("click", function (e) {
  if (e.target.id === "button_cancel_add") {
    const addCard = document.getElementById("add_card");
    if (addCard) addCard.style.display = "none";
    if (containerFv) {
      containerFv.style.display = "none";
      containerFv.innerHTML = "";
    }
  }
});

function submitNewMission() {
  const addCard = document.getElementById("add_card");
  const inputName = document.getElementById("input_name_add");
  const inputAgency = document.getElementById("input_agency_add");
  const inputObjective = document.getElementById("input_objective_add");
  const inputDate = document.getElementById("input_date_add");

  const nameVal = inputName.value.trim();
  const agencyVal = inputAgency.value.trim();
  const objectiveVal = inputObjective.value.trim();
  const dateVal = inputDate.value;

  if (nameVal && agencyVal && objectiveVal && dateVal) {
    const newMission = {
      id: missions.length + 1,
      status: 1,
      in_favorite: 0,
      name: nameVal,
      agency: agencyVal,
      objective: objectiveVal,
      launchDate: dateVal,
      image: "images/rosetta.png",
    };
    if (containerFv) {
      containerFv.style.display = "none";
      containerFv.innerHTML = "";
    }
    containerMissions.innerHTML = "";
    missions.push(newMission);
    displayMissions(undefined, "all", undefined, containerMissions);

    inputName.value = "";
    inputAgency.value = "";
    inputObjective.value = "";
    inputDate.value = "";
  } else {
    if (addCard) {
      addCard.style.boxShadow = "1px 1px 10px 5px rgb(201, 0, 0)";
    }
  }
}

/************************************ الحذف ***************************************/
function deleteMission(index) {
  missions[index].status = 0;
  containerMissions.innerHTML = "";
  displayMissions(undefined, "all", undefined, containerMissions);
}

/************************************ المفضلة - المصححة ***************************************/
function toggleFavorite(d) {
  missions[d].in_favorite = missions[d].in_favorite === 0 ? 1 : 0;
  const btn = document.getElementById(`btn_${d}`);
  if (btn) {
    btn.classList.toggle("active"); // للـ CSS الخارجي
    // تصحيح: استخدم background-image بدلاً من backgroundColor للتوافق مع displayMissions
    if (missions[d].in_favorite === 1) {
      btn.style.backgroundImage = "url('images/in_favorite.png')";
      btn.style.backgroundSize = "cover"; // لتغطية الزر بالصورة
      btn.style.backgroundColor = ""; // مسح اللون إذا كان موجودًا
    } else {
      btn.style.backgroundImage = "";
      btn.style.backgroundSize = "";
      btn.style.backgroundColor = "";
    }
  }
  // إعادة العرض لتحديث الكل (يمكن إزالة هذا إذا أردت تحديثًا فوريًا فقط)
  containerMissions.innerHTML = "";
  displayMissions(undefined, "all", undefined, containerMissions);
}

/************************************ الحفظ ***************************************/
function save(index) {
  const card = document.getElementById("edit_card");
  const inputName = document.getElementById("input_name");
  const inputAgency = document.getElementById("input_agency");
  const inputObjective = document.getElementById("input_objective");
  const inputDate = document.getElementById("input_date");

  const nameVal = inputName.value.trim();
  const agencyVal = inputAgency.value.trim();
  const objectiveVal = inputObjective.value.trim();
  const dateVal = inputDate.value;

  if (nameVal && agencyVal && objectiveVal && dateVal) {
    missions[index].name = nameVal;
    missions[index].agency = agencyVal;
    missions[index].objective = objectiveVal;
    missions[index].launchDate = dateVal;
    containerMissions.innerHTML = "";
    displayMissions(undefined, "all", undefined, containerMissions);
  } else {
    if (card) {
      card.style.boxShadow = "1px 1px 10px 5px rgb(201, 0, 0)";
    }
  }
}

// CSS إضافي للزر (يضاف ديناميكيًا لدعم active مع background-image)
const style = document.createElement('style');
style.textContent = `
  .btn_favorit {
    background-color: transparent; /* افتراضي شفاف */
    background-repeat: no-repeat;
    transition: background-image 0.3s ease; /* انتقال سلس */
    width: 25px; height: 25px; /* حدد حجم الزر إذا لزم */
  }
  .btn_favorit.active {
    background-image: url('images/in_favorite.png') !important;
    background-size: cover !important;
    background-color: rgba(255, 0, 0, 0.1); /* لون خلفية خفيف أحمر إذا أردت */
  }
`;
document.head.appendChild(style);