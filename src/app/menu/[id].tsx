import { Stack, router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from "react-native";

import { useMenus } from "../../lib/MenuContext";
import { COLORS, SPACING } from "../../lib/theme";

export default function MenuDetail() {
  const { menus, loading } = useMenus();
  const { id } = useLocalSearchParams<{ id: string }>();
  const menu = menus.find((m) => m.id === Number(id));

  if (loading && !menu) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color={COLORS.primary} />
      </View>
    );
  }

  if (!menu) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: "ไม่พบเมนู" }} />
        <Text style={styles.name}>ไม่พบเมนูนี้ (id: {id})</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: menu.name }} />
      <Text style={styles.emoji}>{menu.emoji}</Text>
      <Text style={styles.name}>{menu.name}</Text>
      <Text style={styles.price}>{menu.price} บาท</Text>

      <View style={styles.tags}>
        <Text style={styles.tag}>{menu.category}</Text>
        {menu.spicy && <Text style={styles.tag}>เผ็ด 🌶️</Text>}
      </View>

      <Pressable style={styles.btn} onPress={() => router.back()}>
        <Text style={styles.btnText}>← กลับ</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.sm,
    backgroundColor: COLORS.bg,
  },
  emoji: { fontSize: 72 },
  name: { fontSize: 24, fontWeight: "bold", color: COLORS.text },
  price: { fontSize: 20, color: COLORS.primary, fontWeight: "bold" },
  tags: { flexDirection: "row", gap: SPACING.sm },
  tag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: COLORS.border,
    color: COLORS.muted,
  },
  btn: {
    marginTop: SPACING.lg,
    minHeight: 44,
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  btnText: { color: "white", fontWeight: "bold", fontSize: 16 },
});
