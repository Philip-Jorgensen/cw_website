function downloadURI(uri) {
}

var shareState = false;

class Lightbox {
    static activate(img) {
        document.body.insertAdjacentHTML("beforeend", `
            <div class="lightbox" id="lightbox" style="display: none;">
                <div class="lightbox__inner">
                    <button type="button" class="lightbox__close lightbox_btn">
                        &times;
                    </button>
                    <button type="button" class="lightbox_btn lightbox_download">
                    <i class="fas fa-download"></i>
                    </button>
                    <button type="button" class="lightbox_btn lightbox_share view-modal">
                    <i class="fas fa-share-square"></i>
                    </button>
                    <div class="lightbox__content"></div>
                </div>
            </div>
        `);
        
        const lightBox = document.querySelector("#lightbox");
        const btnClose = lightBox.querySelector(".lightbox__close");
        const content = lightBox.querySelector(".lightbox__content");
        const btnDownload = lightBox.querySelector(".lightbox_download");
        const shareBtn = lightBox.querySelector(".lightbox_share");
        const closeLightbox = () => {
            lightBox.style.display = "none";
            content.innerHTML = "";
        };

        lightBox.addEventListener("mousedown", e => {
            if (e.target.matches("#lightbox")) {
                closeLightbox();
            }
        });

        btnClose.addEventListener("click", () => {
            closeLightbox();
            if (shareState){
                sharePopup();
                shareState = false;
            }
        });

        // btnDownload.addEventListener("click", () => {
        //     downloadURI(img);
        // });

        shareBtn.addEventListener("click", () => {
            if (shareState == false){
                sharePopup();
                shareState = true;
            }
            
        });

    }

    static show(htmlOrElement) {
        const content = document.querySelector("#lightbox .lightbox__content");
        const caption = document.querySelector("#lightbox .lightbox_caption");

        document.querySelector("#lightbox").style.display = null;

        if (typeof htmlOrElement === "string") {
            content.innerHTML = htmlOrElement;
        } else {
            content.innerHTML = "";
            content.appendChild(htmlOrElement);
        }
    }
}

function lb(img){
    Lightbox.activate(img);
    Lightbox.show(`<img src=${img} class="img-fluid">`);
}

function sharePopup(){
    const popup = document.querySelector(".popup"),
    close = popup.querySelector(".close"),
    field = popup.querySelector(".field"),
    input = field.querySelector("input"),
    copy = field.querySelector("button");

    popup.classList.toggle("show");

    close.onclick = ()=>{
        popup.classList.toggle("show");
        if (shareState){
            shareState = false;
        }
    }

    copy.onclick = ()=>{
        input.select();
        if(document.execCommand("copy")){
            field.classList.add("active");
            copy.innerText = "Copied";
            setTimeout(()=>{
                window.getSelection().removeAllRanges();
                field.classList.remove("active");
                copy.innerText = "Copy";
            }, 3000);
        }
    }
}