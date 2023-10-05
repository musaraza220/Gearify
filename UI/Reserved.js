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

export default function Reserved(props) {
  const refRBSheetViewInst = useRef();
  const refRBSheetFrequency = useRef();
  const refRBSheetBackgrounds = useRef();
  const refRBSheetVisibility = useRef();
  const refRBSheetFrequencyEdit = useRef();
  const refRBSheetInstallmentsClick = useRef();
  const refRBSheetPayment = useRef();
  const refRBSheetFrequencyDetails = useRef();
  const [deletePress, setDeletePress] = useState(false);

  const [email, setEmail] = React.useState("");
  const [rating, setRating] = useState(3.5);
  const [typeSwitch, setTypeSwitch] = React.useState(false);
  const [stopShow, setStopShow] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [nameConfirm, setNameConfirm] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [movePress, setMovePress] = React.useState(false);
  const [checkboxPromos, setCheckboxPromos] = React.useState(true);
  const [cancelConfirm, setCancelConfirm] = useState(false);

  const [emailError, setEmailError] = React.useState("");
  const [fType, setFType] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [passwordError, setPasswordError] = React.useState("");
  const [error, setError] = React.useState("");
  const [authError, setAuthError] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [qty, setQty] = React.useState(1);
  const [sharedView, setSharedView] = React.useState(false);
  const [listName, setListName] = React.useState("List Name");
  const [gLoading, setGLoading] = React.useState(false);
  const [listView, setListView] = React.useState(false);
  const [dateSelected, setDateSelected] = React.useState(false);
  const [Items, setItems] = useState(1);

  const [gridView, setGridView] = React.useState(false);
  const [aLoading, setALoading] = React.useState(false);
  const [fLoading, setFLoading] = React.useState(false);
  const [authLoading, setAuthLoading] = React.useState(false);
  const [disable, setDisable] = React.useState(false);
  const [secureEntry, setSecureEntry] = React.useState(true);
  const [rightIcon, setRightIcon] = React.useState("eye");
  const [checkboxPromo, setCheckboxPromo] = React.useState(false);
  const [orderPlace, setOrderPlace] = React.useState(false);
  const [customCheckBox, setCustomCheckBox] = React.useState(false);
  const [dailyCheckBox, setDailyCheckBox] = React.useState(false);
  const [weeklyCheckBox, setWeeklyCheckBox] = React.useState(false);
  const [monthlyCheckBox, setMonthlyCheckBox] = React.useState(false);
  const [continueStop, setContinueStop] = React.useState(false);
  const [weeklyInstCheckBox, setWeeklyInstCheckBox] = React.useState(false);
  const [bweeklyInstCheckBox, setBWeeklyInstCheckBox] = React.useState(false);
  const [monthlyInstCheckBox, setMonthlyInstCheckBox] = React.useState(false);

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
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        width: "84%",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                          marginBottom: 3,
                        }}
                      >
                        September 15, 2023
                      </Text>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <View style={{ marginEnd: height / 50 }}>
                          <MaterialCommunityIcons
                            name="plus"
                            color={"black"}
                            size={height / 50}
                          />
                        </View>
                        <TouchableOpacity
                          onPress={() => refRBSheetVisibility.current.open()}
                          style={{ marginEnd: height / 50 }}
                        >
                          <MaterialIcons
                            name="ios-share"
                            color={checkboxPromo ? "green" : "black"}
                            size={height / 50}
                          />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setTypeSwitch(true)}>
                          <MaterialCommunityIcons
                            name="dots-horizontal"
                            color={"black"}
                            size={height / 50}
                          />

                          <Overlay
                            visible={typeSwitch}
                            overlayStyle={{
                              borderRadius: 5,

                              backgroundColor: theme.colors.background,
                              marginTop: height / -2.0,
                              marginStart: height / 4.4,
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
                              <TouchableOpacity
                                onPress={() => [
                                  setTypeSwitch(false),
                                  setEditShow(true),
                                ]}
                              >
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
                              {/* <MaterialCommunityIcons
                            name="chevron-right"
                            color={"gray"}
                            size={height / 50}
                          /> */}
                            </View>

                            <View
                              style={{
                                marginStart: height / 60,
                                marginEnd: height / 15,
                                marginTop: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => [
                                  setTypeSwitch(false),
                                  refRBSheetVisibility.current.open(),
                                ]}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Mediums-Font",
                                    fontSize: height / 75,
                                    color: checkboxPromo ? "green" : null,
                                  }}
                                >
                                  {checkboxPromo ? "Shared List" : "Share List"}{" "}
                                  {`    `}
                                </Text>
                              </TouchableOpacity>
                            </View>
                            {orderPlace ? (
                              <View
                                style={{
                                  marginStart: height / 60,
                                  marginEnd: height / 30,
                                  marginTop: 10,
                                }}
                              >
                                <TouchableOpacity
                                  onPress={() => [
                                    setTypeSwitch(false),
                                    setCancelConfirm(true),
                                    //refRBSheetFrequencyEdit.current.open(),
                                  ]}
                                >
                                  <Text
                                    style={{
                                      fontFamily: "Mediums-Font",
                                      fontSize: height / 75,
                                    }}
                                  >
                                    Cancel Order {`    `}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            ) : null}

                            <View
                              style={{
                                marginStart: height / 60,
                                marginEnd: height / 15,
                                marginTop: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => [
                                  setTypeSwitch(false),
                                  setDeletePress(true),
                                ]}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Mediums-Font",
                                    fontSize: height / 75,
                                  }}
                                >
                                  Delete Items {`    `}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          </Overlay>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 47,
                      }}
                    >
                      RESERVED LIST
                    </Text>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 60,
                        }}
                      >
                        {listName}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 70,
                        }}
                      >
                        {sharedView ? "  Shared (View Only)" : "  (Private)"}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              {Items > 0 ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: height / 40,
                    justifyContent: "space-between",
                    marginHorizontal: height / 33,
                  }}
                >
                  {orderPlace ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        flex: 1,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          Term
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          {weeklyInstCheckBox
                            ? "Weekly"
                            : bweeklyInstCheckBox
                            ? "Bi-Weekly"
                            : monthlyInstCheckBox
                            ? "Monthly"
                            : ""}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          Next Payment
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          Oct 29, 2023
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          Amount
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          $83.33
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          Balance
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                            textAlign: "center",
                          }}
                        >
                          $916.67
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => [
                          refRBSheetFrequency.current.open(),
                          // setDeleteConfirm(false),
                          // setListName(email),
                          //refRBSheetViewName.current.close(),
                        ]}
                      >
                        <ImageBackground
                          source={require("../assets/button.png")}
                          style={[styles.checkOutBtn, { width: height / 12 }]}
                        >
                          <Text
                            style={{
                              fontFamily: "Mediums-Font",
                              fontSize: height / 60,
                              textAlign: "center",
                              color: "white",
                              paddingVertical: height / 300,
                            }}
                          >
                            Place Order
                          </Text>
                        </ImageBackground>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <TouchableOpacity
                      onPress={() => [
                        refRBSheetFrequency.current.open(),
                        // setDeleteConfirm(false),
                        // setListName(email),
                        //refRBSheetViewName.current.close(),
                      ]}
                    >
                      <ImageBackground
                        source={require("../assets/button.png")}
                        style={[styles.checkOutBtn, { width: height / 8 }]}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 60,
                            textAlign: "center",
                            color: "white",
                            paddingVertical: height / 300,
                          }}
                        >
                          Place Order
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  )}

                  {orderPlace ? null : (
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                        textAlign: "right",
                      }}
                    >
                      Total: ${(qty * 51.95).toFixed(2)}
                    </Text>
                  )}
                </View>
              ) : null}
              {orderPlace ? (
                <View
                  style={{
                    width: "86%",
                    height: 1,
                    backgroundColor: "lightgray",
                    marginTop: height / 60,
                    alignSelf: "center",
                  }}
                ></View>
              ) : null}

              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: height / 50,
                  paddingBottom: 1,
                }}
              >
                {movePress ? (
                  <View>
                    {checkboxPromo ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setMovePress(false)}
                          style={{
                            alignSelf: "flex-end",
                            marginEnd: height / 30,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 70,
                              textAlign: "right",
                            }}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setMoveConfirm(true)}
                          // onPress={() => props.navigation.navigate("ViewLists")}
                          style={{ alignSelf: "flex-end", marginEnd: 4 }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 70,
                              textAlign: "right",
                              color: colors.MAIN,
                            }}
                          >
                            Move to
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        // onPress={() => setTypeSwitch(true)}
                        style={{ alignSelf: "flex-end", marginEnd: 4 }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 70,
                            textAlign: "right",
                          }}
                        >
                          Select All
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}

                {deletePress ? (
                  <View>
                    {checkboxPromo ? (
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "flex-end",
                        }}
                      >
                        <TouchableOpacity
                          onPress={() => setDeletePress(false)}
                          style={{
                            alignSelf: "flex-end",
                            marginEnd: height / 30,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 70,
                              textAlign: "right",
                            }}
                          >
                            Cancel
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => setDeleteConfirm(true)}
                          style={{ alignSelf: "flex-end", marginEnd: 4 }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 70,
                              textAlign: "right",
                              color: colors.MAIN,
                            }}
                          >
                            Delete
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <TouchableOpacity
                        // onPress={() => setTypeSwitch(true)}
                        style={{ alignSelf: "flex-end", marginEnd: 4 }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 70,
                            textAlign: "right",
                          }}
                        >
                          Select All
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                ) : null}

                {Items > 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: 2,
                    }}
                  >
                    {deletePress || movePress ? (
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                          checkboxPromo == false
                            ? setCheckboxPromo(true)
                            : setCheckboxPromo(false),
                        ]}
                        style={{
                          flexDirection: "row",
                          marginBottom: 6,
                        }}
                      >
                        {checkboxPromo ? (
                          <MaterialCommunityIcons
                            name="square-circle"
                            color={colors.MAIN}
                            size={height / 40}
                          />
                        ) : (
                          <FontAwesome name="square-o" size={height / 40} />
                        )}
                      </TouchableOpacity>
                    ) : null}

                    <LinearGradient
                      colors={["#ffffff", "lightgray"]}
                      style={styles.bestSellerBack}
                    >
                      <View
                        style={{ flexDirection: "row", alignSelf: "flex-end" }}
                      >
                        {/* <TouchableOpacity
                            style={{ marginEnd: height / 50 }}
                            onPress={() => setMovePress(true)}
                          >
                            <MaterialCommunityIcons
                              name="wrap"
                              size={height / 60}
                            />
                          </TouchableOpacity> */}
                        <TouchableOpacity
                          onPress={() => refRBSheetVisibility.current.open()}
                          style={{ marginEnd: height / 60 }}
                        >
                          <MaterialIcons name="ios-share" size={height / 60} />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 2,
                          marginBottom: 3,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
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
                          fontFamily: "GlacialIndifference-Bold",
                        }}
                      >
                        $51.95
                      </Text>

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
                          marginTop: height / 95,
                        }}
                      >
                        <TouchableOpacity
                          style={{
                            paddingHorizontal: height / 100,
                            paddingVertical: height / 150,
                            backgroundColor: "white",
                            borderWidth: 1,
                            borderColor: colors.MAIN,
                            borderRadius: 5,
                            width: height / 9.2,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 80,
                              textAlign: "center",
                            }}
                          >
                            REMOVE
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
                              width: height / 10.3,
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
                    </LinearGradient>
                    <View style={styles.sellerCircle}>
                      <Image
                        source={require("../assets/product.png")}
                        style={{ height: 80, width: 80, resizeMode: "contain" }}
                      />
                    </View>
                  </View>
                ) : (
                  <View style={{ marginTop: height / 5 }}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                        textAlign: "center",
                      }}
                    >
                      Your list is empty.
                    </Text>

                    <View style={{ marginTop: 10 }}>
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          You can add items by pressing '+' or{` `}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          by tapping on the{` `}
                        </Text>

                        <MaterialCommunityIcons
                          name="cards-heart-outline"
                          color={colors.MAIN}
                          size={height / 60}
                        />
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          on the products.
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: height / 37,
                  marginTop: height / 48,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: colors.MAIN,
                    paddingHorizontal: height / 40,
                    paddingVertical: height / 120,
                    width: height / 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 60,
                      textAlign: "center",
                    }}
                  >
                    Add to Cart
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: colors.MAIN,
                    paddingHorizontal: height / 40,
                    paddingVertical: height / 120,
                    marginStart: height / 80,
                    width: height / 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 60,
                      textAlign: "center",
                    }}
                  >
                    Buy Now
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setStopShow(true)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: colors.MAIN,
                    paddingHorizontal: height / 40,
                    paddingVertical: height / 120,
                    marginStart: height / 80,
                    width: height / 8,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 60,
                      textAlign: "center",
                    }}
                  >
                    Stop
                  </Text>
                </TouchableOpacity>
              </View> */}

              <Overlay
                visible={deleteConfirm}
                overlayStyle={{
                  borderRadius: 5,
                  padding: height / 20,
                  backgroundColor: theme.colors.background,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 45,
                      textAlign: "center",
                    }}
                  >
                    Are you sure{`\n`}you want to delete?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 22,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => [
                      setDeleteConfirm(false),
                      // setListName(email),
                      //refRBSheetViewName.current.close(),
                    ]}
                  >
                    <ImageBackground
                      source={require("../assets/topbar.png")}
                      style={[
                        styles.checkOutBtn,
                        { width: height / 8, marginEnd: 13 },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: "white",
                          paddingVertical: height / 300,
                        }}
                      >
                        Yes
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [
                      setDeleteConfirm(false),
                      //refRBSheetViewName.current.close(),
                    ]}
                    style={{
                      paddingHorizontal: height / 53,
                      paddingVertical: height / 300,
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: colors.MAIN,
                      borderRadius: 4,
                      marginEnd: 4,
                      width: height / 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 60,
                        textAlign: "center",
                      }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </Overlay>

              <Overlay
                visible={cancelConfirm}
                overlayStyle={{
                  borderRadius: 5,
                  padding: height / 20,
                  backgroundColor: theme.colors.background,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 45,
                      textAlign: "center",
                    }}
                  >
                    Are you sure you want{`\n`}to cancel the order?
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 75,
                      textAlign: "center",
                      marginTop: 3,
                    }}
                  >
                    (You can cancel this order with{`\n`}full refund before
                    DD-MM-YYYY)
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 62,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => [
                      setCancelConfirm(false),
                      setOrderPlace(false),
                      // setListName(email),
                      //refRBSheetViewName.current.close(),
                    ]}
                  >
                    <ImageBackground
                      source={require("../assets/topbar.png")}
                      style={[
                        styles.checkOutBtn,
                        { width: height / 8, marginEnd: 13 },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: "white",
                          paddingVertical: height / 300,
                        }}
                      >
                        Yes
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [
                      setCancelConfirm(false),
                      //refRBSheetViewName.current.close(),
                    ]}
                    style={{
                      paddingHorizontal: height / 53,
                      paddingVertical: height / 300,
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: colors.MAIN,
                      borderRadius: 4,
                      marginEnd: 4,
                      width: height / 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 60,
                        textAlign: "center",
                      }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </Overlay>
            </ScrollView>
            <Overlay
              visible={editShow}
              overlayStyle={{
                borderRadius: 5,

                backgroundColor: theme.colors.background,
                marginTop: height / -2.8,
                marginStart: height / 4,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                  onPress={() => setEditShow(false)}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 75,
                    }}
                  >
                    {`      `}FREQUENCY {`    `}
                  </Text>
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
                <TouchableOpacity
                  onPress={() => [
                    // setEditShow(false),
                    // setFType('DAILY'),
                    // refRBSheetViewName.current.open(),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                    }}
                  >
                    Custom {`    `}
                  </Text>
                </TouchableOpacity>
                {/* <MaterialCommunityIcons
                            name="chevron-right"
                            color={"gray"}
                            size={height / 50}
                          /> */}
              </View>

              <View
                style={{
                  marginStart: height / 60,
                  marginEnd: height / 15,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => [
                    setEditShow(false),
                    setFType("DAILY"),
                    refRBSheetFrequency.current.open(),
                  ]}
                >
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
                <TouchableOpacity
                  onPress={() => [
                    setEditShow(false),
                    setFType("WEEKLY"),
                    refRBSheetFrequency.current.open(),
                  ]}
                >
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
                <TouchableOpacity
                  onPress={() => [
                    setEditShow(false),
                    setFType("MONTHLY"),
                    refRBSheetFrequency.current.open(),
                  ]}
                >
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
              <View
                style={{
                  marginStart: height / 60,
                  marginEnd: height / 15,
                  marginTop: 10,
                }}
              >
                <TouchableOpacity
                  onPress={() => [
                    setEditShow(false),
                    setFType("ANNUALLY"),
                    refRBSheetFrequency.current.open(),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                    }}
                  >
                    Annually {`    `}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 10,
                  alignSelf: "flex-end",
                  marginEnd: 2,
                }}
              >
                <TouchableOpacity
                  onPress={() => [setTypeSwitch(true), setEditShow(false)]}
                >
                  <Image
                    source={require("../assets/back.png")}
                    style={{
                      resizeMode: "contain",
                      height: height / 42,
                      width: width / 30,
                      marginStart: 2,
                    }}
                  />
                </TouchableOpacity>
              </View>
            </Overlay>

            <Overlay
              visible={stopShow}
              overlayStyle={{
                borderRadius: 5,

                backgroundColor: theme.colors.background,
                marginTop: height / -2.5,
                marginStart: height / 4.4,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                  }}
                  onPress={() => [setStopShow(false), setTypeSwitch(true)]}
                >
                  <MaterialCommunityIcons name="close" />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [setStopShow(false)]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 70,
                  }}
                >
                  Stop All
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
                  marginTop: height / 98,
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
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  Date 1
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
                  marginTop: height / 98,
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
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                    width: height / 10,
                  }}
                >
                  Date 2
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
                  marginTop: height / 98,
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
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                    width: height / 10,
                  }}
                >
                  Date 3
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
                  marginTop: height / 98,
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
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                    width: height / 10,
                  }}
                >
                  Date 4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ alignSelf: "flex-end" }}
                onPress={() => [setStopShow(false), setTypeSwitch(true)]}
              >
                <Image
                  source={require("../assets/back.png")}
                  style={{
                    resizeMode: "contain",
                    height: height / 42,
                    width: width / 30,
                    marginStart: 2,
                  }}
                />
              </TouchableOpacity>
            </Overlay>

            <RBSheet
              ref={refRBSheetFrequency}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 2.3}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                draggableIcon: {
                  backgroundColor: "#000",
                },
              }}
            >
              <Overlay
                visible={nameConfirm}
                overlayStyle={{
                  borderRadius: 5,
                  padding: height / 20,
                  backgroundColor: theme.colors.background,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 45,
                      textAlign: "center",
                    }}
                  >
                    Are you sure you want{`\n`}to change the name?
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 22,
                  }}
                >
                  <TouchableOpacity
                    onPress={() => [
                      setNameConfirm(false),
                      setListName(email),
                      refRBSheetFrequency.current.close(),
                    ]}
                  >
                    <ImageBackground
                      source={require("../assets/topbar.png")}
                      style={[
                        styles.checkOutBtn,
                        { width: height / 8, marginEnd: 13 },
                      ]}
                    >
                      <Text
                        style={{
                          fontFamily: "Mediums-Font",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: "white",
                          paddingVertical: height / 300,
                        }}
                      >
                        Yes
                      </Text>
                    </ImageBackground>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => [
                      setNameConfirm(false),
                      refRBSheetFrequency.current.close(),
                    ]}
                    style={{
                      paddingHorizontal: height / 53,
                      paddingVertical: height / 300,
                      backgroundColor: "white",
                      borderWidth: 1,
                      borderColor: colors.MAIN,
                      borderRadius: 4,
                      marginEnd: 4,
                      width: height / 8,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "Mediums-Font",
                        fontSize: height / 60,
                        textAlign: "center",
                      }}
                    >
                      No
                    </Text>
                  </TouchableOpacity>
                </View>
              </Overlay>
              <View style={{ paddingHorizontal: height / 40 }}>
                <TouchableOpacity
                  onPress={() => refRBSheetFrequency.current.close()}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 80,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 50,
                    marginTop: height / 50,
                  }}
                >
                  DURATION
                </Text>

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 50,
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      customCheckBox == false
                        ? setCustomCheckBox(true)
                        : setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setWeeklyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    {customCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      3 Months
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      dailyCheckBox == false
                        ? setDailyCheckBox(true)
                        : setDailyCheckBox(false),
                      setCustomCheckBox(false),
                      setWeeklyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginStart: height / 40,
                      marginBottom: 6,
                    }}
                  >
                    {dailyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      6 Months
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      weeklyCheckBox == false
                        ? setWeeklyCheckBox(true)
                        : setWeeklyCheckBox(false),
                      setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                      marginStart: height / 40,
                    }}
                  >
                    {weeklyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      12 Months
                    </Text>
                  </TouchableOpacity>
                </View>

                {customCheckBox || dailyCheckBox || weeklyCheckBox ? (
                  <View
                    style={{
                      marginTop: height / 39,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                      }}
                    >
                      INSTALLMENTS
                    </Text>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: height / 50,
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                          weeklyInstCheckBox == false
                            ? setWeeklyInstCheckBox(true)
                            : setWeeklyInstCheckBox(false),
                          setBWeeklyInstCheckBox(false),
                          setMonthlyInstCheckBox(false),
                        ]}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 6,
                        }}
                      >
                        {weeklyInstCheckBox ? (
                          <MaterialCommunityIcons
                            name="square-circle"
                            color={colors.MAIN}
                            size={height / 50}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="square-outline"
                            size={height / 50}
                          />
                        )}

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 55,
                            marginStart: height / 90,
                          }}
                        >
                          Weekly
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                          bweeklyInstCheckBox == false
                            ? setBWeeklyInstCheckBox(true)
                            : setBWeeklyInstCheckBox(false),
                          setWeeklyInstCheckBox(false),
                          setMonthlyInstCheckBox(false),
                        ]}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginStart: height / 40,
                          marginBottom: 6,
                        }}
                      >
                        {bweeklyInstCheckBox ? (
                          <MaterialCommunityIcons
                            name="square-circle"
                            color={colors.MAIN}
                            size={height / 50}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="square-outline"
                            size={height / 50}
                          />
                        )}

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 55,
                            marginStart: height / 90,
                          }}
                        >
                          Bi-Weekly
                        </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                        activeOpacity={1}
                        onPress={() => [
                          monthlyInstCheckBox == false
                            ? setMonthlyInstCheckBox(true)
                            : setMonthlyInstCheckBox(false),
                          setWeeklyInstCheckBox(false),
                          setBWeeklyInstCheckBox(false),
                        ]}
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginBottom: 6,
                          marginStart: height / 40,
                        }}
                      >
                        {monthlyInstCheckBox ? (
                          <MaterialCommunityIcons
                            name="square-circle"
                            color={colors.MAIN}
                            size={height / 50}
                          />
                        ) : (
                          <MaterialCommunityIcons
                            name="square-outline"
                            size={height / 50}
                          />
                        )}

                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 55,
                            marginStart: height / 90,
                          }}
                        >
                          Monthly
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : null}

                {dailyCheckBox ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      continueStop == false
                        ? setContinueStop(true)
                        : setContinueStop(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                      position: "absolute",
                      top: height / 3,
                      left: height / 30,
                    }}
                  >
                    {continueStop ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Continue untill stopped
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <RBSheet
                  ref={refRBSheetInstallmentsClick}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  height={height / 2.32}
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
                        justifyContent: "space-between",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() =>
                          refRBSheetInstallmentsClick.current.close()
                        }
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                            color: colors.MAIN,
                            paddingEnd: 3,
                          }}
                        >
                          BACK
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() =>
                          refRBSheetInstallmentsClick.current.close()
                        }
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 80,
                            color: colors.MAIN,
                            textAlign: "right",
                            paddingEnd: 3,
                          }}
                        >
                          CANCEL
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 3,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 55,
                          marginTop: 10,
                          textAlign: "left",
                        }}
                      >
                        INSTALLMENTS -{" "}
                        {weeklyInstCheckBox
                          ? "WEEKLY"
                          : bweeklyInstCheckBox
                          ? "BI-WEEKLY"
                          : monthlyInstCheckBox
                          ? "MONTHLY"
                          : ""}
                      </Text>
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 55,
                          marginTop: 10,
                          textAlign: "right",
                        }}
                      >
                        Total ${(qty * 51.92).toFixed(2)}
                      </Text>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: height / 40,
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: height / 80,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 55,
                            marginTop: 3,
                          }}
                        >
                          Start Date
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 55,
                            marginTop: 3,
                            marginStart: height / 20,
                          }}
                        >
                          DD-MM-YYYY
                        </Text>
                      </View>
                    </View>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginTop: height / 30,
                        textAlign: "center",
                        paddingHorizontal: height / 46,
                      }}
                    >
                      By pressing "Place your Order", default payment method
                      {`\n`}
                      ending in *6789 will be charged
                    </Text>

                    <TouchableOpacity
                      style={{ marginTop: height / 10 }}
                      onPress={() => [
                        setOrderPlace(true),
                        refRBSheetInstallmentsClick.current.close(),
                        refRBSheetFrequency.current.close(),

                        props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
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
                            paddingVertical: height / 200,
                          }}
                        >
                          Place your order
                        </Text>
                      </ImageBackground>
                    </TouchableOpacity>
                  </View>
                </RBSheet>
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: height / 3,
                    right: height / 30,
                  }}
                  onPress={() => [
                    //setOrderPlace(true),
                    // refRBSheetFrequency.current.close(),
                    refRBSheetInstallmentsClick.current.open(),
                    //props.navigation.navigate("CheckoutCompleteInfo"),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 60,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    {weeklyInstCheckBox ||
                    bweeklyInstCheckBox ||
                    monthlyInstCheckBox
                      ? "CONTINUE"
                      : ""}
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetFrequencyEdit}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 2.3}
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
                <TouchableOpacity
                  onPress={() => refRBSheetFrequencyEdit.current.close()}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 80,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 50,
                  }}
                >
                  EDIT ORDER DETAILS
                </Text>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 55,
                    marginTop: height / 110,
                  }}
                >
                  You can make changes to your{`\n`}upcoming orders (48 hours
                  prior) below
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 30,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      customCheckBox == false
                        ? setCustomCheckBox(true)
                        : setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setWeeklyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    {customCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Custom
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      dailyCheckBox == false
                        ? setDailyCheckBox(true)
                        : setDailyCheckBox(false),
                      setCustomCheckBox(false),
                      setWeeklyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginStart: height / 40,
                      marginBottom: 6,
                    }}
                  >
                    {dailyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Daily
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      weeklyCheckBox == false
                        ? setWeeklyCheckBox(true)
                        : setWeeklyCheckBox(false),
                      setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                      marginStart: height / 40,
                    }}
                  >
                    {weeklyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Weekly
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      monthlyCheckBox == false
                        ? setMonthlyCheckBox(true)
                        : setMonthlyCheckBox(false),
                      setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setWeeklyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginStart: height / 40,
                      marginBottom: 6,
                    }}
                  >
                    {monthlyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Monthly
                    </Text>
                  </TouchableOpacity>
                </View>

                {customCheckBox ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: height / 25,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                      }}
                    >
                      Schedule
                    </Text>

                    <TouchableOpacity
                      onPress={() => setDateSelected(true)}
                      style={{
                        marginStart: height / 60,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: height / 7,
                        justifyContent: "center",
                        paddingVertical: height / 150,
                        backgroundColor: colors.MAIN,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: dateSelected ? colors.MAIN : null,
                          color: "white",
                        }}
                      >
                        Multiple
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : dailyCheckBox ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: height / 39,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                      }}
                    >
                      Start
                    </Text>

                    <TouchableOpacity
                      onPress={() => setDateSelected(true)}
                      style={{
                        marginStart: height / 60,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: height / 7,
                        justifyContent: "center",
                        paddingVertical: height / 150,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: dateSelected ? colors.MAIN : null,
                        }}
                      >
                        {dateSelected ? "Selected" : "DD-MM-YYYY"}
                      </Text>
                    </TouchableOpacity>

                    {continueStop ? null : (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginStart: height / 50,
                          }}
                        >
                          End
                        </Text>
                        <TouchableOpacity
                          onPress={() => setDateSelected(true)}
                          style={{
                            marginStart: height / 60,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            width: height / 7,
                            justifyContent: "center",
                            paddingVertical: height / 150,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 60,
                              textAlign: "center",
                              color: dateSelected ? colors.MAIN : null,
                            }}
                          >
                            {dateSelected ? "Selected" : "DD-MM-YYYY"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : weeklyCheckBox ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Number of Weeks
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          3
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Start
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                            color: dateSelected ? colors.MAIN : null,
                          }}
                        >
                          {dateSelected ? "Selected" : "DD-MM-YYYY"}
                        </Text>
                      </TouchableOpacity>

                      {/* {continueStop ? null : (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 50,
                              marginStart: height / 50,
                            }}
                          >
                            End
                          </Text>
                          <TouchableOpacity
                            onPress={() => setDateSelected(true)}
                            style={{
                              marginStart: height / 60,
                              borderWidth: 1,
                              borderColor: "lightgray",
                              width: height / 7,
                              justifyContent: "center",
                              paddingVertical: height / 150,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 60,
                                textAlign: "center",
                                color: dateSelected ? colors.MAIN : null,
                              }}
                            >
                              {dateSelected ? "Selected" : "DD-MM-YYYY"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )} */}
                    </View>
                  </View>
                ) : monthlyCheckBox ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Number of Months
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          3
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Start
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                            color: dateSelected ? colors.MAIN : null,
                          }}
                        >
                          {dateSelected ? "Selected" : "DD-MM-YYYY"}
                        </Text>
                      </TouchableOpacity>

                      {/* {continueStop ? null : (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 50,
                              marginStart: height / 50,
                            }}
                          >
                            End
                          </Text>
                          <TouchableOpacity
                            onPress={() => setDateSelected(true)}
                            style={{
                              marginStart: height / 60,
                              borderWidth: 1,
                              borderColor: "lightgray",
                              width: height / 7,
                              justifyContent: "center",
                              paddingVertical: height / 150,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 60,
                                textAlign: "center",
                                color: dateSelected ? colors.MAIN : null,
                              }}
                            >
                              {dateSelected ? "Selected" : "DD-MM-YYYY"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )} */}
                    </View>
                  </View>
                ) : null}

                {dailyCheckBox ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      continueStop == false
                        ? setContinueStop(true)
                        : setContinueStop(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                      position: "absolute",
                      top: height / 3,
                      left: height / 30,
                    }}
                  >
                    {continueStop ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Continue untill stopped
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: height / 3,
                    right: height / 30,
                  }}
                  onPress={() => [
                    //setOrderPlace(true),
                    refRBSheetFrequencyEdit.current.close(),
                    //props.navigation.navigate("CheckoutCompleteInfo"),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 60,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    CONTINUE
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetFrequencyDetails}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 2.3}
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
                <TouchableOpacity
                  onPress={() => refRBSheetFrequencyDetails.current.close()}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 80,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 50,
                  }}
                >
                  YOURBORDER HAS BEEN CONFIRMED
                </Text>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 55,
                    marginTop: height / 110,
                  }}
                >
                  You can edit or make changes to your{`\n`}upcoming orders (48
                  hours prior) below
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 30,
                  }}
                >
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      customCheckBox == false
                        ? setCustomCheckBox(true)
                        : setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setWeeklyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                    }}
                  >
                    {customCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Custom
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      dailyCheckBox == false
                        ? setDailyCheckBox(true)
                        : setDailyCheckBox(false),
                      setCustomCheckBox(false),
                      setWeeklyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginStart: height / 40,
                      marginBottom: 6,
                    }}
                  >
                    {dailyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Daily
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      weeklyCheckBox == false
                        ? setWeeklyCheckBox(true)
                        : setWeeklyCheckBox(false),
                      setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setMonthlyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                      marginStart: height / 40,
                    }}
                  >
                    {weeklyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Weekly
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      monthlyCheckBox == false
                        ? setMonthlyCheckBox(true)
                        : setMonthlyCheckBox(false),
                      setCustomCheckBox(false),
                      setDailyCheckBox(false),
                      setWeeklyCheckBox(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginStart: height / 40,
                      marginBottom: 6,
                    }}
                  >
                    {monthlyCheckBox ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Monthly
                    </Text>
                  </TouchableOpacity>
                </View>

                {customCheckBox ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: height / 25,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                      }}
                    >
                      Schedule
                    </Text>

                    <TouchableOpacity
                      onPress={() => setDateSelected(true)}
                      style={{
                        marginStart: height / 60,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: height / 7,
                        justifyContent: "center",
                        paddingVertical: height / 150,
                        backgroundColor: colors.MAIN,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: dateSelected ? colors.MAIN : null,
                          color: "white",
                        }}
                      >
                        Multiple
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : dailyCheckBox ? (
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: height / 39,
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 50,
                      }}
                    >
                      Start
                    </Text>

                    <TouchableOpacity
                      onPress={() => setDateSelected(true)}
                      style={{
                        marginStart: height / 60,
                        borderWidth: 1,
                        borderColor: "lightgray",
                        width: height / 7,
                        justifyContent: "center",
                        paddingVertical: height / 150,
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Regular",
                          fontSize: height / 60,
                          textAlign: "center",
                          color: dateSelected ? colors.MAIN : null,
                        }}
                      >
                        {dateSelected ? "Selected" : "DD-MM-YYYY"}
                      </Text>
                    </TouchableOpacity>

                    {continueStop ? null : (
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 50,
                            marginStart: height / 50,
                          }}
                        >
                          End
                        </Text>
                        <TouchableOpacity
                          onPress={() => setDateSelected(true)}
                          style={{
                            marginStart: height / 60,
                            borderWidth: 1,
                            borderColor: "lightgray",
                            width: height / 7,
                            justifyContent: "center",
                            paddingVertical: height / 150,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 60,
                              textAlign: "center",
                              color: dateSelected ? colors.MAIN : null,
                            }}
                          >
                            {dateSelected ? "Selected" : "DD-MM-YYYY"}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                ) : weeklyCheckBox ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Number of Weeks
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          3
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Start
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                            color: dateSelected ? colors.MAIN : null,
                          }}
                        >
                          {dateSelected ? "Selected" : "DD-MM-YYYY"}
                        </Text>
                      </TouchableOpacity>

                      {/* {continueStop ? null : (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 50,
                              marginStart: height / 50,
                            }}
                          >
                            End
                          </Text>
                          <TouchableOpacity
                            onPress={() => setDateSelected(true)}
                            style={{
                              marginStart: height / 60,
                              borderWidth: 1,
                              borderColor: "lightgray",
                              width: height / 7,
                              justifyContent: "center",
                              paddingVertical: height / 150,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 60,
                                textAlign: "center",
                                color: dateSelected ? colors.MAIN : null,
                              }}
                            >
                              {dateSelected ? "Selected" : "DD-MM-YYYY"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )} */}
                    </View>
                  </View>
                ) : monthlyCheckBox ? (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Number of Months
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          3
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        marginTop: height / 39,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontFamily: "GlacialIndifference-Bold",
                          fontSize: height / 50,
                        }}
                      >
                        Start
                      </Text>
                      <TouchableOpacity
                        onPress={() => setDateSelected(true)}
                        style={{
                          marginStart: height / 60,
                          borderWidth: 1,
                          borderColor: "lightgray",
                          width: height / 7,
                          justifyContent: "center",
                          paddingVertical: height / 150,
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 60,
                            textAlign: "center",
                            color: dateSelected ? colors.MAIN : null,
                          }}
                        >
                          {dateSelected ? "Selected" : "DD-MM-YYYY"}
                        </Text>
                      </TouchableOpacity>

                      {/* {continueStop ? null : (
                        <View
                          style={{ flexDirection: "row", alignItems: "center" }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 50,
                              marginStart: height / 50,
                            }}
                          >
                            End
                          </Text>
                          <TouchableOpacity
                            onPress={() => setDateSelected(true)}
                            style={{
                              marginStart: height / 60,
                              borderWidth: 1,
                              borderColor: "lightgray",
                              width: height / 7,
                              justifyContent: "center",
                              paddingVertical: height / 150,
                            }}
                          >
                            <Text
                              style={{
                                fontFamily: "GlacialIndifference-Regular",
                                fontSize: height / 60,
                                textAlign: "center",
                                color: dateSelected ? colors.MAIN : null,
                              }}
                            >
                              {dateSelected ? "Selected" : "DD-MM-YYYY"}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )} */}
                    </View>
                  </View>
                ) : null}

                {dailyCheckBox ? (
                  <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => [
                      continueStop == false
                        ? setContinueStop(true)
                        : setContinueStop(false),
                    ]}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginBottom: 6,
                      position: "absolute",
                      top: height / 3,
                      left: height / 30,
                    }}
                  >
                    {continueStop ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 50}
                      />
                    ) : (
                      <MaterialCommunityIcons
                        name="square-outline"
                        size={height / 50}
                      />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginStart: height / 90,
                      }}
                    >
                      Continue untill stopped
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    top: height / 3,
                    right: height / 30,
                  }}
                  onPress={() => [
                    //setOrderPlace(true),
                    refRBSheetFrequencyEdit.current.close(),
                    //props.navigation.navigate("CheckoutCompleteInfo"),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 60,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    SAVE
                  </Text>
                </TouchableOpacity>
              </View>
            </RBSheet>

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
            <RBSheet
              ref={refRBSheetVisibility}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 3.2}
              customStyles={{
                wrapper: {
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                draggableIcon: {
                  backgroundColor: "#000",
                },
              }}
            >
              <TouchableOpacity
                style={{ marginEnd: height / 40 }}
                onPress={() => [
                  refRBSheetVisibility.current.close(),
                  //props.navigation.navigate("AddressBook"),
                ]}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 80,
                    color: colors.MAIN,
                    textAlign: "right",
                  }}
                >
                  CANCEL
                </Text>
              </TouchableOpacity>
              <View style={{ paddingHorizontal: height / 25 }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => [
                    checkboxPromos == false
                      ? setCheckboxPromos(true)
                      : setCheckboxPromos(false),
                    setCheckboxPromo(false),
                  ]}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 38,
                    marginBottom: 6,
                  }}
                >
                  {checkboxPromos ? (
                    <MaterialCommunityIcons
                      name="square-circle"
                      color={colors.MAIN}
                      size={height / 40}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={height / 40}
                    />
                  )}

                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 46,
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
                    setCheckboxPromos(false),
                  ]}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 80,
                    marginBottom: 6,
                  }}
                >
                  {checkboxPromo ? (
                    <MaterialCommunityIcons
                      name="square-circle"
                      color={colors.MAIN}
                      size={height / 40}
                    />
                  ) : (
                    <MaterialCommunityIcons
                      name="checkbox-blank-outline"
                      size={height / 40}
                    />
                  )}

                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 46,
                      marginStart: height / 60,
                    }}
                  >
                    Shared
                  </Text>
                </TouchableOpacity>
              </View>

              {checkboxPromo ? (
                <View
                  style={{
                    paddingHorizontal: height / 12,
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 70,
                  }}
                >
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
                    }}
                  >
                    {!checkboxPromo ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 45}
                      />
                    ) : (
                      <FontAwesome name="square-o" size={height / 45} />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 58,
                        marginStart: height / 70,
                      }}
                    >
                      View Only
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
                      marginStart: height / 25,
                    }}
                  >
                    {checkboxPromo ? (
                      <MaterialCommunityIcons
                        name="square-circle"
                        color={colors.MAIN}
                        size={height / 45}
                      />
                    ) : (
                      <FontAwesome name="square-o" size={height / 45} />
                    )}

                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 58,
                        marginStart: height / 60,
                      }}
                    >
                      With Edit
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : null}

              {/* <View
                style={{
                  paddingHorizontal: height / 25,
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: height / 33,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 58,
                  }}
                >
                  View List
                </Text>
                <MaterialCommunityIcons
                  name="chevron-down"
                  color={"black"}
                  size={height / 50}
                />
              </View> */}
            </RBSheet>

            <RBSheet
              ref={refRBSheetBackgrounds}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 2}
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
                    fontSize: height / 45,
                    marginTop: 3,
                  }}
                >
                  Beautiful Day Today!
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: height / 80,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                    }}
                  ></View>
                </View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: height / 80,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                    }}
                  ></View>
                </View>
              </View>

              <View
                style={{
                  paddingHorizontal: height / 40,
                  marginTop: height / 26,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 53,
                      marginTop: 3,
                    }}
                  >
                    Your Pictures
                  </Text>
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 53,
                      marginTop: 3,
                      marginEnd: 4,
                    }}
                  >
                    Upload
                  </Text>
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: height / 80,
                  }}
                >
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                      marginEnd: 10,
                    }}
                  ></View>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "gray",
                      padding: 38,
                    }}
                  ></View>
                </View>
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetInstallmentsClick}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 2.54}
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
                <TouchableOpacity
                  onPress={() => refRBSheetInstallmentsClick.current.close()}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Bold",
                      fontSize: height / 80,
                      color: colors.MAIN,
                      textAlign: "right",
                      paddingEnd: 3,
                    }}
                  >
                    CANCEL
                  </Text>
                </TouchableOpacity>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 55,
                    marginTop: 10,
                    textAlign: "right",
                  }}
                >
                  Total ${(qty * 51.92).toFixed(2)}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 80,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      marginTop: height / 80,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 55,
                        marginTop: 3,
                      }}
                    >
                      Start Date
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 55,
                        marginTop: 3,
                        marginStart: height / 20,
                      }}
                    >
                      DD-MM-YYYY
                    </Text>
                  </View>
                </View>
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 55,
                    marginTop: height / 40,
                    textAlign: "center",
                    paddingHorizontal: height / 46,
                  }}
                >
                  By pressing "Place your Order", default payment method{`\n`}
                  ending in *6789 will be charged
                </Text>

                <TouchableOpacity
                  style={{ marginTop: height / 12 }}
                  onPress={() => [
                    refRBSheetInstallmentsClick.current.close(),
                    props.navigation.navigate("CheckoutCompleteInfo"),
                  ]}
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
                        paddingVertical: height / 200,
                      }}
                    >
                      Place your order
                    </Text>
                  </ImageBackground>
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
                onPress={() => props.navigation.navigate("ViewLists")}
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
    checkOutBtn: {
      paddingVertical: 1,
      overflow: "hidden",
      resizeMode: "contain",
      borderRadius: 4,
      justifyContent: "center",
      width: width / 1.3,
      alignSelf: "center",
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
