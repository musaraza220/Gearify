import React, { useState, useEffect, useRef } from "react";
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
import { Overlay } from "react-native-elements";

import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { colors } from "../assets/colors";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
  FontAwesome,
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
import StarRating from "react-native-star-rating-widget";
import RBSheet from "react-native-raw-bottom-sheet";

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function ShoppingList(props) {
  const refRBSheetViewInst = useRef();

  const [email, setEmail] = React.useState("");
  const [rating, setRating] = useState(3.5);
  const [typeSwitch, setTypeSwitch] = React.useState(false);

  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [sublist, setSubList] = React.useState(true);
  const [qty, setQty] = React.useState(1);
  const [gLoading, setGLoading] = React.useState(false);
  const [listView, setListView] = React.useState(false);
  const [gridView, setGridView] = React.useState(false);
  const [aLoading, setALoading] = React.useState(false);
  const [fLoading, setFLoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const [checkboxPromo, setCheckboxPromo] = React.useState(false);

  const [user, setUser] = useState({});
  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();
  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/AvenirNextCondensed.ttf"),
    "GlacialIndifference-Bold": require("../assets/AvenirNextCondensedDemiBold.ttf"),
    "Mediums-Font": require("../assets/AvenirNextCondensedMedium.ttf"),
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
                    {/* <MaterialIcons
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
                    </Text> */}
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
            {/* //////// TOP BUTTONS //////// */}

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* /////Best seller///// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: height / 50,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <View>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 47,
                      }}
                    >
                      Shopping List
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 70,
                      }}
                    >
                      Private
                    </Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.goBack()}
                      style={{ flexDirection: "row" }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginEnd: 10,
                        }}
                      >
                        View Lists
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setTypeSwitch(true)}>
                      <MaterialCommunityIcons
                        name="chevron-down"
                        color={"black"}
                        size={height / 50}
                      />

                      <Overlay
                        visible={typeSwitch}
                        overlayStyle={{
                          borderRadius: 5,

                          backgroundColor: theme.colors.background,
                          marginTop: height / -2.3,
                          marginStart: height / 4,
                        }}
                      >
                        <View style={{ marginBottom: 6 }}>
                          <TouchableOpacity
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => setTypeSwitch(false)}
                          >
                            <MaterialCommunityIcons name="close" />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,

                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                                width: height / 20,
                              }}
                            >
                              Edit {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginEnd: height / 15,
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Delete {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginEnd: height / 15,
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Move {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginEnd: height / 15,
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Combine {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginTop: 10,
                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity
                            onPress={() => [
                              setTypeSwitch(false),
                              setSubList(true),
                            ]}
                          >
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Frequency {`    `}
                            </Text>
                          </TouchableOpacity>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            color={"gray"}
                            size={height / 50}
                          />
                        </View>
                      </Overlay>

                      <Overlay
                        visible={sublist}
                        overlayStyle={{
                          borderRadius: 5,

                          backgroundColor: theme.colors.background,
                          marginTop: height / -2.3,
                          marginStart: height / 4,
                        }}
                      >
                        <View style={{ marginBottom: 6 }}>
                          <TouchableOpacity
                            style={{ alignSelf: "flex-end" }}
                            onPress={() => setSubList(false)}
                          >
                            <MaterialCommunityIcons name="close" />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,

                            flexDirection: "row",
                            justifyContent: "space-between",
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Custom {`    `}
                            </Text>
                          </TouchableOpacity>
                          <MaterialCommunityIcons
                            name="chevron-right"
                            color={"gray"}
                            size={height / 50}
                          />
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginEnd: height / 15,
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Daily {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginEnd: height / 15,
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Weekly {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            marginStart: height / 60,
                            marginEnd: height / 15,
                            marginTop: 10,
                          }}
                        >
                          <TouchableOpacity>
                            <Text
                              style={{
                                fontFamily: "Mediums-Font",
                                fontSize: height / 75,
                              }}
                            >
                              Monthly {`    `}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </Overlay>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              <View
                style={{
                  marginHorizontal: height / 37,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: 7,
                }}
              >
                <TouchableOpacity
                  style={{ marginTop: height / 60, marginEnd: height / 110 }}
                >
                  <ImageBackground
                    source={require("../assets/button.png")}
                    style={{
                      width: height / 11,
                      height: height / 23,
                      overflow: "hidden",
                      borderRadius: 3,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 55,
                        textAlign: "center",
                        color: "white",
                        marginVertical: 2,
                      }}
                    >
                      Share
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: height / 60, marginEnd: height / 110 }}
                >
                  <View
                    style={{
                      width: height / 10,
                      height: height / 23,
                      overflow: "hidden",
                      borderRadius: 3,
                      alignItems: "center",
                      backgroundColor: "white",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: colors.MAIN,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 58,
                        textAlign: "center",
                        marginVertical: 2,
                      }}
                    >
                      Collaborate
                    </Text>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginTop: height / 60, marginEnd: height / 110 }}
                >
                  <View
                    style={{
                      width: height / 10.5,
                      height: height / 23,
                      overflow: "hidden",
                      borderRadius: 3,
                      alignItems: "center",
                      backgroundColor: "white",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: colors.MAIN,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 58,
                        textAlign: "center",
                        marginVertical: 2,
                      }}
                    >
                      Buy Now
                    </Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: height / 60, marginEnd: height / 110 }}
                >
                  <View
                    style={{
                      width: height / 11,
                      height: height / 23,
                      overflow: "hidden",
                      borderRadius: 3,
                      alignItems: "center",
                      backgroundColor: "white",
                      justifyContent: "center",
                      borderWidth: 1,
                      borderColor: colors.MAIN,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 58,
                        textAlign: "center",
                        marginVertical: 2,
                      }}
                    >
                      Stop
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: height / 28,
                  paddingBottom: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 60,
                    textAlign: "center",
                  }}
                >
                  There are no items in this List.
                </Text>
              </View>
            </ScrollView>

            <RBSheet
              ref={refRBSheetViewInst}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 1.8}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                draggableIcon: {
                  backgroundColor: "#000",
                },
              }}
            >
              <View style={{ paddingHorizontal: height / 40 }}>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 65,
                  }}
                >
                  Create a list
                </Text>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 60,
                    marginTop: height / 40,
                  }}
                >
                  List Type
                </Text>
                <TouchableOpacity
                  //onPress={() => setTypeSwitch(true)}
                  style={[
                    styles.txtView,
                    {
                      borderWidth: emailError !== "" ? 0.3 : 0,
                      borderColor: emailError !== "" ? colors.MAIN : null,

                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: height / 90,
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 60,
                    }}
                  >
                    My favourites
                  </Text>
                  <MaterialIcons
                    size={height / 60}
                    name="keyboard-arrow-down"
                    color={"gray"}
                  />
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 60,
                    marginTop: height / 40,
                  }}
                >
                  List Name
                </Text>
                <View
                  style={[
                    styles.txtView,
                    {
                      borderWidth: emailError !== "" ? 0.3 : 0,
                      borderColor: emailError !== "" ? colors.MAIN : null,

                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: height / 90,
                    },
                  ]}
                >
                  <TextInput
                    placeholder=""
                    placeholderTextColor={theme.colors.secondary}
                    style={[
                      styles.textSize,
                      {
                        backgroundColor: colors.grays,
                      },
                    ]}
                    autoCorrect={false}
                    value={email}
                    onChangeText={(value) => [
                      setEmail(value),
                      setEmailError(""),
                    ]}
                  />
                </View>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 60,
                    marginTop: height / 35,
                  }}
                >
                  Use lists to save items for later. All lists are private
                  unless you share them with others.
                </Text>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => [
                    checkboxPromo == false
                      ? setCheckboxPromo(true)
                      : setCheckboxPromo(false),
                  ]}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 38,
                    marginBottom: 6,
                  }}
                >
                  {checkboxPromo ? (
                    <MaterialCommunityIcons
                      name="square-circle"
                      color={colors.MAIN}
                      size={height / 50}
                    />
                  ) : (
                    <FontAwesome name="square-o" size={height / 45} />
                  )}

                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 60,
                      marginStart: height / 60,
                    }}
                  >
                    Private
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => [
                    checkboxPromo == false
                      ? setCheckboxPromo(true)
                      : setCheckboxPromo(false),
                  ]}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 50,
                    marginBottom: 6,
                  }}
                >
                  {checkboxPromo ? (
                    <MaterialCommunityIcons
                      name="square-circle"
                      color={colors.MAIN}
                      size={height / 50}
                    />
                  ) : (
                    <FontAwesome name="square-o" size={height / 45} />
                  )}

                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 60,
                      marginStart: height / 60,
                    }}
                  >
                    Public
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 8,
                  }}
                  onPress={() => [
                    refRBSheetViewInst.current.close(),
                    //props.navigation.navigate("AddNewAddress"),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 65,
                      color: colors.MAIN,
                      textAlign: "center",
                    }}
                  >
                    Create
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 22,
                  }}
                  onPress={() => [
                    refRBSheetViewInst.current.close(),
                    //props.navigation.navigate("AddressBook"),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 65,
                      color: colors.MAIN,
                      textAlign: "center",
                    }}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </View>

          <ImageBackground
            source={require("../assets/wishlistdock.png")}
            style={styles.bottomMenuMain}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginStart: height / 20,
                marginEnd: height / 20,
                marginTop: height / 35,
              }}
            >
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Home")}
              >
                <Image
                  source={require("../assets/homeicon.png")}
                  style={styles.dockIconStyle}
                />
                <Text
                  style={[
                    styles.textSize,
                    {
                      fontSize: height / 110,
                      paddingTop: 10,
                      fontFamily: "Mediums-Font",
                      textAlign: "center",
                    },
                  ]}
                >
                  Home
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Categories")}
              >
                <Image
                  source={require("../assets/exploreicon.png")}
                  style={styles.dockIconStyle}
                />
                <Text
                  style={[
                    styles.textSize,
                    {
                      fontSize: height / 110,
                      paddingTop: 10,
                      fontFamily: "Mediums-Font",
                      textAlign: "center",
                    },
                  ]}
                >
                  Explore
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Search")}
              >
                <Image
                  source={require("../assets/searchicon.png")}
                  style={styles.dockIconStyle}
                />
                <Text
                  style={[
                    styles.textSize,
                    {
                      fontSize: height / 110,
                      paddingTop: 10,
                      fontFamily: "Mediums-Font",
                      textAlign: "center",
                    },
                  ]}
                >
                  Search
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Wishlist")}
                style={styles.dockIconStyle}
              ></TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Cart")}
              >
                <Image
                  source={require("../assets/cart.png")}
                  style={styles.dockIconStyle}
                />
                <Text
                  style={[
                    styles.textSize,
                    {
                      fontSize: height / 110,
                      paddingTop: 10,
                      fontFamily: "Mediums-Font",
                      textAlign: "center",
                    },
                  ]}
                >
                  Cart
                </Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
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
    dockIconStyle: {
      resizeMode: "contain",
      height: height / 40,
      width: height / 40,
      marginTop: 6,
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
      width: width / 1.34,
      height: height / 5.38,
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
    bestSellerBacks: {
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginTop: 2,
      padding: 10,
      width: height / 12,
      height: height / 12,
    },
    sellerCircle: {
      padding: 30.4,
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
    filterBtnPrice: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: colors.MAIN,
      width: height / 13,
      padding: 3,
      marginStart: 5,
    },
  });
  return { styles };
};
