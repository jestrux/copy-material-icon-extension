let sideNav, iconDetailSidebarOpen = false, 
    downloadButton, copyButton;

window.onload = function(){
    sideNav = document.querySelector(".drawer--icon-details");
    var observer = new MutationObserver(function(mutations) {
        const classesChanged = mutations.find(({attributeName}) => attributeName === "class");
        if(classesChanged)
            handleClassesChanged();
    });
    
    if(sideNav)
        observer.observe(sideNav, {attributes: true});
}

function handleClassesChanged(){
    if(!iconDetailSidebarOpen && sideNav.classList.contains('mat-drawer-opened')){
        if(!downloadButton){
            downloadButton = document.querySelector(".side-nav-links__download-buttons > a:first-child");
            createCopyButton();
        }
    }
}

function createCopyButton(){
    copyButton = document.createElement("button");
    copyButton.style.width = "100%";
    copyButton.innerHTML = /*html*/`
        <span class="icon-asset material-icons"
            style="font-size: 14px; margin-right: 0.3rem;"
        >
            content_copy
        </span>
        COPY
    `;
    copyButton.className = downloadButton.className;
    downloadButton.parentElement.prepend(copyButton);
    downloadButton.style.display = "none";

    copyButton.addEventListener("click", copyIcon);
}

async function copyIcon() {
    const value = downloadButton.getAttribute("href");
    const icon = await downloadIcon(value);
    await navigator.clipboard.writeText(icon);
}

async function downloadIcon(iconPath) {
    const res = await fetch(iconPath);
    const icon = await res.text();
    return icon;
}