var temp_canvas = document.getElementById("tempChart").getContext('2d');
var hum_canvas = document.getElementById("humChart").getContext('2d');
var presence_canvas = document.getElementById("presenceChart").getContext('2d');
var power_canvas = document.getElementById("powerChart").getContext('2d');


function getDataFromPage() {
    var data = document.getElementsByClassName('data');
    data = Array.from(data);
    var output = [];
    
    data.forEach(function(temp) {
        var str = temp.innerHTML.split('|');
        var date, time, temp, humidity, presence, power;
        date = str[0];
        time = str[1];
        temp = str[2];
        humidity = str[3];
        presence = str[4];
        power = str[5];
        output.push({date:date, time:time, temp:temp, humidity:humidity, presence:presence, power:power});
    });

    return output;
}

function getHumidityList(data) {
    var output = [];
    data.forEach(function(element){
        output.push(element.humidity);
    });
    return output;
}

function getTemperatureList(data) {
    var output = [];
    data.forEach(function(element){
        output.push(element.temp);
    });
    return output;
}

function getCurrentTemperature() {
    return data[data.length-1].temp;
}

function getPresenceList(data) {
    var output = [];
    data.forEach(function(element){
        output.push(element.presence);
    });
    return output;
}

function getCurrentPresence(data) {
    return data[data.length-1].presence;
}

function getPowerList(data) {
    var output = [];
    data.forEach(function(element){
        output.push(element.power);
    });
    return output;
}

function getCurrentPower(data) {
    return data[data.length-1].power;
}

function getTimeList(data) {
    var output = [];
    data.forEach(function(element){
        output.push(element.time);
    });
    return output;
}

var pageData = getDataFromPage();
console.log(pageData);

var tempChart = new Chart(temp_canvas, {
    type: 'line',
    data: {
        labels: getTimeList(pageData),
        datasets: [{
            label: 'Temperatura en el Aula',
            data: getTemperatureList(pageData),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive:false
    }
});

var humChart = new Chart(hum_canvas, {
    type: 'line',
    data: {
        labels: getTimeList(pageData),
        datasets: [{
            label: 'Humedad en el aula',
            data: getHumidityList(pageData),
            backgroundColor: [
                'rgba(5, 99, 132, 0.2)'
            ],
            borderColor: [
                'rgba(5,99,132,1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive:false
    }
});

var presenceChart = new Chart(presence_canvas, {
    type: 'line',
    data: {
        labels: getTimeList(pageData),
        datasets: [{
            label: 'Estado de Presencia',
            data: getPresenceList(pageData),
            backgroundColor: [
                'rgba(0, 180, 30, 0.2)'
            ],
            borderColor: [
                'rgba(0, 180, 30,1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive:false
    }
});

var powerChart = new Chart(power_canvas, {
    type: 'line',
    data: {
        labels: getTimeList(pageData),
        datasets: [{
            label: 'Uso de energía',
            data: getPowerList(pageData),
            backgroundColor: [
                'rgba(255, 200, 2, 0.2)'
            ],
            borderColor: [
                'rgba(255,200,2,1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
        responsive:false
    }
});

