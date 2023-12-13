import { StyleSheet } from "react-native";

import { COLORS, SHADOWS, SIZES } from "../../constants";

const styles = StyleSheet.create({
  container: {
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
  textContainer: {
    flex: 1,
    marginHorizontal: SIZES.medium,
  },
  jobName: {
    fontSize: SIZES.medium,
    color: COLORS.primary,
  },
  jobType: {
    fontSize: SIZES.small + 2,
    color: COLORS.gray,
    marginTop: 3,
    textTransform: "capitalize",
  },
});

export default styles;