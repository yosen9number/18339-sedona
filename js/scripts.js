(function() {
  var navOpen = document.querySelector (".main-menu__icon");
  var navClose = document.querySelector (".main-menu__close");
  var mainNav = document.querySelector(".main-menu__items");

  navOpen.addEventListener("click", function(event){
    mainNav.classList.add("main-menu__items--open");
  });
  navClose.addEventListener("click", function(event){
    mainNav.classList.remove("main-menu__items--open");
  });
})();

(function() {
  var elements = document.querySelectorAll(".form-item__btn");
  for (var i = 0; i < elements.length; i++) {
    initNumberField(elements[i]);
  }
  function initNumberField(parent) {
    var input = parent.querySelector(".form-item__number");
    var minus = parent.querySelector(".form-item__btn--minus");
    var plus = parent.querySelector(".form-item__btn--plus");

    minus.addEventListener("click", function(event) {
      changeNumber(false);
    });

    plus.addEventListener("click", function() {
      changeNumber(true);
    });

    function changeNumber(operation) {
      var value = Number(input.value);
      if (isNaN(value)) {
        value = 0;
      }
      if (operation) {
        input.value = value + 1;
      } else {
        input.value = value - 1;
      }
    }
  }
})();

(function() {
  if(!("FormData" in window)){
    return;
  }
  var queue = [];
  var form = document.querySelector(".form");

  function removePreview(figure) {
    queue = queue.filter(function(element) {
      return element.figure != figure;
    });

    div.parentNode.removeChild(div);
  }

  form.addEventListener("submit", function(event){
    event.preventDefault();

    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    queue.forEach(function(element) {
      data.append("images", element.file);
    });

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function(){
      if(xhr.readyState == 4){
        console.log(xhr.responseText);
      }
    });
    xhr.send(data);
    form.reset();
  });

    form.querySelector(".form-items__file").addEventListener("change", function() {

      var files = this.files;
      for (var i = 0; i < files.length; i++) {
        preview(files[i]);
      }
      this.value = "";
    });

    function preview(file){
      var area = document.querySelector(".photo-items");
      var imgTemplate = document.querySelector("#image-template").innerHTML;
      if (file.type.match(/image.*/)){
        var reader = new FileReader();

        reader.addEventListener("load", function(event){

          var html = imgTemplate.replace("{{image}}", event.target.result);
          html = html.replace("{{name}}", file.name);

          var div = document.createElement("figure");
          figure.classList.add("photo-item");
          figure.innerHTML = html;
          area.appendChild(figure);

          queue.push({file: file, figure: figure});

          figure.querySelector(".photo-item__close").addEventListener("click", function(event){
            event.preventDefault();
            removePreview(figure);
          });

        });

        reader.readAsDataURL(file);
      }
    }
})();
