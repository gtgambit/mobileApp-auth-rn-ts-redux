import { View, Text, Image, StyleSheet } from "react-native";

export const PhotoCard = ({ photo }) => {
  return (
    <View style={styles.container}>
      <Image source={{ uri: photo.download_url }} style={styles.image} />
      <Text style={styles.author}>{photo.author}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: 200,
  },
  author: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    paddingStart: 10,
    paddingVertical: 10,
    backgroundColor: "rgba(0,0,0,0.5)",
    color: "white",
  },
});
