import { Stack } from "expo-router";

import { MenuProvider } from "../lib/MenuContext";
import { COLORS } from "../lib/theme";

export default function RootLayout() {
  return (
    <MenuProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTintColor: "white",
        }}
      >
        {/* ซ่อน header ของ Stack — แท็บมี header ของตัวเอง */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false, title: "หน้าแรก" }}
        />
      </Stack>
    </MenuProvider>
  );
}
