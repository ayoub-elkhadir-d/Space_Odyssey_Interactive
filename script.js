let misions = [
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
  {
    id: 6,
    status: 1,
    in_favorite: 0,
    name: "James Webb Space Telescope",
    agency: "NASA / ESA / CSA",
    objective: "Observation de l’univers lointain en infrarouge",
    launchDate: "2021-12-25",
    image: "images/jwst.png",
  },
  {
    id: 7,
    status: 1,
    in_favorite: 0,
    name: "Hayabusa2",
    agency: "JAXA",
    objective: "Retour d’échantillons de l’astéroïde Ryugu",
    launchDate: "2014-12-03",
    image: "images/hayabusa2.png",
  },
  {
    id: 8,
    status: 1,
    in_favorite: 0,
    name: "ExoMars Trace Gas Orbiter",
    agency: "ESA / Roscosmos",
    objective: "Analyse des gaz rares dans l’atmosphère martienne",
    launchDate: "2016-03-14",
    image: "images/exomars.png",
  },
  {
    id: 9,
    status: 1,
    in_favorite: 0,
    name: "Luna 2",
    agency: "USSR",
    objective: "Premier impact contrôlé sur la Lune",
    launchDate: "1959-09-12",
    image: "images/luna2.png",
  },
  {
    id: 10,
    status: 1,
    in_favorite: 0,
    name: "Chang’e 5",
    agency: "CNSA",
    objective: "Retour d’échantillons lunaires chinois",
    launchDate: "2020-11-23",
    image: "images/change5.png",
  },
];
/************************************main***************************************/
var container2 = document.getElementById("container_fv");
let container = document.getElementById("misions_div");
let label = document.getElementById("labell");
let container_all = document.getElementById("container_");
let button_cancel_ = document.getElementById("button_cancel");

 aficher(undefined,"all",undefined)
/***************************************************************************/
button_cancel_.addEventListener("click", function () {
  container.innerHTML = "";
  aficher(undefined,"all",undefined)
});

function aficher(index,type_de_afichage,conten) { 
// index: index de elemen si nous avan aficher un mision seul
//  type_de_afichage :le type de afichage si un mition seul en ecrire "one" si all misions ecrire "all"
// content: utilise pour creier un card 

  if (type_de_afichage=="one") {  
       var content = `<div class="mission_card" style="width:200px;">
                      <div class="choix_et_menu_div" >  
                        <button class="btns" onclick="edit(${index})"></button>   
                        <button class="btn_suprimer" onclick="suprimer(${index})"></button>   
                        <button class="btn_favorit" id="btn_${index}" onclick="favorit(${index})"></button>  
                      </div>  
                      <img class="misions_img" src="${misions[index].image}" alt="">  
                      <h3>${misions[index].name}</h3>  
                      <h3> ${misions[index].agency}</h3>  
                      <h3> ${misions[index].objective} </h3>  
                      <h3> ${misions[index].launchDate} </h3> 
                    </div> `;
    container.style.display = "flex";
    container.innerHTML += content;

  }
    // pour aficher all misions
    if (type_de_afichage=="all") {
    for (var t = 0; t < misions.length; t++) {
     if (misions[t].status == 1) {
     var content2 = `<div class="mission_card" style="width:200px;">
                      <div class="choix_et_menu_div" >  
                        <button class="btns" onclick="edit(${t})"></button>   
                        <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
                        <button class="btn_favorit" id="btn_${t}" onclick="favorit(${t})"></button>  
                      </div>  
                      <img class="misions_img" src="${misions[t].image}" alt="">  
                      <h3>${misions[t].name}</h3>  
                      <h3> ${misions[t].agency}</h3>  
                      <h3> ${misions[t].objective} </h3>  
                      <h3> ${misions[t].launchDate} </h3> 
                    </div> `;
    container.style.display = "flex";
    container.innerHTML += content2; 
    }
  }
    }

    
  if (conten != undefined) {
    container2.style.display = "flex";
    container2.innerHTML += conten;
  }
}

