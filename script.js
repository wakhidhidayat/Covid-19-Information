$(document).ready(function() {
    getGlobalInfo();
    getCountryInfo();
});

function getGlobalInfo() {
    $.ajax({
        url : 'https://coronavirus-19-api.herokuapp.com/all',
        success: function(data) {
            try {
                var json = data;

                let cases = json.cases.toLocaleString();
                let deaths = json.deaths.toLocaleString();
                let recovered = json.recovered.toLocaleString();

                $("#global-cases").html(cases);
                $("#global-deaths").html(deaths);
                $("#global-recovered").html(recovered);
            } catch(e) {
                alert("Something wrong..");
            }
        }, error : function(resp) {}
    });
}

function getCountryInfo() {
    $.ajax({
        url : 'https://coronavirus-19-api.herokuapp.com/countries',
        success : function (data) {
            try {
                let json = data;

                if(json.length > 0) {
                    let i;
                    for(i = 0; i < json.length; i++) {

                        let html  = [];

                        let countriesData = json[i];

                        let no = i + 1;
                        let country = countriesData.country;
                        let cases = countriesData.cases.toLocaleString();
                        let todayCases = countriesData.todayCases.toLocaleString();
                        let active = countriesData.active.toLocaleString();
                        let deaths = countriesData.deaths.toLocaleString();
                        let todayDeaths = countriesData.todayDeaths.toLocaleString();
                        let recovered = countriesData.recovered.toLocaleString();
                        let critical = countriesData.critical.toLocaleString();


                        html.push("<div class='m-3 card' style='background-color:#303030'>");
                        html.push("<div class='card-body' style='background-color:#303030'>");
                        html.push("<h2 style='color:#fefefe'> #"+ no + " - " + country + "</h2>");
                        html.push("<span class='m-1 badge badge-primary'><h6> Cases : " + cases + " </h6></span>");
                        html.push("<span class='m-1 badge badge-primary'><h6> Today : " + todayCases + " </h6></span>");
                        html.push("<span class='m-1 badge badge-primary'><h6> Active Cases : " + active + " </h6></span> <br/>");
                        html.push("<span class='m-1 badge badge-danger'><h6> Deaths : " + deaths + " </h6></span>");
                        html.push("<span class='m-1 badge badge-danger'><h6> Today Death : " + todayDeaths + " </h6></span> </br>");
                        html.push("<span class='m-1 badge badge-success'><h6> Recovered : " + recovered + " </h6></span>");
                        html.push("<span class='m-1 badge badge-warning'><h6> Critical : " + critical + " </h6></span>");
                        html.push("</div> </div>");

                        $("#country-list").append(html.join(""));
                    }
                }
            } catch(e) {
                alert("Can not get data from API");
            }
        }
    });
}