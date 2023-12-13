import { StyleSheet } from "react-native";
import { SHADOWS, SIZES, COLORS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    header: {
        backgroundColor: 'rgba(169, 169, 169, 0.8)',
        width: "100%",
        padding: 10,
        borderRadius: SIZES.small,
        color: COLORS.black,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    headerText: {
        fontSize: SIZES.xLarge,
        color: COLORS.black
    },
    logoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: "70%",
        height: "70%",
    },
    ratingsContainer: {
        padding: 2,
        ...SHADOWS.medium,
        shadowColor: COLORS.primary,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: "black",
    },
    ratingHeader: {
        textDecorationLine: "underline",
        fontSize: 18,
        textAlign: "center",
        color: COLORS.white
    },
    rating: {
        color: "red",
        fontSize: 18,
        margin: 5
    },
    button: {
        alignItems: 'center',
        backgroundColor: COLORS.black,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: "45%",
        textAlign: "center",
        verticalAlign: "auto"
    },
    dblBtnContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    }
});

export default styles;