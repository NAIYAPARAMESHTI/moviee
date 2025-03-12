import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, ActivityIndicator, StyleSheet } from "react-native";
import axios from "axios";

export default function Index() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    try {
      const response = await axios.get("https://api.themoviedb.org/3/movie/top_rated?api_key=2bca2da35d4c7c4381d6caeeb4fd6a3c", {
        params: {
          api_key: "2bca2da35d4c7c4381d6caeeb4fd6a3c",
        },
      });
      console.log("Response dari API:", response.data);
      setMovies(response.data.results);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Top Rated Movies </Text>

      {loading ? (
        <ActivityIndicator size="large" color="#E50914" />
      ) : (
        <FlatList
          data={movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.movieItem}>
              <Image
                source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                style={styles.poster}
              />
              <Text style={styles.movieTitle}>{item.title}</Text>
              <Text style={styles.movieInfo}> {item.vote_average} | {item.vote_count} </Text>
              <Text style={styles.movieOverview} numberOfLines={3}>{item.overview}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9E6CF",
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#D99D81",
    marginVertical: 20,
  },
  movieItem: {
    alignItems: "center",
    backgroundColor: "#E8F9FF",
    padding: 10,
    marginBottom: 20,
    borderRadius: 10,
    width: "100%",
  },
  poster: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#16404D",
    marginTop: 10,
    textAlign: "center",
  },
  movieInfo: {
    fontSize: 14,
    color: "#000957",
    marginTop: 5,
  },
  movieOverview: {
    fontSize: 14,
    color: "#8174A0",
    marginTop: 5,
    textAlign: "center",
    paddingHorizontal: 10,
  },
});
