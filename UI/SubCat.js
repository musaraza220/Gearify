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

export default function SubCat(props) {
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
        <View style={{ flex: 1 }}>
          <View style={styles.centerItems}>
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
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <MaterialIcons
                      name="location-pin"
                      color={"white"}
                      size={height / 55}
                    />
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
                      {` `}SASKATOON
                    </Text>
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name="menu"
                      color={"white"}
                      size={height / 25}
                    />
                  </View>
                </View>
              </ImageBackground>
            </View>
            <View
              style={{
                marginHorizontal: height / 37,
                marginTop: 4,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <Image
                  source={require("../assets/back.png")}
                  style={{
                    resizeMode: "contain",
                    height: height / 50,
                    width: width / 22,
                    marginTop: 7,
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontFamily: "GlacialIndifference-Bold",
                  fontSize: height / 47,
                  padding: 10,
                  paddingStart: 7,
                }}
              >
                Subcategory
              </Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={{ marginHorizontal: height / 37, marginTop: 0 }}>
                <TouchableOpacity
                  onPress={() => props.navigation.navigate("Products")}
                >
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.categBack}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 60,
                          fontFamily: "GlacialIndifference-Regular",
                          textAlign: "center",
                          paddingStart: 3,
                        }}
                      >
                        Subcategory 1
                      </Text>
                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <Image
                          source={require("../assets/product.png")}
                          style={{
                            height: height / 13.5,
                            resizeMode: "contain",
                            marginEnd: -height / 20,
                          }}
                        />
                      </View>
                    </View>
                  </LinearGradient>
                </TouchableOpacity>

                <LinearGradient
                  colors={["#ffffff", "lightgray"]}
                  style={styles.categBack}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: height / 60,
                        fontFamily: "GlacialIndifference-Regular",
                        textAlign: "center",
                        paddingStart: 3,
                      }}
                    >
                      Subcategory 2
                    </Text>
                    <View style={{ alignItems: "center", width: width / 4 }}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: height / 13.5,
                          resizeMode: "contain",
                          marginEnd: -height / 20,
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={["#ffffff", "lightgray"]}
                  style={styles.categBack}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: height / 60,
                        fontFamily: "GlacialIndifference-Regular",
                        textAlign: "center",
                        paddingStart: 3,
                      }}
                    >
                      Subcategory 3
                    </Text>
                    <View style={{ alignItems: "center", width: width / 4 }}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: height / 13.5,
                          resizeMode: "contain",
                          marginEnd: -height / 20,
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={["#ffffff", "lightgray"]}
                  style={styles.categBack}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: height / 60,
                        fontFamily: "GlacialIndifference-Regular",
                        textAlign: "center",
                        paddingStart: 3,
                      }}
                    >
                      Subcategory 4
                    </Text>
                    <View style={{ alignItems: "center", width: width / 4 }}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: height / 13.5,
                          resizeMode: "contain",
                          marginEnd: -height / 20,
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>

                <LinearGradient
                  colors={["#ffffff", "lightgray"]}
                  style={styles.categBack}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: height / 60,
                        fontFamily: "GlacialIndifference-Regular",
                        textAlign: "center",
                        paddingStart: 3,
                      }}
                    >
                      Subcategory 5
                    </Text>
                    <View style={{ alignItems: "center", width: width / 4 }}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: height / 13.5,
                          resizeMode: "contain",
                          marginEnd: -height / 20,
                        }}
                      />
                    </View>
                  </View>
                </LinearGradient>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Gegular",
                    fontSize: height / 70,
                    padding: 10,
                    paddingStart: 7,
                    alignSelf: "flex-end",
                  }}
                >
                  View all products in this category
                </Text>
              </View>
            </ScrollView>
          </View>
          <View style={styles.bottomMenuMain}>
            <Image
              source={require("../assets/bottommenu.png")}
              style={{
                height: height / 8,
                width: "100%",
                resizeMode: "contain",
                marginTop: -8,
              }}
            />
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
    centerItems: {
      flex: 8,
    },
    centerText: {
      textAlign: "center",
      color: colors.WHITE,
      fontSize: height / 45,
    },
    bottomMenuMain: {
      flex: 1,
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
      width: width / 3,

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

    dealOfDayBack: {
      height: height / 4.33,
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginTop: -height / 11,
      padding: 10,
      alignItems: "center",
    },
    dealCircle: {
      padding: 29.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      zIndex: 1,
      opacity: 0.9,
      alignSelf: "center",
    },
    whishlistBack: {
      flex: 1,
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginTop: 2,
      padding: 10,
      paddingVertical: height / 50,
    },
    whishListCircle: {
      padding: 10.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      opacity: 0.9,
    },
    popularCircle: {
      padding: 30.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      opacity: 0.9,
    },

    recommendBack: {
      height: height / 3.9,
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      padding: 10,
      alignItems: "center",
      justifyContent: "center",
    },
    recomandircle: {
      padding: 30.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      opacity: 0.9,
    },
    catCircle: {
      padding: 10.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      opacity: 0.9,
    },
    categBack: {
      flex: 1,
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginTop: 2,
      marginBottom: 7,
      padding: 10,
      paddingVertical: height / 90,
    },
  });
  return { styles };
};
