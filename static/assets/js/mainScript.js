let arduinoForm= document.getElementById("arduinoForm");
arduinoForm.hidden=true;

function test(){

    let selectValue = document.getElementById("selectDeviceType");
    let array=[]
  //  console.log(selectValue["options"][1]["value"]);
    //console.log(selectValue["options"].length);
}
function checkDevice(val){
    let selectValue = document.getElementById("selectDeviceType");
    console.log(val)
    let arduinoForm= document.getElementById("arduinoForm");
    if(val=="Arduino"){
        arduinoForm.hidden=false;
    }
    else{
        arduinoForm.hidden=true;
    }
}
function addPort(){
    let arduinoForm= document.getElementById("arduinoForm");
    let inputForm=document.createElement("input");
    arduinoForm.appendChild(inputForm)
}