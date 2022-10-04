console.log("WELCOME TO SPOTIFFY");
//Initialize the variables
let songIndex=0;
let audioElement=new Audio('songs');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let songItems=Array.from(document.getElementsByClassName('songItem'));

let songs=[{
    songName:"Salam-e-Ishq" ,filePath:"songs/1.mp3",coverPath:"covers/1.jpg"},
    {
    songName:"Salagigm-e-Ishq" ,filePath:"songs/2.mp3",coverPath:"covers/2.jpg"
}
,{
    songName:"Salhbam-e-Ishq" ,filePath:"songs/3.mp3",coverPath:"covers/3.jpg"
}
,{
    songName:"Salm-e-Ishq" ,filePath:"songs/4.mp3",coverPath:"covers/4.jpg"
}
,{
    songName:"Scchcalam-e-Ishq" ,filePath:"songs/5.mp3",coverPath:"covers/5.jpg"
}
,{
    songName:"Sbhbalam-e-Ishq" ,filePath:"songs/6.mp3",coverPath:"covers/6.jpg"
}
,{
    songName:"ppialam-e-Ishq" ,filePath:"songs/7.mp3",coverPath:"covers/7.jpg"
}
,{
    songName:"bvhlam-e-Ishq" ,filePath:"songs/8.mp3",coverPath:"covers/8.jpg"
}
,{
    songName:"jhugam-e-Ishq" ,filePath:"songs/9.mp3",coverPath:"covers/9.jpg"
}
,{
    songName:"nnam-e-Ishq" ,filePath:"songs/10.mp3",coverPath:"covers/10.jpg"
}
]
songItems.forEach((element,i)=>{
   // console.log(element,i);
element.getElementsByTagName("img")[0].src=songs[i].coverPath;
element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})


//audioElement.play()
//handle play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
       gif.style.opacity=0;
    }
})
//Listen to events
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
console.log(progress);
myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})
const makeAllPlays=()=>{
    
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
element.addEventListener('click',(e)=>
{
makeAllPlays(); 
index=parseInt(e.target.id);
e.target.classList.remove('fa-play-circle');
e.target.classList.add('fa-pause-circle');
audioElement.src=`songs/${index}.mp3`;
audioElement.currentTime=0;
audioElement.play();
masterPlay.classList.remove('fa-play-circle');
masterPlay.classList.add('fa-pause-circle');


})
})
