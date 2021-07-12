import React from 'react';
import {
  Inventory,
  TableView,
  ViewHeader,
  Counter,
  Search,
  FilterRail,
  FilterList,
  FilterGroup,
  FilterValue,
  FilterTag,
} from '@quarry/inventory';
import CrossLarge from '@spectrum-icons/ui/CrossLarge';
import {
  defaultTheme,
  Provider as V3Provider,
  View,
  Header,
  Flex,
  ActionButton,
  Checkbox,
  CheckboxGroup
} from '@adobe/react-spectrum';
import Provider from '@react/react-spectrum/Provider';
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

const filters = [
  {
    id: "1",
    displayName: "Red"
  },
  {
    id: "2",
    displayName: "Blue"
  },
  {
    id: "3",
    displayName: "Green"
  }
]

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
        <FilterRail >
          <FilterGroup title={ 'Colors' }>
            {({
              onFilterChange,
            }) => (
              <CheckboxGroup
                // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
                onChange={ values => onFilterChange('colors', values) }
                aria-label={ 'Colors' }>
                { filters.map(({
                  id, displayName,
                }) => (
                  <Checkbox value={ displayName } key={ id }>{ displayName }</Checkbox>
                ))}
              </CheckboxGroup>
            )}
          </FilterGroup>
        </FilterRail>
        <ViewHeader>
          <Search />
          <Counter />
          <FilterList>
            {([
              key,
              values,
            ]) => {
              let filterValues;
              if (Array.isArray(values)) {
                filterValues = values.map(val => <FilterValue key={ val } value={ val } />);
              } else {
                filterValues = <FilterValue value={ values } />;
              }
              return (
                <FilterTag label={ key } value={ key }>
                  { filterValues }
                </FilterTag>
              );
            }}
          </FilterList>
        </ViewHeader>
        <TableView columns={ fileColumns }>
        </TableView>
      </Inventory>
    </View>
  </V3Provider>);

export default App;
