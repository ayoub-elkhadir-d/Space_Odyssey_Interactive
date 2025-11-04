// مصفوفة المهام الفضائية - كل مهمة تحتوي على بيانات أساسية
let missions = [
  {
    id: 1,
    status: 1,
    in_favorite: 0,  // أضف in_favorite للمهمة الأولى للتوافق
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
    objective: "Test du système de lancement SLS et du vaisseau Orion",  // تصحيح إملائي
    launchDate: "2022-11-16",
    image: "images/artemis.png",
  },
];
/************************************ الجزء الرئيسي ***************************************/
// الحصول على العناصر من الصفحة (DOM)
const containerFv = document.getElementById("container_fv"); // حاوية إضافية
const containerMissions = document.getElementById("misions_div");  // حاوية المهام الرئيسية
const labelTitle = document.getElementById("labell");  // عنوان الصفحة
const buttonCancel = document.getElementById("button_cancel");  // زر الإلغا ء
const buttonAdd = document.getElementById("button_add");  // زر الإضاف
const searchInput = document.getElementById("search");  // حقل البحث
const favLogo = document.getElementById("fav_logo");  // أيقونة المفضلات
const buttonFilter = document.getElementById("filter");  // زر التصفية
const filterContainer = document.getElementById("filter_container");  // حاوية التصفية
const selectAgency = document.getElementById("select_2");  // قائمة الوكالات
const selectDate = document.getElementById("select_3");  // قائمة التواريخ

// عرض المهام الأوليةi
displayMissions(undefined, "all", undefined);
//*********************************************************************************************/
   /********************************** دالة عرض المهام ************************************/
       /********************************************************************************/
// دالة لعرض المهام (one لمهمة واحدة، all للجميع)
function displayMissions(index, type, content) {
  if (type === "one") {
    // بناء كارد واحدة
    const isFavorite = missions[index].in_favorite === 1 ? "active" : "";  // للزر المفضل
    const cardHtml = `
      <div class="mission_card" style="width:200px;">
        <div class="choix_et_menu_div">  
          <button class="btns" onclick="edit(${index})"></button>   
          <button class="btn_supprimer" onclick="deleteMission(${index})"></button>   
          <button class="btn_favorit ${isFavorite}" id="btn_${index}" onclick="toggleFavorite(${index})"></button>  
        </div>  
        <img class="misions_img" src="${missions[index].image}" alt="">  
        <h3>${missions[index].name}</h3>  
        <h3>${missions[index].agency}</h3>  
        <h3>${missions[index].objective}</h3>  
        <h3>${missions[index].launchDate}</h3> 
      </div>`;
    containerMissions.style.display = "flex";
    containerMissions.innerHTML += cardHtml;
  }

  if (type === "all") {
    // بناء جميع الكاردات في string واحد لتجنب التكرار
    let allHtml = "";
    for (let t = 0; t < missions.length; t++) {
      if (missions[t].status === 1) {
        const isFavorite = missions[t].in_favorite === 1 ? "active" : "";
        allHtml += `
          <div class="mission_card" style="width:200px;">
            <div class="choix_et_menu_div">  
              <button class="btns" onclick="edit(${t})"></button>   
              <button class="btn_supprimer" onclick="deleteMission(${t})"></button>   
              <button class="btn_favorit ${isFavorite}" id="btn_${t}" onclick="toggleFavorite(${t})"></button>  
            </div>  
            <img class="misions_img" src="${missions[t].image}" alt="">  
            <h3>${missions[t].name}</h3>  
            <h3>${missions[t].agency}</h3>  
            <h3>${missions[t].objective}</h3>  
            <h3>${missions[t].launchDate}</h3> 
          </div>`;
      }
    }
    containerMissions.style.display = "flex";
    containerMissions.innerHTML = allHtml;  // تعيين مرة واحدة
  }

  // إضافة محتوى إضافي
  if (content !== undefined && containerFv) {
    containerFv.style.display = "flex";
    containerFv.innerHTML += content;
  }
}

/************************************ أحداث الصفحة (مرة واحدة فقط) ***************************************/
// زر الإلغاء
buttonCancel.addEventListener("click", function () {
  containerMissions.innerHTML = "";
  displayMissions(undefined, "all", undefined);
});

// أيقونة المفضلات
favLogo.addEventListener("click", displayFavorites);

// البحث (case-insensitive)
searchInput.addEventListener("keyup", function () {
  const searchTerm = searchInput.value.toLowerCase().trim();
  containerMissions.innerHTML = "";
  buttonCancel.style.visibility = "visible";
  labelTitle.innerHTML = "Result Search";
  for (let z = 0; z < missions.length; z++) {
    const nameLower = missions[z].name.toLowerCase();
    if (nameLower.includes(searchTerm) && missions[z].status === 1) {
      displayMissions(z, "one", undefined);
    }
  }
});

// التصفية (ملء مرة واحدة، listeners مرة واحدة)
function setupFilters() {
  if (selectAgency) selectAgency.innerHTML = "";
  if (selectDate) selectDate.innerHTML = "";
  for (let aa = 0; aa < missions.length; aa++) {
    if (missions[aa].status === 1) {
      selectAgency.innerHTML +=` <option value="${missions[aa].agency}">${missions[aa].agency}</option>`;
      selectDate.innerHTML += `<option value="${missions[aa].launchDate}">${missions[aa].launchDate}</option>`;
    }
  }
}
setupFilters();  // ملء مرة واحدة

