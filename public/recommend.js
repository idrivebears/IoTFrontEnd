console.log("Recommend.js data:");
console.log(pageData[pageData.length-1]);
console.log(Date.now());

var dateNow = new Date();

var today = dateNow.getDay();
var hour = dateNow.getHours();
console.log(hour);

horarioCFE = '';
horarioBase = 'Base';
horarioIntermedio = 'Intermedio';
horarioPunta = 'Punta';

function getFee(horario) {
    if(horario === horarioBase) {
        return '$0.9901';
    }
    if(horario === horarioIntermedio) {
        return '$1.1845';
    }
    return '$2.3408';
}

//Si es domingo
if(today == 0) {
    if(hour >= 0 && hour < 19) {
        // base
        horarioCFE=horarioBase;
    }
    else {
        // intermedio
        horarioCFE=horarioIntermedio;
    }
}
// de lunes a viernes
else if(today >= 1 && today <=5) {
    if(hour >= 0 && hour < 6){
        // base
        horarioCFE=horarioBase;
    }
    else if((hour >= 6 && hour < 20) || (hour >= 22 && hour < 24)) {
        // intermedia
        horarioCFE=horarioIntermedio;
    }
    else if(hour >= 20 && hour < 22) {
        // punta
        horarioCFE=horarioPunta;
    }
}
// Si es sabado.
else {
    if(hour >= 0 && hour < 7) {
        // base
        horarioCFE=horarioBase;
    }
    else {
        //intermedio
        horarioCFE= horarioIntermedio;
    }
}

document.getElementById('horario-cfe').innerHTML = horarioCFE + " Costo por Kilowatt: " + getFee(horarioCFE);

var lastEntry = pageData[pageData.length-1];

document.getElementById('widget-recomendacion').innerHTML = '';