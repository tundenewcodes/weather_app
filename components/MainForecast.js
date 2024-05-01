import { View, Text, Image } from 'react-native'
import { weatherImages } from "../constants"


const MainForecast = ({name , country, imageName,temperature, windDistance, humidity, weatherTime}) => {
  return (
    <View className="mx-4 flex justify-around flex-1 mb-2 mt-4">
    {/* location */}
    <Text className="text-white text-center text-2xl font-bold ">
      {name},  
      <Text className="text-lg font-semibold text-gray-300">{country}</Text>
    </Text>
    {/* weather icon */}
    <View className="flex-row justify-center">
      <Image 
        // source={{uri: 'https:'+current?.condition?.icon}} 
        source={weatherImages[imageName || 'other']} 
        className="w-52 h-52" />
      
    </View>
    {/* degree celcius */}
    <View className="space-y-2">
        <Text className="text-center font-bold text-white text-6xl ml-5">
          {temperature}&#176;
        </Text>
        <Text className="text-center text-white text-xl tracking-widest">
          {imageName}
        </Text>
    </View>

    {/* other stats */}
    <View className="flex-row justify-between mx-4">
      <View className="flex-row space-x-2 items-center">
        <Image source={require('../assets/icons/wind.png')} className="w-6 h-6" />
        <Text className="text-white font-semibold text-base">{windDistance}km</Text>
      </View>
      <View className="flex-row space-x-2 items-center">
        <Image source={require('../assets/icons/drop.png')} className="w-6 h-6" />
        <Text className="text-white font-semibold text-base">{humidity}%</Text>
      </View>
      <View className="flex-row space-x-2 items-center">
        <Image source={require('../assets/icons/sun.png')} className="w-6 h-6" />
        <Text className="text-white font-semibold text-base">
          { weatherTime}
        </Text>
      </View>
      
    </View>
  </View>
  )
}

export default MainForecast