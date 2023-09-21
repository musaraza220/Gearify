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
import StarRating from "react-native-star-rating-widget";

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function Wishlist(props) {
  const [email, setEmail] = React.useState("");
  const [rating, setRating] = useState(3.5);

  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [qty, setQty] = React.useState(1);
  const [gLoading, setGLoading] = React.useState(false);
  const [listView, setListView] = React.useState(true);
  const [gridView, setGridView] = React.useState(false);
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

                  <TouchableOpacity
                    onPress={() => props.navigation.navigate("ViewLists")}
                    style={{ flexDirection: "row" }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 70,
                      }}
                    >
                      View Lists{`    `}
                    </Text>
                    <MaterialCommunityIcons
                      name="dots-horizontal"
                      color={"black"}
                      size={height / 50}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginVertical: height / 90,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 47,
                        paddingStart: height / 90,
                      }}
                    ></Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => [setGridView(true), setListView(false)]}
                      activeOpacity={0.6}
                    >
                      {gridView ? (
                        <Image
                          source={require("../assets/gridview1.png")}
                          style={{
                            resizeMode: "contain",
                            height: height / 52,
                            width: width / 22,
                            marginTop: 2,
                          }}
                        />
                      ) : (
                        <Image
                          source={require("../assets/gridview.png")}
                          style={{
                            resizeMode: "contain",
                            height: height / 52,
                            width: width / 22,
                            marginTop: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => [setGridView(false), setListView(true)]}
                      activeOpacity={0.6}
                      style={{ paddingStart: height / 40 }}
                    >
                      {listView ? (
                        <Image
                          source={require("../assets/listview1.png")}
                          style={{
                            resizeMode: "contain",
                            height: height / 52,
                            width: width / 22,
                            marginTop: 2,
                          }}
                        />
                      ) : (
                        <Image
                          source={require("../assets/listview.png")}
                          style={{
                            resizeMode: "contain",
                            height: height / 52,
                            width: width / 22,
                            marginTop: 2,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 1,
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

                    {/* <Text
                      style={{
                        fontSize: height / 80,
                        marginTop: 7,
                        fontFamily: "GlacialIndifference-Regular",
                      }}
                    >
                      BRAND NAME
                    </Text> */}
                    <Text
                      style={{
                        fontSize: height / 50,
                        fontFamily: "GlacialIndifference-Regular",
                      }}
                    >
                      Product Name
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: height / 45,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: height / 90,
                          paddingVertical: height / 150,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: colors.MAIN,
                          borderRadius: 5,
                          marginEnd: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                          }}
                        >
                          DELETE
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: height / 100,
                          paddingVertical: height / 150,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: colors.MAIN,
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                          }}
                        >
                          COMPARE
                        </Text>
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
                        alignItems: "center",
                        marginTop: height / 85,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: height / 53,
                          paddingVertical: height / 150,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: colors.MAIN,
                          borderRadius: 5,
                          marginEnd: 4,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                          }}
                        >
                          MOVE TO CART
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          paddingHorizontal: height / 54,
                          paddingVertical: height / 150,
                          backgroundColor: "white",
                          borderWidth: 1,
                          borderColor: colors.MAIN,
                          borderRadius: 5,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                          }}
                        >
                          ADD SIMILAR
                        </Text>
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
                    marginTop: height / 5.1,
                    marginEnd: 4,
                  }}
                >
                  <Text
                    style={[styles.textSize, { fontSize: height / 90 }]}
                  ></Text>
                </View>
              </View>

              {/* /////inspired by///// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 2,
                  paddingBottom: 1,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Inspired by your list
                </Text>

                <View
                  style={{
                    marginTop: 3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ProductDetailsWishlist")
                    }
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.bestSellerBacks}
                    >
                      <Text
                        style={{
                          fontSize: height / 80,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        BRAND NAME
                      </Text>
                      <View
                        style={{
                          padding: 2,
                          alignSelf: "center",
                          marginVertical: 20,
                        }}
                      >
                        <Image
                          source={require("../assets/mobilecase.png")}
                          style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            fontFamily: "Mediums-Font",
                          }}
                        >
                          $51.95
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginStart: height / 24.5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "Mediums-Font",
                            }}
                          >
                            {rating}
                          </Text>
                          <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={height / 60}
                            style={{ marginStart: height / 80 }}
                            color={colors.MAIN}
                            maxStars={5}
                            starStyle={{
                              padding: 0,
                              margin: 0,
                              marginStart: -height / 100,
                            }}
                          />
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "Mediums-Font",
                          marginVertical: 4,
                        }}
                      >
                        Short Product Name
                      </Text>

                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: height / 90,
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
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ProductDetailsWishlist")
                    }
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.bestSellerBacks}
                    >
                      <Text
                        style={{
                          fontSize: height / 80,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        BRAND NAME
                      </Text>
                      <View
                        style={{
                          padding: 2,
                          alignSelf: "center",
                          marginVertical: 20,
                        }}
                      >
                        <Image
                          source={require("../assets/mobilecase.png")}
                          style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            fontFamily: "Mediums-Font",
                          }}
                        >
                          $51.95
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginStart: height / 24.5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "Mediums-Font",
                            }}
                          >
                            {rating}
                          </Text>
                          <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={height / 60}
                            style={{ marginStart: height / 80 }}
                            color={colors.MAIN}
                            maxStars={5}
                            starStyle={{
                              padding: 0,
                              margin: 0,
                              marginStart: -height / 100,
                            }}
                          />
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "Mediums-Font",
                          marginVertical: 4,
                        }}
                      >
                        Short Product Name
                      </Text>

                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: height / 90,
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
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 100,
                    marginEnd: 4,
                  }}
                >
                  <Text
                    style={[styles.textSize, { fontSize: height / 90 }]}
                  ></Text>
                </View>
              </View>

              {/* /////later///// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: -2,
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 47,
                  }}
                >
                  Saved for later (30 items)
                </Text>

                <View
                  style={{
                    marginTop: 3,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ProductDetailsWishlist")
                    }
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.bestSellerBacks}
                    >
                      <Text
                        style={{
                          fontSize: height / 80,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        BRAND NAME
                      </Text>
                      <View
                        style={{
                          padding: 2,
                          alignSelf: "center",
                          marginVertical: 20,
                        }}
                      >
                        <Image
                          source={require("../assets/mobilecase.png")}
                          style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            fontFamily: "Mediums-Font",
                          }}
                        >
                          $51.95
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginStart: height / 24.5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "Mediums-Font",
                            }}
                          >
                            {rating}
                          </Text>
                          <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={height / 60}
                            style={{ marginStart: height / 80 }}
                            color={colors.MAIN}
                            maxStars={5}
                            starStyle={{
                              padding: 0,
                              margin: 0,
                              marginStart: -height / 100,
                            }}
                          />
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "Mediums-Font",
                          marginVertical: 4,
                        }}
                      >
                        Short Product Name
                      </Text>

                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: height / 90,
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
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() =>
                      props.navigation.navigate("ProductDetailsWishlist")
                    }
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.bestSellerBacks}
                    >
                      <Text
                        style={{
                          fontSize: height / 80,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        BRAND NAME
                      </Text>
                      <View
                        style={{
                          padding: 2,
                          alignSelf: "center",
                          marginVertical: 20,
                        }}
                      >
                        <Image
                          source={require("../assets/mobilecase.png")}
                          style={{
                            height: 80,
                            width: 80,
                            resizeMode: "contain",
                          }}
                        />
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: height / 55,
                            fontFamily: "Mediums-Font",
                          }}
                        >
                          $51.95
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            marginStart: height / 24.5,
                          }}
                        >
                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "Mediums-Font",
                            }}
                          >
                            {rating}
                          </Text>
                          <StarRating
                            rating={rating}
                            onChange={setRating}
                            starSize={height / 60}
                            style={{ marginStart: height / 80 }}
                            color={colors.MAIN}
                            maxStars={5}
                            starStyle={{
                              padding: 0,
                              margin: 0,
                              marginStart: -height / 100,
                            }}
                          />
                        </View>
                      </View>

                      <Text
                        style={{
                          fontSize: height / 55,
                          fontFamily: "Mediums-Font",
                          marginVertical: 4,
                        }}
                      >
                        Short Product Name
                      </Text>

                      <TouchableOpacity
                        style={{
                          position: "absolute",
                          top: height / 90,
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
                    </LinearGradient>
                  </TouchableOpacity>
                </View>

                <View
                  style={{
                    alignSelf: "flex-end",
                    marginTop: height / 100,
                    marginEnd: 4,
                  }}
                >
                  <Text
                    style={[styles.textSize, { fontSize: height / 90 }]}
                  ></Text>
                </View>
              </View>
            </ScrollView>
          </View>
          <ImageBackground
            source={require("../assets/wishlistdock.png")}
            style={[
              styles.bottomMenuMain,
              { backgroundColor: "rgba(0,0,0,0.05)" },
            ]}
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
      width: height / 5.1,
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
