<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        .container{
            border: 1px solid black; 
            display: flex;
            width: 98%;
            height: 100vh;
            justify-content: center;
            align-items: center;
        }
        .hex-color{
            border: 1px black;
            text-align: center;
        }
        .hex-color h1 {
            font-size: 2rem;
            text-transform: uppercase;
            animation: colorchange 5s infinite alternate;
        }
        .hex-color h2{
            border: 1px  black;
            margin-top: 15%;
            font-size: 2rem;
            animation: change 6s infinite alternate;
        }
        @keyframes  colorchange{
            0%{
                color: blue;
            }
            20%{
                color: yellow;
            }
            40%{
                color: orange;
            }
            60%{
                color: red;
            }
            80%{
                color: green;
            }
            100%{
                color: pink;
            }
            
        }
        @keyframes  change{
            0%{
                color: blue;
            }
            20%{
                color:orangered;
            }
            40%{
                color: yellowgreen;
            }
            60%{
                color: red;
            }
            80%{
                color: green;
            }
            100%{
                color: pink;
            }
            
        }


    </style>
</head>
<body>
    <div class="container">
        <div class="hex-color">
            <h1>
                Click the button bellow to display the hex code of the a random color
            </h1>
            <h2>
                The hex code of the color is #<span id="hex-code">00000</span>
            </h2>
            <button onclick="changecolor()" type="button" class="btn btn-primary">Click Me</button>
        </div>
    </div>
</body>
<script>
    function changecolor(){
        var hex_numbers = ["0","1","2","3","4","5","6","7","8","9","A", "B", "C", "D", "E", "F"];
        var hexcode1 = "";
         for(var i = 0; i < 6;i++){
            var  random_index = Math.floor(Math.random() * hex_numbers.length);
            hexcode1 += hex_numbers[random_index];
  }
  document.getElementById("hex-code").innerHTML = hexcode1;
  document.getElementsByTagName("body")[0].style.background = "#" + hexcode1;
}
</script>
</html>
