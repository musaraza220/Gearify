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
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API } from "../PreferencesContext";
// import { Login } from "./apis";
import axios from "axios";
import * as Font from "expo-font";

export default function Verification(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
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

  //   const validateEmail = (email) => {
  //     return email.match(
  //       /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  //     );
  //   };
  //   const saveData = async () => {
  //     setAuthError("");
  //     setLoading(false);
  //     setDisable(false);
  //     if (!(email === "" || password === "")) {
  //       if (validateEmail(email)) {
  //         setLoading(true);
  //         setDisable(true);
  //         let data = {
  //           email: email,
  //           password: password,
  //         };
  //         await Login(data)
  //           .then((res) => {
  //             console.log(res);
  //             if (res.result === "Success") {
  //               setLoading(false);
  //               setDisable(false);
  //               AsyncStorage.setItem("@userData", JSON.stringify(res));
  //               if (res.role === "Company") {
  //                 console.log("company");
  //                 props.navigation.reset({
  //                   index: 0,
  //                   routes: [{ name: "CompanyTabs" }],
  //                 });
  //               } else {
  //                 props.navigation.reset({
  //                   index: 0,
  //                   routes: [{ name: "MyTabs" }],
  //                 });
  //               }
  //             } else {
  //               if (res === "* Your account is Deactived *") {
  //                 setAuthError(
  //                   "* Your admin has deactivated your account under the Team Plan. Please contact your admin for account access. *"
  //                 );
  //               } else {
  //                 setAuthError("* Invalid Username or Password *");
  //               }
  //               setLoading(false);
  //               setDisable(false);
  //             }
  //           })
  //           .catch((e) => {
  //             setAuthError("* Something Wrong *");
  //             setLoading(false);
  //             setDisable(false);
  //           });
  //       } else {
  //         setAuthError("* Invalid Email Address *");
  //       }
  //       // await AsyncStorage.setItem('@userName', email)
  //       // props.navigation.reset({
  //       //     index: 0,
  //       //     routes: [{ name: 'MyTabs' }]
  //       // })
  //     } else {
  //       Alert.alert("All Fields Are Required", "Please fill all fields");
  //     }
  //   };

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
                Please enter 4 digit code send to {`\n`}*****@gmail.com
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "center", marginTop: height / 90 }}>
            <Text style={{ color: "red" }}>{authError}</Text>
          </View>
          <View style={styles.txtView}>
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
              // right={<TextInput.Icon icon="email" />}
              outlineColor={colors.GRAY}
              keyboardType="number-pad"
              autoCorrect={false}
              value={email}
              onChangeText={(value) => setEmail(value)}
              error={error}
            />
          </View>

          <TouchableOpacity
            style={{ alignItems: "center", marginTop: height / 20 }}
            //onPress={() => props.navigation.navigate("SignupMain")}
          >
            <View>
              <Text style={styles.textSize}>Resend OTP</Text>
            </View>
          </TouchableOpacity>
          <View>
            <TouchableOpacity
              disabled={disable}
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 11 }}
              onPress={() => props.navigation.navigate("ChangePassword")}
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

          <TouchableOpacity
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
              { textAlign: "center", marginTop: height / 70 },
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
                { textAlign: "center", marginTop: height / 17 },
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
              marginTop: height / 40,
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
