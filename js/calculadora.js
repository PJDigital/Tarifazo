function ocultar() {
    document.getElementById("Resultado").style.display = "none";
}

function calcular() {
        var cia = "";
        var ubi = "";
        cia = $('#cia').val();   
        ubi = $('#UBI').val();

      
        if ($('#Consumo').val() != "" && $('#ConsumoAnterior').val() != "") {
            CalcularTarifa(cia, document.getElementById('TarifaSoc').checked, $('#Consumo').val(), $('#ConsumoAnterior').val(), ubi);
            $.ajax("saveConsulta.php?cia="+cia+"&ubicacion="+ubi+"&consumo="+ $('#Consumo').val()+"&consumoAnterior="+$('#ConsumoAnterior').val()+"&esSoc="+document.getElementById('TarifaSoc').checked);
        }
        else {
            customAlert('Ingresa el consumo actual y el anterior.');
        }
    }

function changeCia(){

    $('#cia').val($('#tcia').is(':checked')?'Edesur':'Edenor');

}

function changeUBI(){

    $('#UBI').val($('#tUBI').is(':checked')?'CABA':'PROV');

}

function CalcularTarifa(mcia, esSoc, consumo, consumoAnterior, ubicacion) {

    consumoAnterior=consumoAnterior/2;  
    var valorActual;
    var valorAnterior;
    var DiferenciaPesos;
    var DiferenciaPorciento;
    var TramoPeron;
    if (ubicacion == 'CABA') {
        var tasas = 1.2798;
    } else {
        var tasas = 1.4116;
    }

    var arrayTarifaFijaCristina = [4.44, 16.2, 18.83, 20.11, 20.35, 25.48, 27.51, 27.51, 27.51];
    var arrayTarifaKWCristina = [0.082, 0.043, 0.046, 0.048, 0.048, 0.101, 0.105, 0.105, 0.105];
    var HayAhorro = consumo > consumoAnterior ? false : true;
    var Ahorro = 1 - (consumo / consumoAnterior) ;


    var arrayTarifaKWQueVotasteES0 = [0.577, 0.459, 0.479, 0.492, 0.502, 0.589, 0.616, 0.616, 0.616];
    var arrayTarifaKWQueVotasteES1 = [0.498, 0.380, 0.400, 0.413, 0.423, 0.509, 0.536, 0.536, 0.536];
    var arrayTarifaKWQueVotasteES2 = [0.442, 0.323, 0.343, 0.356, 0.366, 0.452, 0.478, 0.478, 0.478];
    var arrayTarifaFijaQueVotasteES0 = [15.94, 60.14, 71.68, 78.76, 84.34, 133.32, 148.43, 148.43, 148.43];
    var arrayTarifaFijaQueVotasteES1 = [15.94, 60.30, 71.88, 78.98, 84.58, 133.75, 148.90, 148.90, 148.90];
    var arrayTarifaFijaQueVotasteES2 = [15.94, 60.48, 72.11, 79.23, 84.85, 134.23, 149.44, 149.44, 149.44];
    var arrayTarifaKWQueVotasteESTSA = [0, 0.119, 0.137, 0.147, 0.156, 0.230, 0.254, 0.254, 0.254];
    var arrayTarifaKWQueVotasteESTSN = [0, 0.459, 0.479, 0.492, 0.502, 0.589, 0.616, 0.616, 0.616];

    var arrayTarifaKWQueVotasteEN0 = [0.556, 0.448, 0.469, 0.480, 0.496, 0.557, 0.586, 0.586, 0.586];
    var arrayTarifaKWQueVotasteEN1 = [0.477, 0.369, 0.390, 0.401, 0.417, 0.478, 0.506, 0.506, 0.506];
    var arrayTarifaKWQueVotasteEN2 = [0.420, 0.312, 0.333, 0.344, 0.359, 0.420, 0.448, 0.448, 0.448];
    var arrayTarifaKWQueVotasteENTSA = [0.000, 0.110, 0.127, 0.137, 0.150, 0.203, 0.227, 0.227, 0.227];
    var arrayTarifaFijaQueVotasteEN0 = [14.43, 54.46, 66.14, 72.29, 81.16, 115.65, 131.64, 131.64, 131.64];
    var arrayTarifaFijaQueVotasteEN1 = [14.43, 54.61, 66.33, 72.50, 81.39, 116.01, 132.06, 132.06, 132.06];
    var arrayTarifaFijaQueVotasteEN2 = [14.43, 54.77, 66.53, 72.73, 81.65, 116.41, 132.52, 132.52, 132.52];
    var arrayTarifaKWQueVotasteENTSN = [0, 0.448, 0.469, 0.480, 0.496, 0.557, 0.586, 0.586, 0.586];

    var arrayTarifaKWQueVotaste = [0, 0.448, 0.469, 0.480, 0.496, 0.557, 0.586, 0.586, 0.586];
    var arrayTarifaFijaQueVotaste = [0, 0.448, 0.469, 0.480, 0.496, 0.557, 0.586, 0.586, 0.586];
    var arrayTarifaKWQueVotasteTS = [0, 0.448, 0.469, 0.480, 0.496, 0.557, 0.586, 0.586, 0.586];

    var arrayCurrete = [4, 10, 17, 22, 28, 50, 75, 80, 150];

    if (Ahorro > 0.2) {
        
       if (mcia == 'Edesur') {

            arrayTarifaKWQueVotaste = arrayTarifaKWQueVotasteES2;
            arrayTarifaFijaQueVotaste = arrayTarifaFijaQueVotasteES2;
            arrayTarifaKWQueVotasteTS = arrayTarifaKWQueVotasteESTSA;
            
        }
        else {
            arrayTarifaKWQueVotaste = arrayTarifaKWQueVotasteEN2;
            arrayTarifaFijaQueVotaste = arrayTarifaFijaQueVotasteEN2;
            arrayTarifaKWQueVotasteTS = arrayTarifaKWQueVotasteENTSA;
        }
    }
    if (Ahorro >= 0.1 & Ahorro <= 0.2) {
        
            if (mcia == 'Edesur') {
                arrayTarifaKWQueVotaste = arrayTarifaKWQueVotasteES1;
                arrayTarifaFijaQueVotaste = arrayTarifaFijaQueVotasteES1;
                arrayTarifaKWQueVotasteTS = arrayTarifaKWQueVotasteESTSA;
            }
            else {
                arrayTarifaKWQueVotaste = arrayTarifaKWQueVotasteEN1;
                arrayTarifaFijaQueVotaste = arrayTarifaFijaQueVotasteEN1;
                arrayTarifaKWQueVotasteTS = arrayTarifaKWQueVotasteENTSA;
            }
        }
        if (Ahorro < 0.1) {
            
            if (mcia == 'Edesur') {
                arrayTarifaKWQueVotaste = arrayTarifaKWQueVotasteES0;
                arrayTarifaFijaQueVotaste = arrayTarifaFijaQueVotasteES0;
                arrayTarifaKWQueVotasteTS = arrayTarifaKWQueVotasteESTSA;
            }
            else {
                arrayTarifaKWQueVotaste = arrayTarifaKWQueVotasteEN1;
                arrayTarifaFijaQueVotaste = arrayTarifaFijaQueVotasteEN0;
                arrayTarifaKWQueVotasteTS = arrayTarifaKWQueVotasteENTSA;
            }
        }
                
    if (consumo < 301) {
        TramoPeron = 0;
    }
    if (consumo >= 301 & consumo < 651) {
        TramoPeron = 1;
    }
    if (consumo >= 651 & consumo < 801) {
        TramoPeron = 2;
    }
    if (consumo >= 801 & consumo < 901) {
        TramoPeron = 3;
    }
    if (consumo >= 901 & consumo < 1001) {
        TramoPeron = 4;
    }
    if (consumo >= 1001 & consumo < 1201) {
        TramoPeron = 5;
    }
    if (consumo > 1200 & consumo < 1401) {
        TramoPeron = 6;
    }
    if (consumo > 1401 & consumo < 2801) {
        TramoPeron = 7;
    }
    if (consumo > 2800) {
        TramoPeron = 8;
    }


    valorAnterior = consumo * arrayTarifaKWCristina[TramoPeron] + arrayTarifaFijaCristina[TramoPeron];

    if (!esSoc) {
        valorActual = consumo * arrayTarifaKWQueVotaste[TramoPeron] + arrayTarifaFijaQueVotaste[TramoPeron] + arrayCurrete[TramoPeron];
    }
    else {
        if (HayAhorro || consumo <= 300) {
            valorActual = consumo * arrayTarifaKWQueVotasteTS[TramoPeron] + arrayTarifaFijaQueVotaste[TramoPeron];
        }
        else {
            valorActual = (300 * arrayTarifaKWQueVotasteTS[TramoPeron] + arrayTarifaFijaQueVotaste[TramoPeron])
            + ((consumo - 300) * arrayTarifaKWQueVotaste[TramoPeron] + arrayTarifaFijaQueVotaste[TramoPeron]);


        }

    }
    valorActual = (valorActual * tasas) * (30/61);
    valorAnterior = (valorAnterior * tasas) * (30 / 61);
    DiferenciaPesos = valorActual - valorAnterior;
    DiferenciaPorciento = (valorActual * 100) / valorAnterior;
    
    $("#myModal").modal('show');
    $("#resultadoActual").html(formato_numero(valorActual,2));
    $("#resultadoAnterior").html(formato_numero(valorAnterior,2));
    $("#DiferenciaPesos").html(formato_numero(DiferenciaPesos, 2)) ;
    $("#DiferenciaPorciento").html(formato_numero(DiferenciaPorciento, 2)) ;
    $('#data').val($('#datos').text());
}

function formato_numero(numero, decimales) { // v2007-08-06
    var separador_decimal = ',';
    var separador_miles = '.';
    numero = parseFloat(numero);
    if (isNaN(numero)) {
        return "";
    }

    if (decimales !== undefined) {
        // Redondeamos
        numero = numero.toFixed(decimales);
    }

    // Convertimos el punto en separador_decimal
    numero = numero.toString().replace(".", separador_decimal !== undefined ? separador_decimal : ",");

    if (separador_miles) {
        // Añadimos los separadores de miles
        var miles = new RegExp("(-?[0-9]+)([0-9]{3})");
        while (miles.test(numero)) {
            numero = numero.replace(miles, "$1" + separador_miles + "$2");
        }
    }

    return numero;
}


function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function customAlert(texto){
     $('#alert').html('<div class="alert alert-danger" role="alert" id="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+texto+'</div>');

}

function customSuccess(texto){
     $('#alert').html('<div class="alert alert-success" role="alert" id="alert"><button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'+texto+'</div>');

}
