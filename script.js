let quoteUrl = "https://api.quotable.io/quotes/random";
let q = document.querySelector("q");
let play = document.getElementById("play");
const playIcon = play.querySelector('.fa-play');
const pauseIcon = play.querySelector('.fa-pause');
const nextsong = document.getElementById("next");
const prevsong = document.getElementById("prev");
const startfocus = document.getElementById("startfocus");
let vloumespan = document.getElementById("spanvolume");
let body = document.querySelector("body")
let volume= document.getElementById("volume");
let hday = document.getElementById("day");
let hdate = document.getElementById("date");
let hmonth = document.getElementById("month");
let hhours = document.getElementById("hours");
let hminutes = document.getElementById("minutes");
let hyear = document.getElementById("year");
let hseconds = document.getElementById("seconds");
let musicArray = ["music1","music2","music3","music4"];
let musicNumber = Math.floor(Math.random()*3);
const audio = new Audio(musicArray[musicNumber]);

function updatestime() {
    const time = new Date();
    const hours = String(time.getHours()).padStart(2, '0'); // Add leading zero if less than 10
    hhours.innerText = hours+":";
    const minutes = String(time.getMinutes()).padStart(2, '0'); // Add leading zero if less than 10
    hminutes.innerText = minutes+":";
    const date = time.getDate();
    hdate.innerText = date+"-";
    const month = time.getMonth() + 1; // Adding 1 to make it 1-indexed
    hmonth.innerText = month+"-";
    const day = time.getDay(); // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    hday.innerText = daysOfWeek[day];
    const year = time.getFullYear();
    hyear.innerText=year;
    const seconds =  String(time.getSeconds()).padStart(2, '0');
    hseconds.innerText=seconds
}
updatestime();
setInterval(updatestime,1000);



volume.addEventListener("input", () => {
    vloumespan.innerText = volume.value;
    audio.volume=parseFloat(volume.value/100);
});

play.addEventListener('click', () => {
    playIcon.classList.toggle("fa-play");
    audio.play();
    playIcon.classList.toggle("fa-pause");
    if(playIcon.classList.contains("fa-play")){
        audio.pause();
    }
  });
nextsong.addEventListener("click", () => {
    musicNumber = (musicNumber + 1) % musicArray.length;
    audio.src = musicArray[musicNumber];
    audio.play();
});

prevsong.addEventListener("click", () => {
    musicNumber = (musicNumber - 1 + musicArray.length) % musicArray.length;
    audio.src = musicArray[musicNumber];
    audio.play();
});

document.addEventListener('DOMContentLoaded', async () => {
    const q = document.querySelector("q");
    q.innerText = await getquote();
});



async function getquote(){
    let result = await fetch(quoteUrl);
    let res = await result.json();
    if(res[0].content.length<100){
        return res[0].content;
    }else{
        return getquote();
    }
}
getquote();
startfocus.addEventListener('click', function() {
    if (startfocus.innerText === "Start Focus") {
        var videoSrc = '150883 (1080p).mp4';
        audio.play()
        var video = document.createElement('video');
        video.setAttribute('autoplay', true);
        video.setAttribute('loop', true);
        video.setAttribute('muted', true);
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.minWidth = '100%';
        video.style.minHeight = '100%';
        video.style.width = 'auto';
        video.style.height = 'auto';
        video.style.zIndex = '-31';
        video.style.objectFit = 'cover';
        
        var source = document.createElement('source');
        source.setAttribute('src', videoSrc);
        source.setAttribute('type', 'video/mp4');
        
        video.appendChild(source);
        if(playIcon.classList.contains("fa-pause")){
            playIcon.classList.add("fa-pause");
        }else{
            playIcon.classList.toggle("fa-play");
            playIcon.classList.toggle("fa-pause");

        }

        

        document.body.style.background = 'none';
        document.body.appendChild(video);

        startfocus.innerText = "Stop Focus";
    } else {
        document.body.style.background = 'linear-gradient(135deg, #2E3192 , #1BFFFF)';
        playIcon.classList.toggle("fa-play");
        playIcon.classList.toggle("fa-pause");
        startfocus.innerText = "Start Focus";
        audio.pause()
    }
});
audio.addEventListener('ended', () => {
    musicNumber = (musicNumber + 1) % musicArray.length;
    audio.src = musicArray[musicNumber];
    audio.play();
});
