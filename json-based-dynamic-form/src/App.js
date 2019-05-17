import React from "react";
import DynamicFormCreator from "./components/DynamicForm";
import { inputTypes } from "./components/DynamicForm/constants";
import { validationTypes } from "./constants/commonTypes";
import logo from "./logo.svg";
import "antd/dist/antd.css";
import "./App.css";

const DynamicForm = DynamicFormCreator("test");
const inputs = [
  {
    id: 1,
    name: "Name",
    key: "name",
    inputType: inputTypes.input.alias,
    active: true,
    fieldOptions: {
      rules: [
        validationTypes.email,
        validationTypes.required("Name is required!"),
        validationTypes.size(10, 15)
      ]
    }
  },
  {
    id: 2,
    name: "Code",
    key: "code",
    inputType: inputTypes.input.alias,
    active: true,
    fieldOptions: {
      rules: [validationTypes.required("Enter Code!"), validationTypes.min(5)]
    }
  },
  {
    id: 3,
    name: "Type",
    key: "type",
    inputType: inputTypes.select.alias,
    options: [
      { id: 1, value: "1", label: "Type 1" },
      { id: 2, value: "2", label: "Type 2" }
    ]
  },
  {
    id: 4,
    name: "Expire Date",
    key: "exp_date",
    inputType: inputTypes.datepicker.alias
  },
  {
    id: 5,
    name: "Complexity",
    key: "product_type.value",
    inputType: inputTypes.radio.alias,
    initialValue: "0",
    options: [
      { id: 1, value: "0", label: "Basic" },
      { id: 2, value: "1", label: "Complex" }
    ],
    fieldProps: {}
  },
  {
    id: 6,
    name: "Description",
    key: "description",
    inputType: inputTypes.textarea.alias
  },
  {
    id: 7,
    key: "is_active",
    name: "Durum",
    inputType: inputTypes.checkbox.alias,
    fieldProps: {
      label: "Durum"
    }
  }
];

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <DynamicForm inputs={inputs} onSubmit={onSubmit} />
    </div>
  );
}

function onSubmit(values) {
  console.log(values);
}

export default App;
