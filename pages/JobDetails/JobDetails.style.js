import { StyleSheet } from "react-native";
import { COLORS, SHADOWS, SIZES } from "../../constants";

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
        color: COLORS.black
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
        color: COLORS.black
    },
    description: {
        fontSize: 16,
        marginBottom: 16,
        color: COLORS.black
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
    categoriesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-around",
        marginTop: 8,
    },
    category: {
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 4,
        margin: 4,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    value: {
        fontSize: 16,
        color: COLORS.white,
    },
    button: {
        alignItems: 'center',
        backgroundColor: COLORS.black,
        borderColor: COLORS.primary,
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
       marginTop: 10,
      },
});

export default styles;
