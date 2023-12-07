import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    marginTop: 20,
    justifyContent: "center"
  },
  scrollContainerUser: {
    flex: 1,
    marginTop: 20
  },
  buttonContainer: {
    alignItems: 'center',
  },
  button: {
    width: '80%', // Adjust the width as needed
    padding: 20,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
    elevation: 3, // Add elevation for a shadow effect
  },
  loginButton: {
    backgroundColor: COLORS.secondary,
    borderWidth: "1px",
    borderColor: COLORS.primary
  },
  signupButton: {
    backgroundColor: COLORS.secondary,
    borderWidth: "1px",
    borderColor: COLORS.primary
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  userInfoContainer: {
    alignItems: 'center',
    marginTop: SIZES.padding * 2,
  },
  ratingsContainer: {
    padding: 2,
    borderWidth: "2px",
    borderColor: "white",
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: 'rgba(169, 169, 169, 0.8)',
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: SIZES.padding,
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: SIZES.base,
  },
  ratingHeader: {
    textDecorationLine: "underline",
    fontSize: 18,
    textAlign: "center",
    color: COLORS.white
  },
  rating: {
    color: COLORS.black,
    fontSize: 18,
    margin: 5
  },
  email: {
    fontSize: 16,
    color: COLORS.white,
    marginBottom: SIZES.base,
  },
  startingArea: {
    fontSize: 16,
    color: COLORS.white,
  },
});

export default styles;