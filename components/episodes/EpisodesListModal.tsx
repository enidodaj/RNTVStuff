import React from "react";
import { Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { dateFormatter } from "../../config/utils";
import styles from "./styles";

type Props  = {
  episodes: Object[],
  showName: string,
  visible: boolean,
  onClose: () => void,
}

const EpisodeRow = ({episode}) => {
  const {
    id,
    name,
    season,
    number,
    rating,
    airstamp,
  } = episode;

  return (
    <View style={{flexDirection: 'row', paddingVertical: 4, borderBottomWidth: 1, borderBottomColor: '#ddd'}}>
      <View style={{width: 20, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{season}</Text>
      </View>
      <View style={{width: 25, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{number}</Text>
      </View>
      <View style={{flex: 1, justifyContent: 'center', paddingHorizontal: 7}}>
        <Text>{name}</Text>
        <Text style={{fontSize: 14}}>{dateFormatter(airstamp, "longWithHour")}</Text>
      </View>
      <View style={{width: 25, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{rating.average || '-'}</Text>
      </View>
    </View>
  )
}

const EpisodesListModal: React.FC<Props> = ({
  episodes,
  showName,
  visible,
  onClose,
}) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        activeOpacity={1}
        style={styles.modalContainer} 
        onPressOut={onClose}>
        <View
          style={styles.episodesListContainer}
          onStartShouldSetResponder={() => true}
        >
          <Text style={styles.showName}>{showName.toUpperCase()}</Text>
          <View style={{
            width: '100%',
            marginTop: 15,
            // padding: 8,
            borderTopWidth: 1,
            flexDirection: 'row',
            paddingVertical: 4,
          }}>
            <View style={{
              width: 20,
              margin: 0,
              padding: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{fontWeight: '600'}}>S.</Text>
            </View>
            <View style={{
              width: 25,
              margin: 0,
              padding: 0,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Text style={{fontWeight: '600'}}>Ep.</Text>
            </View>
            <View style={{flex: 1, paddingHorizontal: 7}}>
              <Text style={{fontWeight: '600'}}>Name /</Text>
              <Text style={{fontWeight: '600'}}>Air date</Text>
            </View>
            <View style={{width: 25, alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="star" color="#72d68f" size={15} />
            </View>
          </View>
          <ScrollView style={styles.list} showsVerticalScrollIndicator={false}>
            {episodes.sort((a, b) => {
              if (a.airstamp > b.airstamp) {
                return -1;
              }
              if (a.airstamp < b.airstamp) {
                return 1;
              }
              return 0;
            }).map((episode) => {
              return (
                <EpisodeRow episode={episode} key={episode.id} />
              )
            })}
          </ScrollView>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={{color: '#ed4577'}}>Close</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  )
};

export default EpisodesListModal;