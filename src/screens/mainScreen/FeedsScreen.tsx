import React from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { getPhotos } from "../../services/photosApi";
import { useEffect, useState } from "react";
import { PhotoCard } from "../../components/PhotoCard/PhotoCard";

export const FeedsScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const requestPhotos = async (pageNum) => {
    try {
      const data = await getPhotos(pageNum);
      return setPhotos((prev) => [...prev, ...data]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (pageNum === 1) {
      requestPhotos(pageNum);
    }
    getMorePhotos();
  }, []);

  const getMorePhotos = () => {
    requestPhotos(pageNum);
    setPageNum((prev) => prev + 1);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={({ item }) => <PhotoCard photo={item} />}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={getMorePhotos}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightslategrey",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  loading: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
});
