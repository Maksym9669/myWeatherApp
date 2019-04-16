import React, { Component } from "react";
import logo from "./logo.svg";
import Navbar from "./components/Navbar";
import Today from "./components/Today";
import List from "./components/List";
import Graph from "./components/Graph";
import "./App.css";
import axios from "axios";

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: "C",
      queryString: "",
      latLng: [],
      navbarData: {},
      todayComponentData: {},
      listComponentData: [],
      graphComponentData: [],
      lat: "",
      lon: "",
      uvIndex: null,
      indexForToday: 0
    };
  }
  componentDidMount() {
    const geolocation = navigator.geolocation;
    if (geolocation) {
      geolocation.getCurrentPosition(
        position => {
          this.setState(
            {
              latLng: [position.coords.latitude, position.coords.longitude]
            },
            this.notifyStateChange
          );
        },
        () => {
          console.log("Permission Denied");
        }
      );
    } else {
      console.log("GeoLocation not supported...Update the browser fella");
    }
  }
  onIndexForTodayChange = newIndex => {
    this.setState(
      {
        indexForToday: newIndex
      },
      function() {
        this.notifyStateChange();
      }
    );
  };

  onUnitChange = newUnit => {
    this.setState(
      {
        unit: newUnit
      },
      this.notifyStateChange
    );
    console.log(newUnit);
  };

  onSearchSubmit = query => {
    this.setState(
      {
        queryString: query,
        latLng: []
      },
      this.notifyStateChange
    );
  };

  notifyStateChange = () => {
    const hasLatLng = this.state.latLng.length > 0;
    const hasCityOrZipcode = this.state.queryString !== "";

    if (hasLatLng || hasCityOrZipcode) {
      this.fetchWeatherForecast(hasLatLng)
        .then(forecastData => {
          console.log("Forecast Data:", forecastData);

          const navbarData = this.extractDataForNavbar(forecastData);
          const {
            listComponentData,
            graphComponentData
          } = this.extractDataForListAndGraphComponent(forecastData);
          const todayComponentData = this.extractDataForTodayComponent(
            forecastData
          );

          this.setState({
            navbarData,
            todayComponentData,
            listComponentData,
            graphComponentData,
            lat: forecastData.city.coord.lat,
            lon: forecastData.city.coord.lon
          });
        })
        .then(() => {
          this.fetchUVIndex(hasLatLng)
            .then(uvIndexData => {
              console.log("This is UV index data", uvIndexData);
              if (this.state.indexForToday != 0) {
                this.setState({
                  uvIndex: uvIndexData[this.state.indexForToday - 1].value
                });
              } else {
                this.setState({
                  uvIndex: uvIndexData.value
                });
              }
            })
            .catch(() => {});
        })
        .catch(error => {
          console.log("Error:", error);
          //TODO: Show message in the browser here
        });
    }
  };

  fetchWeatherForecast = hasLatLng => {
    const API_KEY = "f52e83dffc7d0cf73311fcb22abfab18";
    const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast";
    // const BASE_URL = "https://api.openweathermap.org/data/2.5/forecast/daily";

    const queryParams = hasLatLng
      ? `lat=${this.state.latLng[0]}&lon=${this.state.latLng[1]}`
      : `q=${this.state.queryString}`;
    const unitType =
      this.state.unit === "C"
        ? "metric"
        : this.state.unit === "F"
        ? "imperial"
        : "standard";

    const url = `${BASE_URL}?${queryParams}&units=${unitType}&cnt=40&appid=${API_KEY}`;

    return axios
      .get(url)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log("Error:", error);
        //TODO: Show message in the browser here
      });
  };

  fetchUVIndex = hasLatLng => {
    const API_KEY = "f52e83dffc7d0cf73311fcb22abfab18";
    let url = "";
    if (this.state.indexForToday == 0) {
      const API_KEY = "f52e83dffc7d0cf73311fcb22abfab18";
      const BASE_URL = "https://api.openweathermap.org/data/2.5/uvi";
      const queryParams = hasLatLng
        ? `lat=${this.state.latLng[0]}&lon=${this.state.latLng[1]}`
        : `lat=${this.state.lat}&lon=${this.state.lon}`;
      url = `${BASE_URL}?${queryParams}&appid=${API_KEY}`;
    } else {
      const BASE_URL = "https://api.openweathermap.org/data/2.5/uvi/forecast";
      const queryParams = hasLatLng
        ? `lat=${this.state.latLng[0]}&lon=${this.state.latLng[1]}`
        : `lat=${this.state.lat}&lon=${this.state.lon}`;
      url = `${BASE_URL}?${queryParams}&appid=${API_KEY}&cnt=4`;
    }

    return axios
      .get(url)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        console.log("Error:", error);
        //TODO: Show message in the browser here
      });
  };

  extractDataForNavbar = forecastData => {
    return {
      city: `${forecastData.city.name}, ${forecastData.city.country}`
    };
  };

  extractDataForTodayComponent = forecastData => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    console.log("This is forecast data for today component", forecastData);
    let newIndex =
      this.state.indexForToday == 5 ? 39 : this.state.indexForToday * 8;
    const todayForecast = forecastData.list[newIndex];
    // const todayForecast = this.state.listComponentData[
    //   this.state.indexForToday
    // ];
    console.log(todayForecast);
    const time = new Date(todayForecast.dt * 1000);
    const day = this.getDay(time);
    const date = `${
      monthNames[time.getMonth()]
    } ${time.getDate()}, ${time.getFullYear()}`;

    const weatherId = todayForecast.weather[0].id;
    let description = todayForecast.weather[0].description;
    description = description
      .split(" ")
      .map(elem => elem[0].toUpperCase() + elem.slice(1))
      .join(" ")
      .toString();
    const hours = new Date().getHours();

    let mainTemperature = todayForecast.main.temp;
    mainTemperature = Math.round(mainTemperature);
    const minTemperature = Math.round(todayForecast.main.temp_min);
    const maxTemperature = Math.round(todayForecast.main.temp_max);
    const pressure = todayForecast.main.pressure;
    const humidity = todayForecast.main.humidity;
    const windSpeed = todayForecast.wind.speed;
    const result = {
      day,
      date,
      weatherId,
      description,
      mainTemperature,
      minTemperature,
      maxTemperature,
      pressure,
      humidity,
      windSpeed
    };
    // console.log(result);
    return result;
  };

  extractDataForListAndGraphComponent = forecastData => {
    console.log(forecastData);
    const listComponentData = [];
    const graphComponentData = [];
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    forecastData.list.forEach(forecast => {
      if (
        forecastData.list.indexOf(forecast) % 8 == 0 ||
        forecastData.list.indexOf(forecast) == forecastData.list.length - 1
      ) {
        let item = {};
        item.day = this.getDay(forecast.dt * 1000);
        let time = new Date(forecast.dt * 1000);
        item.date = `${
          monthNames[time.getMonth()]
        } ${time.getDate()}, ${time.getFullYear()}`;
        item.weatherId = forecast.weather[0].id;
        item.description = forecast.weather[0].description;
        item.mainTemperature = Math.round(forecast.main.temp);
        item.pressure = forecast.main.pressure;
        item.humidity = forecast.main.humidity;
        listComponentData.push(item);
        graphComponentData.push(item.mainTemperature);
      }
    });

    console.log(listComponentData);
    return {
      listComponentData,
      graphComponentData
    };
  };

  // Takes date object or unix timestamp in ms and returns day string
  getDay = time => {
    const dayNames = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return dayNames[new Date(time).getDay()];
  };

  render() {
    return (
      <div className="app-container">
        <Navbar
          data={this.state.navbarData}
          onUnitChange={this.onUnitChange}
          onSearchSubmit={this.onSearchSubmit}
          unit={this.state.unit}
        />
        <Today
          data={this.state.todayComponentData}
          unit={this.state.unit}
          uvIndex={this.state.uvIndex}
        />
        <div className="app-list-graph">
          <List
            data={this.state.listComponentData}
            onIndexForTodayChange={this.onIndexForTodayChange}
          />
          <Graph data={this.state.graphComponentData} />
        </div>
      </div>
    );
  }
}

export default App;
