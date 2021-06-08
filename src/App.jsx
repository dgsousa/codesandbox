import React from 'react';
import {
  Inventory,
  Table,
  ViewHeader,
  Counter,
  Cell,
  Row,
  Search,
  FilterRail,
} from '@quarry/inventory';
import CrossLarge from '@spectrum-icons/ui/CrossLarge';
import {
  defaultTheme,
  Provider as V3Provider,
  View,
  Header,
  Flex,
  ActionButton,
} from '@adobe/react-spectrum';
import './styles.css';

export const fileColumns = [
  {
    key: 'filename',
    label: 'Name',
  },
  {
    key: 'date',
    label: 'Date',
  },
  {
    key: 'size',
    label: 'Size',
    width: 200,
  },
  {
    key: 'type',
    label: 'File Type',
    width: 250,
  },
];


const App = () => (
  <V3Provider
    theme={ defaultTheme }
    colorScheme='light'
    scale='medium'>
    <View width='100vw'>
      <Header>
        <Flex justifyContent='end'>
          <ActionButton
            isQuiet
            aria-label='close'
            onPress={ () => {} }
          >
            <CrossLarge />
          </ActionButton>
        </Flex>
      </Header>
      <Inventory
          locale='en-US'
          height='100%'
          onFilterChange={ () => {} }
      >
        <FilterRail />
        <ViewHeader>
        <Search />
        <Counter />
        </ViewHeader>
        <Table
          columns={ fileColumns }
          >
        </Table>
      </Inventory>
    </View>
  </V3Provider>);

export default App;