selectAgency.addEventListener("change", function () {
  containerMissions.innerHTML = "";
  filterContainer.style.display = "none";
  for (let ar = 0; ar < missions.length; ar++) {
    if (missions[ar].agency === selectAgency.value && missions[ar].status === 1) {
      buttonCancel.style.visibility = "visible";
      labelTitle.innerHTML = "Filtre";
      displayMissions(ar, "one", undefined);
    }
  }
});

selectDate.addEventListener("change", function () {
  containerMissions.innerHTML = "";
  filterContainer.style.display = "none";
  for (let ay = 0; ay < missions.length; ay++) {
    if (missions[ay].launchDate === selectDate.value && missions[ay].status === 1) {
      buttonCancel.style.visibility = "visible";
      labelTitle.innerHTML = "Filtre";
      displayMissions(ay, "one", undefined);
    }
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
  containerFv.innerHTML = "";
  const isVisible = window.getComputedStyle(containerFv).display === "flex";  // تحقق صحيح
  if (isVisible) {
    containerFv.style.display = "none";
  } else {
    containerFv.style.display = "flex";
    displayMissions(undefined, undefined, contentAddCard);
    const inputName = document.getElementById("input_name_add");
    if (inputName) inputName.focus();
  }
});

/************************************ عرض المفضلات ***************************************/
function displayFavorites() {
  buttonCancel.style.visibility = "visible";
  containerMissions.innerHTML = "";
  labelTitle.innerHTML = "Favorites";
  for (let b = 0; b < missions.length; b++) {
    if (missions[b].in_favorite === 1 && missions[b].status === 1) {  // تصحيح الشرط
      displayMissions(b, "one", undefined);
    }
  }
}

/************************************ التحرير ***************************************/
// عرض وضع التحرير (لمهمة واحدة فقط، بدون عرض الآخرين)
function displayEdit(index) {
  buttonCancel.style.visibility = "hidden";
  labelTitle.innerHTML = "Edit Mission";
  containerMissions.innerHTML = "";
  const mission = missions[index];
  const editHtml = `
    <div class="mission_card mission_card_edit" id="edit_card">  
      <div class="container_label_button">
        <h1 class="label_edit">Edit Mission</h1>
        <button id="button_cancel_edit" class="button_">Cancel</button>
      </div>
      <div class="choix_et_menu_div">  
        <button class="btn_supprimer" onclick="deleteMission(${index})"></button>   
        <button class="btn_favorit ${mission.in_favorite === 1 ? 'active' : ''}" id="btn_${index}" onclick="toggleFavorite(${index})"></button>  
      </div>  
      <img class="misions_img" src="${mission.image}" alt="">  
      <input type="text" id="input_name" value="${mission.name}">
      <input type="text" id="input_agency" value="${mission.agency}">
      <input type="text" id="input_objective" value="${mission.objective}">  // تصحيح الاسم
      <input type="date" id="input_date" value="${mission.launchDate}">
      <button id="submit" onclick="save(${index})" style="align-self: center;">Save</button>
    </div>`;
  containerMissions.innerHTML = editHtml;
  containerMissions.style.display = "flex";

  // listener للإلغاء (مرة واحدة)
  const cancelEditBtn = document.getElementById("button_cancel_edit");
  cancelEditBtn.addEventListener("click", function () {
    containerMissions.innerHTML = "";
    containerFv.style.display = "none";
    displayMissions(undefined, "all", undefined);
  });
}

function edit(index) {
  displayEdit(index);
  containerFv.innerHTML = "";
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
</div>`;  // تصحيح IDs وأسماء

// listener لإلغاء الإضافة (مرة واحدة)
document.addEventListener("click", function(e) {
  if (e.target.id === "button_cancel_add") {
    const addCard = document.getElementById("add_card");
    if (addCard) addCard.style.display = "none";
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

  if (nameVal && agencyVal && objectiveVal && dateVal) {  // تحقق بسيط
    const newMission = {
      id: missions.length + 1,
      status: 1,
      in_favorite: 0,
      name: nameVal,
      agency: agencyVal,
      objective: objectiveVal,
      launchDate: dateVal,
      image: "images/rosetta.png",  // صورة افتراضية
    };
    containerFv.style.display = "none";
    containerMissions.innerHTML = "";
    missions.push(newMission);
    displayMissions(undefined, "all", undefined);

    // مسح الحقول
    inputName.value = "";
    inputAgency.value = "";
    inputObjective.value = "";
    inputDate.value = "";
  } else {
    addCard.style.boxShadow = "1px 1px 10px 5px rgb(201, 0, 0)";
  }
}

/************************************ الحذف ***************************************/
function deleteMission(index) {
  missions[index].status = 0;
  containerMissions.innerHTML = "";
  displayMissions(undefined, "all", undefined);
}

/************************************ المفضلة ***************************************/
function toggleFavorite(d) {
  missions[d].in_favorite = missions[d].in_favorite === 0 ? 1 : 0;
  const btn = document.getElementById("btn_${d}");
  if (btn) {
    btn.classList.toggle("active");  // تحديث الزر مباشرة
  }
  containerMissions.innerHTML = "";
  displayMissions(undefined, "all", undefined);
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
    displayMissions(undefined, "all", undefined);
  } else {
    card.style.boxShadow = "1px 1px 10px 5px rgb(201, 0, 0)";
  }
}