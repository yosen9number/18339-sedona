(function() {
  var navOpen = document.querySelector(".main-menu__icon");
  var navClose = document.querySelector(".main-menu__close");
  var mainNav = document.querySelector(".main-menu__items");

  navOpen.addEventListener("click", function(event){
    mainNav.classList.add("main-menu__items--open");
  });
  navClose.addEventListener("click", function(event){
    mainNav.classList.remove("main-menu__items--open");
  });
})();

(function() {
  var number = document.querySelectorAll(".form-item__number");
  var plus = document.querySelectorAll (".form-item__btn--plus");
  var minus = document.querySelectorAll (".form-item__btn--minus");

  for(i=0;i<plus.length;i++){
    plus[i].addEventListener("click", function(event){
      event.preventDefault();
      var el = event.target;
      var parent = el.parentNode;
      number = parent.querySelector(".form-item__number")
      if(parseInt(number.value) < 999){
        number.value = parseInt(number.value) +1;
      }
    });
  }

  for(i=0;i<minus.length;i++){
    minus[i].addEventListener("click", function(event){
      event.preventDefault();
      var el = event.target;
      var parent = el.parentNode;
      number = parent.querySelector(".form-item__number")
      if(parseInt(number.value) -1 >= 0){
        number.value = parseInt(number.value) -1;
      }
    });
  }
})();

(function() {
  var count = document.querySelector("#count");
  var value = parseInt(count.value);
  var personsCountPlus = document.querySelector(".form-item--count .form-item__btn--plus");
  var personsCountMinus = document.querySelector(".form-item--count .form-item__btn--minus");

  var area = document.querySelector(".area");
  var templatePerson = document.querySelector("#travel-template").innerHTML;

  function addPerson() {
    var div = document.createElement("div");
    var html = Mustache.render(templatePerson, {
      "value": parseInt(count.value)
    });


    div.classList.add("persons-item");
    div.innerHTML = html;
    area.appendChild(div);
  }

  personsCountPlus.addEventListener("click", function(event) {
    event.preventDefault();
    console.info('добавляем пользователя');
    count.value = parseInt(count.value);
    addPerson();
  });

  personsCountMinus.addEventListener("click", function(event) {
    event.preventDefault();
    console.info('удаляем пользователя');
    area.removeChild(area.lastChild);

  });
})();

(function() {
  if(!("FormData" in window)){
    return;
  }
  var queue = [];
  var form = document.querySelector(".main-form");

  function removePreview(figure) {
    queue = queue.filter(function(element) {
      return element.figure != figure;
    });

    figure.parentNode.removeChild(figure);
  }

  form.addEventListener("submit", function(event){
    event.preventDefault();

    var data = new FormData(form);
    var xhr = new XMLHttpRequest();
    var time = (new Date()).getTime();

    queue.forEach(function(element) {
      data.append("images", element.file);
    }); /*?*/

    xhr.open("post", "https://echo.htmlacademy.ru/adaptive?" + time);
    xhr.addEventListener("readystatechange", function(){
      if(xhr.readyState == 4){
        console.log(xhr.responseText);
      }
    });
    xhr.send(data);
    form.reset();
  });

    document.querySelector(".form-items__file").addEventListener("change", function() {

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
