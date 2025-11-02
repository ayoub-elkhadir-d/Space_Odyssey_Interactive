let misions = [
  {
    id: 1,
    status: 1,
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
    objective: "Test du système de lancement SLS et d Orion",
    launchDate: "2022-11-16",
    image: "images/artemis.png",
  },
];
/************************************main***************************************/
var container2 = document.getElementById("container_fv");
let container = document.getElementById("misions_div");
let label = document.getElementById("labell");
let container_all = document.getElementById("container_");
let button_cancel_ = document.getElementById("button_cancel");
                                             

aficher();
/***************************************************************************/
button_cancel_.addEventListener("click", function () {
  container.innerHTML = "";
  aficher();
});
/*********************************aficher******************************************/
function aficher_sur_container_top(index, creat_card, conten) {
  /*--------------pour aficher -----------*/
  if (creat_card == false) {
    var content = `
               
                  <div class="mission_card" style="width:200px;">
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
                    </div>
                  
                    `;

    container.style.display = "flex";
    container.innerHTML += content;

    /*--------------pour creat card -----------*/
  }
  if (creat_card == true) {
    container2.style.display = "flex";
    container2.innerHTML += conten;
  }
}

function aficher(index) {
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
          container.innerHTML += `  
              <div class="mission_card">  
                <div class="choix_et_menu_div">  
                  <button class="btns" onclick="edit(${t})"></button>   
                  <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
                  <button class="btn_favorit" id="btn_${t}"  onclick="favorit(${t})"></button>  
                </div>  
                <img class="misions_img" src="${misions[t].image}" alt="">  
                <h3>${misions[t].name}</h3>  
                <h3> ${misions[t].agency}</h3>  
                <h3> ${misions[t].objective} </h3>  
                <h3> ${misions[t].launchDate} </h3> 
              </div>`;
        }

        if (misions[t].in_favorite == 1) {
          container.innerHTML += `  
              <div class="mission_card">  
                <div class="choix_et_menu_div">  
                  <button class="btns" onclick="edit(${t})"></button>   
                  <button class="btn_suprimer" onclick="suprimer(${t})"></button>   
                  <button class="btn_favorit" id="btn_${t}" style="background-image: url('images/in_favorite.png');width: 24px;" onclick="favorit(${t})"></button>  
                </div>  
                <img class="misions_img" src="${misions[t].image}" alt="">  
                <h3>${misions[t].name}</h3>  
                <h3> ${misions[t].agency}</h3>  
                <h3> ${misions[t].objective} </h3>  
                <h3> ${misions[t].launchDate} </h3> 
              </div>`;
        }
      }
    }
  }
}

/**************************************edit*************************************/
function edit(index) {
  aficher(index);
  container2.innerHTML = "";

  //
  const cancelEditBtn = document.getElementById("button_cancel_edit");

  cancelEditBtn.addEventListener("click", function () {
    aficher(); //
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
    aficher();
  } else {
    card__.style.boxShadow = "1px 1px  10px 5px rgb(201, 0, 0)";
  }
}

document.getElementById("button_add").addEventListener("click", function () {
  container2.innerHTML = "";

  if (container2.style.display == "flex") {
    container2.style.display = "none";
  } else {
    container2.style.display = "flex";
    aficher_sur_container_top(0, true, content_add_card);
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
  aficher();
}
/***********************************favorit****************************************/
function favorit(d) {

  if (misions[d].in_favorite == 0) {
    misions[d].in_favorite = 1;
    document.getElementById("misions_div").innerHTML = "";
    aficher();
  } else {
    misions[d].in_favorite = 0;

    document.getElementById("misions_div").innerHTML = "";
    aficher();
  }
}
/***********************************save****************************************/
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
    aficher();
    document.getElementById("popupp").style.display = "none";
  } else {
    card_.style.boxShadow = "1px 1px  10px 5px rgb(201, 0, 0)";
  }
}

/******************************** afficher_favorits*******************************************/
function afficher_favorits() {
  button_cancel_.style.visibility = "visible";
  container.innerHTML = "";
  label.innerHTML = "Favorits";
  for (var b = 0; b < misions.length; b++) {
    if (misions[b].in_favorite == 1 && misions[b].status != 0) {
      aficher_sur_container_top(b, false);
    }
  }
}
var a = document
  .getElementById("fav_logo")
  .addEventListener("click", afficher_favorits);

/***********************************search****************************************/
var search = document.getElementById("search");

search.addEventListener("keyup", (event) => {
  container.innerHTML = "";
  button_cancel_.style.visibility = "visible";
  label.innerHTML = "Result Search";

  for (var z = 0; z < misions.length; z++) {
    var name_to_lower = misions[z].name.toLowerCase();

    if (name_to_lower.includes(search.value) && misions[z].status != 0) {
      aficher_sur_container_top(z, false);

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

    const cancelEditBtn = document.getElementById("button_cancel_filtr");
    cancelEditBtn.addEventListener("click", function () {
      container4.style.display = "none";
    });

    select1.addEventListener("change", function () {
      container.innerHTML = "";
      container4.style.display = "none";
      for (var ae = 0; ae < misions.length; ae++) {
        if (misions[ae].name == select1.value && misions[ae].status != 0) {
          button_cancel_.style.visibility = "visible";
          label.innerHTML = "Filtre";
          aficher_sur_container_top(ae, false);
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
          aficher_sur_container_top(ar, false);
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
          aficher_sur_container_top(ay, false);
        }
      }
    });
  }
}

button_filter.addEventListener("click", filter_fun);
/*********************************************************************************/

/*********************************************************************************/





