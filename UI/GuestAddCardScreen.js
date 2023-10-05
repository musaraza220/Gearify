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
import {
  Text,
  useTheme,
  ActivityIndicator,
  RadioButton,
} from "react-native-paper";
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
import RadioButtonRN from "radio-buttons-react-native";
import PhoneInput from "react-native-phone-number-input";
import { isValidNumber } from "react-native-phone-number-input";
import axios from "axios";
import * as Font from "expo-font";
import CheckBox from "@react-native-community/checkbox";

import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function GuestAddCardScreen(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [searchQry, setSearchQry] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [value, setValue] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [code, setCode] = React.useState("");
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const [gLoading, setGLoading] = React.useState(false);
  const [gridView, setGridView] = React.useState(true);
  const [listView, setListView] = React.useState(false);
  const [aLoading, setALoading] = React.useState(false);
  const [fLoading, setFLoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);
  const [showSimilar, setShowSimilar] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [orderDone, setOrderDone] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [checkBoxAccount, setCheckBoxAccount] = React.useState(false);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const [rating, setRating] = useState(3.5);
  const [user, setUser] = useState({});
  const { styles } = useStyle();
  const { width, height } = useWindowDimensions();
  let customFonts = {
    "GlacialIndifference-Regular": require("../assets/AvenirNextCondensed.ttf"),
    "GlacialIndifference-Bold": require("../assets/AvenirNextCondensedDemiBold.ttf"),
    "Mediums-Font": require("../assets/AvenirNextCondensedMedium.ttf"),
  };

  const data = [
    {
      label: "Monday, Sept. 4",
    },
    {
      label: "Friday, Sept. 1 and Sunday, Sept. 3",
    },
    {
      label: "Thursday, Aug. 31 - Sunday, Sept. 3",
    },
  ];

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
              {orderDone ? (
                <View
                  style={{
                    marginHorizontal: height / 37,
                    marginTop: 6,
                  }}
                >
                  {checkBoxAccount ? (
                    <View>
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 65,
                            marginTop: height / 7,
                            textAlign: "center",
                          }}
                        >
                          Great News!
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          textAlign: "center",
                          marginTop: height / 30,
                        }}
                      >
                        Your order is confirmed, and your account has been
                        created.
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          textAlign: "center",
                          marginTop: 3,
                        }}
                      >
                        Look out for an email invitation to complete your
                        profile and set your password.
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          textAlign: "center",
                          marginBottom: height / 16,
                          marginTop: 10,
                        }}
                      >
                        Happy Shopping!
                      </Text>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Home")}
                      >
                        <ImageBackground
                          source={require("../assets/topbar.png")}
                          style={styles.checkOutBtn}
                        >
                          <Text
                            style={{
                              fontFamily: "Mediums-Font",
                              fontSize: height / 45,
                              textAlign: "center",
                              color: "white",
                              paddingVertical: height / 100,
                            }}
                          >
                            Continue
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>

                      <View style={{ marginTop: height / 33 }}>
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
                                style={{
                                  height: 80,
                                  width: 80,
                                  resizeMode: "contain",
                                }}
                              />
                            </View>
                            <LinearGradient
                              colors={["#ffffff", "lightgray"]}
                              style={styles.dealOfDayBack}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
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
                                    style={styles.sellerButtonss}
                                  />
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={{ marginStart: height / 30 }}
                                >
                                  <Image
                                    source={require("../assets/buynowcircle.png")}
                                    style={styles.sellerButtonss}
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
                                style={{
                                  height: 80,
                                  width: 80,
                                  resizeMode: "contain",
                                }}
                              />
                            </View>
                            <LinearGradient
                              colors={["#ffffff", "lightgray"]}
                              style={styles.dealOfDayBack}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
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
                                    style={styles.sellerButtonss}
                                  />
                                </TouchableOpacity>

                                <TouchableOpacity
                                  style={{ marginStart: height / 30 }}
                                >
                                  <Image
                                    source={require("../assets/buynowcircle.png")}
                                    style={styles.sellerButtonss}
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
                          <Text
                            style={[styles.textSize, { fontSize: height / 90 }]}
                          >
                            VIEW ALL
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View>
                      <View
                        style={{
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 65,
                            marginTop: height / 7,
                            textAlign: "center",
                          }}
                        >
                          Success! Your is order is Confirmed
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          textAlign: "center",
                          marginTop: height / 30,
                        }}
                      >
                        Your order confirmation will be sent to your email
                        shortly.
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          textAlign: "center",
                          marginTop: 3,
                          marginBottom: height / 16,
                        }}
                      >
                        Thank you for shopping with us!
                      </Text>
                      <TouchableOpacity
                        onPress={() => props.navigation.navigate("Home")}
                      >
                        <ImageBackground
                          source={require("../assets/topbar.png")}
                          style={styles.checkOutBtn}
                        >
                          <Text
                            style={{
                              fontFamily: "Mediums-Font",
                              fontSize: height / 45,
                              textAlign: "center",
                              color: "white",
                              paddingVertical: height / 100,
                            }}
                          >
                            Continue
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>

                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 40,
                          }}
                        >
                          Continue Shopping
                        </Text>

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 80,
                          }}
                        >
                          Similar Products
                        </Text>
                        <View
                          style={{
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
                            <View
                              style={{
                                marginTop: 5,
                                width: width / 2.3,
                              }}
                            >
                              <LinearGradient
                                colors={["#ffffff", "lightgray"]}
                                style={styles.recommendBack}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
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
                                width: width / 2.3,
                              }}
                            >
                              <LinearGradient
                                colors={["#ffffff", "lightgray"]}
                                style={styles.recommendBack}
                              >
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
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
                            <Text
                              style={[
                                styles.textSize,
                                { fontSize: height / 90 },
                              ]}
                            >
                              VIEW ALL
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: height / 37,
                    marginTop: 6,
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                        marginTop: height / 70,
                      }}
                    >
                      Add card details
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.txtView,
                      {
                        borderWidth: emailError !== "" ? 0.3 : 0,
                        borderColor: emailError !== "" ? colors.MAIN : null,
                        marginTop: height / 25,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="Name on card"
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
                  <View
                    style={[
                      styles.txtView,
                      {
                        borderWidth: emailError !== "" ? 0.3 : 0,
                        borderColor: emailError !== "" ? colors.MAIN : null,
                        marginTop: height / 50,
                      },
                    ]}
                  >
                    <TextInput
                      placeholder="Card number"
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
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 50,
                      marginVertical: height / 70,
                      marginTop: height / 30,
                    }}
                  >
                    Expiration Date
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View>
                      <View
                        style={[
                          styles.txtView,
                          {
                            borderWidth: emailError !== "" ? 0.3 : 0,
                            borderColor: emailError !== "" ? colors.MAIN : null,
                            width: width / 2.5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 0,
                          },
                        ]}
                      >
                        <TextInput
                          placeholder="01"
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
                        <MaterialIcons
                          size={height / 60}
                          name="keyboard-arrow-down"
                          color={"gray"}
                        />
                      </View>
                    </View>

                    <View>
                      <View
                        style={[
                          styles.txtView,
                          {
                            borderWidth: emailError !== "" ? 0.3 : 0,
                            borderColor: emailError !== "" ? colors.MAIN : null,
                            width: width / 2.5,
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginTop: 0,
                          },
                        ]}
                      >
                        <TextInput
                          placeholder="2023"
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
                        <MaterialIcons
                          size={height / 60}
                          name="keyboard-arrow-down"
                          color={"gray"}
                        />
                      </View>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => [
                      checkBoxAccount == false
                        ? setCheckBoxAccount(true)
                        : setCheckBoxAccount(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 25,
                      marginBottom: 6,
                    }}
                  >
                    {checkBoxAccount ? (
                      <FontAwesome
                        name="check-square-o"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <FontAwesome name="square-o" size={height / 50} />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 70,
                      }}
                    >
                      {`  `}Create Account
                    </Text>
                  </TouchableOpacity>
                  {/* <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 25,
                    }}
                  >
                    <FontAwesome name="square-o" size={height / 50} />
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 70,
                      }}
                    >
                      {`  `}Set as default payment method.
                    </Text>
                  </View> */}
                  <TouchableOpacity onPress={() => setOrderDone(true)}>
                    <ImageBackground
                      source={require("../assets/topbar.png")}
                      style={[styles.checkOutBtn, { marginTop: height / 17 }]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 45,
                          textAlign: "center",
                          color: "white",
                          paddingVertical: height / 100,
                        }}
                      >
                        Continue payment
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  {/*  <View style={{ marginTop: height / 33 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                        }}
                      >
                        Items (4):
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          width: height / 16,
                        }}
                      >
                        $272.47
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                        }}
                      >
                        Shipping & handling:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,

                          width: height / 16,
                        }}
                      >
                        $6.99
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                        }}
                      >
                        Estimated tax to be collected:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          width: height / 16,
                        }}
                      >
                        $9.68
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: 4,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                        }}
                      >
                        Order total:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                          width: height / 16,
                        }}
                      >
                        $280.14
                      </Text>
                    </View>
                  </View> */}
                </View>
              )}
            </ScrollView>
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
                onPress={() => props.navigation.navigate("ViewLists")}
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
      padding: 13,
      backgroundColor: colors.grays,
      marginTop: 2,
      borderRadius: 3,
    },
    txtView1: {
      padding: 8,
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
      borderRadius: 4,
      justifyContent: "center",
      width: width / 1.3,
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
    sellerButtonss: {
      width: width / 8.3,
      height: height / 16,
      resizeMode: "contain",
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
