const executeHoroscope = require('./algo')
const horoscopes = require('./horoscopes');


getAsteroids = async (input) => {
    console.log('starting program')

    try {
        const asteroidsData = await fetch(
            'https://api.nasa.gov/neo/rest/v1/feed/today?detailed=false&api_key=DEMO_KEY',
        );
        // console.log('asteroid data:', asteroidsData)
        const fixedNative = JSON.parse(asteroidsData._bodyInit)
        const keyArray = Object.keys(fixedNative.near_earth_objects)
        const key1 = keyArray[0]
        const asteroids = fixedNative.near_earth_objects[key1]
        // console.log('asteroid:', asteroids[3])
        // console.log('diamater in meters:', asteroids[3].estimated_diameter.meters.estimated_diameter_max)
        // console.log('velocity in mph:', asteroids[3].close_approach_data[0].relative_velocity.miles_per_hour)
        // console.log('lunar miss distance:', asteroids[3].close_approach_data[0].miss_distance.lunar)
        // console.log('here is asteroid:', asteroids)
        // console.log(asteroids)
        const h = executeHoroscope(input, asteroids)
        console.log('horoscope h:', h)
        // const horoscope = horoscopes[h].body
        //console.log(horoscope)

        // Collect Digits

        // SMS the horoscope -- same thing creates 7 digit array..global variable...accessed by twilio


        /*
        client.messages
            .create({
                body: `${horoscope}`,
                from: '+19292425545',
                statusCallback: 'http://postb.in/1234abcd',
                to: '+15164265510'
            })
            .then(message => console.log(message.sid))
            .done();
		
			*/
        // Display the horoscope on Pi <client>




    } catch (error) {

    }

}


module.exports = getAsteroids