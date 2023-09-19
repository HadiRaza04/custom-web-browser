const editableText= document.getElementById('editable-text');

if(localStorage.getItem('savedText')){
  editableText.textContent=localStorage.getItem('savedText');
}
const urlSpans = document.querySelectorAll('.url');
urlSpans.forEach(function(urlSpan) {
    urlSpan.addEventListener('click', function(event) {
    // Prevent the default behavior of the hyperlink
    alert('User clicked on URL');
    event.preventDefault();
    });
});

//  get the elements from the DOM
const savedUrl = localStorage.getItem('url');
const nameSpan = document.querySelector('.name');
const urlSpan = document.querySelector('.url');
const icon = document.querySelector('.fa-stack-overflow');
const link = document.querySelector('#link');

// listen for changes in the content of the name and url spans
// nameSpan.addEventListener('input', updateLink);
urlSpan.addEventListener('input', updateLink);
function updateLink() {

// update the text content of the name span with the root domain
const domain = new URL('http://' + urlSpan.textContent).hostname.replace('www.', '');
link.querySelector('.name').textContent = domain;

// update the href of the link
link.href = 'http://' + urlSpan.textContent;

// update the icon class
const iconClass = 'fa-brands fa-' + domain.split('.')[0];
icon.className = iconClass;

// save the URL to local storage
localStorage.setItem('url', urlSpan.textContent);
}

// retrieve the saved URL from local storage when the page loads
window.addEventListener('load', function() {
const savedUrl = localStorage.getItem('url');
if (savedUrl) {
    urlSpan.textContent = savedUrl;
    updateLink();
}
});

// Search Items on GOOGLE
function googleSearch()
        {
            var text=document.getElementById("search").value;
            var cleanQuery = text.replace(" ","+",text);
            var url='http://www.google.com/search?q='+cleanQuery;
        
            window.location.href=url;
        }
editableText.addEventListener('input', function(){

  localStorage.setItem('savedText',this.textContent);
})
document.getElementById("currentYear").innerHTML = `@HadiRaza - ${new Date().getFullYear()}`;

document.getElementById("currentYear").innerHTML = "Hadi_Raza  2023";
document.querySelector("#search").addEventListener('keydown', function(e) {
  if(e.keyCode === 13 || e.key === "Enter") {
    googleSearch();
  }
})

// Current Time
// let time = document.getElementById("current-time");
// setInterval(() =>{
// let d = new Date();
// time.innerHTML = d.toLocaleTimeString();
// },1000)
const displayTime = document.querySelector(".display-time");
// Time
function showTime() {
  let time = new Date();
  displayTime.innerText = time.toLocaleTimeString("en-US", { hour12: false });
  setTimeout(showTime, 1000);
}

showTime();

// Date
function updateDate() {
  let today = new Date();

  // return number
  let dayName = today.getDay(),
    dayNum = today.getDate(),
    month = today.getMonth(),
    year = today.getFullYear();

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayWeek = [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
  // value -> ID of the html element
  const IDCollection = ["day", "daynum", "month", "year"];
  // return value array with number as a index
  const val = [dayWeek[dayName], dayNum, months[month], year];
  for (let i = 0; i < IDCollection.length; i++) {
    document.getElementById(IDCollection[i]).firstChild.nodeValue = val[i];
  }
}
updateDate();





// Current Date
// let date = document.getElementById("current-date");
// let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// let monthsName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
// let daysInDate = new Date();
// date.innerHTML = `${weekDays[daysInDate.getDay()]} <br /> ${daysInDate.getDate()} ${monthsName[daysInDate.getMonth()]} ${daysInDate.getFullYear()}`;

// Calander JavaScript Code

const daysTag = document.querySelector(".days"),
currentDate = document.querySelector(".current-date"),
prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

// storing full name of all months in array
const months = ["January", "February", "March", "April", "May", "June", "July",
              "August", "September", "October", "November", "December"];

const renderCalendar = () => {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
    let liTag = "";

    for (let i = firstDayofMonth; i > 0; i--) { // creating li of previous month last days
        liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for (let i = 1; i <= lastDateofMonth; i++) { // creating li of all days of current month
        // adding active class to li if the current day, month, and year matched
        let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                     && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }

    for (let i = lastDayofMonth; i < 6; i++) { // creating li of next month first days
        liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
    }
    currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
    daysTag.innerHTML = liTag;
}
renderCalendar();

prevNextIcon.forEach(icon => { // getting prev and next icons
    icon.addEventListener("click", () => { // adding click event on both icons
        // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

        if(currMonth < 0 || currMonth > 11) { // if current month is less than 0 or greater than 11
            // creating a new date of current year & month and pass it as date value
            date = new Date(currYear, currMonth, new Date().getDate());
            currYear = date.getFullYear(); // updating current year with new date year
            currMonth = date.getMonth(); // updating current month with new date month
        } else {
            date = new Date(); // pass the current date as date value
        }
        renderCalendar(); // calling renderCalendar function
    });
});