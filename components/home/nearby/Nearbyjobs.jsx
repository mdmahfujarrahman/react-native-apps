import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

import styles from "./nearbyjobs.style";
import { COLORS } from "../../../constants";
import NearbyJobCard from "../../common/cards/nearby/NearbyJobCard";
import useFetch from "../../../hook/useFetch";

const Nearbyjobs = () => {
    const router = useRouter();
    const { isLoading, error, response } = useFetch("search", {
        query: "React Developer",
        num_pages: 1,
    });

    console.log(response);
    console.log(error);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Nearby Jobs</Text>
                <TouchableOpacity>
                    <Text style={styles.headerBtn}>View All</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cardsContainer}>
                {isLoading ? (
                    <ActivityIndicator size="large" color={COLORS.primary} />
                ) : error ? (
                    <Text style={styles.errorText}>Something Wrong</Text>
                ) : (
                    response?.map((job) => (
                        <NearbyJobCard
                            job={job}
                            handleNavigate={() =>
                                router.push(`/job-details/${job.job_id}`)
                            }
                            key={`nearby-job-${job.job_id}`}
                        />
                    ))
                )}
            </View>
        </View>
    );
};

export default Nearbyjobs;
