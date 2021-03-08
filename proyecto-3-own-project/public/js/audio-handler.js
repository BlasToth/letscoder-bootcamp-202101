        const figcaptions = document.querySelectorAll(".figcaption");
        const sounds = document.querySelectorAll(".audio");

        for (let i = 0; i < figcaptions.length; i++) {
            figcaptions[i].addEventListener("click",() => {
                sounds[i].play();
            });
        }
    