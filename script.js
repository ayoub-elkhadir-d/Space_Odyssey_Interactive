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
aficher();
/*********************************aficher******************************************/
function aficher_sur_container_top(index, creat_card, conten) {
  /*--------------pour aficher -----------*/
  if (creat_card == false) {
    var content = ` <div class="mission_card" style="width:200px;">  
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
                    </div>`;

    container2.style.display = "flex";
    container2.innerHTML += content;

    /*--------------pour creat card -----------*/
  }
  if (creat_card == true) {
    container2.style.display = "flex";
    container2.innerHTML += conten;
  }
}

function aficher(index) {
  let container = document.getElementById("misions_div");
  container.innerHTML = "";
  for (var t = 0; t < misions.length; t++) {
    if (misions[t].status == 1) {
      if (t == index) {
        container.innerHTML += `
                      <div class="mission_card mission_card_edit ">  
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
}
/************************************add***************************************/
var content_add_card = `<div class="mission_card mission_card_edit ">   
                        <h1>add Misions</h1>
                        <input type="text" id="input_name"  placeholder="Enter name">
                        <input type="text" id="input_agence" placeholder="Enter agence">
                        <input type="text" id="input_discription" placeholder="Enter description">
                        <input type="text" id="input_date" value="" placeholder="Enter Date">
                        <button id="submit" style="align-self: center;">save</button>
                      </div>`;

document.getElementById("button_add").addEventListener("click", function () {
  container2.innerHTML = "";
  if (container2.style.display == "flex") {
    container2.style.display = "none";
  } else {
    container2.style.display = "flex";
    aficher_sur_container_top(0, true, content_add_card);
  }
});
/************************************suprimer***************************************/
function suprimer(index) {
  misions[index].status = 0;
  document.getElementById("misions_div").innerHTML = "";
  afficher_favorits();
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
  document.getElementById("popupp").style.display = "none";
  misions[index].name = document.getElementById("input_name").value;
  misions[index].agency = document.getElementById("input_agence").value;
  misions[index].objective = document.getElementById("input_discription").value;
  misions[index].launchDate = document.getElementById("input_date").value;
  document.getElementById("misions_div").innerHTML = "";
  aficher();
}

/********************************afficher_favorits*******************************************/
function afficher_favorits() {
  container2.innerHTML = "";
  if (container2.style.display == "flex") {
    container2.style.display = "none";
  } else {
    container2.style.display = "flex";
    for (var b = 0; b < misions.length; b++) {
      if (misions[b].in_favorite == 1 && misions[b].status != 0) {
        aficher_sur_container_top(b, false);
      }
    }
  }
}
var a = document
  .getElementById("fav_logo")
  .addEventListener("click", afficher_favorits);

/***********************************search****************************************/
var search = document.getElementById("search");
var text_typing = "";
search.addEventListener("keyup", (event) => {
  container2.innerHTML = "";
  for (var z = 0; z < misions.length; z++) {
    var name_to_lower = misions[z].name.toLowerCase();
    if (name_to_lower.startsWith(search.value) && misions[z].status != 0) {
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
    select1.addEventListener("change", function () {
      container2.innerHTML = "";
      container4.style.display = "none";
      for (var ae = 0; ae < misions.length; ae++) {
        if (misions[ae].name == select1.value && misions[ae].status != 0) {
          aficher_sur_container_top(ae, false);
        }
      }
    });

    select2.addEventListener("change", function () {
      container2.innerHTML = "";
      container4.style.display = "none";
      for (var ar = 0; ar < misions.length; ar++) {
        if (misions[ar].agency == select2.value && misions[ar].status != 0) {
          aficher_sur_container_top(ar, false);
        }
      }
    });

    select3.addEventListener("change", function () {
      container2.innerHTML = "";
      container4.style.display = "none";
      for (var ay = 0; ay < misions.length; ay++) {
        if (
          misions[ay].launchDate == select3.value &&
          misions[ay].status != 0
        ) {
          aficher_sur_container_top(ay, false);
        }
      }
    });
  }
}

button_filter.addEventListener("click", filter_fun);

/****************************************close all windows if click in body**********************************
document.getElementById("main").addEventListener("click",function(){
container2.style.display = "none";
container4.style.display = "none";
})

*/
