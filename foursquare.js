
 var foursquare = require( "foursquare" )(
            "00WTXTLR54SU1KI5HWJZFQYXIINYHAK5TJ5GQDW4LTRQUBZI",
            "ML0WO0WL55FISZDM4UJU5YRRMXKGQD040KKEB13GZ5JRGBSD"
        ),
        Venue = foursquare.Venue,
        Notification = foursquare.Notification,
        Checkin = foursquare.Checkin;

    Venue.findById( "4e311a73628430b0810a6194", function( err, result ){
      console.log(result);
    });