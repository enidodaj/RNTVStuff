import React, { useRef } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntIcon from 'react-native-vector-icons/AntDesign';

type Props = {
  onChange: (q: string) => void,
  loading: boolean,
  isFavoritesList: boolean,
  showFavorites: () => void,
  clearList: () => void;
}

const SearchInput: React.FC<Props> = ({
  onChange,
  loading,
  isFavoritesList,
  showFavorites,
  clearList,
}) => {
  const inputRef = useRef<TextInput>() as React.MutableRefObject<TextInput>;;

  return (
    <View style={styles.container}>
      {loading ? <ActivityIndicator color="#888" /> : <Icon name="search" size={20} color="#444" />}
      <TextInput
        ref={inputRef}
        onChangeText={onChange}
        style={styles.input}
        placeholder="Search TV shows..." />
      <TouchableOpacity
        onPress={() => {
          inputRef.current.clear();
          clearList();
        }}
        style={{
          marginRight: 5,
        }}
      >
        <AntIcon name="closecircleo" color="#444" size={18} />          
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={showFavorites}
      >
        <AntIcon name={isFavoritesList ? "star" : "staro"} color="#444" size={20} />          
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    // width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#cccd',
    height: 50,
    borderRadius: 10,
  },
  input: {
    // width: '100%',
    flex: 1,
    marginLeft: 3
  }
});

export default SearchInput;