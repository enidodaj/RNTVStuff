import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000c',
    padding: 0,
  },
  episodesListContainer: {
    width:  '90%',
    height: '60%',
    backgroundColor: '#f7f8ff',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  showName: {
    fontSize: 22,
    fontWeight: '400',
    width: '100%',
    textAlign: 'center',
  },
  list: {
    marginBottom: 15,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#555',
    flex: 1,
    width: '100%',
  },
  closeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  }
});

export default styles;