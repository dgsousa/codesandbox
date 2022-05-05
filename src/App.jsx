import React from "react";
import "./Styles.css";
import Grid from './Grid.jsx';
import { Item } from '@react-stately/collections';

const App = () => {

    return (
        <Grid>
            {item => <Item aria-label={ item.text } textValue={ item.text }>{item.text}</Item>}
        </Grid>
    );
};

export default App;