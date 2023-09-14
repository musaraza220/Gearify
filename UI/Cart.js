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
import { Text, useTheme, ActivityIndicator } from "react-native-paper";
import { colors } from "../assets/colors";
import {
  MaterialCommunityIcons,
  MaterialIcons,
  EvilIcons,
  SimpleLineIcons,
  Entypo,
  Ionicons,
  FontAwesome,
} from "@expo/vector-icons";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
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

export default function Cart(props) {
  const refRBSheet = useRef();

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [searchQry, setSearchQry] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [gLoading, setGLoading] = React.useState(false);
  const [gridView, setGridView] = React.useState(true);
  const [listView, setListView] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(true);
  const [fLoading, setFLoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [showSimilar, setShowSimilar] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const [rating, setRating] = useState(3.5);
  const [qty, setQty] = useState(1);
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
                    justifyContent: "space-between",
                    marginTop: height / 13.3,
                    paddingHorizontal: 20,
                  }}
                >
                  <Text
                    style={[
                      styles.textSize,
                      {
                        color: "white",
                        fontSize: height / 78,
                        fontFamily: "Mediums-Font",
                      },
                    ]}
                  >
                    {loggedIn ? ` ` : ` Guest`}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => refRBSheet.current.open()}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingHorizontal: 20,
                    justifyContent: "space-between",
                    marginTop: -10,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <MaterialIcons
                      name="location-pin"
                      color={"white"}
                      size={height / 70}
                    />
                    <Text
                      style={[
                        styles.textSize,
                        {
                          color: "white",
                          fontSize: height / 80,
                          fontFamily: "Mediums-Font",
                        },
                      ]}
                    >
                      {loggedIn
                        ? ` Deliver to Name - City zip code`
                        : ` Deliver to country`}
                    </Text>
                    <MaterialCommunityIcons
                      name="chevron-down"
                      size={height / 50}
                      color="white"
                    />
                  </View>
                  <View>
                    <MaterialCommunityIcons
                      name="menu"
                      color={"white"}
                      size={height / 25}
                    />
                  </View>
                </TouchableOpacity>
              </ImageBackground>
            </View>
            {/* //////// TOP BUTTONS //////// */}

            <ScrollView showsVerticalScrollIndicator={false}>
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 6,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 50,
                      marginTop: height / 70,
                    }}
                  >
                    Subtotal:{`  `}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 50,
                      marginTop: height / 70,
                    }}
                  >
                    $ {(qty * 51.95).toFixed(2)}
                  </Text>
                </View>
                {/* refRBSheet.current.open() */}
                <TouchableOpacity
                  onPress={() =>
                    loggedIn
                      ? props.navigation.navigate("CheckoutCompleteInfo")
                      : props.navigation.navigate("InAppLogin")
                  }
                  style={{ marginTop: height / 60 }}
                >
                  <ImageBackground
                    source={require("../assets/button.png")}
                    style={styles.checkOutBtn}
                  >
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 50,
                        textAlign: "center",
                        color: "white",
                        marginVertical: 2,
                      }}
                    >
                      Proceed to Checkout (1 item)
                    </Text>
                  </ImageBackground>
                </TouchableOpacity>
                <View style={{ marginTop: height / 170 }}>
                  <View
                    style={{
                      marginTop: height / 70,
                    }}
                  >
                    {/* ////goto product details//// */}
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate("CartProductDetails")
                      }
                    >
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.bestSellerBack}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 50,
                              fontFamily: "GlacialIndifference-Bold",
                            }}
                          >
                            OtterGrip Symmetry Case
                          </Text>
                          <Text
                            style={{
                              fontSize: height / 50,
                              fontFamily: "GlacialIndifference-Regular",
                            }}
                          >
                            Black
                          </Text>
                        </View>

                        <Text
                          style={{
                            fontSize: height / 55,
                            marginTop: 1,
                            fontFamily: "GlacialIndifference-Regular",
                          }}
                        >
                          Otterbox
                        </Text>

                        <View
                          style={{ alignSelf: "center", paddingVertical: 2 }}
                        >
                          <Image
                            source={require("../assets/mobilecase.png")}
                            style={{
                              width: height / 9,
                              height: height / 9,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 52,
                              fontFamily: "GlacialIndifference-Bold",
                            }}
                          >
                            $51.95
                          </Text>
                          <Text
                            style={{
                              fontSize: height / 52,
                              fontFamily: "GlacialIndifference-Regular",
                            }}
                          >
                            iPhone 14
                          </Text>
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: height / 90,
                      }}
                    >
                      <TouchableOpacity>
                        <Image
                          source={require("../assets/deleteBtn.png")}
                          style={styles.sellerButtons}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity>
                        <Image
                          source={require("../assets/saveBtn.png")}
                          style={styles.sellerButtons}
                        />
                      </TouchableOpacity>
                      <View
                        style={[
                          styles.filterBtnPrice,
                          {
                            borderColor: "gray",
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          },
                        ]}
                      >
                        <TouchableOpacity
                          activeOpacity={0.5}
                          disabled={qty > 1 ? false : true}
                          onPress={() => setQty(qty - 1)}
                        >
                          {qty > 1 ? (
                            <MaterialCommunityIcons
                              name="chevron-down"
                              size={height / 50}
                            />
                          ) : (
                            <MaterialCommunityIcons
                              name="delete-outline"
                              size={height / 50}
                            />
                          )}
                        </TouchableOpacity>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 75,
                            textAlign: "center",
                          }}
                        >
                          {qty}
                        </Text>
                        <TouchableOpacity
                          activeOpacity={0.5}
                          onPress={() => setQty(qty + 1)}
                        >
                          <MaterialCommunityIcons
                            name="chevron-up"
                            size={height / 50}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: height / 300,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => [
                          setShowDetails(false),
                          setShowSimilar(true),
                        ]}
                      >
                        {showSimilar ? (
                          <Image
                            source={require("../assets/addsimilar.png")}
                            style={styles.sellerButtonsBottom}
                          />
                        ) : (
                          <Image
                            source={require("../assets/addsimilar1.jpg")}
                            style={styles.sellerButtonsBottom}
                          />
                        )}
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => [
                          setShowDetails(true),
                          setShowSimilar(false),
                        ]}
                      >
                        {showDetails ? (
                          <Image
                            source={require("../assets/viewdetailbtn1.png")}
                            style={styles.sellerButtonsBottom}
                          />
                        ) : (
                          <Image
                            source={require("../assets/viewdetailbtn.png")}
                            style={styles.sellerButtonsBottom}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                    {showDetails ? (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: height / 120,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Mediums-Font",
                              fontSize: height / 75,
                              textAlign: "center",
                            }}
                          >
                            FULL PRODUCT DETAILS
                          </Text>
                          <TouchableOpacity
                            onPress={() => setShowDetails(false)}
                          >
                            <MaterialCommunityIcons name="close" />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  width: 67,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                CATEGORY{`    `}
                              </Text>
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                Electronics
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                MATERIAL{`    `}
                              </Text>
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                Carbon Fiber
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                SUBCATEGORY{`    `}
                              </Text>
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                Mobile Phone Accessories
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  width: 44,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                RATING{`    `}
                              </Text>
                              <StarRating
                                rating={rating}
                                onChange={setRating}
                                starSize={height / 60}
                                color={colors.MAIN}
                                style={{
                                  marginStart: height / 80,
                                  marginEnd: -6,
                                }}
                                maxStars={5}
                                starStyle={{
                                  padding: 0,
                                  margin: 0,
                                  marginStart: -height / 91,
                                }}
                              />
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  width: 67,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                COLOR{`    `}
                              </Text>
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                Black
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              flexDirection: "row",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
                            >
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  width: 63,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                SIZE{`    `}
                              </Text>
                              <Text
                                style={{
                                  fontSize: height / 75,
                                  fontFamily: "GlacialIndifference-Regular",
                                }}
                              >
                                Pro Max
                              </Text>
                            </View>
                          </View>
                        </View>

                        <View
                          style={{
                            alignSelf: "center",
                            height: 1,
                            width: "100%",
                            backgroundColor: "lightgray",
                            margin: 10,
                            opacity: 0.5,
                            marginVertical: 20,
                          }}
                        ></View>
                      </View>
                    ) : null}
                    {showSimilar ? (
                      <View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: height / 120,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "Mediums-Font",
                              fontSize: height / 75,
                              textAlign: "center",
                            }}
                          ></Text>
                          <TouchableOpacity
                            onPress={() => setShowSimilar(false)}
                          >
                            <MaterialCommunityIcons name="close" />
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginTop: 5,
                          }}
                        >
                          <View
                            style={{
                              marginTop: 2,
                              flexDirection: "row",
                              justifyContent: "space-between",
                            }}
                          >
                            <View style={{}}>
                              <LinearGradient
                                colors={["#ffffff", "lightgray"]}
                                style={styles.infoStyles}
                              ></LinearGradient>
                              <View style={{ marginTop: height / 160 }}>
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
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  BRAND NAME
                                </Text>

                                <Text
                                  style={{
                                    fontSize: height / 55,
                                    marginTop: 1,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  Product Name
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  CATEGORY
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  MATERIAL
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  COLOR
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  SIZE
                                </Text>
                                <StarRating
                                  rating={rating}
                                  onChange={setRating}
                                  starSize={height / 60}
                                  color={colors.MAIN}
                                  style={{
                                    marginStart: height / 80,
                                    marginEnd: -6,
                                    marginTop: 3,
                                  }}
                                  maxStars={5}
                                  starStyle={{
                                    padding: 0,
                                    margin: 0,
                                    marginStart: -height / 200,
                                  }}
                                />
                                <View
                                  style={[
                                    styles.filterBtnPrice,
                                    {
                                      borderColor: "gray",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: height / 9,
                                      marginVertical: height / 130,
                                    },
                                  ]}
                                >
                                  <MaterialCommunityIcons
                                    name="chevron-up"
                                    size={height / 50}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: "GlacialIndifference-Regular",
                                      fontSize: height / 75,
                                      textAlign: "center",
                                    }}
                                  >
                                    10
                                  </Text>
                                  <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={height / 50}
                                  />
                                </View>
                              </View>
                              <TouchableOpacity>
                                <Image
                                  source={require("../assets/addtocartcolor.png")}
                                  style={styles.freqButtons}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                width: 1,
                                backgroundColor: "lightgray",
                                marginHorizontal: height / 75,
                                opacity: 0.5,
                              }}
                            ></View>
                            <View style={{}}>
                              <LinearGradient
                                colors={["#ffffff", "lightgray"]}
                                style={styles.infoStyles}
                              ></LinearGradient>
                              <View style={{ marginTop: height / 160 }}>
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
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  BRAND NAME
                                </Text>

                                <Text
                                  style={{
                                    fontSize: height / 55,
                                    marginTop: 1,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  Product Name
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  CATEGORY
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  MATERIAL
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  COLOR
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  SIZE
                                </Text>
                                <StarRating
                                  rating={rating}
                                  onChange={setRating}
                                  starSize={height / 60}
                                  color={colors.MAIN}
                                  style={{
                                    marginStart: height / 80,
                                    marginEnd: -6,
                                    marginTop: 3,
                                  }}
                                  maxStars={5}
                                  starStyle={{
                                    padding: 0,
                                    margin: 0,
                                    marginStart: -height / 200,
                                  }}
                                />
                                <View
                                  style={[
                                    styles.filterBtnPrice,
                                    {
                                      borderColor: "gray",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: height / 9,
                                      marginVertical: height / 130,
                                    },
                                  ]}
                                >
                                  <MaterialCommunityIcons
                                    name="chevron-up"
                                    size={height / 50}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: "GlacialIndifference-Regular",
                                      fontSize: height / 75,
                                      textAlign: "center",
                                    }}
                                  >
                                    10
                                  </Text>
                                  <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={height / 50}
                                  />
                                </View>
                              </View>
                              <TouchableOpacity>
                                <Image
                                  source={require("../assets/addtocartcolor.png")}
                                  style={styles.freqButtons}
                                />
                              </TouchableOpacity>
                            </View>
                            <View
                              style={{
                                width: 1,
                                backgroundColor: "lightgray",
                                marginHorizontal: height / 75,
                                opacity: 0.5,
                              }}
                            ></View>

                            <View style={{}}>
                              <LinearGradient
                                colors={["#ffffff", "lightgray"]}
                                style={styles.infoStyles}
                              ></LinearGradient>
                              <View style={{ marginTop: height / 160 }}>
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
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  BRAND NAME
                                </Text>

                                <Text
                                  style={{
                                    fontSize: height / 55,
                                    marginTop: 1,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  Product Name
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  CATEGORY
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  MATERIAL
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  COLOR
                                </Text>
                                <Text
                                  style={{
                                    fontSize: height / 90,
                                    fontFamily: "GlacialIndifference-Regular",
                                  }}
                                >
                                  SIZE
                                </Text>
                                <StarRating
                                  rating={rating}
                                  onChange={setRating}
                                  starSize={height / 60}
                                  color={colors.MAIN}
                                  style={{
                                    marginStart: height / 80,
                                    marginEnd: -6,
                                    marginTop: 3,
                                  }}
                                  maxStars={5}
                                  starStyle={{
                                    padding: 0,
                                    margin: 0,
                                    marginStart: -height / 200,
                                  }}
                                />
                                <View
                                  style={[
                                    styles.filterBtnPrice,
                                    {
                                      borderColor: "gray",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                      width: height / 9,
                                      marginVertical: height / 130,
                                    },
                                  ]}
                                >
                                  <MaterialCommunityIcons
                                    name="chevron-up"
                                    size={height / 50}
                                  />
                                  <Text
                                    style={{
                                      fontFamily: "GlacialIndifference-Regular",
                                      fontSize: height / 75,
                                      textAlign: "center",
                                    }}
                                  >
                                    10
                                  </Text>
                                  <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={height / 50}
                                  />
                                </View>
                              </View>
                              <TouchableOpacity>
                                <Image
                                  source={require("../assets/addtocartcolor.png")}
                                  style={styles.freqButtons}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </View>
              </View>
            </ScrollView>
            <RBSheet
              ref={refRBSheet}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 3}
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
                  Choose your location
                </Text>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 70,
                  }}
                >
                  Delivery options and delivery speeds may vary for different
                  locations
                </Text>

                {loggedIn ? (
                  <View
                    style={{
                      marginTop: height / 50,
                      alignItems: "center",
                      flexDirection: "row",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.MAIN,
                        justifyContent: "center",
                        width: height / 8,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 70,
                        }}
                      >
                        Name
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: 2,
                        }}
                      >
                        Address
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: 2,
                        }}
                      >
                        City, Zipcode
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: height / 40,
                        }}
                      >
                        Default address
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        props.navigation.navigate("AddressBook"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: "lightgray",
                        justifyContent: "center",
                        width: height / 8,
                        padding: 10,
                        marginStart: height / 70,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 70,
                          color: colors.MAIN,
                          paddingVertical: height / 31,
                          textAlign: "center",
                        }}
                      >
                        Manage Address Book
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    onPress={() => [
                      props.navigation.navigate("InAppLogin"),
                      refRBSheet.current.close(),
                    ]}
                    style={{ marginTop: height / 60 }}
                  >
                    <ImageBackground
                      source={require("../assets/topbar.png")}
                      style={[
                        styles.checkOutBtn,
                        { borderRadius: 4, paddingVertical: height / 120 },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 50,
                          textAlign: "center",
                          color: "white",
                          marginVertical: 2,
                        }}
                      >
                        Sign in to see your addresses
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                )}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 60,
                  }}
                >
                  <MaterialIcons
                    name="location-pin"
                    color={colors.MAIN}
                    size={height / 70}
                  />
                  <Text
                    style={[
                      styles.textSize,
                      {
                        color: colors.MAIN,
                        fontSize: height / 70,
                        fontFamily: "Mediums-Font",
                      },
                    ]}
                  >
                    {`  `}Enter Canada zip code
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={height / 50}
                    color="white"
                  />
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 90,
                  }}
                >
                  <Ionicons
                    name="globe"
                    color={colors.MAIN}
                    size={height / 70}
                  />
                  <Text
                    style={[
                      styles.textSize,
                      {
                        color: colors.MAIN,
                        fontSize: height / 70,
                        fontFamily: "Mediums-Font",
                      },
                    ]}
                  >
                    {`  `}Ship outside Canada
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    size={height / 50}
                    color="white"
                  />
                </View>
              </View>
            </RBSheet>
          </View>

          <ImageBackground
            source={require("../assets/cartdock.png")}
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
              >
                <Image
                  source={require("../assets/whishlisticon.png")}
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
                  Wishlist
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Cart")}
                style={styles.dockIconStyle}
              ></TouchableOpacity>
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
      padding: 7,
      marginTop: height / 30,
      borderWidth: 0.4,
    },
    txtView1: {
      padding: 8,
      marginTop: height / 30,
      borderWidth: 0.4,
      height: height / 23,
    },
    btnStyles: {
      padding: 8,

      width: width / 1.1,
      overflow: "hidden",
      resizeMode: "contain",
      borderRadius: 2,
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
    checkOutBtn: {
      paddingVertical: 1,
      overflow: "hidden",
      resizeMode: "contain",
      borderRadius: 10,
      justifyContent: "center",
      width: width / 1.5,
      alignSelf: "center",
    },
    textSize: {
      fontSize: height / 70,
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
      width: width / 3.6,

      marginEnd: 8,
    },
    textSizeCatBtn: {
      fontSize: height / 58,
      fontFamily: "GlacialIndifference-Regular",
      textAlign: "center",
    },

    bestSellerBack: {
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginTop: 2,
      paddingHorizontal: height / 45,
      paddingVertical: height / 90,
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
      width: width / 3.5,
      height: height / 35,
      resizeMode: "contain",
      marginEnd: 10,
    },
    sellerButtonsBottom: {
      width: width / 2.3,
      height: height / 25,
      resizeMode: "contain",
    },

    bestSellerBackList: {
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginBottom: height / 80,
      padding: 10,
    },

    freqButtons: {
      width: width / 4,
      height: height / 25,
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
      padding: 9.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      opacity: 0.9,
      width: width / 5,
      justifyContent: "center",
      alignItems: "center",
    },
    infoStyles: {
      padding: 9.4,
      borderRadius: 3,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
      opacity: 0.9,
      width: width / 4,
      height: height / 9,
      justifyContent: "center",
      alignItems: "center",
    },
    filterBtn: {
      borderRadius: 2,
      borderWidth: 0.7,
      borderColor: colors.MAIN,
      marginEnd: 10,
      marginTop: 8,
      padding: 10,
      paddingVertical: 7,
      width: height / 7.83,
    },
    filterBtnPrice: {
      borderRadius: 4,
      borderWidth: 0.5,
      borderColor: colors.MAIN,
      width: height / 8.4,
      padding: 3,
    },
    filterBtnColor: {
      borderRadius: 2,
      borderWidth: 0.7,
      borderColor: colors.MAIN,
      paddingHorizontal: 10,
      marginEnd: 5,
      marginTop: 2,
      width: height / 10,
      flexDirection: "row",
      alignItems: "center",
    },
    filterBtnRating: {
      borderRadius: 2,
      borderWidth: 0.7,
      borderColor: colors.MAIN,
      paddingHorizontal: 10,
      marginEnd: 5,
      marginTop: 2,
      flexDirection: "row",
      alignItems: "center",
    },
    colorBox: {
      borderRadius: 3,
      backgroundColor: "black",
      height: height / 50,
      width: width / 25,
    },
  });
  return { styles };
};
