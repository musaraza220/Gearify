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

export default function Registry(props) {
  const refRBSheetViewInst = useRef();
  const refRBSheetViewName = useRef();
  const refRBSheetBackgrounds = useRef();
  const refRBSheetVisibility = useRef();
  const refRBSheetInstallmentsClick = useRef();
  const refRBSheetPayment = useRef();
  const refRBSheetPayments = useRef();

  const [email, setEmail] = React.useState("");
  const [rating, setRating] = useState(3.5);
  const [typeSwitch, setTypeSwitch] = React.useState(false);
  const [stopShow, setStopShow] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [nameConfirm, setNameConfirm] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [orderDone, setOrderDone] = React.useState(false);
  const [movePress, setMovePress] = React.useState(false);
  const [checkboxPromos, setCheckboxPromos] = useState(true);

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
  const [duration, setDuration] = React.useState("Duration");
  const [installments, setInstallments] = React.useState("Installments");
  const [showInstallment, setShowInstallment] = React.useState(false);
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
                        <TouchableOpacity
                          onPress={() =>
                            props.navigation.navigate("AddInListSearch")
                          }
                          style={{ marginEnd: height / 50 }}
                        >
                          <MaterialCommunityIcons
                            name="plus"
                            color={"black"}
                            size={height / 50}
                          />
                        </TouchableOpacity>
                        <View style={{ marginEnd: height / 50 }}>
                          <MaterialIcons
                            name="ios-share"
                            color={"black"}
                            size={height / 50}
                          />
                        </View>

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

                            {/* <View
                              style={{
                                marginStart: height / 60,
                                marginEnd: height / 15,
                                marginTop: 10,
                              }}
                            >
                              <TouchableOpacity
                                onPress={() => [
                                  setTypeSwitch(false),
                                  setDeleteConfirm(true),
                                ]}
                              >
                                <Text
                                  style={{
                                    fontFamily: "Mediums-Font",
                                    fontSize: height / 75,
                                  }}
                                >
                                  Delete {`    `}
                                </Text>
                              </TouchableOpacity>
                            </View> */}
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
                                  setMovePress(true),
                                ]}
                              >
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
                              <TouchableOpacity
                                onPress={() => [
                                  setTypeSwitch(false),
                                  props.navigation.navigate("ViewListsCombine"),
                                ]}
                              >
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
                          </Overlay>
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 47,
                          }}
                        >
                          RESERVED
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
                            {sharedView
                              ? "  Shared (View Only)"
                              : "  (Private)"}
                          </Text>
                        </View>
                      </View>

                      <View style={{ marginStart: height / 12 }}>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 70,
                            textAlign: "center",
                          }}
                        >
                          Total
                          {/* {duration === "Duration" ? "Total" : "Remaining"} */}
                        </Text>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Bold",
                            fontSize: height / 60,
                            textAlign: "center",
                          }}
                        >
                          $1000
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginHorizontal: height / 37,
                  marginTop: height / 48,
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  onPress={() => setStopShow(true)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: colors.MAIN,
                    paddingHorizontal: height / 40,
                    paddingVertical: height / 120,
                    width: height / 8,
                    flexDirection: "row",
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
                    {duration}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    color={"black"}
                    size={height / 50}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => setShowInstallment(true)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 2,
                    borderColor: colors.MAIN,
                    paddingHorizontal: height / 40,
                    paddingVertical: height / 120,
                    marginStart: height / 80,
                    width: height / 8,
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
                    {installments}
                    {`    `}
                  </Text>
                  <MaterialCommunityIcons
                    name="chevron-down"
                    color={"black"}
                    size={height / 50}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => refRBSheetPayments.current.open()}
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
                    Pay Now
                  </Text>
                </TouchableOpacity>
              </View>

              {orderDone ? (
                <View
                  style={{
                    flexDirection: "row",
                    marginTop: height / 80,
                    justifyContent: "space-between",
                    marginHorizontal: height / 20,
                  }}
                >
                  <View style={{}}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 80,
                        textAlign: "center",
                      }}
                    >
                      Next Payment Date
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 80,
                        textAlign: "center",
                        marginTop: 3,
                      }}
                    >
                      DD-MM-YYYY
                    </Text>
                  </View>
                  <View style={{ marginStart: -10 }}>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Regular",
                        fontSize: height / 80,
                        textAlign: "center",
                      }}
                    >
                      Installment
                    </Text>
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 80,
                        textAlign: "center",
                        marginTop: 3,
                      }}
                    >
                      $83.33
                    </Text>
                  </View>
                  <View style={{}}>
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
                        marginTop: 3,
                      }}
                    >
                      $916.67
                    </Text>
                  </View>
                </View>
              ) : null}

              <View
                style={{
                  width: "86%",
                  backgroundColor: "lightgray",
                  height: 1,
                  alignSelf: "center",
                  marginTop: height / 50,
                }}
              ></View>

              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: height / 55,
                  paddingBottom: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  {movePress ? (
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
                      //</View>onPress={() => setOrderDone(true)}
                      >
                        <ImageBackground
                          source={require("../assets/topbar.png")}
                          style={{
                            height: height / 30,
                            width: height / 10,
                            overflow: "hidden",
                            alignItems: "center",
                            borderRadius: 5,
                            justifyContent: "center",
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Bold",
                              fontSize: height / 80,
                              color: "white",
                            }}
                          >
                            ADD SIMILAR
                          </Text>
                        </ImageBackground>
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
              </View>
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
                    refRBSheetViewName.current.open(),
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
                    refRBSheetViewName.current.open(),
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
                    refRBSheetViewName.current.open(),
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
                    refRBSheetViewName.current.open(),
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
                marginTop: height / -3.8,
                marginStart: -height / 4,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "flex-end",
                  }}
                  onPress={() => setStopShow(false)}
                >
                  <MaterialCommunityIcons name="close" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [setStopShow(false), setDuration("3 Months")]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                  width: height / 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  3 Months
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [setStopShow(false), setDuration("6 Months")]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: height / 98,
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  6 Months
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [setStopShow(false), setDuration("12 Months")]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: height / 98,
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  12 Months
                </Text>
              </TouchableOpacity>
            </Overlay>

            <Overlay
              visible={showInstallment}
              overlayStyle={{
                borderRadius: 5,

                backgroundColor: theme.colors.background,
                marginTop: height / -3.8,
              }}
            >
              <View style={{ marginBottom: 10 }}>
                <TouchableOpacity
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "flex-end",
                  }}
                  onPress={() => setShowInstallment(false)}
                >
                  <MaterialCommunityIcons name="close" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [
                  setShowInstallment(false),
                  setInstallments("Weekly"),
                  refRBSheetInstallmentsClick.current.open(),
                ]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 6,
                  width: height / 10,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  Weekly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [
                  setShowInstallment(false),
                  setInstallments("Bi-Weekly"),
                  refRBSheetInstallmentsClick.current.open(),
                ]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: height / 98,
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  Bi-Weekly
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                activeOpacity={1}
                onPress={() => [
                  setShowInstallment(false),
                  setInstallments("Monthly"),
                  refRBSheetInstallmentsClick.current.open(),
                ]}
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginTop: height / 98,
                  marginBottom: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: "Mediums-Font",
                    fontSize: height / 75,
                    marginStart: height / 90,
                  }}
                >
                  Monthly
                </Text>
              </TouchableOpacity>
            </Overlay>

            <RBSheet
              ref={refRBSheetViewName}
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
                      refRBSheetViewName.current.close(),
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
                      refRBSheetViewName.current.close(),
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
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 50,
                    marginTop: height / 50,
                  }}
                >
                  {fType}
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
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 50,
                    marginTop: height / 28,
                  }}
                >
                  {fType === "DAILY"
                    ? "Start"
                    : fType === "WEEKLY"
                    ? "How many weeks?"
                    : fType === "MONTHLY"
                    ? "How many months?"
                    : fType === "ANNUALLY"
                    ? "How many years?"
                    : ""}
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
                    Continue until stopped
                  </Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 50,
                    marginTop: height / 39,
                  }}
                >
                  {fType === "DAILY" ? "Stop" : "Start"}
                </Text>

                {/* <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 8,
                  }}
                  onPress={() => [
                    setNameConfirm(true),
                    //refRBSheetViewName.current.close(),
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
                    Update
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 20,
                    right: height / 22,
                  }}
                  onPress={() => [
                    refRBSheetViewName.current.close(),
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
                </TouchableOpacity> */}
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
              <View style={{ paddingHorizontal: height / 25 }}>
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={() => [
                    checkboxPromos == false
                      ? setCheckboxPromos(true)
                      : setCheckboxPromos(false),
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

              <View
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
              </View>
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
              height={height / 2.34}
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
                    marginTop: 3,
                  }}
                >
                  INSTALLMENTS-WEEKLY
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
                    paddingHorizontal: height / 26,
                  }}
                >
                  By pressing "Place your Order", default payment method will be
                  charged
                </Text>

                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 55,
                    marginTop: height / 60,
                    textAlign: "center",
                    paddingHorizontal: height / 26,
                  }}
                >
                  If you like to change the payment method click "Change Payment
                  Method"
                </Text>
                <TouchableOpacity
                  onPress={() => [refRBSheetPayment.current.open()]}
                >
                  <Text
                    style={{
                      fontFamily: "GlacialIndifference-Regular",
                      fontSize: height / 65,
                      marginTop: height / 70,
                      textAlign: "center",
                      paddingHorizontal: height / 26,
                      color: colors.MAIN,
                    }}
                  >
                    CHANGE PAYMENT METHOD
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{ marginTop: height / 30 }}
                  onPress={() => [
                    setOrderDone(true),
                    refRBSheetInstallmentsClick.current.close(),
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
                <RBSheet
                  ref={refRBSheetPayment}
                  closeOnDragDown={true}
                  closeOnPressMask={true}
                  height={height / 3.1}
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
                      {/* <Text
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
                  </Text> */}
                    </View>

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
                            refRBSheetPayment.current.close(),
                            //setCardNumber("*1770"),
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
                      </View>
                      <View>
                        <TouchableOpacity
                          onPress={() => [
                            //refRBSheetPayment.current.close(),
                            // setName("Ali"),
                            // setAddress("142 Sialkot, Sialkot, Pakistan"),
                            //props.navigation.navigate("CheckoutCompleteInfo"),
                          ]}
                          style={{
                            borderWidth: 1,
                            borderColor: "gray",
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
                            source={require("../assets/visa.png")}
                            style={{
                              width: height / 10,
                              height: height / 10,
                              resizeMode: "contain",
                              alignSelf: "center",
                            }}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>

                    <TouchableOpacity
                      style={{
                        position: "absolute",
                        bottom: -height / 15,
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
                        bottom: -height / 15,
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
              </View>
            </RBSheet>

            <RBSheet
              ref={refRBSheetPayments}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 3.1}
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
                  {/* <Text
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
                  </Text> */}
                </View>

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
                        refRBSheetPayment.current.close(),
                        //setCardNumber("*1770"),
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
                  </View>
                  <View>
                    <TouchableOpacity
                      onPress={() => [
                        //refRBSheetPayment.current.close(),
                        // setName("Ali"),
                        // setAddress("142 Sialkot, Sialkot, Pakistan"),
                        //props.navigation.navigate("CheckoutCompleteInfo"),
                      ]}
                      style={{
                        borderWidth: 1,
                        borderColor: "gray",
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
                        source={require("../assets/visa.png")}
                        style={{
                          width: height / 10,
                          height: height / 10,
                          resizeMode: "contain",
                          alignSelf: "center",
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: -height / 15,
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
                    bottom: -height / 15,
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

            {/* <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                marginEnd: height / 38,
                marginBottom: height / 20,
              }}
              //</View>onPress={() => setOrderDone(true)}
            >
              <ImageBackground
                source={require("../assets/button.png")}
                style={{
                  width: height / 12,
                  overflow: "hidden",
                  alignItems: "center",
                  borderRadius: 5,
                  justifyContent: "center",
                  paddingVertical: 3,
                }}
              >
                <Text
                  style={{
                    fontFamily: "GlacialIndifference-Bold",
                    fontSize: height / 70,
                    color: "white",
                    fontWeight: "bold",
                  }}
                >
                  + Add Items
                </Text>
              </ImageBackground>
            </TouchableOpacity> */}
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
