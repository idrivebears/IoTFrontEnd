var ctx = document.getElementById("tempChart").getContext('2d');

function getDataFromPage() {
    var data = document.getElementsByClassName('data');
    data = Array.from(data);
    var output = [];
    
    data.forEach(function(temp) {
        var str = temp.innerHTML.split('|');
        var date, time, temp, humidity;
        date = str[0];
        time = str[1];
        temp = str[2];
        humidity = str[3];
        output.push({date:date, time:time, temp:temp, humidity:humidity});
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

function getTimeList(data) {
    var output = [];
    data.forEach(function(element){
        output.push(element.time);
    });
    return output;
}

var pageData = getDataFromPage();
console.log(pageData);
console.log(getTemperatureList(pageData));

var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: getTimeList(pageData),
        datasets: [{
            label: 'Datos de salon',
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