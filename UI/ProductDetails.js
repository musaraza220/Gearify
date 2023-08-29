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
  SimpleLineIcons,
  Entypo,
  Ionicons,
} from "@expo/vector-icons";
import { appleAuth } from "@invertase/react-native-apple-authentication";
import Collapsible from "react-native-collapsible";

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

export default function ProductDetails(props) {
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
                    <TouchableOpacity onPress={() => props.navigation.goBack()}>
                      <Image
                        source={require("../assets/backwhite.png")}
                        style={{
                          resizeMode: "contain",
                          height: height / 42,
                          width: width / 19,
                          marginStart: 2,
                        }}
                      />
                    </TouchableOpacity>
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
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 50,
                      marginTop: height / 70,
                    }}
                  >
                    Product Name
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: height / 70,
                        fontFamily: "GlacialIndifference-Regular",
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
                    <Text
                      style={{
                        fontSize: height / 70,
                        fontFamily: "GlacialIndifference-Regular",
                        marginStart: -4,
                      }}
                    >
                      15000
                    </Text>
                  </View>
                </View>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 75,
                    marginTop: 4,
                  }}
                >
                  Brand Name
                </Text>

                <View style={{ marginTop: height / 58 }}>
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.bestSellerBackList}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Ionicons name="share-outline" size={height / 50} />
                      <View>
                        <Text
                          style={{
                            fontSize: height / 60,
                            fontFamily: "Mediums-Font",
                          }}
                        >
                          $51.95
                        </Text>
                        <Text
                          style={{
                            fontSize: height / 65,
                            fontFamily: "GlacialIndifference-Regular",
                            color: "green",
                            marginTop: 4,
                          }}
                        >
                          In Stock
                        </Text>
                      </View>
                    </View>

                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={{
                          padding: 2,
                          justifyContent: "center",
                          alignItems: "center",
                          flex: 1,
                        }}
                      >
                        <Image
                          source={require("../assets/prohigh.png")}
                          style={{
                            resizeMode: "contain",
                            height: 200,
                            width: 100,
                          }}
                        />
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{
                        alignSelf: "flex-end",
                        marginTop: height / 35,
                        opacity: 0.6,
                        marginBottom: 5,
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

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 4,
                    }}
                  >
                    Color:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 5,
                    }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.catCircle}
                    >
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: 60,
                          resizeMode: "contain",
                        }}
                      />
                    </LinearGradient>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.catCircle}
                    >
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: 60,
                          resizeMode: "contain",
                        }}
                      />
                    </LinearGradient>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.catCircle}
                    >
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: 60,
                          resizeMode: "contain",
                        }}
                      />
                    </LinearGradient>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.catCircle}
                    >
                      <Image
                        source={require("../assets/product.png")}
                        style={{
                          height: 60,
                          resizeMode: "contain",
                        }}
                      />
                    </LinearGradient>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 7,
                    }}
                  >
                    Size:
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 5,
                    }}
                  >
                    <TouchableOpacity style={styles.filterBtnPrice}>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          textAlign: "center",
                        }}
                      >
                        Small
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.filterBtnPrice, { borderColor: "gray" }]}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          textAlign: "center",
                        }}
                      >
                        Medium
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.filterBtnPrice, { borderColor: "gray" }]}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          textAlign: "center",
                        }}
                      >
                        Large
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.filterBtnPrice, { borderColor: "gray" }]}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          textAlign: "center",
                        }}
                      >
                        X-Large
                      </Text>
                    </TouchableOpacity>
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
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 75,
                    }}
                  >
                    Deliver to: Saskatoon
                  </Text>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 75,
                      }}
                    >
                      Quantity:{`  `}
                    </Text>
                    <View
                      style={[styles.filterBtnPrice, { borderColor: "gray" }]}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          textAlign: "center",
                        }}
                      >
                        10
                      </Text>
                    </View>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 113,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/buynow2.png")}
                      style={styles.sellerButtons}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require("../assets/addtocart2.png")}
                      style={styles.sellerButtons}
                    />
                  </TouchableOpacity>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 7,
                    }}
                  >
                    Description:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 75,
                      marginTop: 7,
                      textAlign: "justify",
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem
                  </Text>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 10,
                    }}
                  >
                    Information:
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 75,
                      marginTop: 7,
                      textAlign: "justify",
                    }}
                  >
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: 15,
                    paddingHorizontal: 4,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.infoStyles}
                  ></LinearGradient>
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.infoStyles}
                  ></LinearGradient>
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.infoStyles}
                  ></LinearGradient>
                  <LinearGradient
                    colors={["#ffffff", "lightgray"]}
                    style={styles.infoStyles}
                  ></LinearGradient>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 15,
                    }}
                  >
                    Frequently bought togather
                  </Text>

                  <View
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 4,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                      <TouchableOpacity>
                        <Image
                          source={require("../assets/addtocart2.png")}
                          style={styles.freqButtons}
                        />
                      </TouchableOpacity>
                    </View>

                    <View style={{ alignItems: "center" }}>
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                      <TouchableOpacity>
                        <Image
                          source={require("../assets/addtocart2.png")}
                          style={styles.freqButtons}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                      <TouchableOpacity>
                        <Image
                          source={require("../assets/addtocart2.png")}
                          style={styles.freqButtons}
                        />
                      </TouchableOpacity>
                    </View>
                    <View style={{ alignItems: "center" }}>
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                      <TouchableOpacity>
                        <Image
                          source={require("../assets/addtocart2.png")}
                          style={styles.freqButtons}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 15,
                    }}
                  >
                    You might also like
                  </Text>

                  <View
                    style={{
                      marginTop: 10,
                      paddingHorizontal: 4,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.infoStyles}
                    ></LinearGradient>

                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.infoStyles}
                    ></LinearGradient>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.infoStyles}
                    ></LinearGradient>
                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.infoStyles}
                    ></LinearGradient>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 15,
                    }}
                  >
                    Looking for specific info?
                  </Text>

                  <View
                    style={{
                      paddingHorizontal: 4,
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={[
                        styles.txtView,
                        {
                          marginTop: height / 80,
                          flex: 1,
                          flexDirection: "row",
                          alignItems: "center",
                        },
                      ]}
                    >
                      <MaterialIcons size={height / 50} name={"search"} />
                      <TextInput
                        placeholder="Search in reviews, Q&As ..."
                        placeholderTextColor={theme.colors.secondary}
                        style={[
                          styles.textSize,
                          {
                            marginStart: 7,
                            marginEnd: 7,
                          },
                        ]}
                        autoCorrect={false}
                        value={searchQry}
                        onChangeText={(value) => [setSearchQry(value)]}
                        error={error}
                      />
                    </View>
                  </View>
                </View>

                <View>
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                      marginTop: 13,
                    }}
                  >
                    Customer reviews
                  </Text>

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
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
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
                          marginStart: -height / 170,
                        }}
                      />
                    </View>
                  </View>

                  <View
                    style={[
                      styles.txtView1,
                      {
                        marginTop: height / 80,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: height / 77,
                        fontFamily: "GlacialIndifference-Regular",
                        paddingStart: 15,
                      }}
                    >
                      Create a video review
                    </Text>
                    {/* <TextInput
                      placeholder="Search in reviews, Q&As ..."
                      placeholderTextColor={theme.colors.secondary}
                      style={[
                        styles.textSize,
                        {
                          marginStart: 7,
                          marginEnd: 7,
                        },
                      ]}
                      autoCorrect={false}
                      value={searchQry}
                      onChangeText={(value) => [setSearchQry(value)]}
                      error={error}
                    /> */}
                  </View>

                  <View
                    style={[
                      styles.txtView1,
                      {
                        marginTop: height / 120,
                        flex: 1,
                        flexDirection: "row",
                        alignItems: "center",
                      },
                    ]}
                  >
                    <Text
                      style={{
                        fontSize: height / 77,
                        fontFamily: "GlacialIndifference-Regular",
                        paddingStart: 15,
                      }}
                    >
                      Write a review
                    </Text>
                    {/* <TextInput
                      placeholder="Search in reviews, Q&As ..."
                      placeholderTextColor={theme.colors.secondary}
                      style={[
                        styles.textSize,
                        {
                          marginStart: 7,
                          marginEnd: 7,
                        },
                      ]}
                      autoCorrect={false}
                      value={searchQry}
                      onChangeText={(value) => [setSearchQry(value)]}
                      error={error}
                    /> */}
                  </View>

                  <View
                    style={{
                      marginTop: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 5,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        5 star
                      </Text>
                      <StarRating
                        rating={5}
                        onChange={setRating}
                        starSize={height / 60}
                        color={colors.MAIN}
                        style={{
                          marginStart: height / 60,
                          marginEnd: height / 60,
                          width: width / 3,
                        }}
                        maxStars={5}
                        starStyle={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        60%
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        4 star
                      </Text>
                      <StarRating
                        rating={5}
                        onChange={setRating}
                        starSize={height / 60}
                        color={colors.MAIN}
                        style={{
                          marginStart: height / 60,
                          marginEnd: height / 60,
                          width: width / 3,
                        }}
                        maxStars={4}
                        starStyle={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        16%
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        3 star
                      </Text>
                      <StarRating
                        rating={5}
                        onChange={setRating}
                        starSize={height / 60}
                        color={colors.MAIN}
                        style={{
                          marginStart: height / 60,
                          marginEnd: height / 60,
                          width: width / 3,
                        }}
                        maxStars={3}
                        starStyle={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        11%
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        2 star
                      </Text>
                      <StarRating
                        rating={5}
                        onChange={setRating}
                        starSize={height / 60}
                        color={colors.MAIN}
                        style={{
                          marginStart: height / 60,
                          marginEnd: height / 60,
                          width: width / 3,
                        }}
                        maxStars={2}
                        starStyle={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        5%
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 15,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        1 star
                      </Text>
                      <StarRating
                        rating={5}
                        onChange={setRating}
                        starSize={height / 60}
                        color={colors.MAIN}
                        style={{
                          marginStart: height / 60,
                          marginEnd: height / 60,
                          width: width / 3,
                        }}
                        maxStars={1}
                        starStyle={{
                          padding: 0,
                          margin: 0,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: height / 77,
                          fontFamily: "GlacialIndifference-Regular",
                        }}
                      >
                        8%
                      </Text>
                    </View>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 75,
                        marginTop: 15,
                      }}
                    >
                      Video reviews
                    </Text>

                    <View
                      style={{
                        marginTop: 10,
                        paddingHorizontal: 4,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>

                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                      <LinearGradient
                        colors={["#ffffff", "lightgray"]}
                        style={styles.infoStyles}
                      ></LinearGradient>
                    </View>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 75,
                        marginTop: 15,
                      }}
                    >
                      Top reviews
                    </Text>

                    <View
                      style={{
                        marginTop: 10,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                        }}
                      >
                        5000 total ratings, 1500 with reviews
                      </Text>
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 75,
                        marginTop: 15,
                      }}
                    >
                      From Canada
                    </Text>

                    <View
                      style={{
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="checkbox-blank-circle"
                          size={height / 60}
                          color="gray"
                        />
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 75,
                          }}
                        >
                          {`    `}Customer123
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 3,
                        }}
                      >
                        <StarRating
                          rating={rating}
                          onChange={setRating}
                          starSize={height / 70}
                          color={colors.MAIN}
                          style={{ marginStart: height / 140 }}
                          maxStars={5}
                          starStyle={{
                            padding: 0,
                            margin: 0,
                            marginStart: -height / 170,
                          }}
                        />
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 75,
                          }}
                        >
                          {`    `}Verified Purchase
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 75,
                          marginTop: 3,
                        }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 76,
                        }}
                      >
                        Reviewed in Canada on August 15, 2023
                      </Text>

                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          marginTop: 5,
                        }}
                      >
                        Color:Black {`            `} Size:9.5
                      </Text>

                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          marginTop: 5,
                          textAlign: "justify",
                        }}
                      >
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting industry. Lorem Ipsum has been the
                        industry's standard dummy text ever since the 1500s,
                        when an unknown printer took a galley of type and
                        scrambled it to make a type specimen book. It has
                        survived not only five centuries,
                      </Text>
                    </View>
                  </View>

                  <View
                    style={{
                      marginTop: 10,
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ flexDirection: "row" }}>
                      <View
                        style={[styles.filterBtnPrice, { borderColor: "gray" }]}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 75,
                            textAlign: "center",
                          }}
                        >
                          Helpful
                        </Text>
                      </View>

                      <View style={[styles.filterBtnPrice, { borderWidth: 0 }]}>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 75,
                            textAlign: "center",
                          }}
                        >
                          Share
                        </Text>
                      </View>
                    </View>
                    <View style={[styles.filterBtnPrice, { borderWidth: 0 }]}>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 75,
                          textAlign: "center",
                        }}
                      >
                        Report
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.bottomMenuMain}>
            <Image
              source={require("../assets/searchdock.png")}
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
      width: width / 2.33,
      height: height / 16,
      resizeMode: "contain",
    },
    freqButtons: {
      width: width / 5,
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
      width: width / 5,
      height: height / 11,
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
      borderRadius: 2,
      borderWidth: 0.5,
      borderColor: colors.MAIN,
      padding: 10,
      marginTop: 2,
      width: width / 5,
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
