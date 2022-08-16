import React, { useEffect, useState } from 'react';
import {View, Text, TouchableOpacity, Image, useWindowDimensions, Linking, TouchableWithoutFeedback, ScrollView, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderHTML from 'react-native-render-html';
import { dateFormatter, dayScheduleFormatter } from '../../config/utils';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import { ShowsService } from '../../config/showsService';
import { showInfoMessage } from '../../config/messageService';
import EpisodesListModal from '../../components/episodes/EpisodesListModal';
const noImage = require('../../assets/images/no-image.webp');

const InfoText = ({children, style = {}}) => {
  return <Text style={{...style, color: '#4b567a'}}>{children}</Text>
}

const InfoLine = ({about, value}) => {
  return (
    <Text style={{color: '#4b567a'}}>
      <Text style={{fontWeight: 'bold'}}>{about}: </Text>
      <Text>{value}</Text>
    </Text>
  );
}

const Detail : React.FC = ({ route, navigation }) => {
  const {show: {
    id,
    averageRuntime,
    name,
    image,
    summary,
    rating,
    network,
    schedule,
    status,
    type,
    premiered,
    ended,
    officialSite,
    genres,
  }} = route.params;

  const showsApiInstance = new ShowsService();
  const [isLoading, setIsLoading] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoritesList, setFavoritesList] = useState([]);
  const [episodes, setEpisodes] = useState([]);
  const [nextEpisode, setNextEpisode] = useState(null);
  const [episodesListVisible, setEpisodesListVisible] = useState(false);

  const getEpisodes: () => void = async () => {
    const result = await showsApiInstance
      .getEpisodes(id)
      .catch(err => showInfoMessage('An error occurred!'));
    const today = new Date();
    const nextEpisode = [...result].find((episode) => {
      return new Date(episode.airdate).setHours(0, 0, 0, 0) > today.setHours(0, 0, 0, 0);
    });
    setNextEpisode(nextEpisode);
    setEpisodes(result);
  }

  useEffect(() => {
    setIsLoading(true);
    const getIsFavorite = async () => {
      const favoritesListStr = await AsyncStorage.getItem('@favoritesList');
      const favoritesListArr = favoritesListStr === null ? [] : JSON.parse(favoritesListStr);
      setFavoritesList(favoritesListArr);
      const indexOfFavorite: number = favoritesListArr.map(show => show.id).indexOf(id);
      if (indexOfFavorite < 0) {
        setIsFavorite(false)
      } else {
        setIsFavorite(true);
      }
    }

    getIsFavorite();
    getEpisodes();
    setIsLoading(false);
  }, []);

  const handleFavorites: () => void = async () => {
    let newFavorites = [...favoritesList];
    setIsFavorite(!isFavorite);
    if (isFavorite) {
      const indexOfFavorite: number = newFavorites.map(show => show.id).indexOf(id);
      console.log(newFavorites.map(show => show.id));
      newFavorites.splice(indexOfFavorite, 1);
      showMessage({
        type: 'success',
        message: 'Show removed from favorites.',
        backgroundColor: '#ccf',
        color: '#338',
        position: 'bottom',
        icon: () => (<View style={{marginRight: 8}}><Icon name="favorite-outline" color="#ff5280" size={18} /></View>),
      })
    } else {
      newFavorites.push(route.params.show);
      showMessage({
        type: 'success',
        message: 'Show added to favorites list.',
        backgroundColor: '#ccf',
        color: '#338',
        position: 'bottom',
        icon: () => (<View style={{marginRight: 8}}><Icon name="favorite" color="#ff5280" size={18} /></View>),
      })
    }
    setFavoritesList(newFavorites);
    await AsyncStorage.setItem('@favoritesList', JSON.stringify(newFavorites));
    const newFavoritesProva = await AsyncStorage.getItem('@favoritesList');
  }

  const {width} = useWindowDimensions();

  return (
    <View style={styles.container}>
      {isLoading ? 
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator color="#888" size={'large'} />
        </View> : 
        <View style={{flex: 1}}>
          <View style={styles.imageContainer}>
            <Image
              source={image ? {
                uri: image.original
              } : noImage}
              style={{
                height: 250,
                width: 300,
                resizeMode: 'contain',
              }}
            />
          </View>
          <ScrollView style={{flex: 1}}>
            <View style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              marginBottom: 15
            }}>
              <TouchableOpacity onPress={handleFavorites}>
                <Icon name={isFavorite ? 'favorite' : 'favorite-outline'} size={23} color="#ff5280" />
              </TouchableOpacity>
              {rating.average ? <View style={{backgroundColor: '#bfc4d6', height: '80%', width: 1}}></View> : null}
              {rating.average ? <View>
                <Icon name="star" size={18} color="#72d68f" />
                <Text style={{color: '#bfc4d6'}}>{rating.average}</Text>
              </View> : null}
            </View>
            <View
              style={{...styles.infoContainer}}>
              <RenderHTML
                source={{
                  html: `<div style="color:#4b567a">${summary}</div>`
                }}
                contentWidth={width}
              />
            </View>
            <View style={{...styles.infoContainer, paddingVertical: 10}}>
              {/* <InfoText style={{color: '#4b567a'}}> */}
                <InfoText style={{fontSize: 24}}>Show Info</InfoText>
              {/* </Text> */}
              <InfoText>
                <Text style={{fontWeight: 'bold'}}>Network: </Text>
                {network ? <TouchableWithoutFeedback
                  onPress={() => network.officialSite ? Linking.openURL(network.officialSite) : null}>
                  <Text style={{color: '#5687a8'}}>{network.name} ({network.country.code}) </Text>
                </TouchableWithoutFeedback> : null}
                <Text>({dateFormatter(premiered, 'yyyy')} - {ended ? dateFormatter(ended, 'yyyy') : 'now'})</Text>
              </InfoText>
              <InfoLine about={'Schedule'} value={`${dayScheduleFormatter(schedule.days)}${schedule.time ? ' at ' + schedule.time : ''} (${averageRuntime} min)`} />
              <InfoLine about={'Show type'} value={type} />
              <InfoLine about={'Status'} value={status} />
              <InfoLine about={'Genres'} value={genres.join(' | ')} />
              {officialSite ? (
                <InfoText>
                    <Text style={{fontWeight: 'bold'}}>Official site: </Text>
                  <TouchableWithoutFeedback onPress={() => Linking.openURL(officialSite)}>
                    <Text style={{color: '#5687a8'}}>{officialSite}</Text>
                  </TouchableWithoutFeedback>
                </InfoText>
              ) : null}
              {rating.average ? <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <InfoText style={{fontWeight: 'bold'}}>Rating: </InfoText>
                <Icon name="star" size={18} color="#72d68f" />
                <InfoText> {rating.average}</InfoText>
              </View> : null}
            </View>
            {nextEpisode ? <View style={{...styles.infoContainer, paddingVertical: 10}}>
              <InfoText style={{fontSize: 14}}>Next Episode</InfoText>
              <InfoText style={{fontSize: 24}}>{nextEpisode.name}</InfoText>
              {/* <InfoLine about={'Air time'} value={`${dateFormatter(nextEpisode.airdate, 'long')} at ${nextEpisode.airtime}`} /> */}
              <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 3}}>
                <Icon name="calendar-today" size={20} />
                <InfoText> {`${dateFormatter(nextEpisode.airdate, 'long')} at ${nextEpisode.airtime}`}</InfoText>
              </View>
            </View> : null}
            <TouchableOpacity style={styles.episodesButton} onPress={() => setEpisodesListVisible(true)}>
              <Text style={styles.episodesButtonText}>List of episodes</Text>
            </TouchableOpacity>
          </ScrollView>
          <EpisodesListModal
            episodes={episodes}
            visible={episodesListVisible}
            onClose={() => setEpisodesListVisible(false)}
            showName={name}
          />
        </View>
      }
      <FlashMessage position={"top"} />
    </View>
  );
};

export default Detail;