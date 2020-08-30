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

console.log(user_country);