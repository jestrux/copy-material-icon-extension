// Replace download SVG button
// Fetch the svg based on href of the download button
// Copy fetched svg into clipboard

let downloadButton, copyButton, toast;

window.addEventListener("load", function(){
    const iconDetailsSidebar = this.document.querySelector(".drawer--icon-details");
    // Listen for changes in class on icon detail sidebar
    setupSidebarListener(iconDetailsSidebar);
    setupToast();
});

function setupToast(){
    toast = document.createElement("div");
    toast.id = "copyMaterialIconToast";
    toast.innerHTML = "<span>Icon</span> &nbsp;copied to clipboard &nbsp;🎉";
    document.body.appendChild(toast);
}

function setupSidebarListener(sidebar){
    const observer = new MutationObserver(function(mutations) {
        const classChanged = mutations.find(({attributeName}) => attributeName == "class");

        if(classChanged){
            if(sidebar.classList.contains('mat-drawer-opened')){
                if(!copyButton)
                    replaceDownloadIconWithCopy();
            }
            else
                copyButton = null;
        }
    });

    observer.observe(sidebar, {attributes: true});
}

function replaceDownloadIconWithCopy(){
    downloadButton = document.querySelector(".side-nav-links__download-buttons a");
    downloadButton.style.display = "none";

    copyButton = document.createElement("button");
    copyButton.innerHTML = /*html*/`
        <span class="material-icons" style="font-size: 14px; margin-right: 0.8rem">content_copy</span>
        <span style="margin-right: 0.4rem">SVG</span>
    `;
    copyButton.style.width = "100%";
    copyButton.style.marginRight = "0.75rem";
    copyButton.className = downloadButton.className;

    downloadButton.parentElement.prepend(copyButton);

    copyButton.addEventListener("click", copyIcon);
}

async function copyIcon(){
    const res = await fetch(downloadButton.getAttribute("href"));
    const icon = await res.text();
    await navigator.clipboard.writeText(icon);
    toast.classList.add("show");

    toast.addEventListener('transitionend', () => {
        setTimeout(() => {
            toast.classList.remove("show");
        }, 1000);
    });

    toast.querySelector("span").innerHTML = icon;
}