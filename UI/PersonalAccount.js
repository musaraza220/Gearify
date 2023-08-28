import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import PhoneInput from "react-native-phone-number-input";
import { isValidNumber } from "react-native-phone-number-input";
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
  ScrollView,
} from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { colors } from "../assets/colors";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { API } from "../PreferencesContext";
import { PersonalAccountAPI } from "./APIs";
import * as Font from "expo-font";

export default function PersonalAccount(props) {
  const [email, setEmail] = React.useState("");
  const [value, setValue] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");

  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const [fNameError, setfNameError] = React.useState("");
  const [lNameError, setlNameError] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");

  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();

  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/AvenirNextCondensed.ttf"),
    "GlacialIndifference-Bold": require("../assets/AvenirNextCondensedDemiBold.ttf"),
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

    if (!firstname.trim()) {
      setfNameError("Required field");
      return;
    }

    if (!lastname.trim()) {
      setlNameError("Required field");
      return;
    }

    if (!email.trim()) {
      setEmailError("Required field");
      return;
    } else if (!validateEmail(email)) {
      setEmailError("Enter correct email address");
      return;
    }

    if (!phone.trim()) {
      setPhoneError("Required field");
      return;
    } else if (!isValidNumber(phone, code)) {
      setPhoneError("Enter correct phone number");
      return;
    }

    if (!password) {
      setPasswordError("Required field");
      return;
    } else if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      return;
    }

    setAuthLoading(true);
    setDisable(true);
    let data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      phone: phone,
      password: password,
    };
    let record = await PersonalAccountAPI(data);

    if (record === "success") {
      Alert.alert(
        "Success",
        "Account created successfully. A confirmation email has been sent to your email address."
      );
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
                Personal Account Registration
              </Text>
            </View>
          </View>
          {/* Check box -> use for authentication */}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ alignSelf: "center", marginTop: height / 90 }}>
              <Text style={[styles.textSize, { color: "red" }]}>
                {authError}
              </Text>
            </View>
            <View
              style={[
                styles.txtView,
                {
                  borderWidth: fNameError !== "" ? 0.3 : 0,
                  borderColor: fNameError !== "" ? colors.MAIN : null,
                },
              ]}
            >
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
                value={firstname}
                onChangeText={(value) => [
                  setFirstname(value),
                  setfNameError(""),
                ]}
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
              {fNameError !== "" ? (
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
                {fNameError}
              </Text>
            </View>

            <View
              style={[
                styles.txtView,
                {
                  marginTop: height / 35,
                  borderWidth: lNameError !== "" ? 0.3 : 0,
                  borderColor: lNameError !== "" ? colors.MAIN : null,
                },
              ]}
            >
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
                value={lastname}
                onChangeText={(value) => [
                  setLastname(value),
                  setlNameError(""),
                ]}
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
              {lNameError !== "" ? (
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
                {lNameError}
              </Text>
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
                // right={
                //   <TextInput.Icon
                //     icon={rightIcon}
                //     onPress={() => handleVisibility()}
                //   />
                // }
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
                  marginTop: height / 35,
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
                  height: height / 19,
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
              {/* <TextInput
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
            /> */}
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
                {phoneError}
              </Text>
            </View>
            <View
              style={[
                styles.txtView,
                {
                  marginTop: height / 35,
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
                <MaterialCommunityIcons size={height / 40} name={rightIcon} />
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

            <View style={{ marginTop: height / 20, paddingBottom: height / 4 }}>
              <TouchableOpacity
                disabled={disable}
                activeOpacity={0.7}
                style={{ alignItems: "center", marginTop: height / 12 }}
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
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
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

      width: width / 1.12,
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
