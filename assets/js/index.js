const SIDE_NAV_TOGGLER = document.querySelector("#sidenav+#main #nav-toggler");
const SIDE_NAV = document.querySelector("#sidenav");
const MAIN_CONT = document.querySelector("#sidenav+#main");
if(SIDE_NAV_TOGGLER && SIDE_NAV && MAIN_CONT){
    SIDE_NAV_TOGGLER.addEventListener("click", function () {
        if (SIDE_NAV.classList.contains("navbar-slideout")) {
            document.querySelectorAll(".abs-menu-item .text").forEach((elem) => elem.style.display = "none");
            SIDE_NAV.classList.replace("navbar-slideout", "navbar-slidein");
        }
        else {
            document.querySelectorAll(".abs-menu-item .text").forEach((elem) => elem.style.display = "block");
            SIDE_NAV.classList.replace("navbar-slidein", "navbar-slideout");
        }
        if(MAIN_CONT.classList.contains("main-slideout"))
            MAIN_CONT.classList.replace("main-slideout", "main-slidein");
        else
            MAIN_CONT.classList.replace("main-slidein", "main-slideout");
    });
}

const STYLED_FORM_LABEL = document.querySelectorAll(".abs-input-styled .label");
const STYLED_FORM_INPUT = document.querySelectorAll(".abs-input-styled .abs-form-input");
if(STYLED_FORM_INPUT && STYLED_FORM_LABEL){
    STYLED_FORM_LABEL.forEach((elem, index) => {
        STYLED_FORM_INPUT[index].addEventListener("focus", ()=>{
            elem.classList.replace("label", "abs-label");
        });
        STYLED_FORM_INPUT[index].addEventListener("blur", ()=>{
            elem.classList.replace("abs-label", "label");
        })
    })
}

const NAV_TOGGLER = document.querySelector("#navbar #nav-toggler");
const NAV_MENU = document.querySelector("#navbar #nav-menu");
const NAV_CLOSE = document.querySelector("#navbar #nav-menu #nav-close");
if (NAV_TOGGLER && NAV_MENU && NAV_CLOSE) {
    NAV_TOGGLER.addEventListener("click", function () {
        NAV_MENU.classList.add("abs-mobile");
    });

    NAV_CLOSE.addEventListener("click", function () {
        NAV_MENU.classList.remove("abs-mobile");
    });
}

const TABS = document.querySelectorAll(".abs-tab .abs-tab-navs .abs-nav-item[data-tab]");
const TAB_ITEM = document.querySelectorAll(".abs-tab .abs-tab-group .abs-tab-item");
if(TABS){
    let activeTab = activeTabItem = null;
    let tabs = []
    TAB_ITEM.forEach((elem, index)=>{
        elem.classList.contains("active") ? activeTabItem = elem : null
    })
    TABS.forEach((elem, index)=>{
        let elemDt = elem.dataset.tab;
        elem.classList.contains("active") ? activeTab = elem : null;
        tabs.push(elemDt)
        elem.addEventListener("click", function(){
            if(!elem.classList.contains("active")){
                if(activeTab)
                    activeTab.classList.remove("active");
                elem.classList.add("active");
                activeTab = elem
                if(activeTabItem)
                    activeTabItem.classList.remove("active");
                activeTabItem = document.querySelector(".abs-tab .abs-tab-group .abs-tab-item"+elem.dataset.tab);
                activeTabItem.classList.add("active");
            }
        })
    })
}

const CHUNK_INPUTS = document.querySelectorAll(".abs-chunk-input-group .abs-chunk-item");
if(CHUNK_INPUTS){
    const SPECIAL_KEYS = ["ArrowRight", "ArrowLeft", "Shift", "Backspace", "Alt", "Control", "Backspace"];
    let parentElem = null;
    CHUNK_INPUTS.forEach((elem, index) => {
        elem.addEventListener("keydown", function(event){
            parentElem = elem.parentNode;
            if(event.key == "Backspace"){
                if(this.value.length == 0 && index > 0){
                    event.preventDefault();
                    CHUNK_INPUTS[index - 1].focus();
                }
            }
            if(parentElem.getAttributeNames().indexOf("is-numeric") == 1){
                if(!Number(event.key) && SPECIAL_KEYS.indexOf(event.key) == -1)
                    event.preventDefault();
                else
                    (SPECIAL_KEYS.indexOf(event.key) != -1 && event.key != "Backspace") ? null : this.value = "";
            }
        });
        elem.addEventListener("input", function(event){
            if(parentElem.children.length - 1 > index)
                CHUNK_INPUTS[index + 1].focus();
        })
    })
}