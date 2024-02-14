const express = require('express');
const path = require('path');
const app = express();

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
    let API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=aa0e088e4a4b39d7e3dcf8f1e4af8cf0&units=metric`
    console.log("API URL: " + API_URL);
    const response = await fetch(API_URL);
    const data = await response.json()
    console.log(data);
    res.json(data)
});

app.listen(5500, () => {
    console.log('Server is running on port 5500');
});