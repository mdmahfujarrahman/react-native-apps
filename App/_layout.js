import { Stack } from "expo-router";
import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

const Layout = () => {
    const [fontsLoaded] = useFonts({
        DMRegular: require("../assets/fonts/DMSans-Regular.ttf"),
        DMMedium: require("../assets/fonts/DMSans-Medium.ttf"),
        DMBold: require("../assets/fonts/DMSans-Bold.ttf"),
    });

    const onReady = useCallback(async () => {
        if (fontsLoaded) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded]);

    if (!fontsLoaded) {
        return null;
    }

    return <Stack onLayout={onReady} />;
};

export default Layout;
