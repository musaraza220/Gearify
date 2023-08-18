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
import PhoneInput from "react-native-phone-number-input";
import { isValidNumber } from "react-native-phone-number-input";
import axios from "axios";
import * as Font from "expo-font";
import { checkUserByEmailAPI, checkUserByPhoneAPI } from "./APIs";

export default function ForgotPassword(props) {
  const [email, setEmail] = React.useState("");
  const [error, setError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [usePhone, setUsePhone] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");

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

  const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
  };

  const sendEmail = async (codes) => {
    await axios
      .post("https://allkourtapi.eleget.net/send_email_general", {
        from: "donotreply@kloudupload.com",
        to: email,
        subject: "Password Reset Code",
        message: `Hello,<br/>
          We received a request for a password reset from your Gearify account.<br/>
          Please enter the code below to reset your password.<br/>
          <b>${codes}</b> <br/><br/>
         
          Thank you!<br/>
          Support<br/>
          Gearify<br/><br/>
          `,
      })
      .catch((e) => console.log(e));
  };

  const sendPhone = async (codes) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var sraw = JSON.stringify({
      phone: phone,
      sms_text: `Hello! Your Gearify account verification code is: ${codes}`,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: sraw,
      redirect: "follow",
    };

    fetch("http://142.93.149.52:8040/send_sms", requestOptions)
      .then((response) => response.text())
      .then((result) => console.log("jnbb", result))
      .catch((error) => console.log("error", error));
  };
  const saveData = async () => {
    setEmailError("");
    setPhoneError("");
    let isValid = false;
    let codes = Math.floor(Math.random() * 9000) + 1000;

    if (usePhone) {
      if (!phone.trim()) {
        setPhoneError("Required field");
      } else if (!isValidNumber(phone, code)) {
        setPhoneError("Enter correct phone number");
      } else {
        isValid = true;
        sendPhone(codes);
      }
    } else {
      if (!email.trim()) {
        setEmailError("Required field");
      } else if (!validateEmail(email)) {
        setEmailError("Enter correct email address");
      } else {
        isValid = true;
        sendEmail(codes);
      }
    }

    if (isValid) {
      setAuthLoading(true);
      setDisable(true);

      let data = usePhone ? { phone: phone } : { email: email };
      let record = await (usePhone
        ? checkUserByPhoneAPI(data)
        : checkUserByEmailAPI(data));

      if (record === "success") {
        console.log(codes);
        props.navigation.navigate("Verification", {
          code: codes,
          email: usePhone ? phone : email,
          phone: usePhone ? 1 : 0,
        });
      } else {
        if (usePhone) {
          setPhoneError(record);
        } else {
          setEmailError(record);
        }
      }

      setAuthLoading(false);
      setDisable(false);
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
                Forgot Password
              </Text>
              <Text
                style={[
                  styles.textSize,
                  {
                    marginTop: height / 69,
                  },
                ]}
              >
                Please enter your{" "}
                {usePhone ? "Phone Number " : "Email Address "}
                to receive a {`\n`}Verification Code
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "center" }}>
            <Text style={[styles.textSize, { color: "red" }]}>{authError}</Text>
          </View>
          {usePhone ? (
            <View>
              <View
                style={[
                  styles.txtView,
                  {
                    marginTop: height / 90,
                    padding: 0,
                    borderWidth: phoneError !== "" ? 0.3 : 0,
                    borderColor: phoneError !== "" ? colors.MAIN : null,
                  },
                ]}
              >
                <PhoneInput
                  defaultCode="CA"
                  layout="first"
                  defaultValue={value}
                  onChangeText={(text) => {
                    setValue(text);
                    setPhoneError("");
                  }}
                  onChangeFormattedText={(text) => {
                    setPhone(text);
                  }}
                  onChangeCountry={(text) => {
                    setCode(text.cca2);
                  }}
                  textInputStyle={{
                    color: theme.colors.secondary,
                    fontSize: height / 65,
                    height: height / 90,
                    padding: 0,
                    fontFamily: "GlacialIndifference-Regular",
                  }}
                  containerStyle={{
                    backgroundColor: theme.colors.backgroundColor,
                    padding: 0,
                    height: height / 20.3,
                  }}
                  textContainerStyle={{
                    backgroundColor: theme.colors.backgroundColor,
                  }}
                  codeTextStyle={{
                    color: theme.colors.secondary,
                    fontSize: height / 65,
                    height: height / 60,
                    fontFamily: "GlacialIndifference-Regular",
                  }}
                  flagButtonStyle={{ height: height / 20 }}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                {phoneError !== "" ? (
                  <MaterialIcons
                    size={height / 60}
                    color={"red"}
                    name="error"
                  />
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
                  {phoneError}
                </Text>
              </View>
            </View>
          ) : (
            <View>
              <View
                style={[
                  styles.txtView,
                  {
                    marginTop: height / 90,
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
                  justifyContent: "flex-end",
                  marginTop: 2,
                }}
              >
                {emailError !== "" ? (
                  <MaterialIcons
                    size={height / 60}
                    color={"red"}
                    name="error"
                  />
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
            </View>
          )}

          <TouchableOpacity
            style={{ alignItems: "center", marginTop: height / 30 }}
            onPress={() => (usePhone ? setUsePhone(false) : setUsePhone(true))}
          >
            <View>
              <Text style={styles.textSize}>
                {usePhone ? "Use Email Address" : "Use Phone Number"}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              disabled={disable}
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 15 }}
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
                      Send
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>

          {/* <TouchableOpacity
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
          </View> */}
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
