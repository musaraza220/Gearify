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

import axios from "axios";
import * as Font from "expo-font";
import { loginAPI, PersonalAccountAPI } from "./APIs";
WebBrowser.maybeCompleteAuthSession();

export default function Filters(props) {
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

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* /////Best seller///// */}
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
                      paddingStart: height / 90,
                    }}
                  >
                    Filters
                  </Text>
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <Entypo name="cross" size={height / 50} />
                  </TouchableOpacity>
                </View>

                <View>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          marginTop: 10,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Categories
                        </Text>
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={height / 40}
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View style={{ marginTop: 10 }}>
                        <Text
                          style={{
                            fontFamily: "GlacialIndifference-Regular",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Cell phone Cases & Covers
                        </Text>
                      </View>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity
                          style={[styles.filterBtn, , { width: null }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                            }}
                          >
                            All
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Basic Cases
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Flip Cases
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>

                <View style={{ marginTop: height / 90 }}>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Brands
                        </Text>
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={height / 40}
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity style={styles.filterBtn}>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Otterbox
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Casetify
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            myCharge
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Everki
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            JLabAudio
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[styles.filterBtn, { borderColor: "gray" }]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            iHome
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>

                <View style={{ marginTop: height / 90 }}>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Colors
                        </Text>
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={height / 40}
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity style={styles.filterBtnColor}>
                          <View style={styles.colorBox}></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Black{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "gray" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Grey{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "white" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            White{`     `}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "brown" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Brown{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "beige" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Beige{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "red" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Red{`     `}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "orange" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Orange{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "yellow" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Yellow{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "ivory" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Ivory{`     `}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "green" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Green{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "blue" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Blue{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "purple" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Purple{`     `}
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 2,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "pink" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Pink{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "gold" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Gold{`     `}
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnColor,
                            { borderColor: "gray" },
                          ]}
                        >
                          <View
                            style={[
                              styles.colorBox,
                              { backgroundColor: "silver" },
                            ]}
                          ></View>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Silver{`     `}
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>

                <View style={{ marginTop: height / 90 }}>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Price & Deals
                        </Text>
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={height / 40}
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity style={styles.filterBtnPrice}>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            All prices
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnPrice,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Up to $10
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnPrice,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            $10 to $25
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 3,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnPrice,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            $25 to $50
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnPrice,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            $50 to $100
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnPrice,
                            { borderColor: "gray", width: height / 8 },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            $100 & above
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>

                <View style={{ marginTop: height / 90 }}>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Customer Reviews
                        </Text>
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={height / 40}
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity style={styles.filterBtnRating}>
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            {` `} & up
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            {` `} & up
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />

                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            {` `} & up
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 3,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <MaterialCommunityIcons
                            name="star"
                            size={height / 55}
                            color="gold"
                          />

                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            {` `} & up
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </CollapseBody>
                  </Collapse>
                </View>

                <View style={{ marginTop: height / 90 }}>
                  <Collapse>
                    <CollapseHeader>
                      <View
                        style={{
                          marginTop: 5,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text
                          style={{
                            fontFamily: "Mediums-Font",
                            fontSize: height / 55,
                            paddingStart: height / 90,
                          }}
                        >
                          Sort By
                        </Text>
                        <MaterialCommunityIcons
                          name="chevron-down"
                          size={height / 40}
                        />
                      </View>
                    </CollapseHeader>
                    <CollapseBody>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                        }}
                      >
                        <TouchableOpacity style={styles.filterBtnPrice}>
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Featured
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Price:Low to High
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Price:High to Low
                          </Text>
                        </TouchableOpacity>
                      </View>

                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 3,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Avg. Customer Review
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={[
                            styles.filterBtnRating,
                            { borderColor: "gray" },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Newest Arrivals
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          paddingStart: height / 90,
                          flexDirection: "row",
                          alignItems: "center",
                          marginTop: 3,
                        }}
                      >
                        <TouchableOpacity
                          style={[
                            styles.filterBtnPrice,
                            { borderColor: "gray", width: height / 8 },
                          ]}
                        >
                          <Text
                            style={{
                              fontFamily: "GlacialIndifference-Regular",
                              fontSize: height / 55,
                              textAlign: "center",
                            }}
                          >
                            Best Seller
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </CollapseBody>
                  </Collapse>
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
    filterBtn: {
      borderRadius: 2,
      borderWidth: 0.7,
      borderColor: colors.MAIN,
      paddingHorizontal: 10,
      marginEnd: 5,
      marginTop: 2,
      width: height / 10,
    },
    filterBtnPrice: {
      borderRadius: 2,
      borderWidth: 0.7,
      borderColor: colors.MAIN,
      paddingHorizontal: 10,
      marginEnd: 5,
      marginTop: 2,
      width: height / 9,
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
