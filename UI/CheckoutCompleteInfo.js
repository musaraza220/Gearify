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
  FontAwesome,
  Entypo,
  Ionicons,
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

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function CheckoutCompleteInfo(props) {
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [searchQry, setSearchQry] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [checkboxPromo, setCheckboxPromo] = React.useState(false);

  const [selectedValue, setSelectedValue] = useState("option1");

  const [qty, setQty] = React.useState(1);
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
                  <TouchableOpacity
                    onPress={() => props.navigation.goBack()}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 10,
                    }}
                  >
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
                      {` `}CANCEL
                    </Text>
                  </TouchableOpacity>
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
                      Payment Success
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 65,
                      textAlign: "center",
                      marginTop: 3,
                      marginBottom: height / 16,
                    }}
                  >
                    Thanks for purchasing with Gearify!
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
                </View>
              ) : (
                <View
                  style={{
                    marginHorizontal: height / 37,
                    marginTop: 6,
                  }}
                >
                  <View
                    style={{
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                        marginTop: height / 70,
                        textAlign: "center",
                      }}
                    >
                      PLACE YOUR ORDER
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 65,
                      marginVertical: height / 22,
                    }}
                  >
                    By placing your order, you agree to Gearify's Privacy Policy
                    and Terms & Conditions.
                  </Text>
                  <TouchableOpacity onPress={() => setOrderDone(true)}>
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
                        Place your order
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>

                  <View style={{ marginTop: height / 33 }}>
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
                        Items (2):
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
                  </View>

                  <View style={{ marginTop: height / 45 }}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Delivering to Musa Raza
                    </Text>

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                        marginTop: 4,
                      }}
                    >
                      123 ANYWHERE St..,ANY CITY,STATE,COUNTRY 12345
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                        marginTop: 4,
                      }}
                    >
                      Pakistan
                    </Text>

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                        marginTop: 4,
                        color: colors.MAIN,
                      }}
                    >
                      Change delivery address
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                        marginTop: 4,
                        color: colors.MAIN,
                      }}
                    >
                      Add delivery instructions
                    </Text>
                  </View>

                  <View style={{ marginTop: height / 45 }}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Paying with Mastercard ending in *1770
                    </Text>

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                        marginTop: 1,
                        color: colors.MAIN,
                      }}
                    >
                      Change payment method
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
                        marginTop: height / 40,
                        marginBottom: 6,
                      }}
                    >
                      {checkboxPromo ? (
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
                        {checkboxPromo
                          ? " Use a gift card, vouchers, or promo code"
                          : "  Use a gift card, vouchers, or promo code"}
                      </Text>
                      {checkboxPromo ? (
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 70,
                            textAlign: "right",
                            paddingEnd: 4,
                            flex: 1,
                          }}
                        >
                          {`  `}$280.14
                        </Text>
                      ) : null}
                    </TouchableOpacity>
                  </View>
                  {checkboxPromo ? (
                    <View>
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
                              fontSize: height / 70,
                              textAlign: "right",
                              paddingEnd: 6,
                              flex: 1,
                            }}
                          ></Text>
                          <View
                            style={[
                              styles.txtView,
                              {
                                borderWidth: emailError !== "" ? 0.3 : 0,
                                borderColor:
                                  emailError !== "" ? colors.MAIN : null,
                                width: width / 1.8,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 0,
                              },
                            ]}
                          >
                            <TextInput
                              placeholder="1234"
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
                        </View>

                        <View>
                          <Text
                            style={{
                              fontFamily: "Mediums-Font",
                              fontSize: height / 70,
                              textAlign: "right",
                              paddingEnd: 4,
                              flex: 1,
                            }}
                          >
                            (Remaining Balance)
                          </Text>
                          <View
                            style={[
                              styles.txtView,
                              {
                                borderWidth: emailError !== "" ? 0.3 : 0,
                                borderColor:
                                  emailError !== "" ? colors.MAIN : null,
                                width: width / 3.3,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 0,
                              },
                            ]}
                          >
                            <TextInput
                              placeholder="$99.00"
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
                        </View>
                      </View>
                    </View>
                  ) : null}

                  <Text
                    style={{
                      fontSize: height / 50,
                      fontFamily: "GlacialIndifference-Bold",
                      marginTop: height / 45,
                    }}
                  >
                    ORDER DETAILS
                  </Text>
                  <View style={{ marginTop: 2 }}>
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
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="truck-delivery-outline"
                          size={height / 50}
                        />
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 65,
                          }}
                        >
                          {`  `}ABC, Anywhere, Anyplace
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          marginTop: 4,
                          color: colors.MAIN,
                        }}
                      >
                        Change delivery address
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "lightgray",
                        marginVertical: height / 100,
                      }}
                    ></View>
                  </View>

                  <View style={{ marginTop: height / 80 }}>
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
                        justifyContent: "space-between",
                        marginTop: 5,
                        marginBottom: 5,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <MaterialCommunityIcons
                          name="truck-delivery-outline"
                          size={height / 50}
                        />
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 65,
                          }}
                        >
                          {`  `}ABC, Anywhere, Anyplace
                        </Text>
                      </View>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          marginTop: 4,
                          color: colors.MAIN,
                        }}
                      >
                        Change delivery address
                      </Text>
                    </View>
                    <View
                      style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "lightgray",
                        marginVertical: height / 100,
                      }}
                    ></View>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: height / 60,
                      marginHorizontal: height / 36,
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
                  <TouchableOpacity
                    onPress={() => setOrderDone(true)}
                    style={{ marginTop: height / 40 }}
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
                        Place your order
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
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
    centerText: {
      textAlign: "center",
      color: colors.WHITE,
      fontSize: height / 45,
    },
    dockIconStyle: {
      resizeMode: "contain",
      height: height / 40,
      width: height / 40,
      marginTop: 6,
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
