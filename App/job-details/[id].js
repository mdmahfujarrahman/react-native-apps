import React from "react";
import {
    Text,
    View,
    SafeAreaView,
    ActivityIndicator,
    RefreshControl,
    ScrollView,
} from "react-native";
import { Stack, useRouter, useSearchParams } from "expo-router";
import { useState, useCallback } from "react";

import {
    Company,
    JobAbout,
    JobFooter,
    JobTabs,
    ScreenHeaderBtn,
    Specifics,
} from "../../components";

import { COLORS, icons, SIZES } from "../../constants";
import useFetch from "../../hook/useFetch";

const tabs = ["About", "Qualifications", "Responsibilities"];

const JobDetails = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [refreshing, setRefreshing] = useState(false);
    const { response, isLoading, error, refetch } = useFetch("job-details", {
        job_id: params.id,
    });
    const [selectedTab, setSelectedTab] = useState(tabs[0]);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refetch();
        setRefreshing(false);
    }, []);

    const displayContentByTab = () => {
        switch (selectedTab) {
            case "About":
                return (
                    <JobAbout info={response[0].job_description ?? ["N/A"]} />
                );
            case "Qualifications":
                return (
                    <Specifics
                        title="Qualifications"
                        points={
                            response[0].job_highlights?.Qualifications ?? [
                                "N/A",
                            ]
                        }
                    />
                );
            case "Responsibilities":
                return (
                    <Specifics
                        title="Responsibilities"
                        points={
                            response[0].job_highlights?.Responsibilities ?? [
                                "N/A",
                            ]
                        }
                    />
                );
            default:
                break;
        }
    };

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
                    headerBackVisible: false,
                    headerLeft: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.left}
                            dimension="60%"
                            handlePress={() => router.back()}
                        />
                    ),
                    headerRight: () => (
                        <ScreenHeaderBtn
                            iconUrl={icons.share}
                            dimension="60%"
                        />
                    ),
                    headerTitle: "",
                }}
            />
            <>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {isLoading ? (
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    ) : error ? (
                        <Text>Something Wrong</Text>
                    ) : response.length === 0 ? (
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    ) : (
                        <View
                            style={{
                                padding: SIZES.medium,
                                paddingBottom: 100,
                            }}
                        >
                            <Company
                                companyLogo={response[0].empoyer_logo}
                                companyName={response[0].employer_name}
                                jobTitle={response[0].job_title}
                                location={response[0].job_country}
                            />
                            <JobTabs
                                tabs={tabs}
                                selectedTab={selectedTab}
                                setSelectedTab={setSelectedTab}
                            />
                            {displayContentByTab()}
                        </View>
                    )}
                </ScrollView>
                <JobFooter
                    url={
                        response[0]?.job_google_link ??
                        "https://careers.google.com/jobs/results"
                    }
                />
            </>
        </SafeAreaView>
    );
};

export default JobDetails;
