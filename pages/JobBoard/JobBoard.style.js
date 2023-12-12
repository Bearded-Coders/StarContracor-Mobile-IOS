import { StyleSheet } from "react-native";
import { COLORS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollContainerJobs: {
        flex: 1,
    },
    scrollContentContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    actInd: {
        // Additional styles if needed
    },
    button: {
        width: '100%', // Adjust the width as needed
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
});

export default styles;