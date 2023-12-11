import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
        color: COLORS.white
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        color: COLORS.white
    },
    groupContainer: {
        backgroundColor: 'rgba(169, 169, 169, 0.8)',
        padding: SIZES.medium,
        borderRadius: SIZES.small,
        backgroundColor: COLORS.black,
        ...SHADOWS.medium,
        shadowColor: COLORS.primary,
        padding: 10,
        marginTop: 10
    },
    detailsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 8,
        borderBottomColor: COLORS.white,
        borderBottomWidth: 1,
        padding: 2,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },
    value: {
        fontSize: 16,
        color: COLORS.white,
    },
});

export default styles;
