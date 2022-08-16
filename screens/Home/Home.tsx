import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SearchInput from "../../components/common/SearchInput";
import SearchResult from "../../components/SearchResult/SearchResult";
import {ShowsService} from '../../config/showsService';
import {debounce} from 'lodash';
import AsyncStorage from "@react-native-async-storage/async-storage";
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';

const Home : React.FC = ({navigation}) => {
  const showsApiInstance = new ShowsService();
  const [showsList, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mainTextMessage, setMainTextMessage] = useState('Search Shows');
  const [isFavoritesList, setIsFavoritesList] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState(null);

  const fetchController = new AbortController();

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(status => {
      setConnectionStatus(status);
      console.log(status, ' status');
    });

    return () => {
      unsubscribe();
      fetchController.abort();
    }
  }, []);

  const getResults = async (query: string) => {
    setLoading(true);
    setIsFavoritesList(false);

    if (query.length >= 3) {
      if (connectionStatus?.isConnected) {
        await showsApiInstance.getShowResults(query).then((res: any) => {
          setShows(res.map((show) => show.show).sort((a, b) => a.rating.average < b.rating.average));
          if (res.length === 0) {
            setMainTextMessage('No results available');
          }
          setLoading(false);
        }).catch((err: any) => {
          console.log(err);
          setMainTextMessage('An error occurred...')
          setLoading(false);
        });
      } else {
        setShows([]);
        setMainTextMessage('No Internet Connection');
        setLoading(false);
      }
    } else {
      setShows([]);
      setMainTextMessage('Search Shows');
      setLoading(false);
    }
  }

  const handleShowFavorites = async () => {
    setLoading(true);
    if (isFavoritesList) {
      setIsFavoritesList(false);
      setShows([]);
      setLoading(false);
    } else {
      setShows([]);
      const favoritesListStr = await AsyncStorage.getItem('@favoritesList');
      const favoritesListArr = favoritesListStr === null ? [] : JSON.parse(favoritesListStr);
      setShows(favoritesListArr);
      setIsFavoritesList(true);
      setLoading(false);
    }
  }

  const debounceOnChange = debounce(getResults, 300);

  return (
    <View style={{
      flex: 1,
      alignItems: 'center',
    }}>
      <View style={{padding: 10, width: '100%', flexDirection: 'row'}}>
        <SearchInput
          onChange={debounceOnChange}
          loading={loading}
          isFavoritesList={isFavoritesList}
          showFavorites={() => handleShowFavorites()}
          clearList={() => setShows([])}
        />
      </View>
      {!showsList.length ?
        (<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', color: '#bfc4d6'}}>{mainTextMessage}</Text>
        </View>)
      : (
          <ScrollView style={{flex: 1, width: '100%', paddingHorizontal: 10}}>
            {showsList.map((show) => {
              return (
                <SearchResult 
                  name={show?.name} 
                  key={show?.id}
                  image={show?.image?.medium}
                  rating={show.rating?.average}
                  summary={show?.summary}
                  onPress={() => navigation.navigate('Detail', {show})}
                />
              )
            })}
          </ScrollView>
        )}
    </View>
  );
}

export default Home;