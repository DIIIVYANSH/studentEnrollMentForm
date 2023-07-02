/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSRoll_Numbere/javascript.js to edit this template
 */
var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var stuDBName = "SCHOOL-DB";
var stuRelationName = "STUDENT-TABLE";
var connToken = "90933070|-31949323900651581|90951489";

$('#Roll_No').focus();

function saveRecNo2LS(jsonObj){
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno',lvData.rec_no);
}   
function getRoll_NoAsJsonObj(){
    var Roll_No = $('#Roll_No').val();
    var jsonStr = {
        Roll_Number: Roll_No
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record= JSON.parse(jsonObj.data).record;
    $('#Full_Name').val(record.Name);
    $('#Class').val(record.Class);
    $('#Birth_Date').val(record.Birth_Date);
    $('#Address').val(record.Address);
    $('#Enrollment_Date').val(record.Enrollment_Date);
}

function resetForm(){
    $('#Roll_No').val("");
    $('#Full_Name').val("");
    $('#Class').val("");
    $('#Birth_Date').val("");
    $('#Address').val("");
    $('#Enrollment_Date').val("");
    $('#Roll_No').prop("disabled",false);
    $('#save').prop("disabled",true);
    $('#update').prop("disabled",true);
    $('#reset').prop("disabled",true);
    $('#Roll_No').focus();
}

function validateData() {
                var Roll_No, Full_Name, Class, Birth_Date, Address, Enrollment_Date;
                Roll_No = $('#Roll_No').val();
                Full_Name = $('#Full_Name').val();
                Class = $('#Class').val();
                Birth_Date = $('#Birth_Date').val();
                Address = $('#Address').val();
                Enrollment_Date = $('#Enrollment_Date').val();
                
                if (Roll_No === "") {
                    alert("Roll_No Missing");
                    $("#Roll_No").focus();
                    return "";
                }
                if (Full_Name === "") {
                    alert("Full Name Missing");
                    $("#Full_Name").focus();
                    return "";
                }
                if (Class === "") {
                    alert("Class Missing");
                    $("#Class").focus();
                    return "";
                }
                if (Birth_Date === "") {
                    alert("Birth_Date Missing");
                    $("#Birth_Date").focus();
                    return "";
                }
                if (Address === "") {
                    alert("Address Missing");
                    $("#Address").focus();
                    return "";
                }
                if (Enrollment_Date === "") {
                    alert("Enrollment_Date Missing");
                    $("#Enrollment_Date").focus();
                    return "";
                }
                
                var jsonStrObj = {
                    Roll_Number: Roll_No,
                    Name: Full_Name,
                    Class: Class,
                    Birth_Date:Birth_Date,
                    Address:Address,  
                    Enrollment_Date:Enrollment_Date
                };
                return JSON.stringify(jsonStrObj);
            }
            
function getEmp(){
    var empIdJsonObj = getRoll_NoAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stuDBName, stuRelationName, empIdJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if (resJsonObj.status === 400){
        $('#save').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $('#Full_Name').focus();
    }
    else if (resJsonObj.status === 200){
        
        $('#Roll_No').prop("disabled",true);
        fillData(resJsonObj);
        
        $('#update').prop("disabled",false);
        $('#reset').prop("disabled",false);
        $('#Full_Name').focus();
    }
    
}

function saveData(){
    var jsonStrObj = validateData();
    if (jsonStrObj === ''){
        return '';
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stuDBName, stuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true}); 
    resetForm();
    $('#Roll_No').focus();
    
}

function changeData(){ 
    $('#update').prop("disabled",true);
    jsonChg =validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, stuDBName, stuRelationName, localStorage.getItem("recno" ));
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async:true});
    console.log(resJsonObj);
    resetForm();
    $('#Roll_No').focus();
}