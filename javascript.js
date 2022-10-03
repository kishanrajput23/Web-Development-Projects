var reg = document.querySelector("#register");
var clear = document.querySelector("#clear");
var nam = document.getElementById("nam"); //document.querySelector("#nam");
var age = document.getElementById("agetxt");
var email = document.getElementById("emailtxt");
var dob = document.getElementById("dobtxt");
var maindiv = document.querySelector("#mainwaladiv");
var form = document.getElementById("formi");
var img = document.getElementById("imagetxt");

var uploadedImage;
var imageElement;
var gender;
var skills;


img.addEventListener("change", function () {
    var reader = new FileReader();
    reader.addEventListener("load", () => {
        //uploadedImage = event.target.result;
        uploadedImage = reader.result;
    });
    //console.log("this.files[0]", this.files[0]);
    reader.readAsDataURL(this.files[0]);

});

reg.addEventListener("click", function(){
    //console.log(nam.value);
    //alert(nam.value);
    //alert(age.value);
    //alert(email.value);

    //alert("Haan chal raha hai");
    if ((nam.innerText || age.value || email.value) == "") {
        alert("Please enter a Value");
    }

    else {
        
        //Very imp taki referesh hokar output apne aap hat na jaye
        form.addEventListener("submit",function(event){
            event.preventDefault();
        });

        //var boxy = document.createElement('div');
        // img.addEventListener("change", function () {
        //     var reader = new FileReader();
        //     reader.addEventListener("load", () => {
        //         //uploadedImage = event.target.result;
        //         uploadedImage = reader.result;
        //     });
        //     //console.log("this.files[0]", this.files[0]);
        //     reader.readAsDataURL(this.files[0]);
        
        // });
        
        
        imageElement = document.createElement("img");
        //console.log("uploadedImage", uploadedImage);
        imageElement.src = uploadedImage;
        imageElement.className="imagi";
        
        // console.log(nam.innerHTML);
        // console.log(age.value);
        //console.log(email.value);

        //Checking for Gender

        if (document.getElementById("maletxt").checked) {
            gender = document.getElementById("maletxt").value;
        }


        else if (document.getElementById("femaletxt").checked) {
            gender = document.getElementById("femaletxt").value;
        }


        else if (document.getElementById("othertxt").checked) {
            gender = document.getElementById("othertxt").value;
        }

        //Checking for Skills

        if (document.getElementById("sk1").checked) {
            skills = document.getElementById("sk1").value;
        }

        if (document.getElementById("sk2").checked) {
            skills = document.getElementById("sk2").value;
        }

        if (document.getElementById("sk3").checked) {
            skills = document.getElementById("sk3").value;
        }



        //alert("Checking",nam.value, age.value, email.value, dob.value, gender, skills);

        var largediv = document.createElement("div");
        var mediumdiv = document.createElement("div"); 
        var smalldiv1 = document.createElement("div");
        var smalldiv2 = document.createElement("div");
        var nameElement = document.createElement("p");
        var emailElement = document.createElement("p");
        var dobElement = document.createElement("p");
        var genderElement = document.createElement("p");
        var ageElement = document.createElement("p");
        var skillsElement = document.createElement("p");
        var cross = document.createElement("p");
        cross.innerHTML = "&times;";
        cross.className = "cross";

        nameElement.innerText = nam.value;
        emailElement.innerText = email.value;
        dobElement.innerText = dob.value.split("-").reverse().join("-");
        genderElement.innerText = gender;
        ageElement.innerText = age.value;
        skillsElement.innerText = skills;

        //alert(nameElement,emailElement,dobElement,genderElement,ageElement,skillsElement);
        //console.log(nameElement,emailElement,dobElement,genderElement,ageElement,skillsElement);

        smalldiv1.className = "col-lg-6 col-md-6 col-sm-6";
        smalldiv1.style.height = "25%";
        smalldiv1.appendChild(nameElement);
        smalldiv1.appendChild(ageElement);
        smalldiv1.appendChild(genderElement);
        smalldiv1.appendChild(emailElement);
        smalldiv1.appendChild(dobElement);
        smalldiv1.appendChild(skillsElement);

        smalldiv2.className = "col-lg-6 col-md-6 col-sm-6";
        smalldiv2.style.height = "25%";
        smalldiv2.appendChild(imageElement);
        mediumdiv.className = "row divrow";
        mediumdiv.appendChild(smalldiv1);

        mediumdiv.appendChild(smalldiv2);

        largediv.className = "box";

        cross.addEventListener("click", function(){

            maindiv.removeChild(largediv);

        });
        largediv.appendChild(cross);
        largediv.appendChild(mediumdiv);

        maindiv.appendChild(largediv);



    }

    //alert("Checking",nam.value, age.value, email.value, dob.value, gender, skills);
    form.reset();


}
);


clear.addEventListener("click",function(){

    form.reset();


});


