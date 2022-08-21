// ==UserScript==
// @name         Country Ban List
// @namespace    https://github.com/cykvta/GCCountryBanList
// @version      1.0
// @description  try to take over the world!
// @author       Cykvta
// @match        https://gamersclub.com.br/lobby*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=gamersclub.com.br
// @grant        none
// ==/UserScript==

(async function() {

    const box = document.createElement("div")
    box.classList.add("FilterLobby_main__23Z64")
    box.style.maxHeight = "100rem";
    box.style.top = "16rem";
    box.style.left = "80%";
    box.style.position = "fixed";
    box.style.display = "block";
    box.innerHTML = "<p class='FilterLobby_sectionLabel__1zPew'>Country Ban List</p> <p class='FilterLobby_sectionLabel__1zPew'></p>"

    const countryListHtml = document.createElement("ul")
    countryListHtml.style.listStyleType = "none"

    let countryList = "";
    let list = ["Brasil", "Argentina", "Chile", "Uruguai", "Paraguai", "Estados Unidos", "Peru"]
    for (let i =0; i < list.length; i++) {
        countryList += '<li> <input type="checkbox" id="'+ list[i] +'_box" value='+ list[i] +'><label style="color:white" for="'+ list[i] +'_box">'+ list[i] +'</label></li>'
    }

    countryListHtml.style.marginLeft = "-0.05rem"
    countryListHtml.style.cursor = "pointer"
    countryListHtml.innerHTML = countryList


    document.getElementsByClassName("page")[0].appendChild(box)
    box.appendChild(countryListHtml)


    while (true) {
        const countryCheckList = {}
        for (let i =0; i < list.length; i++) {
            let selected = list[i]
            countryCheckList[selected] = document.getElementById(selected + "_box").checked
        }

        let lobbyList = document.getElementsByClassName("lobby-room-list-item")

        for (let i = 0; i < lobbyList.length; i++){
            let dataList = lobbyList[i].getElementsByClassName("sala-card-country");
            let lobby = lobbyList[i]

            if (dataList.length == 0) continue;
            let country = dataList[0].getAttribute("title");

            for (let key in countryCheckList){
                if (country != key) continue;

                if (countryCheckList[key]){
                    lobby.style.width = 0
                    lobby.style.height = 0
                    lobby.style.visibility = "hidden"
                }else{
                    lobby.style.width = null
                    lobby.style.height = null
                    lobby.style.visibility = "visible"
                }
            }
        }

        await sleep(200)
        }
    }
)();

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}