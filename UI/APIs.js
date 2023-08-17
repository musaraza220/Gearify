import React from "react";
import axios from "axios";
import { SERVER } from "./Server";
export const PersonalAccountAPI = async (data) => {
  console.log(data);
  var finalVal;
  var config = {
    method: "post",
    url: `${SERVER}createUserPersonal`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  await axios(config)
    .then((res) => {
      finalVal = res.data;
    })
    .catch((e) => console.log(e));

  return finalVal;
};

export const BusinessAccountAPI = async (data) => {
  console.log(data);
  var finalVal;
  var config = {
    method: "post",
    url: `${SERVER}createUserBusiness`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  await axios(config)
    .then((res) => {
      finalVal = res.data;
    })
    .catch((e) => console.log(e));

  return finalVal;
};

export const checkUserByEmailAPI = async (data) => {
  console.log(data);
  var finalVal;
  var config = {
    method: "post",
    url: `${SERVER}checkUserByEmail`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  await axios(config)
    .then((res) => {
      finalVal = res.data;
    })
    .catch((e) => console.log(e));

  return finalVal;
};

export const updatePasswordAPI = async (data) => {
  console.log(data);
  var finalVal;
  var config = {
    method: "post",
    url: `${SERVER}updatePassword`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  await axios(config)
    .then((res) => {
      finalVal = res.data;
    })
    .catch((e) => console.log(e));

  return finalVal;
};

export const loginAPI = async (data) => {
  console.log(data);
  var finalVal;
  var config = {
    method: "post",
    url: `${SERVER}login`,
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify(data),
  };
  await axios(config)
    .then((res) => {
      finalVal = res.data;
    })
    .catch((e) => console.log(e));

  return finalVal;
};
