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
import { Overlay } from "react-native-elements";
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from "accordion-collapse-react-native";
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
import RadioButtonRN from "radio-buttons-react-native";
import RBSheet from "react-native-raw-bottom-sheet";

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function CheckoutCompleteInfo(props) {
  const refRBSheet = useRef();
  const refRBSheetInst = useRef();
  const refRBSheetPayment = useRef();
  const refRBSheetSpecific = useRef();
  const refRBSheetViewInst = useRef();
  const [typeSwitch, setTypeSwitch] = React.useState(false);
  const [deliveryInst, setDeliveryInst] = React.useState(false);
  const [deliverClick, setDeliverClick] = React.useState(false);
  const [payClick, setPayClick] = React.useState(false);
  const [deliverInstClick, setDeliverInstClick] = React.useState(false);
  const [split, setSplit] = React.useState(false);
  const [highlight, setHighlight] = React.useState(false);
  const [itemsClick, setItemClicks] = React.useState(false);
  const [changeSpecific, setChangeSpecific] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(false);

  const [house, setHouse] = React.useState(false);
  const [appartment, setappartment] = React.useState(false);
  const [business, setBusiness] = React.useState(false);
  const [others, setOthers] = React.useState(false);
  const [types, setTypes] = React.useState("");
  const [amount, setAmount] = React.useState(280.14);

  const [email, setEmail] = React.useState("");
  const [cardValue, setCardValue] = React.useState("");
  const [cardValue1, setCardValue1] = React.useState("");
  const [emailError, setEmailError] = React.useState("");
  const [searchQry, setSearchQry] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [names, setName] = React.useState("Musa raza");
  const [cardNumber, setCardNumber] = React.useState("*6788");
  const [address, setAddress] = React.useState(
    "123 ANYWHERE St..,ANY CITY,STATE,COUNTRY 12345"
  );
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

  const checkValuesSplit = () => {
    if (cardValue1.trim() === "" && cardValue.trim() === "") {
      setSplit(false);
    } else {
    }
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
                <View style={{ marginHorizontal: height / 37 }}>
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
                    Your order confirmation will be sent to your email shortly.
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 65,
                      textAlign: "center",
                      marginTop: 3,
                    }}
                  >
                    You can check your order status under ORDERS in your
                    account.
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
                          style={[styles.textSize, { fontSize: height / 90 }]}
                        >
                          VIEW ALL
                        </Text>
                      </View>
                    </View>
                  </View>
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
                  <View
                    style={{
                      backgroundColor: "lightgray",
                      height: 0.6,
                      width: "100%",
                      marginVertical: height / 70,
                    }}
                  ></View>

                  <View style={{ marginTop: 2 }}>
                    <TouchableOpacity
                      // onPress={() =>
                      //   itemsClick ? setItemClicks(false) : setItemClicks(true)
                      // }
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
                          color: itemsClick
                            ? highlight
                              ? "gray"
                              : "#0372BA"
                            : null,
                        }}
                      >
                        Items (2):
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          width: height / 16,
                          color: itemsClick
                            ? highlight
                              ? "gray"
                              : "#0372BA"
                            : null,
                        }}
                      >
                        $272.47
                      </Text>
                    </TouchableOpacity>

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

                    <TouchableOpacity
                      // onPress={() =>
                      //   itemsClick ? setItemClicks(false) : setItemClicks(true)
                      // }
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
                          //color: highlight ? "gray" : "#0372BA",
                          color: itemsClick
                            ? highlight
                              ? "gray"
                              : "#0372BA"
                            : null,
                        }}
                      >
                        Sub total:
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                          width: height / 16,
                          color: itemsClick
                            ? highlight
                              ? "gray"
                              : "#0372BA"
                            : null,
                        }}
                      >
                        $280.14
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View
                    style={{
                      marginTop: itemsClick ? height / 90 : height / 90,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Delivering to {names}
                    </Text>

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                        marginTop: 4,
                      }}
                    >
                      {address}
                    </Text>

                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.open(),
                        setDeliverInstClick(true),
                        setDeliverClick(false),
                        setPayClick(true),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          marginTop: 4,
                          color: deliverClick ? "gray" : colors.MAIN,
                        }}
                      >
                        Change delivery address
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onPress={() => [
                          deliveryInst
                            ? refRBSheetViewInst.current.open()
                            : [
                                refRBSheetInst.current.open(),
                                setHouse(true),
                                setOthers(false),
                                setappartment(false),
                                setBusiness(false),
                                setDeliverInstClick(false),
                                setDeliverClick(true),
                                setPayClick(true),
                                setTypes("House"),
                              ],
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: deliveryInst
                              ? "GlacialIndifference-Bold"
                              : "GlacialIndifference-Regular",
                            fontSize: height / 65,
                            marginTop: 4,
                            color: deliverInstClick ? "gray" : colors.MAIN,
                          }}
                        >
                          {deliveryInst
                            ? "View delivery instructions"
                            : "Add delivery instructions"}
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                        onPress={() => [setDeliveryInst(false)]}
                      >
                        {deliveryInst ? (
                          <View style={{ flexDirection: "row" }}>
                            <Text
                              style={{
                                fontFamily: deliveryInst
                                  ? "GlacialIndifference-Bold"
                                  : "GlacialIndifference-Regular",
                                fontSize: height / 65,
                                marginTop: 4,
                                color: deliverInstClick ? "gray" : colors.MAIN,
                              }}
                            >
                              Delete{`      `}
                            </Text>

                            <Text
                              style={{
                                fontFamily: deliveryInst
                                  ? "GlacialIndifference-Bold"
                                  : "GlacialIndifference-Regular",
                                fontSize: height / 65,
                                marginTop: 4,
                                color: deliverInstClick ? "gray" : colors.MAIN,
                              }}
                            >
                              Edit
                            </Text>
                          </View>
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View
                    style={{
                      backgroundColor: "lightgray",
                      height: 0.6,
                      width: "100%",
                      marginVertical: height / 70,
                    }}
                  ></View>
                  {itemsClick ? (
                    <TouchableOpacity
                      activeOpacity={1}
                      onPress={() => setHighlight(false)}
                      style={{
                        backgroundColor: highlight ? colors.grays : null,
                      }}
                    >
                      <View style={{ marginTop: 1 }}>
                        <TouchableOpacity
                          onPress={() =>
                            highlight ? setHighlight(false) : setHighlight(true)
                          }
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
                              color: "#0372BA",
                            }}
                          >
                            Items (1):
                          </Text>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 65,
                              width: height / 16,
                              color: "#0372BA",
                            }}
                          >
                            $272.47
                          </Text>
                        </TouchableOpacity>

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

                        <TouchableOpacity
                          onPress={() =>
                            highlight ? setHighlight(false) : setHighlight(true)
                          }
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
                              color: "#0372BA",
                            }}
                          >
                            Sub total:
                          </Text>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 65,
                              width: height / 16,
                              color: "#0372BA",
                            }}
                          >
                            $280.14
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View style={{ marginTop: height / 90 }}>
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
                          123 City, Pakistan
                        </Text>

                        <TouchableOpacity
                          onPress={() => [
                            deliveryInst
                              ? refRBSheetViewInst.current.open()
                              : [
                                  refRBSheetInst.current.open(),
                                  setHouse(true),
                                  setOthers(false),
                                  setappartment(false),
                                  setBusiness(false),
                                  setDeliverInstClick(false),
                                  setDeliverClick(true),
                                  setPayClick(true),
                                  setTypes("House"),
                                ],
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: deliveryInst
                                ? "GlacialIndifference-Bold"
                                : "GlacialIndifference-Regular",
                              fontSize: height / 65,
                              marginTop: 4,
                              color: deliverInstClick ? "gray" : colors.MAIN,
                            }}
                          >
                            {deliveryInst
                              ? "View delivery instructions"
                              : "Add delivery instructions"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          backgroundColor: "lightgray",
                          height: 0.6,
                          width: "100%",
                          marginVertical: height / 70,
                          marginBottom: 2,
                        }}
                      ></View>
                    </TouchableOpacity>
                  ) : null}

                  <View
                    style={{
                      marginTop: itemsClick ? 1 : height / 70,
                    }}
                  >
                    {cardValue1.trim().length > 0 ||
                    cardValue.trim().length > 0 ? (
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                        }}
                      >
                        SPLIT
                      </Text>
                    ) : null}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      {cardValue1.trim().length > 0 ||
                      cardValue.trim().length > 0
                        ? `Paying $${cardValue1} with Mastercard ending in *2345`
                        : `Paying with Mastercard ending in ${cardNumber}`}
                    </Text>
                    {cardValue.trim().length > 0 ? (
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                        }}
                      >
                        Paying ${`${cardValue}`} with Visa ending in *2345
                      </Text>
                    ) : null}
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheetPayment.current.open(),
                        setDeliverInstClick(true),
                        setDeliverClick(true),
                        setPayClick(false),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 65,
                          marginTop: 1,
                          color: payClick ? "gray" : colors.MAIN,
                        }}
                      >
                        Change payment method
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "lightgray",
                        height: 0.6,
                        width: "100%",
                        marginVertical: height / 70,
                        marginBottom: 2,
                      }}
                    ></View>
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

                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: height / 50,
                            fontFamily: "GlacialIndifference-Bold",
                            marginTop: height / 45,
                          }}
                        >
                          ORDER DETAILS
                        </Text>
                        <View style={{ marginTop: height / 45 }}>
                          <MaterialCommunityIcons
                            name="chevron-down"
                            size={height / 40}
                          />
                        </View>
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View>
                        <View style={{ marginTop: 2 }}>
                          <TouchableOpacity
                            onPress={() =>
                              props.navigation.navigate("CartProductDetails")
                            }
                          >
                            <LinearGradient
                              colors={["#ffffff", "lightgray"]}
                              style={[
                                styles.bestSellerBack,
                                {
                                  borderColor: changeSpecific
                                    ? colors.MAIN
                                    : highlight
                                    ? "#0372BA"
                                    : null,
                                  borderWidth:
                                    changeSpecific || highlight ? 0.8 : 0.2,
                                },
                              ]}
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
                                style={{
                                  alignSelf: "center",
                                  paddingVertical: 2,
                                }}
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
                            <TouchableOpacity
                              style={{
                                borderWidth: 1,
                                borderColor: colors.MAIN,
                                borderRadius: 3,
                                paddingHorizontal: height / 25,
                                paddingVertical: height / 250,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Mediums-Font",
                                  fontSize: height / 75,
                                  textAlign: "center",
                                }}
                              >
                                DELETE
                              </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                              style={{
                                borderWidth: 1,
                                borderColor: colors.MAIN,
                                borderRadius: 3,
                                paddingHorizontal: height / 30,
                                paddingVertical: height / 250,
                              }}
                            >
                              <Text
                                style={{
                                  fontFamily: "Mediums-Font",
                                  fontSize: height / 75,
                                  textAlign: "center",
                                }}
                              >
                                GIFT OPTION
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
                              justifyContent: "space-between",
                              marginTop: 5,
                              marginBottom: 5,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
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
                            <TouchableOpacity
                              onPress={() => [
                                refRBSheetSpecific.current.open(),
                                setChangeSpecific(true),
                              ]}
                            >
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
                            </TouchableOpacity>
                          </View>
                          <View
                            style={{
                              height: 1,
                              width: "100%",
                              backgroundColor: "lightgray",
                              marginVertical: height / 100,
                            }}
                          ></View>

                          <View style={{ marginTop: height / 80 }}>
                            <TouchableOpacity
                              onPress={() =>
                                props.navigation.navigate("CartProductDetails")
                              }
                            >
                              <LinearGradient
                                colors={["#ffffff", "lightgray"]}
                                style={[
                                  styles.bestSellerBack,
                                  {
                                    borderColor: changeSpecific
                                      ? colors.MAIN
                                      : highlight
                                      ? "#0372BA"
                                      : null,
                                    borderWidth:
                                      changeSpecific || highlight ? 0.8 : 0.2,
                                  },
                                ]}
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
                                  style={{
                                    alignSelf: "center",
                                    paddingVertical: 2,
                                  }}
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
                              <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  borderColor: colors.MAIN,
                                  borderRadius: 3,
                                  paddingHorizontal: height / 25,
                                  paddingVertical: height / 250,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Mediums-Font",
                                    fontSize: height / 75,
                                    textAlign: "center",
                                  }}
                                >
                                  DELETE
                                </Text>
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={{
                                  borderWidth: 1,
                                  borderColor: colors.MAIN,
                                  borderRadius: 3,
                                  paddingHorizontal: height / 30,
                                  paddingVertical: height / 250,
                                }}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Mediums-Font",
                                    fontSize: height / 75,
                                    textAlign: "center",
                                  }}
                                >
                                  GIFT OPTION
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
                                justifyContent: "space-between",
                                marginTop: 5,
                                marginBottom: 5,
                              }}
                            >
                              <View
                                style={{
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
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
                              <TouchableOpacity
                                onPress={() => [
                                  refRBSheetSpecific.current.open(),
                                  setChangeSpecific(true),
                                ]}
                              >
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
                              </TouchableOpacity>
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
                        </View>
                      </View>
                    </CollapseBody>
                  </Collapse>
                  <View
                    style={{
                      backgroundColor: "lightgray",
                      height: 0.6,
                      width: "100%",
                      marginVertical: height / 70,
                    }}
                  ></View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: height / 90,
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
                    style={{ marginTop: height / 60 }}
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

            <RBSheet
              ref={refRBSheet}
              onClose={() => [
                setDeliverClick(false),
                setDeliverInstClick(false),
                setPayClick(false),
              ]}
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
                  YOUR ADDRESS BOOK
                </Text>

                <View
                  style={{
                    marginTop: height / 50,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        setName("Ali"),
                        setAddress("142 Sialkot, Sialkot, Pakistan"),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
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
                        Ali
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: 2,
                        }}
                      >
                        123 Sialkot
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: 2,
                        }}
                      >
                        Sialkot, Pakistan
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
                        props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 10,
                        }}
                      >
                        EDIT
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        justifyContent: "center",
                        width: height / 8,
                        padding: 10,
                        marginStart: 5,
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
                      ></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 13,
                        }}
                      ></Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        justifyContent: "center",
                        width: height / 8,
                        padding: 10,
                        marginStart: 5,
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
                      ></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 13,
                        }}
                      ></Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 7,
                  }}
                  onPress={() => [
                    refRBSheet.current.close(),
                    props.navigation.navigate("AddNewAddress"),
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
                    ADD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 22,
                  }}
                  onPress={() => [
                    refRBSheet.current.close(),
                    props.navigation.navigate("AddressBook"),
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
                    MANAGE
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetInst}
              onClose={() => [
                setDeliverClick(false),
                setDeliverInstClick(false),
                setPayClick(false),
              ]}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 1.3}
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
                  DELIVERY INSTRUCTIONS
                </Text>

                <ScrollView showsVerticalScrollIndicator={false}>
                  <Overlay
                    visible={typeSwitch}
                    overlayStyle={{
                      borderRadius: 5,

                      backgroundColor: theme.colors.background,
                      marginTop: height / 10,
                      marginStart: -height / 70,
                    }}
                  >
                    <View style={{}}>
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
                        marginEnd: height / 15,
                      }}
                    >
                      <TouchableOpacity
                        style={{}}
                        onPress={() => [
                          setHouse(true),
                          setTypeSwitch(false),
                          setappartment(false),
                          setBusiness(false),
                          setOthers(false),
                          setTypes("House"),
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 75,
                            color: house ? null : "gray",
                          }}
                        >
                          House {`    `}
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
                      <TouchableOpacity
                        style={{}}
                        onPress={() => [
                          setHouse(false),
                          setTypeSwitch(false),
                          setappartment(true),
                          setBusiness(false),
                          setOthers(false),
                          setTypes("Appartment"),
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 75,
                            color: appartment ? null : "gray",
                          }}
                        >
                          Appartment {`    `}
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
                      <TouchableOpacity
                        style={{}}
                        onPress={() => [
                          setHouse(false),
                          setTypeSwitch(false),
                          setappartment(false),
                          setBusiness(true),
                          setOthers(false),
                          setTypes("Business"),
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 75,
                            color: business ? null : "gray",
                          }}
                        >
                          Business {`    `}
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
                      <TouchableOpacity
                        style={{}}
                        onPress={() => [
                          setHouse(false),
                          setTypeSwitch(false),
                          setappartment(false),
                          setBusiness(false),
                          setOthers(true),
                          setTypes("others"),
                        ]}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 75,
                            color: others ? null : "gray",
                          }}
                        >
                          Others {`    `}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </Overlay>
                  <View>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                        marginTop: height / 70,
                        marginBottom: 6,
                      }}
                    >
                      Property Type
                    </Text>
                    <TouchableOpacity
                      onPress={() => setTypeSwitch(true)}
                      style={[
                        styles.txtView,
                        {
                          borderWidth: emailError !== "" ? 0.3 : 0,
                          borderColor: emailError !== "" ? colors.MAIN : null,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <TextInput
                        placeholder={types}
                        editable={false}
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
                    </TouchableOpacity>
                    {house ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 6,
                          }}
                        >
                          Where should we leave packages?
                        </Text>
                        <View
                          style={[
                            styles.txtView,
                            {
                              borderWidth: emailError !== "" ? 0.3 : 0,
                              borderColor:
                                emailError !== "" ? colors.MAIN : null,

                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Front Door"
                            editable={false}
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

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 60,
                            marginBottom: 1,
                          }}
                        >
                          Entry Requirements
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Security Code
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="429"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Call Box
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="123"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Key or Fob
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 60,
                            marginBottom: 1,
                          }}
                        >
                          Weekend Availability
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 3.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Saturday"
                                editable={false}
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
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 5,
                          }}
                        >
                          <View>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 3.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Sunday"
                                editable={false}
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
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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
                      </View>
                    ) : null}

                    {appartment ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 1,
                          }}
                        >
                          Entry Requirements
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Security Code
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="429"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Call Box
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="123"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Key or Fob
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 6,
                          }}
                        >
                          Where should we leave packages?
                        </Text>
                        <View
                          style={[
                            styles.txtView,
                            {
                              borderWidth: emailError !== "" ? 0.3 : 0,
                              borderColor:
                                emailError !== "" ? colors.MAIN : null,

                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Front Door"
                            editable={false}
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
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 60,
                            marginBottom: 1,
                          }}
                        >
                          Weekend Availability
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 3.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Saturday"
                                editable={false}
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
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 5,
                          }}
                        >
                          <View>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 3.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Sunday"
                                editable={false}
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
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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
                      </View>
                    ) : null}

                    {business ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 1,
                          }}
                        >
                          Days Open for Delivery
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Day
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 6.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Monday"
                                editable={false}
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
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Open Time
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="00:00 PM"
                                editable={false}
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
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Close Time
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="00:00 PM"
                                editable={false}
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
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 80,
                            marginTop: height / 100,
                            marginBottom: -10,
                            textAlign: "right",
                          }}
                        >
                          Add +
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 6,
                          }}
                        >
                          Where should we leave packages?
                        </Text>
                        <View
                          style={[
                            styles.txtView,
                            {
                              borderWidth: emailError !== "" ? 0.3 : 0,
                              borderColor:
                                emailError !== "" ? colors.MAIN : null,

                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Front Door"
                            editable={false}
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
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 60,
                            marginBottom: 1,
                          }}
                        >
                          Weekend Availability
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 3.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Saturday"
                                editable={false}
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
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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

                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            marginTop: 5,
                          }}
                        >
                          <View>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 3.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Sunday"
                                editable={false}
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
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 1,
                          }}
                        >
                          Entry Requirements
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Security Code
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="429"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Call Box
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="123"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Key or Fob
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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
                      </View>
                    ) : null}

                    {others ? (
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 6,
                          }}
                        >
                          Where should we leave packages?
                        </Text>
                        <View
                          style={[
                            styles.txtView,
                            {
                              borderWidth: emailError !== "" ? 0.3 : 0,
                              borderColor:
                                emailError !== "" ? colors.MAIN : null,

                              flexDirection: "row",
                              justifyContent: "space-between",
                            },
                          ]}
                        >
                          <TextInput
                            placeholder="Front Door"
                            editable={false}
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
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 1,
                          }}
                        >
                          Days Open for Delivery
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Day
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 6.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Monday"
                                editable={false}
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
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Open Time
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="00:00 PM"
                                editable={false}
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
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Close Time
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="00:00 PM"
                                editable={false}
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
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 80,
                            marginTop: height / 100,
                            marginBottom: -10,
                            textAlign: "right",
                          }}
                        >
                          Add +
                        </Text>

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginTop: height / 70,
                            marginBottom: 1,
                          }}
                        >
                          Entry Requirements
                        </Text>
                        <View
                          style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Security Code
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="429"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Call Box
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="123"
                                editable={false}
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
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 80,
                                marginTop: height / 100,
                                marginBottom: 6,
                              }}
                            >
                              Key or Fob
                            </Text>
                            <View
                              style={[
                                styles.txtView,
                                {
                                  borderWidth: emailError !== "" ? 0.3 : 0,
                                  borderColor:
                                    emailError !== "" ? colors.MAIN : null,

                                  flexDirection: "row",
                                  justifyContent: "space-between",
                                  width: height / 8.7,
                                },
                              ]}
                            >
                              <TextInput
                                placeholder="Yes"
                                editable={false}
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
                      </View>
                    ) : null}
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                        marginTop: height / 70,
                        marginBottom: 6,
                      }}
                    >
                      Additional Instructions
                    </Text>
                    <View
                      style={[
                        styles.txtView,
                        {
                          borderWidth: emailError !== "" ? 0.3 : 0,
                          borderColor: emailError !== "" ? colors.MAIN : null,

                          flexDirection: "row",
                          justifyContent: "space-between",
                        },
                      ]}
                    >
                      <TextInput
                        placeholder="Enter details"
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
                </ScrollView>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 8,
                  }}
                  onPress={() => [
                    setDeliveryInst(true),
                    refRBSheetInst.current.close(),
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
                    ADD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 22,
                  }}
                  onPress={() => [
                    refRBSheetInst.current.close(),
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
                    CANCEL
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetPayment}
              onClose={() => [
                setDeliverClick(false),
                setDeliverInstClick(false),
                setPayClick(false),
              ]}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 2.7}
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 65,
                    }}
                  >
                    YOUR WALLET
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 65,
                    }}
                  >
                    {cardValue.trim().length > 0 || cardValue1.trim().length > 0
                      ? `Remaining Amount: $${(
                          amount -
                          cardValue -
                          cardValue1
                        ).toFixed(2)}`
                      : `Total Amount: $${amount}`}
                  </Text>
                </View>

                <View
                  style={{
                    marginTop: height / 50,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    {split ? (
                      <TextInput
                        placeholder="$0.00"
                        keyboardType="decimal-pad"
                        editable={true}
                        value={cardValue1}
                        maxLength={amount}
                        onChangeText={(e) => setCardValue1(e)}
                        style={{
                          borderWidth: 0.7,
                          borderColor: "gray",
                          marginBottom: 5,
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                          width: height / 8,
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      />
                    ) : (
                      <TextInput
                        editable={false}
                        value={cardValue1}
                        onChangeText={(e) => setCardValue1(e)}
                        style={{
                          borderWidth: 0,
                          borderColor: "gray",
                          marginBottom: 5,
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                          width: height / 8,
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => [
                        refRBSheetPayment.current.close(),
                        setCardNumber("*1770"),
                        // setAddress("142 Sialkot, Sialkot, Pakistan"),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: colors.MAIN,
                        justifyContent: "center",
                        width: height / 6,
                        padding: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 70,
                          textAlign: "right",
                        }}
                      >
                        *1770
                      </Text>

                      <Image
                        source={require("../assets/mastercard.png")}
                        style={{
                          width: height / 10,
                          height: height / 10,
                          resizeMode: "contain",
                          alignSelf: "center",
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => [
                        refRBSheetPayment.current.close(),
                        props.navigation.navigate("AddCardScreen"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 10,
                        }}
                      >
                        EDIT
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                    {split && selectedCard ? (
                      <TextInput
                        placeholder="$0.00"
                        keyboardType="decimal-pad"
                        editable={true}
                        value={cardValue}
                        onChangeText={(e) => setCardValue(e)}
                        style={{
                          borderWidth: 0.7,
                          borderColor: "gray",
                          marginBottom: 5,
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                          width: height / 8,
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      />
                    ) : (
                      <TextInput
                        editable={false}
                        value={cardValue}
                        onChangeText={(e) => setCardValue(e)}
                        style={{
                          borderWidth: 0,
                          borderColor: "gray",
                          marginBottom: 5,
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 65,
                          width: height / 8,
                          alignSelf: "center",
                          textAlign: "center",
                        }}
                      />
                    )}

                    <TouchableOpacity
                      onPress={() => [
                        //refRBSheetPayment.current.close(),
                        selectedCard && split
                          ? setSelectedCard(false)
                          : setSelectedCard(true),
                        // setName("Ali"),
                        // setAddress("142 Sialkot, Sialkot, Pakistan"),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: selectedCard ? colors.MAIN : "gray",
                        justifyContent: "center",
                        width: height / 6,
                        padding: 10,
                        marginStart: 8,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 70,
                          textAlign: "right",
                        }}
                      >
                        *2345
                      </Text>

                      <Image
                        source={
                          selectedCard
                            ? require("../assets/visa1.png")
                            : require("../assets/visa.png")
                        }
                        style={{
                          width: height / 10,
                          height: height / 10,
                          resizeMode: "contain",
                          alignSelf: "center",
                        }}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [
                        //refRBSheet.current.close(),
                        //props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 14,
                        }}
                      >
                        {selectedCard ? "EDIT" : ""}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 25,
                    right: height / 4.4,
                    paddingHorizontal: height / 70,
                    backgroundColor: split ? colors.MAIN : null,
                    borderRadius: split ? 3 : 0,
                  }}
                  onPress={() => [
                    split ? setSplit(false) : setSplit(true),
                    //refRBSheet.current.close(),
                    //props.navigation.navigate("AddNewAddress"),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 65,
                      color: split ? "white" : colors.MAIN,
                      textAlign: "center",
                    }}
                  >
                    SPLIT
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 25,
                    right: height / 7,
                  }}
                  onPress={() => [
                    refRBSheetPayment.current.close(),
                    props.navigation.navigate("AddCardScreen"),
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
                    ADD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 25,
                    right: height / 22,
                  }}
                  onPress={() => [
                    refRBSheetPayment.current.close(),
                    props.navigation.navigate("CardScreen"),
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
                    MANAGE
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetSpecific}
              closeOnDragDown={true}
              closeOnPressMask={true}
              onClose={() => setChangeSpecific(false)}
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
                  CHANGE DELIVERY ADDRESS FOR THIS ITEM
                </Text>

                <View
                  style={{
                    marginTop: height / 50,
                    alignItems: "center",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheetSpecific.current.close(),
                        setItemClicks(true),
                        // setName("Ali"),
                        // setAddress("142 Sialkot, Sialkot, Pakistan"),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
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
                        Musa raza
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: 2,
                        }}
                      >
                        123 City
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginTop: 2,
                        }}
                      >
                        City, Pakistan
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
                        props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 10,
                        }}
                      >
                        EDIT
                      </Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        justifyContent: "center",
                        width: height / 8,
                        padding: 10,
                        marginStart: 5,
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
                      ></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 13,
                        }}
                      ></Text>
                    </TouchableOpacity>
                  </View>

                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
                        justifyContent: "center",
                        width: height / 8,
                        padding: 10,
                        marginStart: 5,
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
                      ></Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheet.current.close(),
                        props.navigation.navigate("EditAddress"),
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 65,
                          color: colors.MAIN,
                          textAlign: "center",
                          marginTop: 13,
                        }}
                      ></Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 7,
                  }}
                  onPress={() => [
                    refRBSheet.current.close(),
                    props.navigation.navigate("AddNewAddress"),
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
                    ADD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 22,
                  }}
                  onPress={() => [
                    refRBSheet.current.close(),
                    props.navigation.navigate("AddressBook"),
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
                    MANAGE
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetViewInst}
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
                  DELIVERY INSTRUCTIONS
                </Text>

                <View
                  style={{
                    marginTop: height / 30,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Property Type: {` `}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                      }}
                    >
                      House
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 60,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Where should we leave package?: {` `}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                      }}
                    >
                      Front Door
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 60,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Entry Requirements: {` `}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                      }}
                    >
                      Security Code: 123, Call Box: 456, Key or Fob: No
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 60,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Weekend Availability: {` `}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                      }}
                    >
                      Saturday: Yes, Sunday: No
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 60,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 65,
                      }}
                    >
                      Additional Instructions: {` `}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 65,
                      }}
                    >
                      No
                    </Text>
                  </View>
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
