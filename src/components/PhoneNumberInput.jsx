import TextField from "@mui/material/TextField";
import CountrySelect from "./CountrySelect";
import React, { useState, useEffect } from "react";
import {
  parsePhoneNumber,
  getCountryCallingCode,
} from "react-phone-number-input";
import PropTypes from "prop-types";
import "./PhoneNumberInput.scss";
function PhoneNumberInput({ value, onChange, disabled = false, ...rest }) {
  const defaultCountry = "US";
  const [country, setCountry] = useState(defaultCountry);
  useEffect(() => {
    async function getUserCountry() {
      let userIp = "";

      try {
        userIp = await fetch("https://httpbin.org/ip");
        userIp = await userIp.json();
        userIp = userIp.origin;
      } catch {
        //couldn't get user Ip
        return;
      }
      if (!userIp) return;

      const url = `https://mqproxy.herokuapp.com/proxy/https://api.ipdata.co/${userIp}?api-key=eca677b284b3bac29eb72f5e496aa9047f26543605efe99ff2ce35c9&mqproxy_headers=%7B%22referer%22%3A%22https%3A%2F%2Fipdata.co%2F%22%7D`;
      let countryCode = "";
      try {
        countryCode = await fetch(url);
        countryCode = await countryCode.json();
        countryCode = countryCode.country_code;
      } catch {
        //couldn't get user country
        return;
      }
      setCountry(countryCode);
    }
    if (country === defaultCountry) {
      getUserCountry();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <CountrySelect
        value={country}
        onChange={(newCountry) => {
          setCountry(newCountry);
          const newCountryCode = "+" + getCountryCallingCode(newCountry);
          if (!newCountryCode) return;
          const perviousCountryCode = "+" + getCountryCallingCode(country);
          const currentPhoneNumber = value;
          let lastRes = currentPhoneNumber;
          if (!currentPhoneNumber.trim()) {
            lastRes = newCountryCode;
          } else if (currentPhoneNumber.startsWith(perviousCountryCode)) {
            lastRes =
              newCountryCode +
              currentPhoneNumber.slice(perviousCountryCode.length);
          } else {
            lastRes = newCountryCode + currentPhoneNumber.slice(2);
          }
          onChange(lastRes, undefined);
        }}
        withLabel
        disabled={disabled}
      />

      <TextField
        disabled={disabled}
        {...rest}
        value={value}
        onChange={(e) => {
          const parsedData = parsePhoneNumber(e.target.value);
          onChange(e.target.value, parsedData);
          if (parsedData?.country) {
            setCountry(parsedData.country);
          }
        }}
        variant="filled"
      />
    </>
  );
}
PhoneNumberInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};
export default PhoneNumberInput;
