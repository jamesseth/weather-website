console.log('app.js in public folder js')



const weatherForm = document.querySelector("form")
const search = document.querySelector('input')

function createElement(elementType, innerHTML){
    let newElement = document.createElement(elementType)
    newElement.innerHTML = innerHTML
    return newElement
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    console.log(search.value)
    fetch(`/weather?address=${search.value}`).then((response) => {
        response.json().then((data) => {
            if(data.error){
                console.error(data.error)
            }else{
                
                const weather = document.querySelector("#weather")
                weather.appendChild(createElement('H5', data.location))
                weather.appendChild(createElement('p', data.summary))
                weather.appendChild(createElement('p', `Temperature: ${data.temperature}`))
                weather.appendChild(createElement('p', `Chance Of Rain: ${data.chanceOfRain}%`))
            }
  
        })
   })
})