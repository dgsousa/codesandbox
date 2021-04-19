import React from 'react';
import {
  Provider,
  defaultTheme,
  Content,
  Text,
} from '@adobe/react-spectrum';
import {
  Tabs,
  Item,
} from '@react-spectrum/tabs';

function App() {
  return (
    <Provider theme={ defaultTheme } colorScheme='dark'>
    <div
      style={ {
        width: '150px',
        marginBottom: '50px',
        height: '150px',
        maxWidth: '100%',
      } }>
      <Tabs aria-label='Chat log collapse example'>
        <Item title='John Doe' key='item1'>
          <Content marginTop='size-250' marginStart='size-125'>
            <Text>There is no prior chat history with John Doe.</Text>
          </Content>
        </Item>
        <Item title='Jane Doe' key='item2'>
          <Content marginTop='size-250' marginStart='size-125'>
            <Text>There is no prior chat history with Jane Doe.</Text>
          </Content>
        </Item>
        <Item title='Joe Bloggs' key='item3'>
          <Content marginTop='size-250' marginStart='size-125'>
            <Text>There is no prior chat history with Joe Bloggs.</Text>
          </Content>
        </Item>
      </Tabs>
    </div>
  </Provider>
  );
}

export default App;