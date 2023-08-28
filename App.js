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
          {/* <Stack.Screen
            name="Search"
            component={Search}
            options={{ headerShown: false }}
          /> */}
          {/* <Stack.Screen
            name="Filters"
            component={Filters}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="Categories"
            component={Categories}
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
            name="Home"
            component={Home}
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
