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
} from "@expo/vector-icons";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import RBSheet from "react-native-raw-bottom-sheet";

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

export default function Products(props) {
  const refRBSheetViewInst = useRef();
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [gLoading, setGLoading] = React.useState(false);
  const [gridView, setGridView] = React.useState(true);
  const [listView, setListView] = React.useState(false);
  const [aLoading, setALoading] = React.useState(false);
  const [fLoading, setFLoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const [rating, setRating] = useState(3.5);
  const [user, setUser] = useState({});
  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();
  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/AvenirNextCondensed.ttf"),
    "GlacialIndifference-Bold": require("../assets/GlacialIndifference-Bold.otf"),
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

            <View
              style={{
                marginHorizontal: height / 37,
                paddingVertical: height / 90,
              }}
            >
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
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
              </ScrollView>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* /////Best seller///// */}
              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: 4,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                      <Image
                        source={require("../assets/back.png")}
                        style={{
                          resizeMode: "contain",
                          height: height / 50,
                          width: width / 22,
                          marginTop: 2,
                        }}
                      />
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 47,
                        paddingStart: height / 90,
                      }}
                    >
                      Results
                    </Text>
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

                    <TouchableOpacity
                      onPress={() => props.navigation.navigate("Filters")}
                      style={{
                        paddingStart: height / 40,
                      }}
                    >
                      <MaterialCommunityIcons
                        name="filter"
                        size={height / 45}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                {gridView ? (
                  <View>
                    <View
                      style={{
                        marginTop: 3,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          props.navigation.navigate("ProductDetails")
                        }
                      >
                        <LinearGradient
                          colors={["#ffffff", "lightgray"]}
                          style={styles.bestSellerBack}
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
                              marginVertical: 10,
                            }}
                          >
                            <Image
                              source={require("../assets/product.png")}
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

                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "GlacialIndifference-Regular",
                            }}
                          >
                            Type
                          </Text>
                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "GlacialIndifference-Regular",
                              marginTop: 2,
                            }}
                          >
                            Category
                          </Text>
                          <Text
                            style={{
                              fontSize: height / 80,
                              fontFamily: "GlacialIndifference-Regular",
                              marginTop: 2,
                            }}
                          >
                            Discount
                          </Text>
                          <TouchableOpacity
                            onPress={() => refRBSheetViewInst.current.open()}
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

                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.bestSellerBack}
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
                            marginVertical: 10,
                          }}
                        >
                          <Image
                            source={require("../assets/product.png")}
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

                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                          }}
                        >
                          Type
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 2,
                          }}
                        >
                          Category
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 2,
                          }}
                        >
                          Discount
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
                    </View>
                    <View
                      style={{
                        marginTop: height / 70,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.bestSellerBack}
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
                            marginVertical: 10,
                          }}
                        >
                          <Image
                            source={require("../assets/product.png")}
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
                              maxStars={5}
                              color={colors.MAIN}
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

                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                          }}
                        >
                          Type
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 2,
                          }}
                        >
                          Category
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 2,
                          }}
                        >
                          Discount
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

                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.bestSellerBack}
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
                            marginVertical: 10,
                          }}
                        >
                          <Image
                            source={require("../assets/product.png")}
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
                              color={colors.MAIN}
                              style={{ marginStart: height / 80 }}
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

                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                          }}
                        >
                          Type
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 2,
                          }}
                        >
                          Category
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 80,
                            fontFamily: "GlacialIndifference-Regular",
                            marginTop: 2,
                          }}
                        >
                          Discount
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
                    </View>
                  </View>
                ) : (
                  <View>
                    <View
                      style={{
                        marginTop: 3,
                        justifyContent: "space-between",
                      }}
                    >
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.bestSellerBackList}
                      >
                        <Text
                          style={{
                            fontSize: height / 60,
                            fontFamily: "GlacialIndifference-Regular",
                          }}
                        >
                          BRAND NAME
                        </Text>

                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              padding: 2,
                              marginVertical: 10,
                              paddingHorizontal: 30,
                            }}
                          >
                            <Image
                              source={require("../assets/product.png")}
                              style={{
                                height: 80,
                                width: 80,
                                resizeMode: "contain",
                              }}
                            />
                          </View>

                          <View style={{ width: width / 2 }}>
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
                                  marginStart: height / 12,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: height / 70,
                                    fontFamily: "Mediums-Font",
                                  }}
                                >
                                  {rating}
                                </Text>
                                <StarRating
                                  rating={rating}
                                  onChange={setRating}
                                  starSize={height / 60}
                                  color={colors.MAIN}
                                  style={{ marginStart: height / 80 }}
                                  maxStars={5}
                                  starStyle={{
                                    padding: 0,
                                    margin: 0,
                                    marginStart: -height / 90,
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

                            <Text
                              style={{
                                fontSize: height / 70,
                                fontFamily: "GlacialIndifference-Regular",
                              }}
                            >
                              Type
                            </Text>
                            <Text
                              style={{
                                fontSize: height / 70,
                                fontFamily: "GlacialIndifference-Regular",
                                marginTop: 2,
                              }}
                            >
                              Category
                            </Text>
                            <Text
                              style={{
                                fontSize: height / 70,
                                fontFamily: "GlacialIndifference-Regular",
                                marginTop: 2,
                              }}
                            >
                              Discount
                            </Text>
                            <TouchableOpacity
                              style={{
                                position: "absolute",
                                bottom: 2,
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
                          </View>
                        </View>
                      </LinearGradient>

                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.bestSellerBackList}
                      >
                        <Text
                          style={{
                            fontSize: height / 60,
                            fontFamily: "GlacialIndifference-Regular",
                          }}
                        >
                          BRAND NAME
                        </Text>

                        <View style={{ flexDirection: "row" }}>
                          <View
                            style={{
                              padding: 2,
                              marginVertical: 10,
                              paddingHorizontal: 30,
                            }}
                          >
                            <Image
                              source={require("../assets/product.png")}
                              style={{
                                height: 80,
                                width: 80,
                                resizeMode: "contain",
                              }}
                            />
                          </View>

                          <View style={{ width: width / 2 }}>
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
                                  marginStart: height / 12,
                                }}
                              >
                                <Text
                                  style={{
                                    fontSize: height / 70,
                                    fontFamily: "Mediums-Font",
                                  }}
                                >
                                  {rating}
                                </Text>
                                <StarRating
                                  rating={rating}
                                  onChange={setRating}
                                  color={colors.MAIN}
                                  starSize={height / 60}
                                  style={{ marginStart: height / 80 }}
                                  maxStars={5}
                                  starStyle={{
                                    padding: 0,
                                    margin: 0,
                                    marginStart: -height / 90,
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

                            <Text
                              style={{
                                fontSize: height / 70,
                                fontFamily: "GlacialIndifference-Regular",
                              }}
                            >
                              Type
                            </Text>
                            <Text
                              style={{
                                fontSize: height / 70,
                                fontFamily: "GlacialIndifference-Regular",
                                marginTop: 2,
                              }}
                            >
                              Category
                            </Text>
                            <Text
                              style={{
                                fontSize: height / 70,
                                fontFamily: "GlacialIndifference-Regular",
                                marginTop: 2,
                              }}
                            >
                              Discount
                            </Text>
                            <TouchableOpacity
                              style={{
                                position: "absolute",
                                bottom: 2,
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
                          </View>
                        </View>
                      </LinearGradient>
                    </View>
                  </View>
                )}
              </View>
              {/* /////Deal of day///// */}
            </ScrollView>
            <RBSheet
              ref={refRBSheetViewInst}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 3.8}
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
                  Add to list
                </Text>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 60,
                    marginTop: height / 40,
                  }}
                >
                  Select List
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

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 8,
                  }}
                  onPress={() => [
                    refRBSheetViewInst.current.close(),
                    alert("Add successfully"),
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
                    Add
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
            source={require("../assets/sarchdock.png")}
            style={[styles.bottomMenuMain, { padding: 1 }]}
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
                style={styles.dockIconStyle}
              ></TouchableOpacity>
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
      padding: 10,
      width: height / 5.1,
    },

    bestSellerBackList: {
      borderWidth: 0.2,
      borderRadius: 4,
      borderColor: "gray",
      marginBottom: height / 80,
      padding: 10,
    },
    sellerCircle: {
      padding: 34.4,
      borderRadius: 100,
      backgroundColor: "white",
      borderWidth: 0.2,
      borderColor: "gray",
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
