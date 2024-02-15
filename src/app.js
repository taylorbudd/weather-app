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

let cityName = ""
app.get('/search', async (req, res) => {
    console.log("hey")
    cityName = req.query.city
    console.log("city name: " + cityName)
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    console.log("API URL: " + API_URL);
    const response = await fetch(API_URL);
    const data = await response.json()
    console.log(data);
    res.json(data)
});

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});