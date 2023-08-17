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
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API } from "../PreferencesContext";
// import { Login } from "./apis";
import axios from "axios";
import * as Font from "expo-font";
import { updatePasswordAPI } from "./APIs";

export default function ChangePassword(props) {
  const [cPassword, setCpassword] = React.useState("");
  const [cPWdError, setCPwdError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
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

  const validatePassword = () => {
    setAuthError("");
    if (!password) {
      setPasswordError("Required field");
      return;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    if (!cPassword) {
      setCPwdError("Required field");
      return;
    } else if (cPassword.length < 8) {
      setCPwdError("Password must be at least 8 characters long");
      return;
    }

    if (password !== cPassword) {
      // setPasswordError("Password don't match");
      setCPwdError("Password don't match");
      return;
    }

    saveData();
  };
  const saveData = async () => {
    setAuthError("");
    setDisable(true);
    setAuthLoading(true);

    let data = {
      email: props.route.params.email,
      password: password,
    };
    let record = await updatePasswordAPI(data);

    if (record === "success") {
      Alert.alert("Success", "Password has been changed successfully.");
      props.navigation.navigate("Login");
    } else {
      setAuthError(record);
    }
    //console.log(record);

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
        <View style={styles.centerItems}>
          <TouchableOpacity
            onPress={() => props.navigation.goBack()}
            style={{ width: width / 7, marginStart: -8 }}
          >
            <MaterialCommunityIcons
              size={height / 30}
              color={"black"}
              name="chevron-left"
            />
          </TouchableOpacity>

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
                Change Password
              </Text>
              <Text
                style={[
                  styles.textSize,
                  {
                    marginTop: height / 69,
                  },
                ]}
              >
                Your New Password Must be Different {`\n`}from Previously Used
                Password.
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "center", marginTop: 2 }}>
            <Text style={[styles.textSize, { color: "red" }]}>{authError}</Text>
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
              // right={
              //   <TextInput.Icon
              //     icon={rightIcon}
              //     onPress={() => handleVisibility()}
              //   />
              // }
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
              justifyContent: "flex-end",
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

          <View
            style={[
              styles.txtView,
              {
                marginTop: height / 90,
                borderWidth: cPWdError !== "" ? 0.3 : 0,
                borderColor: cPWdError !== "" ? colors.MAIN : null,
                flexDirection: "row",
                justifyContent: "space-between",
              },
            ]}
          >
            <TextInput
              placeholder="Re-type Password"
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
              value={cPassword}
              onChangeText={(value) => [setCpassword(value), setCPwdError("")]}
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
              justifyContent: "flex-end",
              marginTop: 2,
            }}
          >
            {cPWdError !== "" ? (
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
              {cPWdError}
            </Text>
          </View>

          <View>
            <TouchableOpacity
              disabled={disable}
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 20 }}
              onPress={() => validatePassword()}
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
                      Confirm
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
            <TouchableOpacity>
              <Image
                source={require("../assets/appleIcon.png")}
                style={styles.iconImgStyle}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image
                source={require("../assets/google.png")}
                style={[styles.iconImgStyle]}
              />
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
      marginTop: 1,
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
