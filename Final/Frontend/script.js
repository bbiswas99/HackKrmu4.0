mapboxgl.accessToken = 'pk.eyJ1Ijoic3ViaGFtcHJlZXQiLCJhIjoiY2toY2IwejF1MDdodzJxbWRuZHAweDV6aiJ9.Ys8MP5kVTk5P9V2TDvnuDg';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [77.1025, 28.7041], // Default: Delhi, India
    zoom: 12
});

// Add directions control
const directions = new MapboxDirections({
    accessToken: mapboxgl.accessToken,
    unit: 'metric',
    profile: 'mapbox/driving'
});
map.addControl(directions, 'top-left');

// Function to check congestion
async function checkTraffic(start, end) {
    const response = await fetch(`http://127.0.0.1:5000/traffic?start=${start}&end=${end}`);
    const data = await response.json();

    if (data.congested) {
        alert("⚠️ Heavy Traffic! Switching to alternate route...");
        directions.setOrigin(data.alternate_route.start);
        directions.setDestination(data.alternate_route.end);
    }
}

// Listen for route changes
directions.on('route', (e) => {
    if (e.route.length > 0) {
        let start = e.route[0].legs[0].steps[0].maneuver.location;
        let end = e.route[0].legs[0].steps.slice(-1)[0].maneuver.location;
        checkTraffic(start, end);
    }
});
