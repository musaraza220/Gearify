import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  Dimensions,
  Platform,
  useWindowDimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { colors } from "../assets/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { appleAuth } from "@invertase/react-native-apple-authentication";

// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";

export default function Login(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [gLoading, setGLoading] = React.useState(false);
  const [aLoading, setALoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();
  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/GlacialIndifference-Regular.otf"),
  };

  useEffect(() => {
    GoogleSignin.configure({
      scopes: ["email"],
      webClientId:
        "401346723336-dqlvdanvfc5vfaqfsv95qdamgemfdf9b.apps.googleusercontent.com",
      iosClientId:
        "401346723336-hh734tvb1j74ied71970a66rdnqhhkgi.apps.googleusercontent.com",
    });
  }, []);

  const handleAppleSignIn = async () => {
    setAuthError("");
    setALoading(true);
    setDisable(true);
    try {
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
      });

      const { identityToken, nonce } = appleAuthRequestResponse;
      console.log(appleAuthRequestResponse);

      let data = {
        firstname: appleAuthRequestResponse.fullName.givenName,
        lastname: appleAuthRequestResponse.fullName.familyName,
        email: appleAuthRequestResponse.email,
        phone: "",
        password: appleAuthRequestResponse.email,
      };
      // let record = await PersonalAccountAPI(data);

      // if (record === "success") {
      //   Alert.alert(
      //     "Success",
      //     "Account created successfully. Your Email: " +
      //       appleAuthRequestResponse.email +
      //       " and Password is: " +
      //       appleAuthRequestResponse.email
      //   );
      setALoading(false);
      // } else {
      //   setAuthError(record);
      // }
      setALoading(false);
      setDisable(false);
    } catch (error) {
      setALoading(false);
      setDisable(false);
      console.log("Apple Sign-In Error:", error);
    }
  };

  const handleGoogleSignIn = async () => {
    setAuthError("");
    setGLoading(true);
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log("User Info:", userInfo.user);
      let data = {
        firstname: userInfo.user.givenName,
        lastname: userInfo.user.familyName,
        email: userInfo.user.email,
        phone: "",
        password: userInfo.user.email,
      };
      let record = await PersonalAccountAPI(data);

      if (record === "success") {
        Alert.alert(
          "Success",
          "Account created successfully. Your Email: " +
            userInfo.user.email +
            " and Password is: " +
            userInfo.user.email
        );
        setGLoading(false);
      } else {
        setGLoading(false);
        setAuthError(record);
      }
    } catch (error) {
      setGLoading(false);
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log("Sign in cancelled");
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log("Sign in is already in progress");
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log("Play services are not available");
      } else {
        console.log("An error occurred:", error);
      }
    }
  };
  useEffect(() => {
    loadFonts();
  }, []);

  const loadFonts = async () => {
    await Font.loadAsync(customFonts).then((e) => {
      console.log("jjknx");
      setLoading(false);
    });
  };
  useEffect(() => {
    console.log("Orientation changed. Width:", width, "Height:", height);
  }, [width, height]);

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };
  const saveData = async () => {
    setAuthError("");
    setEmailError("");
    setPasswordError("");
    setAuthLoading(false);
    setDisable(false);

    if (!email.trim()) {
      setEmailError("Required field");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Enter correct email address");
      return;
    }

    if (!password) {
      setPasswordError("Required field");
      return;
    }

    setAuthLoading(true);
    setDisable(true);

    let data = {
      email: email,
      password: password,
    };
    let record = await loginAPI(data);

    if (record === "User not found") {
      setEmailError("User not found with this email");
    } else if (record === "Incorrect password") {
      setPasswordError("Incorrect password");
    } else if (record.result === "success") {
      console.log(record);
    } else {
      setAuthError("* Something is wrong *");
    }

    setAuthLoading(false);
    setDisable(false);
  };

  const handleVisibility = () => {
    if (secureEntry) {
      setSecureEntry(false);
      setRightIcon("eye-off");
    } else {
      setSecureEntry(true);
      setRightIcon("eye");
    }
  };
  const theme = useTheme();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar backgroundColor={colors.MAIN} translucent={true} animated />
      {loading ? null : (
        <View style={[styles.centerItems]}>
          <View
            style={{
              alignItems: "center",
              flexDirection: "row",
              marginTop: height / 30,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: height / 45,
                  fontFamily: "GlacialIndifference-Regular",
                }}
              >
                Welcome Back!
              </Text>
              <Text
                style={[
                  styles.textSize,
                  {
                    marginTop: height / 75,
                  },
                ]}
              >
                Please log in to your account
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "center", marginTop: height / 90 }}>
            <Text style={[styles.textSize, { color: "red" }]}>{authError}</Text>
          </View>
          <View
            style={[
              styles.txtView,
              {
                marginTop: height / 35,
                borderWidth: emailError !== "" ? 0.3 : 0,
                borderColor: emailError !== "" ? colors.MAIN : null,
              },
            ]}
          >
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              autoCorrect={false}
              value={email}
              onChangeText={(value) => [setEmail(value), setEmailError("")]}
              error={error}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {emailError !== "" ? (
              <MaterialIcons size={height / 60} color={"red"} name="error" />
            ) : null}
            <Text
              style={[
                styles.textSize,
                {
                  color: "red",
                  textAlign: "right",
                  marginEnd: 3,
                  marginStart: 2,
                  fontSize: height / 80,
                },
              ]}
            >
              {emailError}
            </Text>
          </View>
          <View
            style={[
              styles.txtView,
              {
                marginTop: height / 90,
                borderWidth: passwordError !== "" ? 0.3 : 0,
                borderColor: passwordError !== "" ? colors.MAIN : null,
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                  width: width / 1.4,
                },
              ]}
              autoCorrect={false}
              secureTextEntry={secureEntry}
              value={password}
              onChangeText={(value) => [
                setPassword(value),
                setPasswordError(""),
              ]}
              error={error}
            />
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => handleVisibility()}
            >
              <MaterialCommunityIcons size={height / 50} name={rightIcon} />
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 2,
            }}
          >
            {passwordError !== "" ? (
              <MaterialIcons size={height / 60} color={"red"} name="error" />
            ) : null}
            <Text
              style={[
                styles.textSize,
                {
                  color: "red",
                  textAlign: "right",
                  marginEnd: 3,
                  marginStart: 2,
                  fontSize: height / 80,
                },
              ]}
            >
              {passwordError}
            </Text>
          </View>

          <TouchableOpacity
            style={{
              alignItems: "flex-end",
              marginTop: -height / 90,
            }}
            onPress={() => [
              props.navigation.navigate("ForgotPassword"),
              setEmail(""),
              setPassword(""),
            ]}
          >
            <View>
              <Text style={styles.textSize}>Forgot password?{`  `}</Text>
            </View>
          </TouchableOpacity>

          <View>
            <TouchableOpacity
              disabled={disable}
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 17 }}
              onPress={() => saveData()}
            >
              <ImageBackground
                source={require("../assets/button.png")}
                style={styles.btnStyles}
              >
                <View>
                  {authLoading ? (
                    <ActivityIndicator size={"small"} color={colors.WHITE} />
                  ) : (
                    <Text
                      style={[
                        styles.centerText,
                        { fontFamily: "GlacialIndifference-Regular" },
                      ]}
                    >
                      Log In
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => props.navigation.navigate("AccountType")}
            style={{ alignItems: "center", marginTop: height / 17 }}
            //onPress={() => props.navigation.navigate("SignupMain")}
          >
            <View>
              <Text style={styles.textSize}>
                Don't have an account? Register
              </Text>
            </View>
          </TouchableOpacity>

          <Text
            style={[
              styles.textSize,
              { textAlign: "center", marginTop: height / 90 },
            ]}
          >
            or
          </Text>
          <Text
            style={[
              styles.textSize,
              { textAlign: "center", marginTop: height / 90 },
            ]}
          >
            Sign Up using
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: height / 30,
            }}
          >
            <TouchableOpacity
              onPress={() => {
                handleAppleSignIn();
              }}
            >
              {aLoading ? (
                <View style={styles.iconImgStyle}>
                  <ActivityIndicator size={"large"} color={colors.MAIN} />
                </View>
              ) : (
                <Image
                  source={require("../assets/appleIcon.png")}
                  style={styles.iconImgStyle}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGoogleSignIn()}>
              {gLoading ? (
                <View style={styles.iconImgStyle}>
                  <ActivityIndicator size={"large"} color={colors.MAIN} />
                </View>
              ) : (
                <Image
                  source={require("../assets/google.png")}
                  style={[styles.iconImgStyle]}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/fb.png")}
                style={styles.iconImgStyle}
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity>
            <Text
              style={[
                styles.textSize,
                { textAlign: "center", marginTop: height / 14 },
              ]}
            >
              Continue as guest
            </Text>
          </TouchableOpacity>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginTop: height / 45,
            }}
          >
            <TouchableOpacity style={{ marginEnd: width / 11 }}>
              <Text
                style={[
                  styles.textSize,
                  { textAlign: "center", marginTop: height / 20 },
                ]}
              >
                Privacy
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={[
                  styles.textSize,
                  { textAlign: "center", marginTop: height / 20 },
                ]}
              >
                Terms of use
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* <View
        style={{
          alignItems: "center",
          paddingBottom: Platform.OS === "android" ? 10 : 1,
        }}
      >
        <Text>A Contrivity Solution</Text>
      </View> */}
    </SafeAreaView>
  );
}

const useStyle = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centerItems: {
      flex: 1,
      padding: 20,
    },
    centerText: {
      textAlign: "center",
      color: colors.WHITE,
      fontSize: height / 45,
    },
    btnStyle: {
      backgroundColor: colors.MAIN,
      marginTop: 30,
      borderRadius: 10,
      padding: 15,
    },
    textinputStyle: {
      marginTop: 2,
    },
    txtView: {
      padding: 13,
      backgroundColor: colors.grays,
      marginTop: height / 30,
      borderRadius: 3,
    },
    btnStyles: {
      padding: 8,

      width: width / 1.1,
      overflow: "hidden",
      resizeMode: "contain",
      borderRadius: 3,
      justifyContent: "center",
    },
    textSize: {
      fontSize: height / 65,
      fontFamily: "GlacialIndifference-Regular",
    },
    iconImgStyle: {
      height: height / 18,
      resizeMode: "contain",
      width: width / 5,
    },
  });
  return { styles };
};
