
import {
  View,
  Text,
  ScrollView,
} from "react-native";


import { CalendarDaysIcon, MapPinIcon } from "react-native-heroicons/solid";

import ForecastCard from "./ForecastCard";

const NextDayForeCast = ({ weather }) => {
  return (
    <View className="mb-2 space-y-3">
      <View className="flex-row items-center mx-5 space-x-2">
        <CalendarDaysIcon size="22" color="white" />
        <Text className="text-white text-base">Daily forecast</Text>
      </View>
      <ScrollView
        horizontal
        contentContainerStyle={{ paddingHorizontal: 15 }}
        showsHorizontalScrollIndicator={false}
      >
        {weather?.forecast?.forecastday?.map((item, index) => {
          return <ForecastCard item={item} index={index} />;
        })}
      </ScrollView>
    </View>
  );
};

export default NextDayForeCast;
