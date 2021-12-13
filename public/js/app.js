const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1');
const messageSecond = document.querySelector('#message-2');
const err_msg = document.querySelector('#error')
const img = document.querySelector('#weather_icon')
const icon_div = document.querySelector('#icon_div')
const temp = document.querySelector('#temp')

icon_div.style.display = 'none';
err_msg.textContent = ''
messageOne.textContent = ''
messageSecond.textContent = ''
img.src = ''
temp.textContent = ''


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    
    const location = search.value

    icon_div.style.display = 'none';
    messageOne.textContent = 'Loading...'
    messageSecond.textContent = ''
    err_msg.textContent = ''
    img.src = ''
    temp.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if(data.error){
            messageOne.textContent = '';
            err_msg.textContent = data.error;
        }else{
            icon_div.style.display = 'block';
            img.src = data.icon
            temp.textContent = data.temperature + '°C'
            messageOne.textContent = data.location
            messageSecond.textContent = data.forecast
        }
    })
})
    
})