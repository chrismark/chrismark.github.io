document.addEventListener("DOMContentLoaded", () => {
  console.log('DOMContentLoaded');

  const dropdownBtn = document.getElementById("dropdown-toggle");
  const dropdownMenu = document.getElementById("main-nav");
  const toggleArrow = document.getElementById("arrow");  
  const searchField = document.getElementById("search-field");
  const searchFieldInput = searchField.getElementsByTagName("input")[0];
  const header = document.getElementsByTagName("header")[0];

  // at 425px width, search field shows/hides after clicking the search icon
  searchField.addEventListener("click", function (e) {
    e.stopPropagation();
    e.preventDefault();
    header.classList.add("search");
    searchFieldInput.focus();
  });
  searchFieldInput.addEventListener("blur", function (e) {
    header.classList.remove("search");
  })

  // show/hide main dropdown menu
  const toggleDropdown = function () {
    dropdownMenu.classList.toggle("show");
  };
  dropdownBtn.addEventListener("click", function (e) {
    console.log('Click');
    e.stopPropagation();
    toggleDropdown();
  });

  // show/hide genre and country dropdown menu
  const dropdownMenus = Array.from(document.getElementsByClassName("dropdown-menu"));
  const show = function(e) {
    // highlight Genre/Country menu link
    this.classList.add('hover');
    // show dropdown
    this.nextElementSibling.classList.add("show");
  };
  const hide = function(e) {
    // remove highlight from Genre/Country menu link
    this.childNodes[1].classList.remove("hover");
    // hide dropdown
    this.childNodes[3].classList.remove("show");
  };
  dropdownMenus.forEach((e) => {
    e.previousElementSibling.addEventListener("mouseenter", show);
    // add click for touch screen
    e.previousElementSibling.addEventListener("click", show);
    // attach mouseleave on parent <li> element so that it triggers when user moves/clicks outside of <li>'s
    // children which includes the dropdown menu
    e.parentNode.addEventListener("mouseleave", hide);
  })

  // recommendations filter buttons
  const filterBtns = Array.from(document.getElementsByClassName("filter-type-btn"));
  const sectionContents = Array.from(document.getElementsByClassName("section-recommendations")[0]?.getElementsByClassName("section-content"));
  const filterBtnHandler = function (e) {
    e.stopPropagation();
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
    dropdownBtn.ariaHidden = !entries[0].isIntersecting;
    if (!entries[0].isIntersecting) {
      // when dropmenu arrow is not visible, we check if dropdown is still 'visible'
      // or has class 'show', if yes we toggle to hide it
      if (dropdownMenu.classList.contains('show')) {
        toggleDropdown();
      }
      // hide country/genre dropdown
      dropdownMenus.forEach((dm) => {
        if (dm.classList.contains("show")) {
          dm.parentNode.dispatchEvent(new Event("mouseleave"));
        }
      });
    }
  // threshold represents the viewable area of the target element in the screen
  // 1 means element is fully viewable in screen
  }, { threshold: [1] });
  observer.observe(toggleArrow);

});