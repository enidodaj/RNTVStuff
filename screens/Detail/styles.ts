import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    paddingBottom: 15,
  },
  infoContainer: {
    width: '100%',
    borderRadius: 10,
    paddingHorizontal: 16,
    backgroundColor: '#bfc4d6',
    marginBottom: 10,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowRadius: 13,
    shadowOpacity: 0.45,
  },
  episodesButton: {
    paddingVertical: 10,
    marginBottom: 5,
    backgroundColor: '#f2e6ff',
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  episodesButtonText: {
    fontWeight: '500',
    fontSize: 17
  }
});

export default styles;