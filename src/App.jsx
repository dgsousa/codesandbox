import React from 'react';
import {
    Provider,
    defaultTheme,
  } from '@adobe/react-spectrum';
import Grid from './Grid.jsx';
import {Item} from '@react-stately/collections';
import {Switch} from '@react-spectrum/switch';

const App = () => (
    // <Provider theme={ defaultTheme } colorScheme='light'>
        <Grid gridFocusMode={'row'} cellFocusMode={'cell'} >
        <Item>
            <Switch aria-label="Switch 1" />
            <Switch aria-label="Switch 2" />
        </Item>
        <Item>
            <Switch aria-label="Switch 1" />
            <Switch aria-label="Switch 2" />
            <Switch aria-label="Switch 3" />
        </Item>
        <Item>
            <Switch aria-label="Switch 1" />
            <Switch aria-label="Switch 2" />
        </Item>
        </Grid>
    // </Provider>
)

export default App;