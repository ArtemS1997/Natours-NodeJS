/* eslint-disable */

export const displayMap = (locations) => {
  // const locations = JSON.parse(
  //   document.getElementById('map').dataset.locations,
  // );
  console.log(locations);

  const customIcon = L.icon({
    iconUrl: '/img/pin.png', // Path to your custom icon image
    iconSize: [24, 32], // Size of the icon [width, height]
    iconAnchor: [12, 32], // Anchor point of the icon (e.g., [half width, full height])
    popupAnchor: [0, -32], // Point where the popup should open relative to the icon anchor
  });

  const map = L.map('map', { zoomControl: false, scrollWheelZoom: false });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const points = [];
  locations.forEach((loc) => {
    points.push([loc.coordinates[1], loc.coordinates[0]]);
    const marker = L.marker([loc.coordinates[1], loc.coordinates[0]], {
      icon: customIcon,
    })
      .addTo(map)
      .bindPopup(`<p>Day ${loc.day}: ${loc.description}</p>`, {
        autoClose: false,
      })
      .openPopup();

    // Add click event for each marker
    marker.on('click', function (e) {
      // Zoom into the marker's position
      map.setView(e.latlng, 15); // Adjust zoom level as desired, e.g., 15

      // Enable scroll wheel zoom
      map.scrollWheelZoom.enable();
    });
  });

  const bounds = L.latLngBounds(points).pad(0.5);
  map.fitBounds(bounds, { maxZoom: 15 });

  // Enable zoom on map click
  map.on('click', function () {
    map.scrollWheelZoom.enable();
  });

  // Disable zoom when mouse leaves map
  map.on('mouseout', function () {
    map.scrollWheelZoom.disable();
  });

  return map;
};
