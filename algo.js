// spits out a number between 0 and 9
const executeHoroscope = (input, asteroids) => {

    // get asteroid

    const asteroid = input[2] * 1 - 1
    const i = asteroids[asteroid]

    console.log('here is item:', asteroid)
    const diameter = i.estimated_diameter.meters.estimated_diameter_max
    console.log('diam here:', diameter)
    const diameter_string = diameter.toString()
    const lastchar_diamater = diameter_string[diameter_string.length - 1];



    const integerD = parseInt(lastchar_diamater, 10)



    const velocity = i.close_approach_data[0].relative_velocity.miles_per_hour
    const velocity_string = velocity.toString()
    const lastchar_velocity = velocity_string[velocity_string.length - 1];
    const integerV = parseInt(lastchar_velocity, 10);



    const lunar = i.close_approach_data[0].miss_distance.lunar
    const lunar_string = lunar.toString()
    const lastchar_lunar = lunar_string[lunar_string.length - 1];
    const integerL = parseInt(lastchar_lunar, 10);

    console.log(integerD)
    console.log(integerV)
    console.log(integerL)
    console.log(input[8])

    const multiply = integerD * integerV * integerL * input[8]
    console.log(multiply)
    const multiply_string = multiply.toString()
    const lastChar_multiply = multiply_string[multiply_string.length - 1]
    const horo = parseInt(lastChar_multiply, 10)

    return horo

}

module.exports = executeHoroscope