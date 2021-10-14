import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddNewPost = () => {
    return (
        <View style={styles.container}>
            <Header />
        </View>
    );
};

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.headerContainer}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={{
                        uri:
                            "https://img.icons8.com/fluency-systems-regular/60/ffffff/back.png",
                    }}
                    style={{ width: 30, height: 30 }}
                />
            </TouchableOpacity>
            <Text style={styles.headerText}>NEW POST</Text>
            <Text></Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
    },

    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    headerText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 20,
        marginRight: 23,
    },
});

export default AddNewPost;
