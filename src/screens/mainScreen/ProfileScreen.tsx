import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
  Image,
} from "react-native";

import { useDispatch } from "react-redux";
import { getUserAvatar } from "../../services/avatarApi";
import { useEffect, useState } from "react";

import { logOutRequest } from "../../redux/User/thunk";

export const ProfileScreen = () => {
  const [user, setUser] = useState<number>(1);
  const dispatch = useDispatch();

  const getUser = async () => {
    try {
      const data = await getUserAvatar();
      return setUser(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onPressLogout = () => {
    setUser(0);
    dispatch(logOutRequest());
  };

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {user ? (
          <Image
            source={{
              uri: user.avatar,
            }}
            style={styles.image}
          />
        ) : (
          <ActivityIndicator style={{ marginRight: 20 }} />
        )}
        {user ? (
          <View>
            <Text style={styles.text}>Name: {user.first_name}</Text>
            <Text style={styles.text}>Email: {user.email}</Text>
          </View>
        ) : (
          <Text style={styles.text}>No User Info</Text>
        )}
      </View>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.btn}
        onPress={onPressLogout}>
        <Text style={styles.btnTitle}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightslategrey",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  profile: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "auto",
    backgroundColor: "lightsteelblue",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginRight: 20,
    borderRadius: 50,
  },
  text: {
    color: "white",
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    ...Platform.select({
      ios: {
        backgroundColor: "transparent",
        borderColor: "aliceblue",
      },
      android: {
        backgroundColor: "royalblue",
        borderColor: "transparent",
      },
    }),
  },
  btnTitle: {
    color: Platform.OS === "ios" ? "royalblue" : "aliceblue",
    fontSize: 18,
  },
});
