var baseURL = 'http://dev.cs.smu.ca:8122';

function newUniversity(){
     var name = $("#name").val();
     var address = $("#address").val();
     var phone = $("#phone").val();
     
    var newUni = {
        "Name": name,
        "Address": address,
        "Phone": phone
    };
    $.post(baseURL + "/newUni", newUni, function (res) {
        alert(res);
    });
    allUni();
    return false;
}


function removeUniversity(bid){
    var uid = 'u'+bid;
    var uni = $("#"+uid).html();
    var universityInfo = {
        "Name": uni
    };
    console.log(uni);
    $.post(baseURL + "/removeUniversity", universityInfo, function (res) {
        if(res['n']==0){
            alert("University not found. Please enter correct name.");
        }
        else{
            allUni();
            alert("University Record removed");
        }
    });
    return;
}

function searchUniversity(){
    var name = $("#filter").val();
    if (name == '') {
        alert("Please enter University Name to Search");
        $("#filter").focus();
        return;
    }
    var universityInfo = {
        "Name": name 
    };
    $.post(baseURL + "/searchUniversity", universityInfo, function (res) {
        $("#unitbody tr").remove();
        var table = document.getElementById("unitbody");
        var universities = (res);
        if(universities.length==0){
            alert("No records found");
            return;
        }
        
        for (var i = 0; i < universities.length; i++) {
            var btn = document.createElement("button");
            btn.id="id"+i;
            btn.className="btn btn-danger";
            btn.type="button";
            btn.innerHTML="Delete";
            btn.setAttribute("onclick", "removeUniversity(this.id)");
            var r = table.insertRow(-1);

            var cell0=r.insertCell(0);
            var cell1=r.insertCell(1);
            var cell2=r.insertCell(2);
            var cell3=r.insertCell(3);

            cell0.id="uid"+i;

            cell0.innerHTML = universities[i].Name;
            cell1.innerHTML = universities[i].Address;
            cell2.innerHTML = universities[i].Phone;
            cell3.appendChild(btn);
        }
    });
}




function allUni(){
    $.post(baseURL + "/allUniversities", function (res) {
        $("#unitbody tr").remove();
        var table = document.getElementById("unitbody");
        var universities = (res);
        if(universities.length==0){
            alert("No records found");
            return;
        }
        
        for (var i = 0; i < universities.length; i++) {
            var btn = document.createElement("button");
            btn.id="id"+i;
            btn.className="btn btn-danger";
            btn.type="button";
            btn.innerHTML="Delete";
            btn.setAttribute("onclick", "removeUniversity(this.id)");
            var r = table.insertRow(-1);

            var cell0=r.insertCell(0);
            var cell1=r.insertCell(1);
            var cell2=r.insertCell(2);
            var cell3=r.insertCell(3);

            cell0.id="uid"+i;

            cell0.innerHTML = universities[i].Name;
            cell1.innerHTML = universities[i].Address;
            cell2.innerHTML = universities[i].Phone;
            cell3.appendChild(btn);
        }
    });  
}
allUni();