function edit_d(index) {
  button_cancel_.style.visibility = "hidden";
  label.innerHTML = "Missions";
  container.innerHTML = "";
  for (var t = 0; t < misions.length; t++) {
    if (misions[t].status == 1) {
      if (t == index) {
        container.innerHTML += `
    <div class="mission_card mission_card_edit " id ="card">  
        <div class="container_label_button">
          <h1 id="labell" class="label_">Add Misions</h1>
          <button id="button_cancel_edit" class="button_"></button>
        </div>
      <div class="choix_et_menu_div">  
        <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
        <button class="btn_favorit" id="btn_${t}" onclick="favorit(${t})"></button>  
      </div>  
      <img class="misions_img" src="${misions[t].image}" alt="">  
      <input type="text" id="input_name" value="${misions[index].name}">
      <input type="text" id="input_agence" value="${misions[index].agency}">
      <input type="text" id="input_discription" value="${misions[index].objective}">
      <input type="text" id="input_date" value="${misions[index].launchDate}">
      <button id="submit" onclick="save(${index})" style="align-self: center;">save</button>
    </div>`;
      
    }
    if (t != index) {
        if (misions[t].in_favorite == 0) {
          aficher(t,"one",undefined)
        }

        if (misions[t].in_favorite == 1) {
          aficher(t,"one",undefined)
      }
  }
      
    }
  }
}   
    
  

/**************************************edit*************************************/
function edit(index) {
  edit_d(index);
  container2.innerHTML = "";
   
  const cancelEditBtn = document.getElementById("button_cancel_edit");

  cancelEditBtn.addEventListener("click", function () {
      container.innerHTML = "";
    container2.style.display="none"   
    aficher(undefined,"all",undefined)
  });
}

/************************************add***************************************/
var content_add_card = `
<div class="mission_card mission_card_edit add" id="add_card">   
                        
              <div class="container_label_button">
                  <h1 id="labell" class="label_">Add Misions</h1>
                  <button id="button_cancel_add" class="button_"></button>
                </div>
                        <input type="text" id="input_name"  placeholder="Enter name">
                        <input type="text" id="input_agence" placeholder="Enter agence">
                        <input type="text" id="input_discription" placeholder="Enter description">
                        <input type="date" id="input_date" value="" placeholder="Enter Date">
                        <button id="submit" onclick="submit_mission()" style="align-self: center;">save</button>
                      </div>`;

function submit_mission() {
  var card__ = document.getElementById("add_card");
  var input_name_ = document.getElementById("input_name");
  var input_agence__ = document.getElementById("input_agence");
  var input_discription_ = document.getElementById("input_discription");
  var input_date_ = document.getElementById("input_date");
  var legnth_m = misions.length + 1;
  if (
    input_name_.value != "" &&
    input_agence__.value != "" &&
    input_discription_.value != "" &&
    input_date_.value != ""
  ) {
    var new_mission = {
      id: legnth_m,
      status: 1,
      in_favorite: 0,
      name: input_name_.value,
      agency: input_agence__.value,
      objective: input_discription_.value,
      launchDate: input_date_.value,
      image: "images/rosetta.png",
    };

    container2.style.display = "none";
    document.getElementById("misions_div").innerHTML = "";
    misions.push(new_mission);
    aficher(undefined,"all",undefined)
  } else {
    card__.style.boxShadow = "1px 1px  10px 5px rgb(201, 0, 0)";
  }
}

document.getElementById("button_add").addEventListener("click", function () {
  container2.innerHTML = "";
   console.log("a")
  if (container2.style.display == "flex") {
      console.log("b")
    container2.style.display = "none";
  } else {
      console.log("c")
    container2.style.display = "flex";
    aficher(undefined, undefined, content_add_card);
      console.log("d")
    document.getElementById("input_name").focus();
  
    document
      .getElementById("button_cancel_add")
      .addEventListener("click", function () {
        document.getElementById("add_card").style.display = "none";
      });
  }
});

