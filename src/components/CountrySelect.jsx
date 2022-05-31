import PropTypes from "prop-types";
import {
  getCountries,
  getCountryCallingCode,
} from "react-phone-number-input/input";
import en from "react-phone-number-input/locale/en.json";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import flags from "react-phone-number-input/flags";
import "./CountrySelect.scss";
const CountrySelect = ({
  value,
  onChange,
  withLabel = false,
  labels = en,
  ...rest
}) => (
  <TextField
    {...rest}
    select
    value={value}
    onChange={(event) => onChange(event.target.value || undefined)}
    variant="filled"
    className="w-full CountrySelect"
  >
    {getCountries().map((country) => {
      const Flag = flags[country];
      return (
        <MenuItem
          key={country}
          value={country}
          className=" gap-4 CountrySelectItem"
          title={labels[country]}
        >
          {<Flag style={{ width: "40px", height: "40px" }} />}
          <div className="flex">
            <div className="hidden xs:inline-flex">
            {withLabel ? labels[country] : country}
            </div>
            <div className="inline-flex xs:hidden">
              {country}
            </div>
          </div>
          <div className="flex-1 flex justify-end">
            +{getCountryCallingCode(country)}
          </div>
        </MenuItem>
      );
    })}
  </TextField>
);

CountrySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  labels: PropTypes.objectOf(PropTypes.string),
};
export default CountrySelect;
