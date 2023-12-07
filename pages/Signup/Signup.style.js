// Signup.style.js
import { StyleSheet } from 'react-native';
import { COLORS } from '../../constants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover',
  },
  scrollContainer: {
    flexGrow: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    color: COLORS.white,
    marginBottom: 40,
    textAlign: 'center',
  },
  inputView: {
    width: '90%',
    backgroundColor: COLORS.secondary,
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    height: 50,
    color: 'white',
  },
  signupBtn: {
    width: '100%',
    backgroundColor: COLORS.primary,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  signupBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default styles;
