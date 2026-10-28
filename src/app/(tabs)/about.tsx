import { StyleSheet, Text, View } from "react-native";

import { COLORS, SPACING } from "../../lib/theme";

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>กินในงบ 🍜</Text>
      <Text style={styles.text}>แอปช่วยเลือกเมนูไม่ให้เกินงบ</Text>
      <Text style={styles.text}>ศศิพิมพ์ เปรมกิจ(6823765562)</Text>
      <Text style={styles.muted}>dX212 Mobile Programming · คาบ 9</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    gap: SPACING.sm,
    backgroundColor: COLORS.bg,
  },
  title: { fontSize: 28, fontWeight: "bold", color: COLORS.primary },
  text: { fontSize: 16, color: COLORS.text },
  muted: { fontSize: 14, color: COLORS.muted },
});
