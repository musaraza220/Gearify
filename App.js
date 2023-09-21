import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
// import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
// import Downloads from "./ui/Downloads";
import Login from "./UI/Login";
import Verification from "./UI/Verification";
import ForgotPassword from "./UI/ForgotPassword";
import ChangePassword from "./UI/ChangePassword";
import AccountType from "./UI/AccountType";
import PersonalAccount from "./UI/PersonalAccount";
import BusinessAccount from "./UI/BusinessAccount";
import Home from "./UI/Home";
import Categories from "./UI/Categories";
import SubCat from "./UI/SubCat";
import Products from "./UI/Products";
import { MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import {
  NavigationContainer,
  DefaultTheme,
  ubx,
  DarkTheme,
} from "@react-navigation/native";
import { useColorScheme } from "react-native";
// import { colors } from "./assets/colors";
// import { myApp } from "./config";
import {
  Card,
  Title,
  Paragraph,
  List,
  MD2DarkTheme,
  MD3LightTheme,
  MD3DarkTheme,
  Provider as PaperProvider,
} from "react-native-paper";
import Filters from "./UI/Filter";
import Search from "./UI/Search";
import ProductDetails from "./UI/ProductDetails";
import Cart from "./UI/Cart";
import VideoReviews from "./UI/VideoReviews";
import WriteReviews from "./UI/WriteReview";
import CheckoutCompleteInfo from "./UI/CheckoutCompleteInfo";
import CheckoutInCompleteInfo from "./UI/CheckoutInCompleteInfo";
import CardScreen from "./UI/CardScreen";
import AddCardScreen from "./UI/AddCardScreen";
import SelectBilingAddress from "./UI/SelectBilingAddress";
import AddBillingAddress from "./UI/AddBillingAddress";
import InAppLogin from "./UI/InAapLogin";
import InAppLoginPassword from "./UI/InAppLoginPassword";
import InAppOTP from "./UI/InAppOTP";
import AddressBook from "./UI/AddressBook";
import AddNewAddress from "./UI/AddNewAddress";
import NewPickupLocation from "./UI/NewPickupLocation";
import GuestAddress from "./UI/GuestAddress";
import GuestAddCardScreen from "./UI/GuestAddCardScreen";
import CartProductDetails from "./UI/CartProductDetails";
import NewAccountAddAddress from "./UI/NewAccountAddAddress";
import ExploreProductScreen from "./UI/ExploreProductScreen";
import ExploreProductDetails from "./UI/ExploreProductDetails";
import EditAddress from "./UI/EditAddress";
import Wishlist from "./UI/Wishlist";
import ProductDetailsWishlist from "./UI/ProductDetailsWishlist";
import ViewLists from "./UI/ViewLists";
import SpecificList from "./UI/SpecificList";
import Registry from "./UI/Registry";
import ShoppingList from "./UI/ShoppingList";
import Reserved from "./UI/Reserved";
import ViewListsCombine from "./UI/ViewListsCombine";
import AddInListSearch from "./UI/AddInListSearch";
import WishlistAddProducts from "./UI/WishlistAddProducts";

// const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();

// function MyTabs() {
//   const scheme = useColorScheme();
//   return (
//     <Tab.Navigator
//       //labeled={false}
//       initialRouteName="Home"
//       activeColor={colors.MAIN}
//       inactiveColor={colors.GRAY}
//     >
//       <Tab.Screen
//         name="Home"
//         component={Home}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="home" color={color} size={23} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Task List"
//         component={Downloads}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="th-list" color={color} size={23} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="user-alt" color={color} size={23} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={Settings}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="cog" color={color} size={23} />
//           ),
//         }}
//       />
//     </Tab.Navigator>
//     // <NavigationContainer
//     //   theme={scheme === "dark" ? DarkTheme : DefaultTheme}
//     //   independent={true}
//     // >

//     // </NavigationContainer>
//   );
// }

// function CompanyTabs() {
//   const scheme = useColorScheme();
//   return (
//     // <NavigationContainer
//     //   theme={scheme === "dark" ? DarkTheme : DefaultTheme}
//     //   independent={true}
//     // >

//     // </NavigationContainer>
//     <Tab.Navigator
//       //labeled={false}
//       initialRouteName="CompanyHome"
//       activeColor={colors.MAIN}
//       inactiveColor={colors.GRAY}
//     >
//       <Tab.Screen
//         name="Home"
//         component={CompanyHome}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="home" color={color} size={23} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Team"
//         component={EmployeeList}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="users" color={color} size={23} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Tasks"
//         initialParams={{ searchQry: 0 }}
//         component={TasksList}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="clipboard-list" color={color} size={23} />
//           ),
//         }}
//       />
//       {/* <Tab.Screen
//           name="Personal"
//           component={CompanyTasks}
//           options={{
//             tabBarIcon: ({ color }) => (
//               <FontAwesome5 name="clipboard-list" color={color} size={23} />
//             ),
//           }}
//         /> */}
//       <Tab.Screen
//         name="Profile"
//         component={ComProfile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="user-alt" color={color} size={23} />
//           ),
//         }}
//       />
//       <Tab.Screen
//         name="Settings"
//         component={CompanySettings}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="cog" color={color} size={23} />
//           ),
//         }}
//       />
//       {/* <Tab.Screen
//         name="CompanyProfile"
//         component={CompanyProfile}
//         options={{
//           tabBarIcon: ({ color }) => (
//             <FontAwesome5 name="user-alt" color={color} size={23} />
//           ),
//         }}
//       /> */}
//     </Tab.Navigator>
//   );
// }

export default function App() {
  const scheme = useColorScheme();
  return (
    <PaperProvider theme={scheme === "dark" ? MD3DarkTheme : MD3LightTheme}>
      <NavigationContainer independent={true}>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="ProductDetailsWishlist"
            component={ProductDetailsWishlist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WishlistAddProducts"
            component={WishlistAddProducts}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddInListSearch"
            component={AddInListSearch}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewListsCombine"
            component={ViewListsCombine}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Reserved"
            component={Reserved}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShoppingList"
            component={ShoppingList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Registry"
            component={Registry}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SpecificList"
            component={SpecificList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ViewLists"
            component={ViewLists}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditAddress"
            component={EditAddress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Wishlist"
            component={Wishlist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExploreProductDetails"
            component={ExploreProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ExploreProductScreen"
            component={ExploreProductScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CheckoutCompleteInfo"
            component={CheckoutCompleteInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewAccountAddAddress"
            component={NewAccountAddAddress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CartProductDetails"
            component={CartProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GuestAddCardScreen"
            component={GuestAddCardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GuestAddress"
            component={GuestAddress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NewPickupLocation"
            component={NewPickupLocation}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddNewAddress"
            component={AddNewAddress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddressBook"
            component={AddressBook}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InAppLogin"
            component={InAppLogin}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InAppOTP"
            component={InAppOTP}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="InAppLoginPassword"
            component={InAppLoginPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddBillingAddress"
            component={AddBillingAddress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SelectBilingAddress"
            component={SelectBilingAddress}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddCardScreen"
            component={AddCardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CardScreen"
            component={CardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CheckoutInCompleteInfo"
            component={CheckoutInCompleteInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetails"
            component={ProductDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="WriteReviews"
            component={WriteReviews}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="VideoReviews"
            component={VideoReviews}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Filters"
            component={Filters}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Categories"
            component={Categories}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubCat"
            component={SubCat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Products"
            component={Products}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Verification"
            component={Verification}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AccountType"
            component={AccountType}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PersonalAccount"
            component={PersonalAccount}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="BusinessAccount"
            component={BusinessAccount}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
