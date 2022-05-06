import React from "react";
import ReorderableList from "./ReorderableList";
import { Provider, defaultTheme } from '@adobe/react-spectrum';

const App = () => {
    return (
        <Provider theme={ defaultTheme } colorScheme='light'>
            <ReorderableList />
        </Provider>
    );
};

export default App;