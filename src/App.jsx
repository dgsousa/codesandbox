import React from "react";
// import "./Styles.css";
import ReorderableList from "./ReorderableList";
import { Provider, defaultTheme, Checkbox } from '@adobe/react-spectrum';

const App = () => {
    return (
        <Provider theme={ defaultTheme } colorScheme='light'>
            <Checkbox />
        </Provider>
    );
};

export default App;