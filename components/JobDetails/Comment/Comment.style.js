import { StyleSheet } from "react-native";
import { COLORS } from "../../../constants";

const styles = StyleSheet.create({
    commentContainer: {
        flex: 1,
        marginVertical: 8,
        backgroundColor: 'rgba(169, 169, 169, 0.8)',
        padding: 5,
    },
    inputContainer: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: COLORS.primary,
        padding: 8,
        backgroundColor: 'rgba(169, 169, 169, 0.8)',
    },
    button: {
        width: '100%', // Adjust the width as needed
        padding: 10,
        borderRadius: 50,
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 15,
        elevation: 3, // Add elevation for a shadow effect
        marginBottom: 80,
    },
    centeredInput: {
        alignSelf: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        flex: 1,
        marginBottom: 400
    },
});

export default styles;