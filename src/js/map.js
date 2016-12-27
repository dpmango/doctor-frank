$(document).ready(function(){

  // ymaps.ready(init);
  // var map1, map2, map3, myPlacemark;
  //
  // function init(){
  //     map1 = new ymaps.Map("contact__map__first", {
  //         center: [55.76, 37.64],
  //         zoom: 7
  //     });
  //     map2 = new ymaps.Map("contact__map__second", {
  //         center: [52.76, 30.64],
  //         zoom: 3
  //     });
  //     map3 = new ymaps.Map("contact__map__thrid", {
  //         center: [54.76, 35.64],
  //         zoom: 10
  //     });
  //
  //     myPlacemark = new ymaps.Placemark([55.76, 37.64], {
  //         hintContent: 'Москва!',
  //     });
  //
  //     map1.geoObjects.add(myPlacemark);
  //     map2.geoObjects.add(myPlacemark);
  //     map3.geoObjects.add(myPlacemark);
  //
  // }

  google.maps.event.addDomListener(window, 'load', init);
  var mapStyle =  [
{
featureType: 'landscape',
elementType: 'geometry',
stylers: [
{hue: '#cccccc'},
{saturation: -100},
{lightness: -10},
{visibility: 'on'}
]
}
];
  // [{"featureType":"all","elementType":"geometry.fill","stylers":[{"weight":"2.00"}]},{"featureType":"all","elementType":"geometry.stroke","stylers":[{"color":"#9c9c9c"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"on"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f2f2f2"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"road","elementType":"all","stylers":[{"saturation":-100},{"lightness":45}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"color":"#eeeeee"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#7b7b7b"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"road.arterial","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#46bcec"},{"visibility":"on"}]},{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#c8d7d4"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#070707"}]},{"featureType":"water","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]}]

  function init() {
    var mapOpt1 = {
        zoom: 15,
        center: new google.maps.LatLng(56.826342, 60.588259),
        styles: mapStyle
    };
    var mapOpt2 = {
        zoom: 15,
        center: new google.maps.LatLng(56.904199, 60.584591),
        styles: mapStyle
    };
    var mapOpt3 = {
        zoom: 15,
        center: new google.maps.LatLng(56.798736, 60.582957),
        styles: mapStyle
    };

    var mapEl1 = document.getElementById('contact__map__first');
    var mapEl2 = document.getElementById('contact__map__second');
    var mapEl3 = document.getElementById('contact__map__thrid');

    var map1 = new google.maps.Map(mapEl1, mapOpt1);
    var map2 = new google.maps.Map(mapEl2, mapOpt2);
    var map3 = new google.maps.Map(mapEl3, mapOpt3);

    var marker1 = new google.maps.Marker({
        position: new google.maps.LatLng(56.826342, 60.588259),
        map: map1,
        title: 'Snazzy!'
    });
    var marker2 = new google.maps.Marker({
        position: new google.maps.LatLng(56.904199, 60.584591),
        map: map2,
        title: 'Snazzy!'
    });
    var marker3 = new google.maps.Marker({
        position: new google.maps.LatLng(56.798736, 60.582957),
        map: map3,
        title: 'Snazzy!'
    });
  }

});
