import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  showContainer: {
    flex: 1,
    width: '100%',
    minHeight: 120,
    flexDirection: 'row',
    marginBottom: 10,
    backgroundColor: '#444c69',
    borderRadius: 10,
    paddingHorizontal: 8,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: .2,
    shadowRadius: 5
  },
  image: {
    height: '100%',
    width: 100,
    justifyContent: 'center',
    borderRadius: 4,
  },
  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#bfc4d6',
    width: 250,
    // marginBottom: -7,
  },
  showData: {
    flex: 1,
    // justifyContent: 'space-around',
    padding: 7,
  }
});

export default styles;