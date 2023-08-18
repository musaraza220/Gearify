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
  ActivityIndicator,
  Platform,
  useWindowDimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import { Text, useTheme } from "react-native-paper";
import { colors } from "../assets/colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API } from "../PreferencesContext";
// import { Login } from "./apis";
import axios from "axios";
import * as Font from "expo-font";

export default function Verification(props) {
  const [vCode, setVCode] = React.useState("");
  const [resendCode, setResendCode] = React.useState(0);
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();
  const [timer, setTimer] = useState(60);
  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/GlacialIndifference-Regular.otf"),
  };

  useEffect(() => {
    let interval;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timer]);

  const sendPhone = async (codes) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    var sraw = JSON.stringify({
      phone: props.route.params.email,
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
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  const handleResendOTP = () => {
    if (timer === 0) {
      var codes = Math.floor(Math.random() * 9000) + 1000;
      console.log(codes);
      console.log(props.route.params.phone);
      props.route.params.phone === 1 ? sendPhone(codes) : sendEmail(codes);
      setResendCode(codes);
      setTimer(60);
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
    console.log(props.route.params.email);
  }, [width, height]);

  const sendEmail = async (codes) => {
    await axios
      .post("https://allkourtapi.eleget.net/send_email_general", {
        from: "donotreply@kloudupload.com",
        to: props.route.params.email,
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

  const saveData = async () => {
    setError("");
    let code = resendCode === 0 ? props.route.params.code : resendCode;
    console.log(code);
    if (!vCode.trim()) {
      setError("Required field");
      return;
    } else if (parseInt(vCode, 10) !== code) {
      setError("Enter correct code");
      return;
    }

    props.navigation.navigate("ChangePassword", {
      email: props.route.params.email,
    });
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
                Enter Code
              </Text>
              <Text
                style={[
                  styles.textSize,
                  {
                    marginTop: height / 69,
                  },
                ]}
              >
                Please enter 4 digit code send to {`\n`}
                {props.route.params.email}
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "center", marginTop: height / 90 }}>
            <Text style={{ color: "red" }}>{authError}</Text>
          </View>
          <View
            style={[
              styles.txtView,
              {
                borderWidth: error !== "" ? 0.3 : 0,
                borderColor: error !== "" ? colors.MAIN : null,
              },
            ]}
          >
            <TextInput
              label="Code"
              placeholder="Code"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              keyboardType="number-pad"
              autoCorrect={false}
              value={vCode}
              onChangeText={(value) => [setVCode(value), setError("")]}
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
            {error !== "" ? (
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
              {error}
            </Text>
          </View>

          <TouchableOpacity
            disabled={timer > 0 ? true : false}
            style={{ alignItems: "center", marginTop: height / 25 }}
            onPress={() => handleResendOTP()}
          >
            <View>
              <Text style={styles.textSize}>
                Resend OTP {timer > 0 ? "after 0:" + timer : ""}
              </Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 15 }}
              onPress={() => saveData()}
            >
              <ImageBackground
                source={require("../assets/button.png")}
                style={styles.btnStyles}
              >
                <View>
                  {loading ? (
                    <ActivityIndicator size={"small"} color={colors.WHITE} />
                  ) : (
                    <Text
                      style={[
                        styles.centerText,
                        { fontFamily: "GlacialIndifference-Regular" },
                      ]}
                    >
                      Verify
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
