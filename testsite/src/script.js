document.addEventListener("DOMContentLoaded", () => {
  const dropdownBtn = document.getElementById("dropdown-toggle");
  const dropdownMenu = document.getElementById("main-nav");
  const toggleArrow = document.getElementById("arrow");  

  const toggleDropdown = function () {
    dropdownMenu.classList.toggle("show");
    toggleArrow.classList.toggle("arrow");
  };

  dropdownBtn.addEventListener("click", function (e) {
    console.log('Click');
    e.stopPropagation();
    toggleDropdown();
  });
  console.log('DOMContentLoaded');

  const filterBtns = Array.from(document.getElementsByClassName("filter-type-btn"));
  const sectionContents = Array.from(document.getElementsByClassName("section-recommendations")[0]?.getElementsByClassName("section-content"));
  const filterBtnHandler = function (e) {
    e.stopPropagation();
    console.log(this.classList);
    const type = Array.from(this.classList).filter((e) => e != "filter-type-btn" && e != "selected");
    // only highlight filter-type-btn of this particular 'type'
    filterBtns.forEach((e) => e.classList.contains(type) ? e.classList.add("selected") : e.classList.remove("selected"));
    // only show section-content of this particular 'type'
    sectionContents.forEach((e) => e.classList.contains(type) ? e.classList.add("show") : e.classList.remove("show"));
  };
  filterBtns.forEach((e) => e.addEventListener("click", filterBtnHandler));

  // Make sure dropdown menu is 'closed' when we change screen size
  // https://momane.com/articles/2022-07/how-to-detect-if-an-element-is-visible
  var observer = new IntersectionObserver(function(entries) {
    if (!entries[0].isIntersecting) {
      // when dropmenu arrow is not visible, we check if dropdown is still 'visible'
      // or has class 'show', if yes we toggle to hide it
      if (dropdownMenu.classList.contains('show')) {
        toggleDropdown();
      }
    }
  // threshold represents the viewable area of the target element in the screen
  // 1 means element is fully viewable in screen
  }, { threshold: [1] });
  
  observer.observe(toggleArrow);

});