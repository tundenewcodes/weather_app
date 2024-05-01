import { View, Image, Text } from "react-native";
import React, {  useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { fetchLocations, fetchWeatherForecast } from "../api/weather";
import * as Progress from "react-native-progress";
import { getData, storeData } from "../utils/asyncStorage";
import NextDayForeCast from "../components/NextDayForeCast";
import MainForecast from "../components/MainForecast";
import SearchWeather from "../components/SearchWeather";
import { StatusBar } from "react-native";

export default function HomeScreen() {
  const [showSearch, toggleSearch] = useState(false);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [weather, setWeather] = useState({});

  const handleSearch = (search) => {
    // console.log('value: ',search);
    if (search && search.length > 2)
      fetchLocations({ cityName: search }).then((data) => {
        // console.log('got locations: ',data);
        setLocations(data);
      });
  };

  const handleLocation = (loc) => {
    setLoading(true);
    toggleSearch(false);
    setLocations([]);
    fetchWeatherForecast({
      cityName: loc.name,
      days: "7",
    }).then((data) => {
      setLoading(false);
      setWeather(data);
      storeData("city", loc.name);
    });
  };

  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  const fetchMyWeatherData = async () => {
    let myCity = await getData("city");
    let cityName = "Lagos";
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: "7",
    }).then((data) => {
      // console.log('got data: ',data.forecast.forecastday);
      setWeather(data);
      setLoading(false);
    });
  };

  const { location, current } = weather;

  return (
    <View className="flex-1 relative">
      <StatusBar style="light" />
      <Image
        blurRadius={70}
        source={require("../assets/images/bg.png")}
        className="absolute w-full h-full"
      />
      {loading ? (
        <View className="flex-1 flex-row justify-center items-center">
          <Progress.CircleSnail thickness={10} size={140} color="#0bb3b2" />
          <Text className="text-bold text-white  italic ">Loading forecast...Please wait!</Text>
        </View>
      ) : (
        <SafeAreaView className="flex flex-1">
          {/* search section */}

          <SearchWeather
            showSearch={showSearch}
            handleSearch={handleSearch}
            toggleSearch={toggleSearch}
            locations={locations}
            handleLocation={handleLocation}
          />

          {/* forecast section */}

          <MainForecast
            name={location?.name}
            country={location?.country}
            imageName={current?.condition?.text}
            temperature={current?.temp_c}
            windDistance={current?.wind_kph}
            humidity={current?.humidity}
            weatherTime={weather?.forecast?.forecastday[0]?.astro?.sunrise}
          />

          {/* forecast for next days */}

          <NextDayForeCast weather={weather} />
        </SafeAreaView>
      )}
    </View>
  );
}
