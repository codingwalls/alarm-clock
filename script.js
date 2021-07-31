
// function to show the clock
function clock(){

    // Get the Hour, Minute and Seconds
    let currentTime = new Date();
    let currentHours = currentTime.getHours();
    let currentMinutes = currentTime.getMinutes();
    let currentSeconds = currentTime.getSeconds();
    
    // Get AM and PM
    let timeOfDay = (currentHours < 12) ? 'AM' : 'PM';
    
    // Make 12-hour Format
    currentHours = (currentHours > 12) ? (currentHours - 12) :  currentHours;
    currentHours = (currentHours === 0) ? 12 :  currentHours;
    
    // Add 0 to (0-9) to make it double digit
    currentHours = ((currentHours < 10) ? '0' : '') + currentHours;
    currentMinutes = ((currentMinutes < 10) ? '0' : '') + currentMinutes;
    currentSeconds = ((currentSeconds < 10) ? '0' : '') + currentSeconds;
    
    // String to make time correct time format
    let currentTimeStr = `${currentHours} : ${currentMinutes} : ${currentSeconds} ${timeOfDay}`;
    document.getElementById('clock').innerHTML = currentTimeStr;
}

// Adding 0 and contraints to 24 hours
function validH(){
    this.value = (this.value > 12) ? (this.value - 12) : ((parseInt(this.value) === 0) ? 12 : this.value);
    this.value = ((parseInt(this.value) < 10) ? '0' : '') + this.value;
    if(this.value > 24 || this.value === NaN){
        this.value = '';
    }
}

// Adding 0 and contraints to 59 minutes / seconds
function valid(){
    this.value = ((parseInt(this.value) < 10) ? '0' : '') + this.value;

    if(this.value > 59 || this.value === NaN){
        this.value = '';
    }
}

// Hide the alerts
$('#success').hide();
$('#failure').hide();

let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

const hour = document.getElementById('hour');
const minute = document.getElementById('minute');
const second = document.getElementById('second');

hour.addEventListener('blur', validH);
minute.addEventListener('blur', valid);
second.addEventListener('blur', valid);

const btn = document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault();
    
    let alarmTime = new Date().setHours(hour.value, minute.value, second.value);

    // let now = new Date().getTime();
    let now = new Date();

    let h = now.getHours();
    h = parseInt((h > 12) ? (h - 12) : ((h === 0) ? 12 : h));
    h = parseInt(((h < 10) ? '0' : '') + h);

    let time = new Date().setHours(h, now.getMinutes(), now.getSeconds());
    
    let timeToAlarm = alarmTime - time;
    console.log(timeToAlarm);
    
    // 12-hour format and add 0 and AM & PM
    let meridian = (hour.value < 12) ? 'AM' : 'PM';
    hour.value = (hour.value > 12) ? (hour.value - 12) : ((parseInt(hour.value) === 0) ? 12 : hour.value);
    hour.value = ((parseInt(hour.value) < 10) ? '0' : '') + hour.value;
    
    if (timeToAlarm >= 0) {
        let success = document.getElementById('success').classList.add('show');
        $('#failure').hide();
        $('#success').show();

        // Display on the page
        const showAlarm = document.getElementById('showAlarm');
        
        let set = `${hour.value} : ${minute.value} : ${second.value} ${meridian}`;
        showAlarm.innerHTML = set;

        document.getElementById('alarmHead').style.display = 'block';

        // Alarm Ring
        setTimeout(() => {
            audio.play();
        }, timeToAlarm);
    } else {
        let failure = document.getElementById('failure').classList.add('show');
        $('#success').hide();
        $('#failure').show();
    }

    // Rest the form value
    hour.value = '';
    minute.value = '';
    second.value = '';
});


