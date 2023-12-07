import { StyleSheet } from "react-native";
import { COLORS } from "../../constants";
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        resizeMode: "cover",
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: COLORS.white,
        marginBottom: 40,
        textAlign: "center"
    },
    inputView: {
        width: "80%",
        backgroundColor: COLORS.secondary,
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20
    },
    inputText: {
        height: 50,
        color: "white"
    },
    forgotAndSignUpText: {
        color: "white",
        fontSize: 11
    },
    loginBtn: {
        width: "80%",
        backgroundColor: COLORS.primary,
        borderWidth: "1px",
        borderColor: "black",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10
    },
})

export default styles;