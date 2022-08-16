import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RenderHTML from 'react-native-render-html';
import { truncateHtml } from '../../config/utils';

const noImage = require('../../assets/images/no-image.webp');

type Props = {
  name: string,
  image: string,
  rating?: number,
  summary?: string | any,
  onPress?: any,
}

const SearchResult: React.FC<Props> = ({
  name,
  image,
  rating,
  summary,
  onPress,
}) => {
  const summaryExcerpt = summary === null ? '' : truncateHtml(summary, 70, 'color:#bfc4d6');

  return (
    <TouchableOpacity style={styles.showContainer} onPress={onPress}>
      <View style={styles.image}>
        <Image 
          source={image ? {
            uri: image
          } : noImage}
          style={{
            width: 80,
            height: 100,
            resizeMode: 'contain'
          }}
        />
      </View>
      <View style={styles.showData}>
        <Text numberOfLines={1} style={styles.title}>{name.length > 27 ? name.substring(0, 24) + ' ...' : name}</Text>
        {summaryExcerpt ? <View style={{height: 70, alignItems: 'flex-start'}}>
          <RenderHTML
            enableExperimentalMarginCollapsing={true}
            contentWidth={200}
            source={{
              html: summaryExcerpt
            }} />
        </View> : null}
        {rating ? <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Icon name="star" size={18} color="#72d68f" />
          <Text style={{color: '#bfc4d6', marginLeft: 5}}>{rating}</Text>
        </View> : null}
      </View>
    </TouchableOpacity>
  );
};

export default SearchResult;