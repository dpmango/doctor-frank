$(document).ready(function(){

  ymaps.ready(init);
  var map1, map2, map3, myPlacemark;

  function init(){
      map1 = new ymaps.Map("contact__map__first", {
          center: [55.76, 37.64],
          zoom: 7
      });
      map2 = new ymaps.Map("contact__map__second", {
          center: [52.76, 30.64],
          zoom: 3
      });
      map3 = new ymaps.Map("contact__map__thrid", {
          center: [54.76, 35.64],
          zoom: 10
      });

      myPlacemark = new ymaps.Placemark([55.76, 37.64], {
          hintContent: 'Москва!',
      });

      map1.geoObjects.add(myPlacemark);
      map2.geoObjects.add(myPlacemark);
      map3.geoObjects.add(myPlacemark);

  }

});
