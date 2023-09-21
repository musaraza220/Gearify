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
  Entypo,
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

export default function SpecificList(props) {
  const refRBSheetViewInst = useRef();
  const refRBSheetViewName = useRef();
  const refRBSheetBackgrounds = useRef();
  const refRBSheetVisibility = useRef();

  const [email, setEmail] = React.useState("");
  const [rating, setRating] = useState(3.5);
  const [typeSwitch, setTypeSwitch] = React.useState(false);
  const [editShow, setEditShow] = React.useState(false);
  const [nameConfirm, setNameConfirm] = React.useState(false);
  const [deleteConfirm, setDeleteConfirm] = React.useState(false);
  const [movePress, setMovePress] = React.useState(false);

  const [emailError, setEmailError] = React.useState("");
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
                          style={{ marginEnd: height / 50 }}
                          onPress={() =>
                            props.navigation.navigate("AddInListSearch")
                          }
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
                              marginTop: height / -2.6,
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
                                  }}
                                >
                                  Visibility {`    `}
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
                    <Text
                      style={{
                        fontFamily: "GlacialIndifference-Bold",
                        fontSize: height / 47,
                      }}
                    >
                      MY FAVOURITES
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

              <View
                style={{
                  marginHorizontal: height / 37,
                  marginTop: height / 28,
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
                          onPress={() => props.navigation.navigate("ViewLists")}
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

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 1,
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
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: height / 5.3,
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
                {/* <Text
                  style={{
                    fontFamily: "GlacialIndifference-Regular",
                    fontSize: height / 60,
                    textAlign: "center",
                  }}
                >
                  There are no items in this List.
                </Text> */}
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
                marginTop: height / -2.4,
                marginStart: height / 5,
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
                      width: height / 20,
                    }}
                  >
                    {`      `}EDIT {`    `}
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
                    setEditShow(false),
                    refRBSheetViewName.current.open(),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                    }}
                  >
                    Change Name {`    `}
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
                    refRBSheetBackgrounds.current.open(),
                  ]}
                >
                  <Text
                    style={{
                      fontFamily: "Mediums-Font",
                      fontSize: height / 75,
                    }}
                  >
                    Change Background {`    `}
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

            <RBSheet
              ref={refRBSheetViewName}
              closeOnDragDown={true}
              closeOnPressMask={true}
              height={height / 3.9}
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
                    fontSize: height / 60,
                    marginTop: height / 40,
                  }}
                >
                  Enter New Name
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

                <TouchableOpacity
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
              <View style={{ paddingHorizontal: height / 25 }}>
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
                      size={height / 40}
                    />
                  ) : (
                    <FontAwesome name="square-o" size={height / 40} />
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
                    <FontAwesome name="square-o" size={height / 40} />
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
