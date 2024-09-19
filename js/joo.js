const todayName = document.getElementById('todayName')
const todayNumber = document.getElementById('todayNumber')
const month = document.getElementById('month')
const todayCountry = document.getElementById('todayCountry')
const todayTemp = document.getElementById('todayTemp')
const todayText = document.getElementById('todayText')
const todayImg = document.getElementById('todayImg')
const todayWind = document.getElementById('todayWind')
const wind_kp = document.getElementById('wind_kp')
const wind_di = document.getElementById('wind_di')
// ==============Today================
const tomorrowDay = document.getElementById('tomorrowDay')
const imgTomorrow = document.getElementById('imgTomorrow')
const tomorrowMaxTemp = document.getElementById('tomorrowMaxTemp')
const tomorrowMinTemp = document.getElementById('tomorrowMinTemp')
const tomorrowText = document.getElementById('tomorrowText')
// ===============tomorrow============
const afterDay = document.getElementById('afterDay')
const afterImg = document.getElementById('afterImg')
const afterMaxTemp = document.getElementById('afterMaxTemp')
const afterMinTemp = document.getElementById('afterMinTemp')
const afterText = document.getElementById('afterText')
// ===============afterTomorrow=======
const searchLocation = document.getElementById('search')
// =================searchCountry=====


navigator.geolocation.getCurrentPosition((joo)=>{
// console.log(joo);
let myLatitude = joo.coords.latitude
let myLongitude = joo.coords.longitude
getWeather(`${myLatitude},${myLongitude}`)
})

searchLocation.addEventListener('input', (e)=>{
let searching = e.target.value
                                                                     console.log(searching);

getWeather(searching)
} )



async function getWeather(location) {
    let data = await fetch(`https://api.weatherapi.com/v1/forecast.json?q=${location}&days=3&key=a1f94b4823ba445f838163859241809`)
    let result = await data.json()
                                                                     console.log(result);
    displayToday(result)
    displayTomorrow(result)
    afterTomorrow(result)
}
function displayToday(data) {
    let todayData = data.current.last_updated
                                                                     console.log(todayData);
    let myTodayDate = new Date(todayData)
    let weekDay = myTodayDate.toLocaleString('en-us',{weekday : 'long'})
    let weekNumber = myTodayDate.getDate()
    let monthDate = myTodayDate.toLocaleString('en-us',{month : 'long'})
todayName.innerHTML = weekDay
todayNumber.innerHTML = weekNumber
month.innerHTML = monthDate
    let country = data.location.name
todayCountry.innerHTML = country
    let myTodayTemp = data.current.temp_c
todayTemp.innerHTML =  myTodayTemp +"ْ C"
    let myTodayText = data.current.condition.text
todayText.innerHTML = myTodayText
    let myTodayImg = data.current.condition.icon
    let myTodayImgSrc = `https:${myTodayImg}`
todayImg.setAttribute("src",myTodayImgSrc)
    let myTodayWind = data.current.humidity
todayWind.innerHTML=myTodayWind + '%'
    let myWind_kp = data.current.wind_kph
wind_kp.innerHTML =myWind_kp + "Km/h"
    let myWind_di = data.current.wind_dir
    wind_di.innerHTML = myWind_di
}
function displayTomorrow(data) {
    let myTomorrowDay = data.forecast.forecastday[1].date
    let myTomorrowDate = new Date(myTomorrowDay)
    let tomorrowWeekDay = myTomorrowDate.toLocaleString('en-us',{weekday : 'long'})
tomorrowDay.innerHTML = tomorrowWeekDay
    let tomorrowIMg =  data.forecast.forecastday[1].day.condition.icon    
    let myTomorrowImgSrc = `https:${tomorrowIMg}`
imgTomorrow.setAttribute("src",myTomorrowImgSrc)
    let myTomorrowMaxTemp = data.forecast.forecastday[1].day.maxtemp_c
    let myTomorrowMinTemp = data.forecast.forecastday[1].day.mintemp_c
tomorrowMaxTemp.innerHTML = myTomorrowMaxTemp +  'ْ C'
tomorrowMinTemp.innerHTML = myTomorrowMinTemp +  'ْ C'
    let textTomorrow = data.forecast.forecastday[1].day.condition.text
tomorrowText.innerHTML = textTomorrow
}
function afterTomorrow(data) {
    let myAfterDay = data.forecast.forecastday[2].date
    let myAfterDate = new Date(myAfterDay)
    let myAfterWeekDay = myAfterDate.toLocaleString('en-us',{weekday : 'long'})
afterDay.innerHTML = myAfterWeekDay
    let myAfterImg = data.forecast.forecastday[2].day.condition.icon
    let myAfterImgSrc = `https:${myAfterImg}`
afterImg.setAttribute('src',myAfterImgSrc)
    let myAfterMaxTemp = data.forecast.forecastday[2].day.maxtemp_c
    let myAfterMinTemp = data.forecast.forecastday[2].day.mintemp_c
afterMaxTemp.innerHTML = myAfterMaxTemp + 'ْ C'
afterMinTemp.innerHTML = myAfterMinTemp + 'ْ C'
    let myAfterText = data.forecast.forecastday[2].day.condition.text
afterText.innerHTML = myAfterText

}