import { StyleSheet } from "react-native";
import { COLORS, SIZES, SHADOWS } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: 'rgba(169, 169, 169, 0.8)',
        padding: 10
    },
    headerText: {
        fontSize: SIZES.xxLarge,
        textAlign: "center",
        color: COLORS.black
    },
    friendContainer: {
        flex: 1,
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        padding: SIZES.medium,
        borderRadius: 10,
        backgroundColor: COLORS.black,
        ...SHADOWS.medium,
        shadowColor: COLORS.primary,
        margin: 10
      },
      logoContainer: {
        width: 50,
        height: 50,
        backgroundColor: COLORS.black,
        borderRadius: SIZES.medium,
        justifyContent: "center",
        alignItems: "center",
      },
      logImage: {
        width: "70%",
        height: "70%",
      },
});

export default styles;