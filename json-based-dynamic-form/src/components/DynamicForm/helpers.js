import moment from "moment";
import { inputTypes } from "./constants";
import { defaultDateFormat, defaultDateValueFormat } from "../../constants";

export function getValueByInputType(e, type, field) {
  switch (type) {
    case inputTypes.input:
    case inputTypes.password:
    case inputTypes.radio:
    case inputTypes.textarea:
      return e.target.value;
    case inputTypes.checkbox:
      return e.target.checked;
    case inputTypes.datepicker:
      return e && {
        value: moment(e, defaultDateFormat)
          .format(defaultDateValueFormat)
          .concat("T00:00:00Z"),
        label: e.format(defaultDateFormat)
      };
    case inputTypes.dateRangePicker:
      if (!e)
        return null;
      const { start, end } = e;
      const { startValueKey = "startValue", endValueKey = "endValue" } = field;
      let startValue = moment(start, defaultDateFormat)
        .format(defaultDateValueFormat);
      let endValue = moment(end, defaultDateFormat)
        .format(defaultDateValueFormat);
      if (field.withTimeZone) {
        startValue = startValue.concat("T00:00:00Z");
        endValue = endValue.concat("T00:00:00Z");
      }
      return {
        key: {
          [startValueKey]: startValue,
          [endValueKey]: endValue
        },
        label: `${start.format(defaultDateFormat)}-${end.format(defaultDateFormat)}`
      };
    case inputTypes.select:
      return e;
    default:
      return e;
  }
}

export function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => {
    if (typeof fieldsError[field] === "object")
      return hasErrors(fieldsError[field]);
    return fieldsError[field];
  });
}

export function getError(
  isFieldTouched,
  getFieldError,
  fieldName,
  errorOnFocus
) {
  const isFocused = isFieldTouched(fieldName);
  const error = getFieldError(fieldName) || "";
  return {
    hasError: !!(errorOnFocus ? isFocused && error : error),
    error,
    validateStatus: error ? "error" : ""
  };
}

export function getInputType(alias) {
  for (const key in inputTypes) {
    if (inputTypes.hasOwnProperty(key)) {
      const element = inputTypes[key];
      if (element.alias === alias) return element;
    }
  }
  return getDefaultInputType();
}

export function getDefaultInputType() {
  for (const key in inputTypes) {
    if (inputTypes.hasOwnProperty(key)) {
      const element = inputTypes[key];
      if (element.defaultType) return element;
    }
  }
}
