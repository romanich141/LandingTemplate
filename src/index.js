import "./scss/style.scss";
import $ from "jquery";
import "slick-carousel";

const burger = document.querySelector(".burger"),
  list = document.querySelector(".list"),
  navigationMenu = document.querySelector("nav");

navigationMenu.addEventListener("click", () => {
  burger.classList.toggle("active");
  if (burger.classList.contains("active")) {
    list.classList.add("show-menu");
  } else {
    list.classList.remove("show-menu");
  }
});

$(".slider").slick({
  dots: true,
  arrows: true,
  infinite: true,
  speed: 500,
  fade: true,
  cssEase: "linear",
  adaptiveHeight: true
});

$("select").each(function() {
  var $this = $(this),
    numberOfOptions = $(this).children("option").length;

  $this.addClass("select-hidden");
  $this.wrap('<div class="select"></div>');
  $this.after('<div class="select-styled"></div>');

  var $styledSelect = $this.next("div.select-styled");
  $styledSelect.text(
    $this
      .children("option")
      .eq(0)
      .text()
  );

  var $list = $("<ul />", {
    class: "select-options"
  }).insertAfter($styledSelect);

  for (var i = 0; i < numberOfOptions; i++) {
    $("<li />", {
      text: $this
        .children("option")
        .eq(i)
        .text(),
      rel: $this
        .children("option")
        .eq(i)
        .val()
    }).appendTo($list);
  }

  var $listItems = $list.children("li");

  $styledSelect.click(function(e) {
    e.stopPropagation();
    $("div.select-styled.active")
      .not(this)
      .each(function() {
        $(this)
          .removeClass("active")
          .next("ul.select-options")
          .hide();
      });
    $(this)
      .toggleClass("active")
      .next("ul.select-options")
      .toggle();
  });

  $listItems.click(function(e) {
    e.stopPropagation();
    $styledSelect.text($(this).text()).removeClass("active");
    $this.val($(this).attr("rel"));
    $list.hide();
    //console.log($this.val());
  });

  $(document).click(function() {
    $styledSelect.removeClass("active");
    $list.hide();
  });
});
