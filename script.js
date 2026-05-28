let time = document.getElementById("time");
let tempValue = document.getElementById("tempValue");
let weekValue = document.getElementById("weekValue");
let dateValue = document.getElementById("dateValue");
let ampm = document.getElementById("ampm");

const days = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT"
];

function updateTime() {
    let currentTime = new Date();
    let hours = currentTime.getHours();
    let minutes = currentTime.getMinutes();
     
     ampm.textContent = hours >= 12 ? 'PM' : 'AM';
    // convert to 12-hour format
    hours = hours % 12 || 12; 
    minutes = minutes < 10 ? '0' + minutes : minutes;
    time.textContent = hours + ':' + minutes;

    weekValue.textContent = days[currentTime.getDay()];

    dateValue.textContent = String(currentTime.getDate()).padStart(2, '0') + '/' + String(currentTime.getMonth() + 1).padStart(2, '0');
}
// TEMPERATURE
async function updateTemperature(){

    navigator.geolocation.getCurrentPosition(

        async(position) => {

            const lat =
                position.coords.latitude;

            const lon =
                position.coords.longitude;

            const response = await fetch(

                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6c79273964c947c06a79c349ea75ad1b&units=imperial`

            );

            const data = await response.json();
            tempValue.textContent =
                Math.round(data.main.temp);

        }

    );

}
updateTime();
updateTemperature();
setInterval(updateTime, 1000);




