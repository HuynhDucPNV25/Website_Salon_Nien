const slideData = [
    { imageSrc: "../../image/pd1.png" },
    { imageSrc: "../../image/pd2.png" },
    { imageSrc: "../../image/GGG 2.png" }
  ];
  
  const createCarouselSlide = (slide, isActive) => {
    const slideElement = document.createElement("div");
    slideElement.classList.add("carousel-item");
    if (isActive) {
      slideElement.classList.add("active");
    }
    slideElement.innerHTML = `
      <div>
        <img src="${slide.imageSrc}" alt="">
      </div>
    `;
    document.getElementById("carouselInner").appendChild(slideElement);
  };
  
  slideData.forEach(function(slide, index) {
    const isActive = index === 0 ? true : false;
    createCarouselSlide(slide, isActive);
  });