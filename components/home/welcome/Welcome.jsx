import { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    FlatList,
} from "react-native";
import { useRouter } from "expo-router";

import styles from "./welcome.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full Time", "Part Time", "Contract", "Freelance"];

const Welcome = ({ search, setSearch, handleClick }) => {
    const router = useRouter();
    const [activeJobType, setActiveJobType] = useState("Full Time");

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.userName}>Hello, Tanvir</Text>
                <Text style={styles.welcomeMessage}>
                    Find Your perfect Jobs
                </Text>
            </View>
            <View style={styles.searchContainer}>
                <View style={styles.searchWrapper}>
                    <TextInput
                        style={styles.searchInput}
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholder="What are you looking for?"
                    />
                </View>
                <TouchableOpacity
                    style={styles.searchBtn}
                    onPress={handleClick}
                >
                    <Image
                        on
                        style={styles.searchBtnImage}
                        source={icons.search}
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.tabsContainer}>
                <FlatList
                    data={jobTypes}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.tab(activeJobType, item)}
                            onPress={() => {
                                setActiveJobType(item);
                                router.push(`/search/${item}`);
                            }}
                        >
                            <Text style={styles.tabText(activeJobType, item)}>
                                {item}
                            </Text>
                        </TouchableOpacity>
                    )}
                    keyExtractor={(item) => item}
                    contentContainerStyle={{
                        columnGap: SIZES.small,
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

export default Welcome;
