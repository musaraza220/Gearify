import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  View,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
  ScrollView,
  Platform,
  useWindowDimensions,
  ImageBackground,
  TextInput,
} from "react-native";
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { colors } from "../assets/colors";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
} from "@expo/vector-icons";
import { appleAuth } from "@invertase/react-native-apple-authentication";

// import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import * as WebBrowser from "expo-web-browser";
import LinearGradient from "react-native-linear-gradient";

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function Home(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [gLoading, setGLoading] = React.useState(false);
  const [aLoading, setALoading] = React.useState(false);
  const [fLoading, setFLoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const [user, setUser] = useState({});
  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();
  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/GlacialIndifference-Regular.otf"),
    "GlacialIndifference-Bold": require("../assets/GlacialIndifference-Bold.otf"),
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

  const theme = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <StatusBar backgroundColor={colors.MAIN} translucent={true} animated />
      {loading ? null : (
        <View style={[styles.centerItems]}>
          {/* /////// TOP BAR ////// */}
          <View>
            <ImageBackground
              source={require("../assets/topbar.png")}
              style={styles.topBar}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 20,
                  justifyContent: "space-between",
                  marginTop: height / 13,
                }}
              >
                <View>
                  <MaterialCommunityIcons
                    name="menu"
                    color={"white"}
                    size={height / 25}
                  />
                </View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={[
                      styles.textSize,
                      {
                        color: "white",
                        fontSize: height / 55,
                        fontFamily: "Futura-CondensedMedium",
                      },
                    ]}
                  >
                    SASKATOON{` `}
                  </Text>
                  <MaterialIcons
                    name="location-pin"
                    color={"white"}
                    size={height / 55}
                  />
                </View>
              </View>
            </ImageBackground>
          </View>
          {/* //////// TOP BUTTONS //////// */}
          <ScrollView
            style={{ marginHorizontal: height / 37 }}
            horizontal
            showsHorizontalScrollIndicator={false}
          >
            <View
              style={{
                paddingVertical: height / 90,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity style={styles.catBtnStyle}>
                <Text style={styles.textSizeCatBtn}>Viewed</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.catBtnStyle}>
                <Text style={styles.textSizeCatBtn}>Latest Deals</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.catBtnStyle}>
                <Text style={styles.textSizeCatBtn}>Clearance</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.catBtnStyle}>
                <Text style={styles.textSizeCatBtn}>Sale</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={{ marginHorizontal: height / 37, marginTop: 4 }}>
            <Text
              style={{
                fontFamily: "GlacialIndifference-Bold",
                fontSize: height / 47,
              }}
            >
              Best Seller
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 3,
              }}
            >
              <LinearGradient
                colors={["#ffffff", "lightgray"]}
                style={styles.bestSellerBack}
              >
                <Text
                  style={{
                    fontSize: height / 55,
                    fontFamily: "GlacialIndifference-Bold",
                  }}
                >
                  $51.95
                </Text>

                <Text
                  style={{
                    fontSize: height / 80,
                    marginTop: 7,
                    fontFamily: "GlacialIndifference-Regular",
                  }}
                >
                  BRAND NAME
                </Text>
                <Text
                  style={{
                    fontSize: height / 50,
                    fontFamily: "GlacialIndifference-Regular",
                  }}
                >
                  Short Product Name
                </Text>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: height / 50,
                    right: 10,
                    opacity: 0.5,
                  }}
                >
                  <EvilIcons
                    name="heart"
                    color={colors.MAIN}
                    size={height / 31}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 45,
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/addtocart.png")}
                      style={styles.sellerButtons}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity style={{ marginStart: height / 30 }}>
                    <Image
                      source={require("../assets/buynow.png")}
                      style={styles.sellerButtons}
                    />
                  </TouchableOpacity>
                </View>
              </LinearGradient>
              <View style={styles.sellerCircle}>
                <Image
                  source={require("../assets/product.png")}
                  style={{ height: 80, width: 80, resizeMode: "contain" }}
                />
              </View>
            </View>

            <View
              style={{
                alignSelf: "flex-end",
                marginTop: height / 4.8,
                marginEnd: 4,
              }}
            >
              <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                VIEW ALL
              </Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
}

const useStyle = () => {
  const { width, height } = useWindowDimensions();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    centerItems: {},
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
    topBar: {
      paddingVertical: 1,
      width: width / 1,
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
    catBtnStyle: {
      borderWidth: 0.48,
      borderRadius: 2,
      borderColor: colors.MAIN,
      padding: 10,
      width: width / 4,
      marginEnd: 12,
    },
    textSizeCatBtn: {
      fontSize: height / 58,
      fontFamily: "GlacialIndifference-Regular",
      textAlign: "center",
    },

    bestSellerBack: {
      width: width / 1.46,
      height: height / 5.12,
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginTop: 2,
      position: "absolute",
      right: 0,
      top: 1,
      paddingStart: height / 9,
      paddingVertical: height / 50,
    },
    sellerCircle: {
      padding: 34.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      position: "absolute",
      left: 1,
      top: height / 70,
      opacity: 0.9,
    },
    sellerButtons: {
      width: width / 7,
      height: height / 16,
      resizeMode: "contain",
    },
    addToCartTxt: {
      fontSize: height / 50,
      fontFamily: "GlacialIndifference-Bold",
    },
  });
  return { styles };
};
