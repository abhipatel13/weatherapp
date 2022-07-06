const submitBtn = document.getElementById("submitBtn");
const CityValue = document.getElementById("cityName");
const city_name = document.getElementById("city_name");
const temp = document.getElementById("temp_value");
const temp_status = document.getElementById("temp_status");
const hide_data = document.getElementById("data_hide");
const day = document.getElementById("day");
const adddate = document.getElementById('today_date');

hide_data.style.display = "none";
const getinfo = async(event) =>{

    event.preventDefault();
    let CityVal = CityValue.value;
//  alert(CityValue.value);
    if(CityVal === ""){
        city_name.innerText = 'Please Enter City Name';
        hide_data.style.display = "none";
    }
    else{
        try{
            hide_data.style.display = "";
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${CityVal}&units=metric&appid=3723a58f1d86938d98a37f7236ba8061`;
        let data = await fetch(url);
        let mainData = await data.json();
        let arrayData = [mainData];
        city_name.innerText = arrayData[0].name + " | "+ arrayData[0].sys.country;
        temp.innerText = arrayData[0].main.temp;
        let tempStatus = arrayData[0].weather[0].main;
        if(tempStatus == "Clouds")
        {
            temp_status.innerHTML = "<i class='fa-solid fa-cloud'></i>";
        }
        else if(tempStatus == "Clear"){
            temp_status.innerHTML = "<i class='fa-solid fa-sun'></i>";
        }
        else if(tempStatus == "Rain"){
            temp_status.innerHTML = "<i class='fa-solid fa-cloud-rain'></i>";
        }
        else {
            temp_status.innerHTML = "<i class='fa-solid fa-cloud'></i>";
        }
     
        }
    catch{
        city_name.innerText = `Please Enter City Name Properly`;
        hide_data.style.display = "none";
    }

    }
    
}

submitBtn.addEventListener("click",getinfo);


var date = new Date();
var today = date.getDay();
const myday = ["Sunday", "Monday", "Tuesday","WednesDay","ThrusDay","Friday","Saturday"];
const myMonth = ["JAN", "FEB", "MARCH","APRIL","MAY","JUNE","JULY","AUG","SEP","AUG","NOV","DEC"];
day.innerText =  myday[today];
adddate.innerText = date.getDate()+" "+ myMonth[date.getMonth()] + " " + date.getFullYear();