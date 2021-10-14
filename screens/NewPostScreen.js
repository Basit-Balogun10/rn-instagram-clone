import React from "react";
import { SafeAreaView, StyleSheet, ScrollView } from "react-native";
import AddNewPost from "../components/newPost/AddNewPost";
import FormikPostUploader from "../components/newPost/FormikPostUploader";

const NewPostScreen = ({navigation}) => {
    return (
        <SafeAreaView style={styles.container}>
            <AddNewPost />
            <FormikPostUploader navigation={navigation} />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "black",
        flex: 1,
    },
});

export default NewPostScreen;
