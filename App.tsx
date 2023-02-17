import { Provider } from "react-redux";
import { AppRegistry } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./src/redux/store";
import { Index } from "./src/Index";

AppRegistry.registerComponent("MobileApp", () => App);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Index />
      </PersistGate>
    </Provider>
  );
};
export default App;
