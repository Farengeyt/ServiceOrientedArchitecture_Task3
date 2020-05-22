function grater_than() {
    inputData = document.getElementById("grater_input").value;
    inputParams = '<mark>' + inputData + '</mark>';
    soap2('GetStudentsGraterThan', inputParams, 'grater_records_table');
}

function lower_than() {
    inputData = document.getElementById("lower_input").value;
    inputParams = '<mark>' + inputData + '</mark>';
    soap2('GetStudentsLowerThan', inputParams, 'lower_records_table');
}

function in_range() {
    inputMinData = document.getElementById("range_input_min").value;
    inputMaxData = document.getElementById("range_input_max").value;
    inputParams = '<minMark>' + inputMinData + '</minMark><maxMark>' + inputMaxData + '</maxMark>';
    soap2('GetStudentsInRange', inputParams, 'range_records_table');
}

function soap2(method, inputParams, output) {
    document.getElementById(output).innerHTML = "<tbody><tr><th>Name</th><th>AvgMark</th></tr></tbody>";
    var strRequest =
        '<?xml version="1.0" encoding="utf-8"?>' +
        '<soap12:Envelope xmlns:xsi = "http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd = "http://www.w3.org/2001/XMLSchema" xmlns:soap12 = "http://www.w3.org/2003/05/soap-envelope">' +
        '<soap12:Body>' +
        '<' + method + ' xmlns="http://www.mycompany.com/">' +
        inputParams +
        '</' + method + '>' +
        '</soap12:Body>' +
        '</soap12:Envelope>';

    $.ajax({
        type: "POST",
        url: "https://localhost:44373/StudentListWebService.asmx",
        contentType: "application/soap+xml; charset=utf-8",
        data: strRequest,
        error: function (request, status, error) {

            console.log("request:" + request);
            console.log("status:" + status);
            console.log("error:" + error);
        }
    }).done(function (response) {

        var listResponse = response.getElementsByTagName('Student');

        var trHTML = '';
        $.each(listResponse, function (i, item) {
            trHTML += '<tr><td>' + item.childNodes[0].textContent + '</td><td>' + item.childNodes[1].textContent + '</td></tr>';
        });

        $('#' + output).append(trHTML);
    });
}