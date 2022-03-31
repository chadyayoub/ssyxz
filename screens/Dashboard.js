import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Button,
  Alert,
} from 'react-native';
import React, {useEffect, useReducer, useRef} from 'react';
import Article from '../components/Article';
import {useDispatch, useSelector} from 'react-redux';
import * as dashboardActions from '../store/actions/articles';
import Colors from '../constants/Colors';
import {useState} from 'react';
import InputField from '../components/InputField';
import CustomButton from '../components/CustomButton';

const Dashboard = props => {
  const data = useSelector(state => state.articles.articles);
  const filteredData = useSelector(state => state.articles.filteredArticles);
  const currentPage = useSelector(state => state.articles.currentPage);
  const getToken = useSelector(state => state.auth.token);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [isReloadingData, setIsReloadingData] = useState(true);
  const [loadedAllData, setLoadedAllData] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [toggleSearchBar, setToggleSearchBar] = useState(false);
  const dispatch = useDispatch();
  const [token, setToken] = useState(getToken);
  const [error, setError] = useState('');
  useEffect(() => {
    if (error != '') Alert.alert('an error occured', error, [{text: 'okay'}]);
  }, [error]);

  useEffect(() => {
    reloadArticles();
  }, []);

  useEffect(() => {
    setToggleSearchBar(props.route.params.SearchClicked);
  }, [props.route.params]);

  const loadNewArticles = async () => {
    if (!isLoadingData && !loadedAllData) {
      setIsLoadingData(true);
      setError('');
      try {
        await dispatch(
          dashboardActions.loadMoreArticles(token, currentPage),
        ).then(() => {
          setIsLoadingData(false);
        });
      } catch (err) {
        setError(err.message);
        if (err.message === 'No more data to load') setLoadedAllData(true);
      }
    }
  };
  const reloadArticles = async () => {
    setIsReloadingData(true);
    handleCloseSearch();
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

  const loadMore = () => {
    if (!loadedAllData) {
      loadNewArticles();
      filterArticles();
    } else throw new Error('No more data to load');
  };
  const handleSearchInput = input => {
    setSearchInput(input);
  };

  const filterArticles = () => {
    dispatch(dashboardActions.searchForArticles(searchInput, data));
    setIsFiltered(true);
  };
  const handleCloseSearch = () => {
    setToggleSearchBar(false);
    setIsFiltered(false);
  };
  const handleEndReached = () => {
    if (!isFiltered) loadNewArticles();
  };

  return (
    <View style={{flex: 1}}>
      {isReloadingData ? (
        <View
          style={{flex: 1, justifyContent: 'center', alignContent: 'center'}}>
          <ActivityIndicator size={60} color={Colors.main} />
        </View>
      ) : (
        <View style={{flex: 1}}>
          {toggleSearchBar ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginVertical: 5,
                alignItems: 'center',
              }}>
              <InputField
                hint="Seach for articles..."
                onDone={filterArticles}
                value={searchInput}
                onChangeText={handleSearchInput}
              />
              {isFiltered ? (
                <CustomButton
                  title="load more"
                  onPress={loadMore}
                  style={{width: 120}}
                />
              ) : null}
              <CustomButton
                style={{
                  marginLeft: 3,
                  width: 40,
                  height: 40,
                }}
                onPress={handleCloseSearch}
                title="X"
              />
            </View>
          ) : null}
          <FlatList
            data={isFiltered ? filteredData : data}
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
        <ActivityIndicator size={60} color={Colors.main} />
      ) : null}
    </View>
  );
};

export default Dashboard;
