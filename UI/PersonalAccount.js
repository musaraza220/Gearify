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

export default function PersonalAccount(props) {
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
                Personal Account Registration
              </Text>
            </View>
          </View>

          <View style={{ alignSelf: "center", marginTop: height / 90 }}>
            <Text style={{ color: "red" }}>{authError}</Text>
          </View>
          <View style={styles.txtView}>
            <TextInput
              placeholder="First Name"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              // right={
              //   <TextInput.Icon
              //     icon={rightIcon}
              //     onPress={() => handleVisibility()}
              //   />
              // }
              autoCorrect={false}
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error}
            />
          </View>

          <View style={[styles.txtView, { marginTop: height / 20 }]}>
            <TextInput
              placeholder="Last Name"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              // right={
              //   <TextInput.Icon
              //     icon={rightIcon}
              //     onPress={() => handleVisibility()}
              //   />
              // }
              autoCorrect={false}
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error}
            />
          </View>

          <View style={[styles.txtView, { marginTop: height / 20 }]}>
            <TextInput
              placeholder="Email Address"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              // right={
              //   <TextInput.Icon
              //     icon={rightIcon}
              //     onPress={() => handleVisibility()}
              //   />
              // }
              autoCorrect={false}
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error}
            />
          </View>

          <View style={[styles.txtView, { marginTop: height / 20 }]}>
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              // right={
              //   <TextInput.Icon
              //     icon={rightIcon}
              //     onPress={() => handleVisibility()}
              //   />
              // }
              autoCorrect={false}
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error}
            />
          </View>

          <View style={[styles.txtView, { marginTop: height / 20 }]}>
            <TextInput
              placeholder="Password"
              placeholderTextColor={theme.colors.secondary}
              style={[
                styles.textSize,
                {
                  backgroundColor: colors.grays,
                },
              ]}
              // right={
              //   <TextInput.Icon
              //     icon={rightIcon}
              //     onPress={() => handleVisibility()}
              //   />
              // }
              autoCorrect={false}
              value={password}
              onChangeText={(value) => setPassword(value)}
              error={error}
            />
          </View>

          <View style={{ marginTop: height / 20 }}>
            <TouchableOpacity
              disabled={disable}
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 12 }}
              onPress={() => props.navigation.navigate("Verification")}
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
                      Register
                    </Text>
                  )}
                </View>
              </ImageBackground>
            </TouchableOpacity>

            <TouchableOpacity
              disabled={disable}
              activeOpacity={0.7}
              style={{ alignItems: "center", marginTop: height / 60 }}
              onPress={() => props.navigation.goBack()}
            >
              <View
                style={[
                  styles.btnStyles,
                  { borderWidth: 0.3, borderColor: colors.MAIN },
                ]}
              >
                {loading ? (
                  <ActivityIndicator size={"small"} color={colors.WHITE} />
                ) : (
                  <Text
                    style={[
                      styles.centerText,
                      {
                        fontFamily: "GlacialIndifference-Regular",
                        color: colors.MAIN,
                      },
                    ]}
                  >
                    Cancel
                  </Text>
                )}
              </View>
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
