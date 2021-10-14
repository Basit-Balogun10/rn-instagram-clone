import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { USERS } from "../../data/users";

const Stories = () => {
    return (
        <View styles={styles.storiesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {USERS.map((story, index) => (
                    <View style={styles.storyContainer} key={index}>
                        <Image
                            source={{ uri: story.image }}
                            style={styles.story}
                        />
                        <Text style={styles.storyText}>
                            {story.user.length > 11
                                ? story.user.slice(0, 6).toLowerCase() + "..."
                                : story.user.toLowerCase()}
                        </Text>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    storiesContainer: {
        marginBottom: 13,
    },

    storyContainer: {
        alignItems: "center",
    },

    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 18,
        borderWidth: 3,
        borderColor: "#ff8501",
    },

    storyText: {
        color: "white",
    },
});

export default Stories;