/************************************suprimer***************************************/
function suprimer(index) {
  misions[index].status = 0;
  document.getElementById("misions_div").innerHTML = "";
  aficher(undefined,"all",undefined)
}
/***********************************favorit****************************************/
function favorit(d) {
  if (misions[d].in_favorite == 0) {
    misions[d].in_favorite = 1;
    document.getElementById("misions_div").innerHTML = "";
    aficher(undefined,"all",undefined)
  } else {
    misions[d].in_favorite = 0;

    document.getElementById("misions_div").innerHTML = "";
    aficher(undefined,"all",undefined)
  }
}
/*********************************** save ****************************************/
function save(index) {
  var card_ = document.getElementById("card");
  var input_name_ = document.getElementById("input_name");
  var input_agence__ = document.getElementById("input_agence");
  var input_discription_ = document.getElementById("input_discription");
  var input_date_ = document.getElementById("input_date");
  if (
    input_name_.value != "" &&
    input_agence__.value != "" &&
    input_discription_.value != "" &&
    input_date_.value != ""
  ) {
    misions[index].name = input_name_.value;
    misions[index].agency = input_agence__.value;
    misions[index].objective = input_discription_.value;
    misions[index].launchDate = input_date_.value;

    document.getElementById("misions_div").innerHTML = "";
    aficher(undefined,"all",undefined)
    document.getElementById("popupp").style.display = "none";
  } else {
    card_.style.boxShadow = "1px 1px  10px 5px rgb(201, 0, 0)";
  }
}

/******************************** afficher_favorits *******************************************/
function afficher_favorits() {
  button_cancel_.style.visibility = "visible";
  container.innerHTML = "";
  label.innerHTML = "Favorits";
  for (var b = 0; b < misions.length; b++) {
    if (misions[b].in_favorite == 1 && misions[b].status != 0) {
      aficher(b,"one",undefined)
    }
  }
}
var a = document
  .getElementById("fav_logo")
  .addEventListener("click", afficher_favorits);

/*********************************** search ****************************************/
var search = document.getElementById("search");
var text_typing = "";
search.addEventListener("keyup", (event) => {
  container.innerHTML = "";
  button_cancel_.style.visibility = "visible";
  label.innerHTML = "Result Search";

  for (var z = 0; z < misions.length; z++) {
    var name_to_lower = misions[z].name.toLowerCase();

    if (name_to_lower.includes(search.value) && misions[z].status != 0) {
      aficher(z,"one",undefined)
    }
  }
});
/***********************************filter***********************************/
var container4 = document.getElementById("filter_container");
var button_filter = document.getElementById("filter");
var select1 = document.getElementById("select_1");
var select2 = document.getElementById("select_2");
var select3 = document.getElementById("select_3");

function filter_fun() {
  if (container4.style.display == "flex") {
    container4.style.display = "none";
  } else {
    container4.style.display = "flex";
    document.getElementById("select_1").innerHTML = "";
    document.getElementById("select_2").innerHTML = "";
    document.getElementById("select_3").innerHTML = "";
    for (var aa = 0; aa < misions.length; aa++) {
      select1.innerHTML += `<option value="${misions[aa].name}">${misions[aa].name}</option>`;
      select2.innerHTML += `<option value="${misions[aa].agency}">${misions[aa].agency}</option>`;
      select3.innerHTML += `<option value="${misions[aa].launchDate}">${misions[aa].launchDate}</option>`;
    }

    select1.addEventListener("change", function () {
      container.innerHTML = "";
      container4.style.display = "none";
      for (var ae = 0; ae < misions.length; ae++) {
        if (misions[ae].name == select1.value && misions[ae].status != 0) {
          button_cancel_.style.visibility = "visible";
          label.innerHTML = "Filtre";
         aficher(ae,"one",undefined)
        }
      }
    });

    select2.addEventListener("change", function () {
      container.innerHTML = "";
      container4.style.display = "none";
      for (var ar = 0; ar < misions.length; ar++) {
        if (misions[ar].agency == select2.value && misions[ar].status != 0) {
          button_cancel_.style.visibility = "visible";
          label.innerHTML = "Filtre";
         aficher(ar,"one",undefined)
        }
      }
    });

    select3.addEventListener("change", function () {
      container.innerHTML = "";
      container4.style.display = "none";
      for (var ay = 0; ay < misions.length; ay++) {
        if (
          misions[ay].launchDate == select3.value &&
          misions[ay].status != 0
        ) {
          button_cancel_.style.visibility = "visible";
          label.innerHTML = "Filtre";
          aficher(ay,"one",undefined)
        }
      }
    });
  }
}

button_filter.addEventListener("click", filter_fun);


