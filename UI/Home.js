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
            {/* //////// TOP BUTTONS //////// */}
            <ScrollView
              style={{ marginHorizontal: height / 37, height: height / 12 }}
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
                  <Text style={styles.textSizeCatBtn}>Items under $10</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.catBtnStyle}>
                  <Text style={styles.textSizeCatBtn}>Items under $20</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.catBtnStyle}>
                  <Text style={styles.textSizeCatBtn}>New Products</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* /////Best seller///// */}
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
              {/* /////Deal of day///// */}
              <View style={{ marginHorizontal: height / 37, marginTop: 4 }}>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Deal of the Day
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      marginTop: 5,
                      width: width / 2.4,
                    }}
                  >
                    <View style={styles.dealCircle}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{ height: 80, width: 80, resizeMode: "contain" }}
                      />
                    </View>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.dealOfDayBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            marginTop: height / 11.4,
                            fontFamily: "GlacialIndifference-Bold",
                          }}
                        >
                          $51.95
                        </Text>
                        <View
                          style={{
                            position: "absolute",
                            right: -width / 9,
                            bottom: 2,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 90,
                              marginTop: height / 11.3,
                              fontFamily: "GlacialIndifference-Regular",
                              color: colors.MAIN,
                            }}
                          >
                            30% OFF
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        Short Product Name
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: height / 88,
                        }}
                      >
                        <TouchableOpacity>
                          <Image
                            source={require("../assets/addtocartcircle.png")}
                            style={styles.sellerButtons}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginStart: height / 30 }}>
                          <Image
                            source={require("../assets/buynowcircle.png")}
                            style={styles.sellerButtons}
                          />
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      width: width / 2.4,
                    }}
                  >
                    <View style={styles.dealCircle}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{ height: 80, width: 80, resizeMode: "contain" }}
                      />
                    </View>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.dealOfDayBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            marginTop: height / 11.4,
                            fontFamily: "GlacialIndifference-Bold",
                          }}
                        >
                          $51.95
                        </Text>
                        <View
                          style={{
                            position: "absolute",
                            right: -width / 9,
                            bottom: 2,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 90,
                              marginTop: height / 11.3,
                              fontFamily: "GlacialIndifference-Regular",
                              color: colors.MAIN,
                            }}
                          >
                            30% OFF
                          </Text>
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        Short Product Name
                      </Text>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: height / 88,
                        }}
                      >
                        <TouchableOpacity>
                          <Image
                            source={require("../assets/addtocartcircle.png")}
                            style={styles.sellerButtons}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity style={{ marginStart: height / 30 }}>
                          <Image
                            source={require("../assets/buynowcircle.png")}
                            style={styles.sellerButtons}
                          />
                        </TouchableOpacity>
                      </View>
                    </LinearGradient>
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 100,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
              </View>
              {/* //////// Whishlist ////// */}
              <View style={{ marginHorizontal: height / 37, marginTop: 4 }}>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Wishlist
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.whishlistBack}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ alignItems: "center", width: width / 3.9 }}
                      >
                        <View style={styles.whishListCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
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
                            fontSize: height / 55,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 5,
                            textAlign: "center",
                          }}
                        >
                          Short Product Name
                        </Text>
                      </View>

                      <View
                        style={{ alignItems: "center", width: width / 3.9 }}
                      >
                        <View style={styles.whishListCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
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
                            fontSize: height / 55,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 5,
                            textAlign: "center",
                          }}
                        >
                          Short Product Name
                        </Text>
                      </View>

                      <View
                        style={{ alignItems: "center", width: width / 3.9 }}
                      >
                        <View style={styles.whishListCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
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
                            fontSize: height / 55,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 5,
                            textAlign: "center",
                          }}
                        >
                          Short Product Name
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 80,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
              </View>
              {/* //////// Popular item //////// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Popular items this season
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.whishlistBack}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: height / 50,
                      }}
                    >
                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 80,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
              </View>
              {/* /////Recommanded///// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Recommended
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      marginTop: 5,
                      width: width / 2.4,
                    }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.recommendBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={styles.recomandircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: height / 55,
                          marginTop: height / 90,
                          fontFamily: "GlacialIndifference-Bold",
                        }}
                      >
                        $79.95
                      </Text>
                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        Short Product Name
                      </Text>
                    </LinearGradient>
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      width: width / 2.4,
                    }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.recommendBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={styles.recomandircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: height / 55,
                          marginTop: height / 90,
                          fontFamily: "GlacialIndifference-Bold",
                        }}
                      >
                        $79.95
                      </Text>
                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        Short Product Name
                      </Text>
                    </LinearGradient>
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 100,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
              </View>
              {/* //////// under $10 //////// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Items under $10
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.whishlistBack}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: height / 50,
                      }}
                    >
                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>

                      <View
                        style={{ alignItems: "center", width: width / 2.5 }}
                      >
                        <View style={styles.popularCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 80,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
              </View>
              {/* //////// top categories //////// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 4,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Top Categories
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 5,
                  }}
                >
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.whishlistBack}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <View style={styles.catCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: height / 70,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 8,
                            textAlign: "center",
                          }}
                        >
                          CATEGORY
                        </Text>
                      </View>

                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <View style={styles.catCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: height / 70,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 8,
                            textAlign: "center",
                          }}
                        >
                          CATEGORY
                        </Text>
                      </View>
                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <View style={styles.catCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: height / 70,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 8,
                            textAlign: "center",
                          }}
                        >
                          CATEGORY
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: height / 60,
                      }}
                    >
                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <View style={styles.catCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: height / 70,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 8,
                            textAlign: "center",
                          }}
                        >
                          CATEGORY
                        </Text>
                      </View>

                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <View style={styles.catCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: height / 70,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 8,
                            textAlign: "center",
                          }}
                        >
                          CATEGORY
                        </Text>
                      </View>
                      <View style={{ alignItems: "center", width: width / 4 }}>
                        <View style={styles.catCircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                        <Text
                          style={{
                            fontSize: height / 70,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 8,
                            textAlign: "center",
                          }}
                        >
                          CATEGORY
                        </Text>
                      </View>
                    </View>
                  </LinearGradient>
                </View>
                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 80,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
              </View>
              {/* /////Buy Again///// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 4,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Buy Again
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View
                    style={{
                      marginTop: 5,
                      width: width / 2.4,
                    }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.recommendBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={styles.recomandircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: height / 55,
                          marginTop: height / 90,
                          fontFamily: "GlacialIndifference-Bold",
                        }}
                      >
                        $79.95
                      </Text>
                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        Short Product Name
                      </Text>
                    </LinearGradient>
                  </View>

                  <View
                    style={{
                      marginTop: 5,
                      width: width / 2.4,
                    }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.recommendBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={styles.recomandircle}>
                          <Image
                            source={require("../assets/product.png")}
                            style={{
                              height: 80,
                              width: 80,
                              resizeMode: "contain",
                            }}
                          />
                        </View>
                      </View>
                      <Text
                        style={{
                          fontSize: height / 55,
                          marginTop: height / 90,
                          fontFamily: "GlacialIndifference-Bold",
                        }}
                      >
                        $79.95
                      </Text>
                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        Short Product Name
                      </Text>
                    </LinearGradient>
                  </View>
                </View>

                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 100,
                    marginEnd: 4,
                  }}
                >
                  <Text style={[styles.textSize, { fontSize: height / 90 }]}>
                    VIEW ALL
                  </Text>
                </View>
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
  });
  return { styles };
};
