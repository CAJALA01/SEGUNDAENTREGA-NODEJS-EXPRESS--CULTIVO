let dinamicIndex = 0;

function DinamicImgs() {
            let i;
            let slides = document.getElementsByClassName("DinamicSlides");
            for (i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
            }
            dinamicIndex++;
            if (dinamicIndex > slides.length) {dinamicIndex = 1}
            slides[dinamicIndex-1].style.display = "block";
           
            setTimeout(DinamicImgs, 2000);
}

DinamicImgs();