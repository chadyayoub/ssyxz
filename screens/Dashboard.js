import {
  View,
  FlatList,
  ActivityIndicator,
  Alert,
  Appearance,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import * as dashboardActions from '../store/actions/articles';

import {Colors, setDarkMode, setLightMode} from '../constants/Colors';

import Article from '../components/Article';
import Header from '../components/Header';

const Dashboard = props => {
  //Selectors from the redux store
  const allData = useSelector(state => state.articles.articles);
  const data = useSelector(state => state.articles.filteredArticles);
  const currentPage = useSelector(state => state.articles.currentPage);
  const token = useSelector(state => state.auth.token);
  //States to handle proper UI when the app is loading
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isReloadingData, setIsReloadingData] = useState(true);
  const [loadedAllData, setLoadedAllData] = useState(false);
  //To change and show the error to user or handle it whenever there is one
  const [error, setError] = useState('');
  //To change the search value and filter out articles based on title while typing
  const [searchValue, setSearchValue] = useState('');

  const dispatch = useDispatch();

  //Whenever searchValue changes search for articles matching user input
  useEffect(() => {
    dispatch(dashboardActions.searchForArticles(searchValue, allData));
  }, [searchValue]);

  //If there is an error show it to the user
  useEffect(() => {
    if (error != '') Alert.alert('An error occured', error, [{text: 'okay'}]);
  }, [error]);

  //To load articles whenever this component renders for the first time
  useEffect(() => {
    reloadArticles();
  }, []);

  //To load more articles
  const loadNewArticles = async () => {
    if (!isLoadingData && !loadedAllData) {
      setIsLoadingData(true);
      setError('');
      try {
        await dispatch(
          dashboardActions.loadMoreArticles(token, currentPage, searchValue),
        ).then(() => {
          setIsLoadingData(false);
        });
      } catch (err) {
        setError(err.message);
        if (err.message === 'No more data to load') setLoadedAllData(true);
      }
    }
  };

  //To reload all articles
  const reloadArticles = async () => {
    setIsReloadingData(true);
    setIsLoadingData(false);
    setLoadedAllData(false);
    setError('');
    try {
      await dispatch(dashboardActions.reloadArticles(token)).then(() => {
        setIsReloadingData(false);
      });
    } catch (err) {
      setError(err.message);
    }
  };

  //To load more articles when the user scrolls to the end
  const handleEndReached = () => {
    loadNewArticles();
  };

  //To change the internal search value from user input
  const handleSearch = enteredText => {
    setSearchValue(enteredText);
  };

  //To empty search field and unfilter articles when user closes the searchbar
  const handleCloseSearch = () => {
    setSearchValue('');
  };

  //To log out
  const handleLogout = () => {
    Alert.alert('Confirmation', 'Are you sure you want to logout?', [
      {
        text: 'Yes',
        onPress: logout,
      },
      {
        text: 'No',
        onPress: () => props.navigation.pop(),
        style: 'cancel',
      },
    ]);
  };

  //The next 10 lines are to change the theme of the app whenever the device theme changes
  const [theme, updateTheme] = useState();

  const changeTheme = () => {
    const mode = Appearance.getColorScheme();
    if (mode === null) setLightMode();
    else if (mode === 'dark') setDarkMode();
    else setLightMode();
    updateTheme(mode);
  };

  useEffect(changeTheme, []);

  Appearance.addChangeListener(changeTheme);

  return (
    <View style={{flex: 1, backgroundColor: '#ddd'}}>
      <Header
        onSearch={handleSearch}
        value={searchValue}
        onCloseSearch={handleCloseSearch}
        onLogout={handleLogout}
      />
      {isReloadingData ? (
        <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size={60} color={Colors.main} />
        </View>
      ) : (
        <View style={{flex: 1, zIndex: -1}}>
          <FlatList
            data={data}
            renderItem={itemData => (
              <Article
                title={itemData.item.title}
                body={itemData.item.body}
                image={itemData.item.image}
              />
            )}
            onEndReached={handleEndReached}
            refreshing={isReloadingData}
            onRefresh={reloadArticles}
          />
        </View>
      )}
      {isLoadingData && !loadedAllData ? (
        <ActivityIndicator
          style={{position: 'absolute', bottom: 0, alignSelf: 'center'}}
          size={60}
          color={Colors.main}
        />
      ) : null}
    </View>
  );
};

export default Dashboard;
