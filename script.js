
$('#success').hide();
$('#failure').hide();

let audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');

const btn = document.getElementById('btn').addEventListener('click', (e) => {
    e.preventDefault();

    const hour = document.getElementById('hour');
    const minute = document.getElementById('minute');
    const second = document.getElementById('second');
    
    let alarmTime = new Date().setHours(hour.value, minute.value, second.value);
    let now = new Date().getTime();

    let timeToAlarm = alarmTime - now;

    if (timeToAlarm >= 0) {
        let success = document.getElementById('success').classList.add('show');
        $('#failure').hide();
        $('#success').show();
        setTimeout(() => {
            audio.play();
            console.log('ring');
        }, timeToAlarm);
    } else {
        let failure = document.getElementById('failure').classList.add('show');
        $('#success').hide();
        $('#failure').show();
    }
});