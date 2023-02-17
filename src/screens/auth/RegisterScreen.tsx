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
import { schemaRegister } from "./schema";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUserRequest } from "../../redux/User/thunk";

type FormData = {
  name: string;
  email: string;
  password: string;
};

export const RegisterScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    //setIsShowKeyboard(false);
    Keyboard.dismiss();
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schemaRegister),
  });

  const OnPressSubmit: SubmitHandler<FormData> = (data) => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    dispatch(registerUserRequest(data));
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
                marginBottom: isShowKeyboard ? 20 : 135,
              }}>
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Hello</Text>
                <Text style={styles.headerTitle}>Sign up to get started</Text>
              </View>
              <View>
                <Text style={styles.inputTitle}>Name</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      onFocus={() => setIsShowKeyboard(true)}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      value={value}
                      placeholder="Name"
                      placeholderTextColor={"gray"}
                    />
                  )}
                  name="name"
                />
                {errors?.name?.message && (
                  <Text style={styles.error}>{errors.name.message}</Text>
                )}
              </View>
              <View style={{ marginTop: 20 }}>
                <Text style={styles.inputTitle}>EMAIL ADDRESS</Text>
                <Controller
                  control={control}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                      style={styles.input}
                      textAlign={"center"}
                      onFocus={() => setIsShowKeyboard(true)}
                      onBlur={onBlur}
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
                      onFocus={() => setIsShowKeyboard(true)}
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
                onPress={handleSubmit(OnPressSubmit)}>
                <Text style={styles.btnTitle}>SIGN UP</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("Login")}
                style={{
                  marginTop: 20,
                  alignSelf: "center",
                }}>
                <Text style={{ color: "#fff" }}>
                  New to application?
                  <Text style={{ fontSize: 20, color: "#ff6347" }}>
                    Sign In
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
    marginHorizontal: 40,
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
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 40,
    color: "#f0f8ff",
    textAlign: "center",
  },
  error: {
    marginTop: 2,
    color: "red",
    width: "80%",
  },
});
