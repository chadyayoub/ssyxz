import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors} from '../constants/Colors';
import SearchBar from './SearchBar';
import HeaderActions from './HeaderActions';

//The custom header component
const Header = props => {
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = () => {
    setSearchOpen(true);
  };
  const closeSearch = () => {
    setSearchOpen(false);
    props.onCloseSearch();
  };

  return (
    <View style={{...styles.header, backgroundColor: Colors.header}}>
      {searchOpen === true ? (
        <SearchBar
          close={closeSearch}
          onSearch={props.onSearch}
          value={props.value}
        />
      ) : (
        <HeaderActions open={openSearch} logout={props.onLogout} />
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    height: 52,
    justifyContent: 'center',
  },
});

export default Header;
