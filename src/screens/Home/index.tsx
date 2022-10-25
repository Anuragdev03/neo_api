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
  const { navigation } =  props;

  //states
  const [asteroidId, setAsteroId] = useState<String>("");
    
  const handleChange = async (e: string) => {
    setAsteroId(() => e);
  };
  

  const handleSubmit = () => {
    navigation.navigate("About", {asteroidId})
  }

  function getRandomInt(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min).toString();
  }

  const handleRandomAsteroidId = () => {
    let randomNumber: string = getRandomInt(2000000, 3000000);
    navigation.navigate("About", {asteroidId: randomNumber})
  }
  return (
    <View style={styles.container}>
      <CustomInput onChange={handleChange} placeholder="Enter Asteroid Id" />

      <CustomButton onPress={handleSubmit} text="Submit" disable={false} />

      <CustomButton onPress={handleRandomAsteroidId} text="Random Asteroid" disable={false} />
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
