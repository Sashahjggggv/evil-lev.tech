jQuery(function ($) {

    var maps = [],
        ibSize = $('.infrustructure-map').length ? 340 : winMob ? 320 : 640,
        mapMinZoom = 6,
        mapStyles = [
          {
            "elementType": "labels.icon",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#838383"
              }
            ]
          },
          {
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 15
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 17
              },
              {
                "weight": 1.2
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#707070"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.country",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#ffffff"
              },
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "stylers": [
              {
                "color": "#505050"
              },
              {
                "visibility": "simplified"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.fill",
            "stylers": [
              {
                "color": "#969696"
              },
              {
                "visibility": "on"
              }
            ]
          },
          {
            "featureType": "administrative.locality",
            "elementType": "labels.text.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "administrative.province",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "landscape",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 20
              }
            ]
          },
          {
            "featureType": "poi",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 21
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#414141"
              },
              {
                "lightness": 18
              }
            ]
          },
          {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#4e4e4e"
              },
              {
                "lightness": 15
              }
            ]
          },
          {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#414141"
              },
              {
                "lightness": 16
              }
            ]
          },
          {
            "featureType": "road.local",
            "elementType": "geometry.fill",
            "stylers": [
              {
                "color": "#4e4e4e"
              }
            ]
          },
          {
            "featureType": "transit",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": 19
              }
            ]
          },
          {
            "featureType": "transit.line",
            "stylers": [
              {
                "visibility": "off"
              }
            ]
          },
          {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [
              {
                "color": "#000000"
              },
              {
                "lightness": "8"
              }
            ]
          }
        ],
        contactPageMap = $('.map-popup').length,
        ibOptions = {
            alignBottom: true,
            content: 'text',
            pixelOffset: contactPageMap ? new google.maps.Size(-125, 0) : $('.infrustructure-map').length ? new google.maps.Size(60, 66) : new google.maps.Size(-ibSize/2, 0),
            boxStyle: {
                width: contactPageMap ? '250px' : ibSize+'px'
            },
            closeBoxMargin: "10px 10px 10px 10px",
            closeBoxURL: $('.infrustructure-map').length ? '/wp-content/themes/lev/img/icon-close-white.png' : '/wp-content/themes/lev/img/icon-close.png'
        },
        ib = new InfoBox(ibOptions),
        mapPan = (winW > 767) ? 180 : 120,
        directionsService,
        directionsDisplay,
        your_location,
        mainPageMap = $('.map-fixed').length ? true : false,
        mainMarkerAnchor;

    //in markerclusterer.js we've made some changes for clusterclick

    // set marker on contact page map (when we are building route)
    function setMarker(location, mapId) {
        var image = {
            url: $('#'+mapId).attr('data-set-marker'),
            // scaledSize : new google.maps.Size(50, 50),
        };
        var set_marker = new google.maps.Marker({
            position: location,
            icon: image
        });
        set_marker.setMap(maps[mapId].map);
        maps[mapId].map.panTo(location);

        // console.log(image.url)
    }

    //fade in markers
    var markerOpacity = markerOpacityIncrement = 0.05;
    var fadeInMarkers = function(markers) {

        if (markerOpacity <= 1) {

            for (var i = 0, len = markers.length; i < len; ++i) {
                markers[i].setOpacity(markerOpacity);
            }

            // increment opacity
            markerOpacity += markerOpacityIncrement;

            // call this method again
            setTimeout(function() {
                fadeInMarkers(markers);
            }, 50);

        } else {
            markerOpacity = markerOpacityIncrement; // reset for next use
        }
    }

    function Map(id, mapOptions) {
        this.map = new google.maps.Map(document.getElementById(id), mapOptions);
        this.markers = [];
        this.infowindows = [];
        this.clusters = null;
    }

    //adding marker
    function addMarker(mapId, location, index, string, image, filter1, filter2, activeImage, isAdditional) {
        const markerInstance = new google.maps.Marker({
            position: location,
            map: maps[mapId].map,
            icon: {
                url: image
            },
            filters: {
                filter1: filter1,
                filter2: filter2
            },
            mainImage: image,
            additionalImage: activeImage,
            active: false,
            isAdditional: isAdditional
        });

        //maps[mapId].markers[index] = new google.maps.Marker({
          maps[mapId].markers.push(markerInstance);

        var content = '<div class="info-box">' + string + '</div>';

        //google.maps.event.addListener(maps[mapId].markers[index], 'click', function () {
        google.maps.event.addListener(markerInstance, 'click', function () {
            ib.setContent(content);
            ib.setPosition(location);
            ib.open(maps[mapId].map);

            if (!$('#'+mapId).closest('.infrustructure-map').length)  {
                maps[mapId].map.setCenter(location);
                if (!contactPageMap) {
                    maps[mapId].map.panBy(0, -mapPan);
                }
            }

            maps[mapId].markers.forEach(function(marker) {
                if (!marker.centralMarker) {
                    marker.active = false;
                    marker.setIcon(marker.mainImage);
                }
            });

            if (this.additionalImage) {
                this.setIcon(this.additionalImage);
                this.active = true;
            }

            if (contactPageMap) {
                // $('.select_department').parent().removeClass('active');
                // $('.select_department').removeClass('active');
                // $('.select_department[data-filter1="'+this.filters.filter1+'"]').parent().addClass('active');
                // $('.select_department[data-filter1="'+this.filters.filter1+'"]').addClass('active');

                $('.select_department[data-filter1="'+this.filters.filter1+'"]').trigger('click');
            }

            //hide filters on mobile when infobox is shown
            // if (winW < 768) $('#'+mapId).closest('.map-section').find('.filters-container').css({'z-index':0});
        });
    }

    //functions to add custom points on circles on detail project page
    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    };

    Number.prototype.toDeg = function() {
        return this * 180 / Math.PI;
    };

    google.maps.LatLng.prototype.destinationPoint = function(brng, dist) {
        dist = (dist/1000) / 6371;
        brng = brng.toRad();

        var lat1 = this.lat().toRad(), lon1 = this.lng().toRad();

        var lat2 = Math.asin(Math.sin(lat1) * Math.cos(dist) +
            Math.cos(lat1) * Math.sin(dist) * Math.cos(brng));

        var lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(dist) *
            Math.cos(lat1),
            Math.cos(dist) - Math.sin(lat1) *
            Math.sin(lat2));

        if (isNaN(lat2) || isNaN(lon2)) return null;

        return new google.maps.LatLng(lat2.toDeg(), lon2.toDeg());
    };

    function initialize(mapInst, filter) {


        var lat = mapInst.attr("data-lat"),
            lng = mapInst.attr("data-lng"),
            clusterImg = mapInst.attr("data-cluster-img"),
            myLatlng = new google.maps.LatLng(lat, lng),
            setZoomVal = $('.perfect-map').length && winMob ? 11 : $('.perfect-map').length ? 13 : winMob ? parseInt(mapInst.attr("data-xs-zoom")) : parseInt(mapInst.attr("data-zoom")),
            mapId = mapInst.attr('id'),
            mapImage = winMob ? mapInst.data('image-xs') : mapInst.data('image'),
            home = mapInst.attr('data-home'),
            circles = [],
            circlesMarkers = [home+"img/circle-marker1.png", home+"img/circle-marker2.png", home+"img/circle-marker3.png", home+"img/circle-marker4.png"];

        if ($('body').hasClass('language-en')) {
            circlesMarkers = [home+"img/circle-marker1-en.png", home+"img/circle-marker2-en.png", home+"img/circle-marker3-en.png", home+"img/circle-marker4-en.png"];
        } else if ($('body').hasClass('language-ru')) {
            circlesMarkers = [home+"img/circle-marker1-ru.png", home+"img/circle-marker2-ru.png", home+"img/circle-marker3-ru.png", home+"img/circle-marker4-ru.png"];
        }

        //console.log('--------------------------------------');

        var mapOptions = {
            zoom: setZoomVal,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_CENTER
            },
            streetViewControl: false,
            center: myLatlng,
            styles: mapStyles,
            minZoom: mapMinZoom,
            //disableDoubleClickZoom: mainPageMap

        };

        //define cluster options - different for main and infrustructure map
        if (mainPageMap) { 
          
          // var objectFilterItem = $('.objects-filter ul li.active').attr('data-filter');

          // if(objectFilterItem == 0){
          //   //console.log('filter all');
          //   var clusterOptions = {
          //       gridSize: winMob ? 80 : (winW > 1300 && winW < 1640) ? 76  : 74,
          //       styles: [
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/clusterImages/2in1-xs.png' : '/wp-content/themes/lev/img/clusterImages/2in1.png',
          //               height: winMob ? 61 : 87,
          //               width: winMob ? 100 : 142,
          //               textSize: 0
          //           },
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/clusterImages/3in1.png' : '/wp-content/themes/lev/img/clusterImages/3in1.png',
          //               height: winMob ? 97 : 129,
          //               width: winMob ? 100 : 136,
          //               textSize: 0
          //           },
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/cluster_5_new.png' : '/wp-content/themes/lev/img/cluster_5_new.png',
          //               height: winMob ? 126 : 126,
          //               width: winMob ? 130 : 130,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/cluster-art-house-mob.png' : '/wp-content/themes/lev/img/cluster-art-house.png',
          //               height: winMob ? 97 : 126,
          //               width: winMob ? 100 : 130,
          //               textSize: 0
          //           },
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/lviv.png' : '/wp-content/themes/lev/img/point_6in1.png',
          //               height: winMob ? 97 : 126,
          //               width: winMob ? 100 : 130,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/lviv.png' : '/wp-content/themes/lev/img/lviv.png',
          //               height: winMob ? 66 : 66,
          //               width: winMob ? 70 : 70,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/bukovel_yaremche.png' : '/wp-content/themes/lev/img/bukovel_yaremche.png',
          //               height: winMob ? 85 : 85,
          //               width: winMob ? 103 : 103,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/cluster_7.png' : '/wp-content/themes/lev/img/cluster_7.png',
          //               height: winMob ? 126 : 126,
          //               width: winMob ? 130 : 130,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/kyiv.png' : '/wp-content/themes/lev/img/kyiv.png',
          //               height: winMob ? 66 : 66,
          //               width: winMob ? 70 : 70,
          //               textSize: 0
          //           }
          //       ]
          //   };
          // }
          // else{
          //   //console.log('filter other');
          //   var clusterOptions = {
          //       gridSize: winMob ? 80 : (winW > 1500 && winW < 1640) ? 74  : 74,
          //       styles: [
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/cluster-filter_2.png' : '/wp-content/themes/lev/img/cluster-filter_2.png',
          //               height: winMob ? 126 : 126,
          //               width: winMob ? 130 : 130,
          //               textSize: 0
          //           },
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/LEV_point_3.png' : '/wp-content/themes/lev/img/LEV_point_3.png',
          //               height: winMob ? 97 : 97,
          //               width: winMob ? 100 : 100,
          //               textSize: 0
          //           },
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/cluster-filter_5.png' : '/wp-content/themes/lev/img/cluster-filter_5.png',
          //               height: winMob ? 126 : 126,
          //               width: winMob ? 130 : 130,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/cluster-filter_4.png' : '/wp-content/themes/lev/img/cluster-filter_4.png',
          //               height: winMob ? 126 : 126,
          //               width: winMob ? 130 : 130,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/point_6in1-mob.png' : '/wp-content/themes/lev/img/point_6in1.png',
          //               height: winMob ? 97 : 126,
          //               width: winMob ? 100 : 130,
          //               textSize: 0
          //           },
          //           {
          //               textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/lviv.png' : '/wp-content/themes/lev/img/lviv.png',
          //               height: winMob ? 66 : 66,
          //               width: winMob ? 70 : 70,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/bukovel_yaremche.png' : '/wp-content/themes/lev/img/bukovel_yaremche.png',
          //               height: winMob ? 85 : 85,
          //               width: winMob ? 103 : 103,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/hide-marker.png' : '/wp-content/themes/lev/img/hide-marker.png',
          //               height: winMob ? 0 : 0,
          //               width: winMob ? 0 : 0,
          //               textSize: 0
          //           },
          //           {
          //           textColor: 'transparent',
          //               url: winMob ? '/wp-content/themes/lev/img/kyiv.png' : '/wp-content/themes/lev/img/kyiv.png',
          //               height: winMob ? 66 : 66,
          //               width: winMob ? 70 : 70,
          //               textSize: 0
          //           }
          //       ]
          //   };
          // }


          var clusterOptions = {
            gridSize: 60,
            // maxZoom: 12,
            styles: [
              {
                textColor: 'transparent',
                url: '/wp-content/themes/lev/img/lviv.png',
                height: 66,
                width: 70,
                textSize: 0
              },
              {
                textColor: '#ccb292',
                url: clusterImg,
                height: 60,
                width: 60,
                textSize: 18
              },
              {
                textColor: '#ccb292',
                url: clusterImg,
                height: 60,
                width: 60,
                textSize: 18
              }
            ]
          };

        } else {
            var clusterOptions = {
                gridSize: 60,
                // maxZoom: 12,
                styles: [{
                    textColor: '#ccb292',
                    url: clusterImg,
                    height: 60,
                    width: 60,
                    textSize: 18
                }]
            };
        }

        maps[mapId] = new Map(mapId, mapOptions);

        maps[mapId].bounds = new google.maps.LatLngBounds();
        maps[mapId].zoomDefault = setZoomVal;

        //ONLY TEST get coordinates
        maps[mapId].map.addListener('rightclick', function(e){
            var lat = e.latLng.lat();
            var lng = e.latLng.lng();
            console.log(e.latLng.lat(), e.latLng.lng());
        });

        var countAfterFilter = 0;

        //adding markers
        $('.marker[data-rel="' + mapId + '"]').each(function (i, el) {

            //if (mapInst.closest('.infrustructure-map').length && winW < 767) return false;

            //hide markers only on the perfect life project in mobile devices
            if((mapInst.closest('.infrustructure-map-wrap').hasClass('perfect-map'))  && winW < 767) return false;

            var imageMarker = winMob ? ($(this).attr('data-xs-image') ? $(this).attr('data-xs-image') : $(this).attr('data-image' ) ) : $(this).attr('data-image');

            if(filter < 1){
              addMarker(
                mapId,
                new google.maps.LatLng(
                    $(this).attr('data-lat'),
                    $(this).attr('data-lng')
                ),
                i,
                $(this).attr('data-string'),
                imageMarker,
                ($(this).attr('data-filter1')) ? $(this).attr('data-filter1') : 0,
                ($(this).attr('data-filter2')) ? $(this).attr('data-filter2') : 0,
                ($(this).attr('data-active-image')) ? $(this).attr('data-active-image') : 0,
                ($(this).attr('data-additional-marker')) ? $(this).attr('data-additional-marker') : 0
              );
            }
            else{
              if(el.dataset.filter1.includes(filter)){
                //console.log('marker el', el.dataset.filter1);
                countAfterFilter++

              addMarker(
                  mapId,
                  new google.maps.LatLng(
                      $(this).attr('data-lat'),
                      $(this).attr('data-lng')
                  ),
                  i,
                  $(this).attr('data-string'),
                  imageMarker,
                  ($(this).attr('data-filter1')) ? $(this).attr('data-filter1') : 0,
                  ($(this).attr('data-filter2')) ? $(this).attr('data-filter2') : 0,
                  ($(this).attr('data-active-image')) ? $(this).attr('data-active-image') : 0,
                  ($(this).attr('data-additional-marker')) ? $(this).attr('data-additional-marker') : 0
              );
              
              //hide markers after init
              //maps[mapId].markers[i].setOpacity(0);

              }
            }

        });

        //console.log('countAfterFilter ->', countAfterFilter);

        //fade in markers after init
        setTimeout(function() {
            //fadeInMarkers(maps[mapId].markers);
        }, 500);


        //console.log('maps[mapId].markers ', maps[mapId].markers);

        //define marker clustering
        maps[mapId].markerClusterer = new MarkerClusterer(maps[mapId].map, maps[mapId].markers, clusterOptions);


        //add center map marker (project detail page) (its not included in clustering)
        if (mapImage) {

            maps[mapId].markers.push(new google.maps.Marker({
                position: myLatlng,
                map: maps[mapId].map,
                icon: {
                    url: mapImage,
                    anchor: !contactPageMap ? new google.maps.Point(winMob ? 35 : 71, winMob ? 37 : 75) : new google.maps.Point(0, 0)
                },
                centralMarker: true
            }));
        }

        //click on map
        maps[mapId].map.addListener('click', function() {

            //close infobox, if its open
            ib.close();

            //show default marker image
            maps[mapId].markers.forEach(function(marker) {
                if (!marker.centralMarker) {
                    marker.active = false;
                    marker.setIcon(marker.mainImage);
                }
            });

            //show filters after infobox close on mobile
            // if (winW < 768) $('#'+mapId).closest('.map-section').find('.filters-container').css({'z-index':3});
        });

        //infobox close additional
        ib.addListener('closeclick', function() {
            //show default marker image
            maps[mapId].markers.forEach(function(marker) {
                if (!marker.centralMarker) {
                    marker.active = false;
                    marker.setIcon(marker.mainImage);
                }
            });

            //show filters on mobile after infobox opening
            // if (winW < 768) $('#'+mapId).closest('.map-section').find('.filters-container').css({'z-index':3});
        });

        //fit map to markers bound and set zoom level on main and projects pages
        if (mapInst.closest('.map-section').length) {

            //center map with markers bounds
            maps[mapId].markers.forEach(function(marker, index) {
/*                if (marker.filters.filter1 || marker.filters.filter2) {
                    maps[mapId].bounds.extend(marker.getPosition());
                }*/
/*
          var left = new google.maps.LatLng({lat: 49.047912, lng: 22.559883}),
              top = new google.maps.LatLng({lat: 52.250638, lng: 32.381660}),
              right = new google.maps.LatLng({lat: 49.306464, lng: 39.962226}),
              bottom = new google.maps.LatLng({lat: 44.538766, lng: 33.853828})
*/
            //maps[mapId].bounds.extend(new google.maps.LatLngBounds(left, right));

            //maps[mapId].bounds.extend(marker.getPosition());
            });

            //maps[mapId].map.fitBounds(maps[mapId].bounds);

            //set zoom level to - 1 after fit bounds
            // if (winW > 1600 || winW < 1199) {
            if (winH > 800 || winMob) {
                var zoomListener = google.maps.event.addListener(maps[mapId].map, "idle", function() {
                    maps[mapId].map.setZoom(maps[mapId].map.getZoom() - 1);
                    google.maps.event.removeListener(zoomListener);
                });
            }

            if (winMob) {
                //move map to bottom after centering
                maps[mapId].map.panBy(140, -60);
            } else {
                maps[mapId].map.panBy(230, 0);
            }

            if(winW > 1200 && winW < 1600){
                maps[mapId].map.panBy(10, 40);
            	//maps[mapId].map.setZoom(maps[mapId].map.getZoom() + 2);
            }


            function getNextHighestValueInArray(arr, value) {
                var i = arr.length;
                while (arr[--i] > value);
                return arr[i];
            }

            //if cluster was clicked - we add map zoom value to array (it's written in markerclusterer.min.js)
            //after that - on zoom out button click - we are going to previous zoom level
            $(document).on('click', '.gm-bundled-control button:last-child', function() {
                if (zoomBeforeClusterClickArr.length) {
                    var currentMapZoom = maps[mapId].map.getZoom(),
                        previousClusterZoom = getNextHighestValueInArray(zoomBeforeClusterClickArr, currentMapZoom);

                    clusterClicksCount--;

                    if (previousClusterZoom < currentMapZoom) {
                        maps[mapId].map.setZoom(previousClusterZoom);
                    }

                    //hide zoom button if zoom is on start level (clusterClicksCount is defined in markerclurerer.js)
                    if (clusterClicksCount === 0) {
                        $(this).parent().removeClass('show');
                    }

                }
                return false;
            });

        }

        //infrustructure map circles
        if (mapInst.closest('.infrustructure-map').length) {

          //start change distance circle for perfect life project
          let distance = 500;
          if(mapInst.closest('.infrustructure-map-wrap').hasClass('perfect-map')){
            distance = 3000;
            //console.log('zoom ', maps[mapId].map.getZoom());
          }
          else distance = 500;
          //end change distance circle for perfect life project

            for(var i = 0; i<circlesMarkers.length; i++){
                circles[i] = {};
                circles[i].radius = distance * (i+1);
                circles[i].circle = new google.maps.Circle({
                    strokeColor: '#FFFFFF',
                    strokeWeight: 1,
                    strokeOpacity:0.2,
                    fillColor: '#000',
                    fillOpacity: 0,
                    map: maps[mapId].map,
                    center: myLatlng,
                    radius: circles[i].radius
                });
                circles[i].markerLeft = new google.maps.Marker({
                    position: myLatlng.destinationPoint(-90, circles[i].radius),
                    map: maps[mapId].map,
                    icon: {
                        url: circlesMarkers[i],
                        anchor: new google.maps.Point(32,32)
                    },
                    optimized: false,
                    zIndex:99999999
                });
                circles[i].markerRight = new google.maps.Marker({
                    position: myLatlng.destinationPoint(90, circles[i].radius),
                    map: maps[mapId].map,
                    icon: {
                        url: circlesMarkers[i],
                        anchor: new google.maps.Point(32,32)
                    },
                    optimized: false,
                    zIndex:99999999
                });
                circles[i].markerRight.setMap(maps[mapId].map);

                google.maps.event.addListener(circles[i].circle, 'click', function(ev) {
                    ib.close();

                    maps[mapId].markers.forEach(function(marker) {
                        if (!marker.centralMarker) {
                            marker.active = false;
                            marker.setIcon(marker.mainImage);
                        }
                    });
                });
            }
        }

        //contact map (route, autocomplete)
        if (contactPageMap) {

            //change destination point marker
            $(".select_department").on('click', function() {
                $(".select_department.active").parent().removeClass('active');
                $(".select_department.active").removeClass('active');
                $(this).addClass('active');
                $(this).parent().addClass('active');

                if ($('#your_location').val().trim().length) {
                    buildRoute(mapId);
                    ib.close();
                }
            });

            directionsService = new google.maps.DirectionsService();

            directionsDisplay = new google.maps.DirectionsRenderer({
                suppressMarkers: true,
                polylineOptions: {
                    geodesic: true,
                    strokeColor: "#cdb393",
                    strokeOpacity: 1,
                    strokeWeight: 3,
                    center: location
                }
            });

            // google Autocomplete options
            var options = {
                types: ['geocode'],
                componentRestrictions: {country: "ua"}
            };

            function onChangeInput() {
                buildRoute(mapId);
            }

            if($('#your_location').length ) {
                your_location = new google.maps.places.Autocomplete(
                    (document.getElementById('your_location')),
                    options
                );
                google.maps.event.addListener(your_location, 'place_changed', function() {
                    var place = your_location.getPlace(),
                        newLocation;

                    maps[mapId].map.panTo(myLatlng);

                    newLocation = new google.maps.LatLng(
                        place.geometry.location.lat(),
                        place.geometry.location.lng()
                    );

                    setMarker(newLocation, mapId);
                });

                var input_your_location = document.getElementById('your_location');
                var autocomplete = new google.maps.places.Autocomplete(input_your_location);
                document.getElementById('your_location').addEventListener('change', onChangeInput);
            }

            /* 05 build route */
            function buildRoute(mapId) {
                directionsDisplay.setMap(null);
                setTimeout(function() {
                    var start = document.getElementById("your_location").value;
                    var endLat = $(".select_department.active").data('lat'),
                        endLng = $(".select_department.active").data('lng'),
                        end = new google.maps.LatLng(endLat, endLng);

                    var request = {
                        origin: start,
                        destination: end,
                        travelMode: google.maps.DirectionsTravelMode.DRIVING
                    };

                    directionsService.route(request, function(response, status) {
                        if (status === google.maps.DirectionsStatus.OK) {
                            directionsDisplay.setMap(maps[mapId].map);
                            directionsDisplay.setDirections(response);
                        }
                    });

                }, 200);
            }

        }

    }

    $('.map-wrapper').each(function () {
        initialize($(this), 0);
    });

    //main page map filter
    var filterState = {
        filter1: 0,
        filter2: 0
    };

    //markers filtering
    // $('.objects-filter ul li, .type-filter ul li').on('click', function() {
      $(document).on('click', '.objects-filter ul li, .type-filter ul li', function(){
        var closestMap = maps[$(this).closest('.map-section').find('.map-wrapper').attr('id')],
            markersToFilter = closestMap.markers,
            $projectsToFilter = $(this).closest('.map-section').find('.project-item-filter'),
            dataFilter1 = $(this).attr('data-filter');

        if ($(this).closest('.objects-filter').length) {
            filterState.filter1 = +$(this).attr('data-filter');

            //add additional classes to show-hide prices in map infobox popup
            $(this).closest('.map-outer-wrapper').removeClass('show-commercial-prices show-parking-prices');

            if ($(this).attr('data-filter') == 2) {
                $(this).closest('.map-outer-wrapper').addClass('show-commercial-prices');

            }/* else if ($(this).attr('data-filter') == 3)   {
                $(this).closest('.map-outer-wrapper').addClass('show-parking-prices');
            }*/
             else if ($(this).attr('data-filter') == 4)   {
                $(this).closest('.map-outer-wrapper').addClass('show-parking-prices');
            }

        } else if ($(this).closest('.type-filter').length) {
            filterState.filter2 = +$(this).attr('data-filter');
        }

        //reinit map
        $('.map-wrapper').each(function (){
          initialize($(this), dataFilter1);
        });

        filterMarkers(closestMap, markersToFilter, filterState.filter1, filterState.filter2, $projectsToFilter);
    });

    function filterMarkers(mapName, markers, filter1, filter2, $projects) {
        //close infobox if one is open
        ib.close();

        //scroll top after filtering on projects page
        if ($projects.length) {
            $projects.addClass('was-filtered');

            // $('body, html').animate({
            //     'scrollTop':0
            // }, 0);

            //NEW (added projects thumbnails on home page)
            if (winW < 768 && $('body').hasClass('home')) {
                $('html, body').animate({
                    scrollTop: $('.map-section').offset().top
                }, 100);
            } else if ($('.projects-map-section').length) {
                $('body, html').animate({
                    //'scrollTop':0
                    scrollTop: $('.map-section').offset().top
                }, 777);
            }

            setTimeout(function() {
                _functions.customAnimation();
            });
        }

        //show all markers
        if (filter1 === 0 && filter2 === 0) {
            showAllMarkers(mapName, markers, true);
            //showAllProjects($('.project-item-filter'));
            return;
        }

        hideAllMarkers(mapName, markers);

        hideAllProjects($('.project-item-filter'));

        for (var i = 0; i < markers.length; i++) {

            // console.log(typeof markers[i].filters.filter1, markers[i].filters.filter2)

            if ( ( (markers[i].filters.filter1 && markers[i].filters.filter1.includes(filter1)) || filter1 === 0 ) && ( ( markers[i].filters.filter2 && markers[i].filters.filter2.includes(filter2) ) || filter2 === 0) ) {
                markers[i].setVisible(true);
                mapName.markerClusterer.addMarkers([markers[i]]);
                mapName.bounds.extend(markers[i].getPosition());

                //console.log('[markers[i]] ', [markers[i]]);

            }
        }
        
        //console.log('amount active = ', $('.projects-wrap .project-item-filter.active-city').length);

        //project page filters
        var projectFilter1, projectFilter2;
        for (var i = 0; i < $projects.length; i++) {
                projectFilter1 = '' + $projects.eq(i).data('filter1'),
                projectFilter2 = '' + $projects.eq(i).data('filter2');  

/*            if ( ( projectFilter1.includes(filter1) || filter1 === 0 ) && ( projectFilter2.includes(filter2) || filter2 === 0) ) {

                if($projects.hasClass('active-city')){
                  $projects.eq(i).fadeIn(600);
                }                
            }*/

            if ( ( (projectFilter1.includes(filter1)) && ( $projects.eq(i).hasClass('active-city') )) || filter1 === 0  ) {
              $projects.eq(i).fadeIn(600);
            }
        }


        if (winW > 1600 || winW < 1199) {
            //map fit to filtered markers
            mapName.map.fitBounds(mapName.bounds);
            mapName.map.setZoom(mapName.map.zoom - 1);
        }
        // mapName.map.setZoom(mapName.zoomDefault);
    }



    function showAllMarkers(mapName, markers, toFit) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setVisible(true);
            mapName.markerClusterer.addMarkers([markers[i]]);

            if (markers[i].filters.filter1 === 0 && markers[i].filters.filter2 === 0) continue;
            mapName.bounds.extend(markers[i].getPosition());
        }

       if (toFit) {
           mapName.map.fitBounds(mapName.bounds);
           if (winW > 1600 || winW < 1199) {
               mapName.map.setZoom(mapName.map.zoom - 1);
           }
       }
    }

    function hideAllMarkers(mapName, markers) {
        for (var i = 0; i < markers.length; i++) {
            if(markers[i]){
              markers[i].setVisible(false);
              mapName.markerClusterer.clearMarkers();
            }
        }
    }

    function moveToLocation(lat, lng, map){
        var center = new google.maps.LatLng(lat, lng);
        map.panTo(center);
    }

    //project page filters
    function hideAllProjects($projects) {
        $projects.hide(0);
    }

    function showAllProjects($projects) {
        $projects.fadeIn(400);
    }


    //additional marker
    $('.additional-marker').on('click', function(){
        var $this = $(this),
            closestMap = maps[$this.closest('.map-section').find('.map-wrapper').attr('id')],
            additionaMarker;

        $this.toggleClass('active');
        $('.filters-container').toggleClass('disabled');

        if ($this.hasClass('active')) {
            moveToLocation($this.data('lat'), $this.data('lng'), closestMap.map);
            showAllMarkers(closestMap, closestMap.markers, false);

            //open infowindow in additional marker
            closestMap.markers.forEach(function(m) {
                if (m.isAdditional) additionaMarker = m;
            });
            new google.maps.event.trigger( additionaMarker, 'click' );

            $this.closest('.map-section').find('.drop-list').each(function() {
                $(this).find('li').removeClass('active');
                $(this).find('li[data-filter="0"]').addClass('active');
            });
        } else {
            showAllMarkers(closestMap, closestMap.markers, true);
        }

        var toText = $this.find('span:first-child'),
            origText = toText.html();

        toText.html($this.attr('data-text'));
        $this.attr('data-text', origText);
    });

    // infrustructure filter
    function infrFilter(markers, filter, filterArray, isActive) {
        for (var i = 0; i < markers.length; i++) {
            if (markers[i].filters && markers[i].filters.filter1) {
                if (+markers[i].filters.filter1 === filter && !isActive ) {
                    markers[i].setVisible(true);
                } else if (filterArray.includes(+markers[i].filters.filter1) && !isActive) {
                    markers[i].setVisible(true);
                } else if (!filterArray.includes(+markers[i].filters.filter1)) {
                    markers[i].setVisible(false);
                }
            }
        }
    }

    function infShowAllMarkers(markers) {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setVisible(true);
        }
    }

    //project detail page map filter
    $('.filter-list a').on('click', function() {
        var $this = $(this),
            $thisFilter = +$this.attr('data-filter'),
            $thisActive = $this.hasClass('active'),
            filtersArray = [],
            $thisMapMarkers = maps['map-canvas-1'].markers;

        $this.siblings().each(function (i, e) {
            if ($(this).hasClass('active')) {
                filtersArray.push($(this).data('filter'));
            }
        });

        //all
        if ($thisFilter === 0) {
            infShowAllMarkers($thisMapMarkers);
            if ($thisActive) {
                $this.siblings().removeClass('active');
            } else {
                $this.siblings().addClass('active');
            }
            //partial
        } else {
            if ($thisActive && $this.siblings('.active').length == 0) {
                infShowAllMarkers($thisMapMarkers);
            } else {
                infrFilter($thisMapMarkers, $thisFilter, filtersArray, $thisActive);
            }
        }

        $this.toggleClass('active');

    });

    $('.filter-wrap .btn').on('click', function() {
        $(this).toggleClass('active');
        $(this).closest('.filter-wrap').toggleClass('active');
    });

    ib.addListener('domready', function(){
      $('.flatrisbutton').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);       
        if($this.data('flatris-id')){
            create_chess($this.data('flatris-id'));
        }
        else{
            return false;
        }
      });
    });


});