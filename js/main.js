'use strict';

var MIN_NUMBER_IMG = 1;
var MAX_NUMBER_IMG = 8;
var USED_NUMBER_IMG = [];
var TEMPLATE_ID = '#pin';

//функция генерации случайных данных для avatar из объекта author
//на выходе число в диапазоне от min до max
var getUniqueNumber = function (min, max){
  var numberImage = Math.round(min - 0.5 + Math.random() * (max - min + 1));

  while(USED_NUMBER_IMG.includes(numberImage, 0)){
    numberImage = Math.round(min - 0.5 + Math.random() * (max - min + 1));
  }
  USED_NUMBER_IMG.push(numberImage);
  return numberImage;
}

//создание DOM-Элемента на основании шаблона
//на выходе заполненная данными метка для вставки на карту
var createDomElement = function(templateId, objectWithInfo){
  var template = document.querySelector(templateId).content.querySelector('button');
  var element = template.cloneNode(true);
  element = fillingBlock(element, objectWithInfo);

  return element;
}

//заполнение DOM-элемента данными из Объекта
//на выходе заполненный DOM-элемент
var fillingBlock = function(domElement, objectWithInfo){
  domElement.style.left = objectWithInfo.location.x + 'px';
  domElement.style.top = objectWithInfo.location.y + 'px';
  domElement.children[0].src = objectWithInfo.author.avatar;
  domElement.children[0].alt = objectWithInfo.offer.title;

  return domElement;
}

var generateObject = function(){
var map = document.querySelector('.map__pins');

  for (var i = 0; i < 8; i++){
    var advert = {
      "author":{
       "avatar": 'img/avatars/user0' + getUniqueNumber(MIN_NUMBER_IMG, MAX_NUMBER_IMG) + '.png'
      },
      "offer":{
        "title": 'Заголовок1',
        "address": '600,350',
        "price": getUniqueNumber(100, 200),
        "type": 'palace',
        "rooms": 3,
        "guests": 4,
        "checkin": '12:00',
        "checkout": '14:00',
        "features": ['wi-fi', 'dishwasher'],
        "description": 'Описание',
        "photos": ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"]
       },
      "location":{
        "x": getUniqueNumber(100, 600),
        "y": getUniqueNumber(100, 600)
      }
    };
    //создание DOM-элемента на основе js-объекта
    var fragment = createDomElement(TEMPLATE_ID, advert);

    //отрисовка метки на карте
    map.appendChild(fragment);
  }

}

generateObject();
