import { registerRootComponent } from "expo";
import { createStore } from "redux";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import React from "react";
import App from "./App";

const initialState = {
  isEditting: false,
  isLowBattery: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "switchingEdit":
      return {
        ...state,
        isEditting: !state.isEditting,
      };
    case "switchingBatteryMode":
      return {
        ...state,
        isLowBattery: !state.isLowBattery,
      };
    default:
      return {
        ...state,
      };
  }
};

const store = createStore(reducer);

function AppContainer() {
  return (
    <StoreProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </StoreProvider>
  );
}

export default registerRootComponent(AppContainer);
