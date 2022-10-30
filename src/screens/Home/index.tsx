import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

// Components
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";

interface propType {
  navigation: {
    navigate: Function;
  };
  route: {};
}

export default function Home(props: propType) {
  const { navigation } = props;

  //states
  const [asteroidId, setAsteroId] = useState<String>("");
  const [isLoading, setIsLoading] = useState<Boolean>(false);

  const handleChange = async (e: string) => {
    setAsteroId(() => e);
  };

  const handleSubmit = () => {
    navigation.navigate("About", { asteroidId });
  };

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min).toString();
  }

  const handleRandomAsteroidId = () => {
    setIsLoading(true);
    let randomNumber: string = getRandomInt(0, 20);
    let page: string = getRandomInt(0, 1000);

    let apiUrl: string = `https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=azS0h0b3oI6fZVhMUuQq2nna0swfXXL1XLvtnbWc&page=${page}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        let asteroidData = data.near_earth_objects;
        let randomAsteroid = asteroidData[randomNumber]?.id;
        if(randomAsteroid) {
          navigation.navigate("About", { asteroidId: randomAsteroid });
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      })
  };
  return (
    <View style={styles.container}>
      <CustomInput onChange={handleChange} placeholder="Enter Asteroid Id" />

      <CustomButton onPress={handleSubmit} text="Submit" disable={false} />

      <CustomButton
        onPress={handleRandomAsteroidId}
        text={isLoading ? "Loading..." : "Random Asteroid"}
        disable={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
});
