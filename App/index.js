import { useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { Stack, useRouter } from "expo-router";

import { COLORS, icons, images, SIZES } from "../constants";
import {
    Nearbyjobs,
    Popularjobs,
    ScreenHeaderBtn,
    Welcome,
} from "../components";
import useFetch from "../hook/useFetch";

const Home = () => {
    const router = useRouter();
    const [search, setSearch] = useState("");
    const { isLoading, error, response } = useFetch("search", {
        query: "React developer",
        num_pages: 1,
    });

    return (
        <SafeAreaView
            style={{
                flex: 1,
                backgroundColor: COLORS.lightWhite,
            }}
        >
            <Stack.Screen
                options={{
                    headerStyle: {
                        backgroundColor: COLORS.lightWhite,
                    },
                    headerShadowVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn iconUrl={icons.menu} dimension="60%" />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={images.profile}
                            dimension="100%"
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <ScrollView showsHorizontalScrollIndicator={false}>
                <View
                    style={{
                        flex: 1,
                        padding: SIZES.medium,
                    }}
                >
                    <Welcome
                        search={search}
                        setSearch={setSearch}
                        handleClick={() => {
                            if (search) {
                                router.push(`/search/${search}`);
                            }
                        }}
                    />
                    <Popularjobs
                        isLoading={isLoading}
                        error={error}
                        response={response}
                    />
                    <Nearbyjobs
                        isLoading={isLoading}
                        error={error}
                        response={response}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;
