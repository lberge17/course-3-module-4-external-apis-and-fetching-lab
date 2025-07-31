// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

document.addEventListener("DOMContentLoaded", () => {
    function displayAlerts(data) {
        clearError()
        const alertsDisplay = document.getElementById('alerts-display')
        alertsDisplay.innerHTML = ''
        const alertsTitle = document.createElement('p')
        alertsTitle.textContent = `${data.title}: ${data.features.length}`
        alertsDisplay.append(alertsTitle)

        if (data.features.length > 0) {
            const alertsList = document.createElement('ul')
            for (let i = 0; i < data["features"].length; i++) {
                let li = document.createElement('li')
                li.textContent = data["features"][i]["properties"]["headline"]
                alertsList.append(li)
            }
            alertsDisplay.append(alertsList)
        }
    }

    function displayError(message) {
        const errorMessage = document.getElementById('error-message')
        errorMessage.classList.remove('hidden')
        errorMessage.textContent = `Error: ${message.message}`
    }

    function clearError() {
        const errorMessage = document.getElementById('error-message')
        errorMessage.classList.add('hidden')
        errorMessage.textContent = ''
    }

    function fetchWeatherData(state) {
        fetch(weatherApi + state)
        .then(r => r.json())
        .then(displayAlerts)
        .catch(displayError)
    }

    const fetchBtn = document.getElementById('fetch-alerts')
    const stateInput = document.getElementById('state-input')
    fetchBtn.addEventListener('click', () => {
        fetchWeatherData(stateInput.value)
        stateInput.value = ''
    })
})