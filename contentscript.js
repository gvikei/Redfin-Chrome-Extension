const http = new XMLHttpRequest();

async function getDirectionInfo(source, dest) {
  gMapRequest = 'https://maps.googleapis.com/maps/api/distancematrix/json?' + 
    'origins=' + source['lat'] + ',' + source['long'] +
    '&destinations=' + dest['lat'] + ',' + dest['long'] +
    '&key=AIzaSyBM44WGzQ5gWsz8sSkFn-zZNYbsau98aOg&mode=driving';
  http.open("GET", gMapRequest, true);
  http.onreadystatechange = function() {
    if (http.readyState == 4) {
      console.log("got: ", http.responseText);
      // return (http.responseText);
    }
  }
  http.send();
}

async function getDistances() {
  // Hard-coded origin - MSFT
  source = {
    'lat':'47.641484',
    'long':'-122.125560'
  };

  nHouses = $('.tableList')[0].childElementCount;
  console.log('found ', nHouses, 'houses');

  var results = {};
  var dest = {};
  for (i = 0; i < nHouses; i++) {
    obj = $('#ReactDataTableRow_' + i + '>.column.column_1.col_address>div>script')[0];
    if (obj != undefined) {
      loc = JSON.parse(obj.text)['location']['geo'];
      dest['lat'] = loc['latitude'];
      dest['long'] = loc['longitude'];
      console.log("sending request ", dest);
      results[i] = await getDirectionInfo(source, dest);
      // await sleep(500);
    }
  }
  console.log(results);
}

$(document).ready(function() {
  getDistances();
});