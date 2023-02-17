import React from "react";
import { View, StyleSheet, FlatList, RefreshControl } from "react-native";
import { getPhotos } from "../../services/photosApi";
import { useEffect, useState } from "react";
import { PhotoItem } from "../../components/PhotoItem/PhotoItem";

export const FeedsScreen = () => {
  const [pageNum, setPageNum] = useState(1);
  const [photos, setPhotos] = useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const requestPhotos = async (pageNum) => {
    try {
      setRefreshing(true);
      const data = await getPhotos(pageNum);
      return setPhotos(data);
    } catch (error) {
      console.log(error);
    } finally {
      setRefreshing(false);
    }
  };

  const addMorePhotos = async (pageNum) => {
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
      return;
    }
    addMorePhotos(pageNum);
  }, [pageNum]);

  const getMorePhotos = () => {
    setPageNum((prev) => prev + 1);
  };

  const onRefresh = React.useCallback(() => {
    //setRefreshing(true);
    //setTimeout(() => {

    //  setRefreshing(false);
    //}, 2000);
    if (pageNum === 1) {
      requestPhotos(pageNum);
    }
    setPageNum(1);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={({ item }) => <PhotoItem photo={item} />}
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
