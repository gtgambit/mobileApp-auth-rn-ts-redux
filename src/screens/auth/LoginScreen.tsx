import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { yupResolver } from "@hookform/resolvers/yup";
import { schemaLogin } from "./schema";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";

import { loginUserRequest } from "../../redux/User/thunk";

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaLogin),
  });

  const keyboardHide = () => {
    Keyboard.dismiss();
    setIsShowKeyboard(false);
  };

  const onPressLoginSubmit: SubmitHandler<FormData> = (data) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(loginUserRequest(data));
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          source={require("../../assets/images/stars-on-night.jpg")}>
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}>
            <View
              style={{
                ...styles.form,
                marginBottom: isShowKeyboard ? 20 : 150,
              }}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello again</Text>
                <Text style={styles.headerTitle}>Welcome back</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>EMAIL ADDRESS</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Email"
                      placeholderTextColor={"gray"}
                      autoCorrect={false}
                      autoCapitalize="none"
                      autoComplete="email"
                      keyboardType="email-address"
                      textContentType="emailAddress"
                    />
                  )}
                  name="email"
                />
                {errors?.email?.message && (
                  <Text style={styles.error}>{errors.email.message}</Text>
                )}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>PASSWORD</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      onBlur={onBlur}
                      onChangeText={(value) => onChange(value)}
                      value={value}
                      placeholder="Password"
                      placeholderTextColor={"gray"}
                      secureTextEntry={true}
                      textContentType="password"
                    />
                  )}
                  name="password"
                />
                {errors?.password?.message && (
                  <Text style={styles.error}>{errors.password.message}</Text>
                )}
              </View>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.btn}
                onPress={handleSubmit(onPressLoginSubmit)}>
                <Text style={styles.btnTitle}>SIGN IN</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                }}>
                <Text style={{ color: "#fff" }}>
                  New to application?
                  <Text style={{ fontSize: 20, color: "#ff6347" }}>
                    Sign Up
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "aliceblue",
    height: 40,
    borderRadius: 6,

    color: "aliceblue",
  },
  form: {
    //marginHorizontal: 40,
  },
  inputTitle: {
    color: "aliceblue",
    marginBottom: 10,
    fontSize: 18,
  },
  btn: {
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    marginTop: 40,
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
  header: {
    alignItems: "center",
    marginBottom: 120,
  },
  headerTitle: {
    fontSize: 40,
    color: "aliceblue",
  },
  error: {
    marginTop: 5,
    color: "red",
    width: "80%",
  },
});
