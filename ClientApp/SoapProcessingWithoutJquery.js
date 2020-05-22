function grater_than_clear() {
    inputData = document.getElementById("grater_input_clear").value;
    inputParams = '<mark>' + inputData + '</mark>'
    soap('GetStudentsGraterThan', inputParams, 'grater_records_table_clear')
}

function lower_than_clear() {
    inputData = document.getElementById("lower_input_clear").value;
    inputParams = '<mark>' + inputData + '</mark>'
    soap('GetStudentsLowerThan', inputParams, 'lower_records_table_clear')
}

function in_range_clear() {
    inputMinData = document.getElementById("range_input_min_clear").value;
    inputMaxData = document.getElementById("range_input_max_clear").value;
    inputParams = '<minMark>' + inputMinData + '</minMark><maxMark>' + inputMaxData + '</maxMark>'
    soap('GetStudentsInRange', inputParams, 'range_records_table_clear')
}

function soap(method, inputParams, output) {
    var xmlhttp = new XMLHttpRequest();

    //replace second argument with the path to your Secret Server webservices
    xmlhttp.open('POST', 'https://localhost:44373/StudentListWebService.asmx', true);

    xmlhttp.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8')
    //create the SOAP request
    //replace username, password (and org + domain, if necessary) with the appropriate info
    var strRequest =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap12:Envelope xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd = "http://www.w3.org/2001/XMLSchema" xmlns:soap12 = "http://www.w3.org/2003/05/soap-envelope">' +
        '<soap12:Body>' +
        '<' + method + ' xmlns="http://www.mycompany.com/">' +
        inputParams +
        '</' + method + '>' +
        '</soap12:Body>' +
        '</soap12:Envelope>';

    //specify request headers
    xmlhttp.setRequestHeader('Content-Type', 'application/soap+xml; charset=utf-8');

    //send the SOAP request
    xmlhttp.send(strRequest);

    xmlhttp.onload = function () {
        if (xmlhttp.status != 200) {
            console.log(`Ошибка ${xmlhttp.status}: ${xmlhttp.statusText}`);
        } else {
            var listResponse = xmlhttp.responseXML.getElementsByTagName('Student');
            
            var trHTML = '<tbody><tr><th>Name</th><th>AvgMark</th></tr>';
            for (i = 0; i < listResponse.length; i++) {
                trHTML += '<tr><td>' + listResponse[i].childNodes[0].textContent + '</td><td>' + listResponse[i].childNodes[1].textContent + '</td></tr>';
            }
            trHTML += "</tbody >";
            document.getElementById(output).innerHTML = trHTML;
        }
    };

};