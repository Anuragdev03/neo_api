import React from "react";
import { View, Text, StyleSheet } from "react-native";

// Hooks
import useFetch, { Responsetype } from "../../hooks/useFetch";

// proptype
interface Proptype {
  route: {
    params: {
      asteroidId: string;
    };
  };
}

export default function About(props: Proptype) {
  let params = props.route.params;

  let { asteroidId } = params;

  let apiUrl: string = `https://api.nasa.gov/neo/rest/v1/neo/${asteroidId}?api_key=azS0h0b3oI6fZVhMUuQq2nna0swfXXL1XLvtnbWc`;

  let { data, error, loading }: Responsetype = useFetch(apiUrl);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>
          Loading...
        </Text>
      </View>
    );
  }

  if(error) {
    return(
        <View style={{ flex: 1, justifyContent: "center" }}>
        <Text style={{ fontSize: 18, fontWeight: "600", textAlign: "center" }}>
          No Data Found
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>

      <View style={styles.content}>
        <Text style={styles.text}>ID: </Text>
        <Text>{data?.id}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Name: </Text>
        <Text>{data?.name}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Nasa jpl url: </Text>
        <Text>{data?.nasa_jpl_url}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.text}>Is potentially hazardous asteroid: </Text>
        <Text>{data?.is_potentially_hazardous_asteroid.toString()}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 15,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap"
  },
  text: {
    color: "blue",
    fontWeight: "600"
  }
});
