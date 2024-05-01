import { View, Text } from 'react-native'
import { theme } from "../theme"
import { weatherImages } from "../constants"
import { Image } from "react-native"


const ForecastCard = ({item,index}) => {
    const date = new Date(item.date);
    const options = { weekday: 'long' };
    let dayName = date.toLocaleDateString('en-US', options);
    dayName = dayName.split(',')[0];

  return (
    <View 
    key={index} 
    className="flex justify-center items-center w-24 rounded-3xl py-3 space-y-1 mr-4" 
    style={{backgroundColor: theme.bgWhite(0.15)}}
  >
    <Image 
      // source={{uri: 'https:'+item?.day?.condition?.icon}}
      source={weatherImages[item?.day?.condition?.text || 'other']}
        className="w-11 h-11" />
    <Text className="text-white">{dayName}</Text>
    <Text className="text-white text-xl font-semibold">
      {item?.day?.avgtemp_c}&#176;
    </Text>
  </View>
  )
}

export default ForecastCard