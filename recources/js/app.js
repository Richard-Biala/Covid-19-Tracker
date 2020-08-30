//Select all elements

const country_name_element = document.querySelector(".country .name");
const total_case_element = document.querySelector(".total_cases .value");
const recovered_element = document.querySelector(".total_cases .new-name");
const country_name_element = document.querySelector(".recovered .value");
const new_recovered_element = document.querySelector(".recovered .new-name");
const deaths_element = document.querySelector(".deaths .valus");
const new_deaths = document.querySelector(".deaths .new-value");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

//APP VARIABLES
let app_data = [],
    cases_list =[],
    recovered_list = [],
    deaths_list = [],
    dates = [];

//Get USER COUNTRY CODE
let country_code = geoplugin_countryCode();
let user_country;
country_list.forEach ( country => {
    if( country.code == country.code){
        user_country = country.name;
    }
});


//Rapid API for COVID-19
function fetchData(user_country){
	country_name_element.innerHTML = "Loading...";

	cases_list = [], recovered_list =[], deaths_list = [], dates = [], formatedDates = [];
	
	fetch(`https://covid19-monitor-pro.p.rapidapi.com/coronavirus/cases_by_days_by_country.php?country=${user_country}`, {
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "covid19-monitor-pro.p.rapidapi.com",
			"x-rapidapi-key": "f3b4aa50ebmshf7b658babefdd91p1b725bjsn50aa8e171bb5"
		}
    })
    .then (response => {
        return response.json();
    })
    .then (data => {
        dates = Object.keys(data);

        dates.forEach(data => {
            let DATA = data(date);

            app_data.push(DATA);
        })
    })

}