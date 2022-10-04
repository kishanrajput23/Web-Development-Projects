let x, y ,s0,num,chance;
function num_gen(obj1) {
    x = Math.floor(Math.random() * 100);
    obj1.innerHTML = "Started!";     
    obj1.setAttribute("disabled", false);       

    document.querySelector('#submit').disabled = false; 
    document.querySelector('#user').disabled = false;   
    document.querySelector('#user').placeholder = "Click Here";
    num=100;  
    chance=12;
}

function get_input() {
    y = user.value;
    console.log(y);
    check(); 
}

function check() { 
    if (y > x) {
        if (y - x <= 5) {
            almost();
        }
        else {
            large();
        }
    }
    else if (x > y) {
        if (x - y <= 5) {
            almost();
        }
        else {
            small();
        }
    }
    else if(x==y){
        equal();
    }
    else{
        invalid();
    }
}

function equal() { 

    console.log(num);
    reset(); 
    document.querySelector('#success').disabled = false; 
    document.querySelector('#user').disabled = true; 
    document.querySelector('#submit').disabled = true;
    document.querySelector('#b1').disabled = true; 
    document.querySelector('#b2').disabled = true; 
    document.querySelector('#b3').disabled = true; 
    document.querySelector('#b4').disabled = true; 

    document.getElementById("user").value=`You Win ! Your score is = ${num}`;
}

function reset() {
    let a = document.getElementsByClassName("almost");
    let s = document.getElementsByClassName("toosmall");
    let l = document.getElementsByClassName("toobig");
    let z = document.getElementsByClassName("invalid");
    l[0].style.color = "rgba(255, 255, 255, 0.5)";
    a[0].style.color = "rgba(255, 255, 255, 0.5)";
    s[0].style.color = "rgba(255, 255, 255, 0.5)";
    l[0].style.background = "none";
    a[0].style.background = "none";
    s[0].style.background = "none";
    l[0].style.boxShadow = "none";
    a[0].style.boxShadow = "none";
    s[0].style.boxShadow = "none";
    z[0].style.background = "rgba(255, 0, 0, 0.185)";
    clearInterval(s0);

}
function large() {
    num-=10;
    chance-=1;
    if(num<=0 || chance==0){
        lose();
    }
    let sc=document.getElementsByClassName("score");
    sc[0].innerHTML= `Score : ${num}`;

    let c=document.getElementsByClassName("chance");
    c[0].innerHTML= `Chance left : ${chance}`;

    reset();
    let l = document.getElementsByClassName("toobig");
    l[0].style.background = "#2bd2ff";
    l[0].style.color = "rgb(255, 255, 255)";
    l[0].style.boxShadow = "0 0 5px #2bd2ff, 0 0 10px #2bd2ff, 0 0 15px #2bd2ff, 0 0 25px #2bd2ff";

}

function small() {
    num-=10;
    chance-=1;
    if(num<=0 || chance==0){
        lose();
    }
    let sc=document.getElementsByClassName("score");
    sc[0].innerHTML= `Score : ${num}`;

    let c=document.getElementsByClassName("chance");
    c[0].innerHTML= `Chance left : ${chance}`;

    reset();
    let s = document.getElementsByClassName("toosmall");
    s[0].style.background = "#ff1f71";
    s[0].style.color = "rgb(255, 255, 255)";
    s[0].style.boxShadow = "0 0 5px #ff1f71, 0 0 10px #ff1f71, 0 0 15px #ff1f71, 0 0 25px #ff1f71";
}

function almost() {
    num-=5;
    chance-=1;
    if(num<=0 || chance==0){
        lose();
    }
    let sc=document.getElementsByClassName("score");
    sc[0].innerHTML= `Score : ${num}`;
    
    let c=document.getElementsByClassName("chance");
    c[0].innerHTML= `Chance left : ${chance}`;

    reset();
    let a = document.getElementsByClassName("almost");
    a[0].style.background = "#1eff45";
    a[0].style.color = "rgb(0, 0, 0)";
    a[0].style.boxShadow = "0 0 5px #1eff45, 0 0 10px #1eff45, 0 0 20px #1eff45, 0 0 25px #1eff45";
}


function invalid() {
    reset();
    let z = document.getElementsByClassName("invalid");
     s0=setInterval( blink, 1000);
    function blink(){        
        z[0].style.backgroundColor = z[0].style.backgroundColor == "rgb(255, 0, 0)" ? "rgba(255, 0, 0, 0.185)" : "rgb(255, 0, 0)";
    }
}

function reload(){
    document.querySelector('#success').disabled = true;
    document.querySelector('#submit').disabled = true;
    document.getElementById("user").value="";
    window.location.reload();
}

function lose(){
    document.querySelector('#submit').disabled = true;
    document.getElementById("user").value="You Lose";
    document.querySelector('#user').disabled = true;
    document.querySelector('#success').disabled = false;
    document.querySelector('#b1').disabled = true; 
    document.querySelector('#b2').disabled = true; 
    document.querySelector('#b3').disabled = true; 
    document.querySelector('#b4').disabled = true; 

}

function inc_b(){
    var v = document.getElementById("user").value;
    var v1=parseInt(v);
    v1+=10;
    document.getElementById("user").value=v1;
}
function inc(){
    var v = document.getElementById("user").value;
    var v1=parseInt(v);
    v1+=1;
    document.getElementById("user").value=v1;
}
function dec_s(){
    var v = document.getElementById("user").value;
    var v1=parseInt(v);
    v1-=10;
    document.getElementById("user").value=v1;
}
function dec(){
    var v = document.getElementById("user").value;
    var v1=parseInt(v);
    v1-=1;
    document.getElementById("user").value=v1;
}
function initialize(){
    document.getElementById("user").value=0;
    document.querySelector('#b1').disabled = false; 
    document.querySelector('#b2').disabled = false; 
    document.querySelector('#b3').disabled = false; 
    document.querySelector('#b4').disabled = false; 

}