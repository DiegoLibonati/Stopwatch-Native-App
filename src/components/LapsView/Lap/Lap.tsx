import { StyleSheet, Text, View } from "react-native";
import { theme } from "../../../theme/theme";

export const Lap = ({
  lapNumber,
  time,
}: {
  lapNumber: number;
  time: string;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.lapNumber}>{lapNumber}</Text>
      <Text style={styles.lapTime}>{time}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 25,
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors.black,
    elevation: 0.1,
  },
  lapNumber: {
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: theme.fontSize.sm,
    width: 33,
    height: 33,
    borderRadius: 1000,
    borderWidth: 2,
    color: theme.colors.primaryColor,
    borderColor: theme.colors.primaryColor,
  },
  lapTime: {
    fontSize: theme.fontSize.lg,
  },
});
