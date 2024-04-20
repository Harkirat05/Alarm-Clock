// We're creating a variable to keep track of the time interval for the alarm and another for the alarm sound.
let alarmInterval;


// This function displays the current time on the webpage.
function displayTime() {
    // Here, we're creating a new Date object to get the current date and time.
    const date = new Date();
    // We're extracting the current hours, minutes, and seconds from the date object.
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    // We're setting a default period as "AM".
    let period = "AM";

    // Here, we're conevrting the hours to a 12-hour format and setting the period as "PM" if it's afternoon.
    if (hours >= 12) {
        period = "PM";
    }
    // If the hours are more than 12, we're subtracting 12 to convert to 12-hour format.
    if (hours > 12) {
        hours -= 12;
    }
    // If the hours are 0, it's midnight, so we're setting it as 12 AM.
    if (hours === 0) {
        hours = 12;
    }

    // We're constructing a string to display the time with proper formatting.
    const timeString = `${hours}:${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds} ${period}`;
    
    // We're updating the HTML element with the current time.
    document.getElementById('currentTime').innerText = timeString;
}

// This function updates the time display every second.
setInterval(displayTime, 1000);

// This function sets the alarm.
function setAlarm() {
    // We're retrieving the selected hours, minutes, seconds, and period (AM/PM) from the form.
    let hrs = parseInt(document.getElementById("hrs").value);
    let min = parseInt(document.getElementById("min").value);
    let sec = parseInt(document.getElementById("sec").value);
    let options = document.getElementById("options").value;

    // We're adjusting the hours for a 12-hour format and converting to 24-hour format.
    if (options === "PM" && hrs !== 12) {
        hrs += 12;
    } else if (options === "AM" && hrs === 12) {
        hrs = 0;
    }

    // We're adjusting hours for 12 AM in 12-hour format.
    if (hrs === 0 && options === "AM") {
        hrs = 12;
    }

    // We're setting an interval to check if the current time matches the alarm time.
    let alarmInterval = setInterval(function() {
        let currentTime = new Date();
        // If the current time matches the alarm time, we trigger the alarm sound.
        if (
            currentTime.getHours() === hrs &&
            currentTime.getMinutes() === min &&
            currentTime.getSeconds() === sec
        ) {
            // We create an audio element for the alarm sound, make it loop, and play it.
            let alarmAudio = new Audio("alarm-clock-short-6402.mp3");
            alarmAudio.loop = true;
            alarmAudio.play();
            // We show the stop button when the alarm goes off and set its style.
            document.getElementById("stopAlarm").style.display = "inline";
            document.getElementById("stopAlarm").style.backgroundColor = "rgb(204, 28, 28)";
            document.getElementById("stopAlarm").style.color = "white";
        }
    }, 1000);

    // We add the new alarm time to the list displayed on the webpage.
    let alarmList = document.getElementById("alarmList");
    let newAlarm = document.createElement("li");
    // We format the alarm time and add it to the list.
    newAlarm.textContent = `${hrs < 10 ? '0' + hrs : hrs}:${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec} ${options}`;

    // We create a delete button to remove the alarm from the list.
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("deleteButton");
    // We add an event listener to the delete button to remove the alarm item.
    deleteButton.addEventListener("click", function() {
        newAlarm.remove();
    });

    // We append the delete button to the alarm item and then append the alarm item to the list.
    newAlarm.appendChild(deleteButton);
    alarmList.appendChild(newAlarm);
}

// This function stops the alarm.
function stopAlarm() {
    clearInterval(alarmInterval); // We stop the interval checking for the alarm time.
    if (alarmAudio) {
        alarmAudio.pause(); // We pause the alarm sound.
    }
    document.getElementById("stopAlarm").style.display = "none"; // We hide the stop button.
}
