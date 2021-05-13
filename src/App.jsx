import React, {
  useEffect,
  useState,
} from 'react';
import {
  defaultTheme,
  Flex,
  View,
  Provider,
  Content,
  Text,
} from '@adobe/react-spectrum';
import {
  Tabs,
  Item,
} from '@react-spectrum/tabs';


export default function App() {
  const [
    widthUnder1100,
    setWidthUnder1100,
  ] = useState(window.innerWidth < 1100);


  useEffect(() => {
    const handleResize = () => {
      setWidthUnder1100(window.innerWidth < 1100);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const shrink = widthUnder1100;
  return (
    <Provider theme={ defaultTheme } colorScheme='light'>
      {/* <Flex
        alignContent='stretch'
        alignItems='center'
        justifyContent='space-between'
      > */}
        <View
          data-id='collapse'
          width={ shrink ? '200px' : 'auto' }>
          <Tabs aria-label='Chat log collapse example'>
            <Item title='John Doe' key='item1'>
              <Content marginTop='size-250' marginStart='size-125'>
                <Text>1</Text>
              </Content>
            </Item>
            <Item title='Jane Doe' key='item2'>
              <Content marginTop='size-250' marginStart='size-125'>
                <Text>2</Text>
              </Content>
            </Item>
            <Item title='Joe Bloggs' key='item3'>
              <Content marginTop='size-250' marginStart='size-125'>
                <Text>3</Text>
              </Content>
            </Item>
          </Tabs>
        </View>
      {/* </Flex> */}
    </Provider>
  );
}
