//Select all elements

const country_name_element = document.querySelector(".country .name");
const total_case_element = document.querySelector(".total_cases .value");
const new_cases_element = document.querySelector(".total_cases .new-name");
const recovered_element = document.querySelector(".recovered .value");
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

            formatedDates.push(formatDate(date));
            app_data.push(DATA);
            cases_list.push(parseInt(DATA.total_cases.replace(/,/g, "")));
			recovered_list.push(parseInt(DATA.total_recovered.replace(/,/g, "")));
			deaths_list.push(parseInt(DATA.total_deaths.replace(/,/g, "")));
        })
    })

}

fetchData(user_country);

// UPDATE UI FUNCTION
function updateUI(){
	updateStats();
	axesLinearChart();
}

function updateStats(){
	let last_entry = app_data[app_data.length - 1];
	let before_last_entry = app_data[app_data.length - 2];

	country_name_element.innerHTML = last_entry.country_name;

	total_cases_element.innerHTML = last_entry.total_cases || 0;
	new_cases_element.innerHTML = `+${last_entry.new_cases || 0 }`;

	recovered_element.innerHTML = last_entry.total_recovered || 0;
	new_recovered_element.innerHTML = `+${parseInt(last_entry.total_recovered.replace(/,/g, "")) - parseInt(before_last_entry.total_recovered.replace(/,/g, ""))}`;
	
	deaths_element.innerHTML = last_entry.total_deaths;
	new_deaths_element.innerHTML = `+${last_entry.new_deaths || 0}`;
}

// UPDATE CHART
let my_chart;
function axesLinearChart(){

	if(my_chart){
		my_chart.destroy();
	}

	my_chart = new Chart(ctx, {
		type: 'line',
		data: {
			datasets: [{
				label: 'Cases',
				data: cases_list,
				fill : false,
				borderColor : '#FFF',
				backgroundColor: '#FFF',
				borderWidth : 1
			},{
				label: 'Recovered',
				data: recovered_list,
				fill : false,
				borderColor : '#009688',
				backgroundColor: '#009688',
				borderWidth : 1
			},{
				label: 'Deaths',
				data: deaths_list,
				fill : false,
				borderColor : '#f44336',
				backgroundColor: '#f44336',
				borderWidth : 1
			}],
			labels: formatedDates
		},
		options: {
			responsive : true,
			maintainAspectRatio : false
		}
	});
}

// FORMAT DATES
const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatDate(dateString){
	let date = new Date(dateString);

	return `${date.getDate()} ${monthsNames[date.getMonth()]}`;
}