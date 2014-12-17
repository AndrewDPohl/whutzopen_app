var request = require("request");
module.exports = function () {
  return {
    query: function(venues, done) {
      var url = "https://api.foursquare.com/v2/venues/explore?near=San-Francisco,CA&openNow=1&radius=30000&sortByDistance=1&limit=20&query="+ req.query.category +"&client_id=00WTXTLR54SU1KI5HWJZFQYXIINYHAK5TJ5GQDW4LTRQUBZI&client_secret=ML0WO0WL55FISZDM4UJU5YRRMXKGQD040KKEB13GZ5JRGBSD&v=20141216"
      request(url, function (err, response, body) {
        var results = JSON.parse(body);
        console.log(results);
        var venues = results.response.groups[0].items
        console.log(venues)
        done(venues);
      });
    }
  };
};