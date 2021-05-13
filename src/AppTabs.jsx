import React from 'react';
  import {
    Content,
    Text,
  } from '@adobe/react-spectrum';
  import {
    Tabs,
    Item,
  } from '@react-spectrum/tabs';

export default function AppTabs() {
    return (
      <div>
        <Tabs aria-label='Chat log collapse example'>
            <Item title='John Doe' key='item1'>
              <Content marginTop='size-250' marginStart='size-125'>
                <Text>There is no prior chat</Text>
              </Content>
            </Item>
            <Item title='Jane Doe' key='item2'>
              <Content marginTop='size-250' marginStart='size-125'>
                <Text>There is no prior chat</Text>
              </Content>
            </Item>
            <Item title='Joe Bloggs' key='item3'>
              <Content marginTop='size-250' marginStart='size-125'>
                <Text>There is no prior chat</Text>
              </Content>
            </Item>
        </Tabs>
      </div>
    )
}