const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();

API_KEY=process.env.API_KEY

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index',{
        title: 'Home',
    });
});

app.get('/search', async (req, res) => {
    cityName = req.query.city

    let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`

    const response = await fetch(API_URL);
    const data = await response.json();
    
    const weatherData = {
        weather_icon: data.weather["0"].main,
        temp: Math.floor(data.main.temp),
        city: data.name,
        humidity: Math.floor(data.main.humidity),
        wind: Math.floor(data.wind.speed)
    }
    res.json(weatherData);
});

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});