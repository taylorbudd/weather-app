const handleSearch = async () => {
  removeError();
  const searchQuery = document.getElementById("searchInput").value;
  const url = `/search?city=${encodeURIComponent(searchQuery)}`;
  try {
    fetch(url, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something happened, we could not get your data");
        } else {
          return res.json();
        }
      })
      .then((res) => {
        const weatherData = {
            weather_icon: res.weather["0"].main,
            temp: res.main.temp,
            city: res.name,
            humidity: res.main.humidity,
            wind: res.wind.speed
        }
        displayData(weatherData);
      })
      .catch((err) => {
        throw new Error(err);
      });
  } catch (error) {
    displayError(error.message);
  }
};


const removeError = () => {
  const errorElements = document.getElementsByClassName("error");
  let errorContainer = errorElements[0];
  let errorText = errorElements[1];

  errorContainer.classList.add("hidden");
  errorText.innerHTML = "";
};

const displayError = (error) => {
  const errorElements = document.getElementsByClassName("error");
  let errorContainer = errorElements[0];
  let errorText = errorElements[1];

  errorContainer.classList.remove("hidden");
  errorText.innerHTML = error;
};

const displayData = (weatherData) => {
    let weatherIcon = document.getElementsByClassName("weather-icon")[0];
    let temp = document.getElementsByClassName("temp")[0];
    let city = document.getElementsByClassName("city")[0];
    let humidity = document.getElementsByClassName("humidity")[0];
    let wind = document.getElementsByClassName("wind")[0];

    weatherIcon.src = `images/${weatherData.weather_icon}.png`;
    temp.innerHTML = `${weatherData.temp}&#8451;`;
    city.innerHTML = weatherData.city;
    humidity.innerHTML = `${weatherData.humidity}%`;
    wind.innerHTML = `${weatherData.wind}km/h`;
}


