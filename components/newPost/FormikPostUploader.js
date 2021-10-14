import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, Button } from "react-native";
import * as Yup from "yup";
import { Formik } from "formik";
import { Divider } from "react-native-elements";
import validUrl from "valid-url";
import { firebase, db } from "../../firebase";

const PLACEHOLDER_IMG =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACoCAMAAABt9SM9AAAAMFBMVEXJycmamprMzMzFxcWdnZ2goKCjo6PCwsLHx8e7u7unp6e4uLiwsLCtra3AwMC1tbWpnO67AAABOUlEQVR4nO3Yy46DIBiA0YJ4qb3M+7/tiLbpjMByopOcs2hI3JAv+NdwuQAAAAAAAAAAAAAAAAAAAAAAAAAAAPAPxaajd3Y+49w3DNej93Y2cQgtKUxH7+5sUhq7qmkI49GbO5s+7c7Pe1hFsQr7WN38mlVilfax5mVWrQuxSrtYcUivwS5WaX+yrinc16ElVqkY8JfJgG/5xBpvvx6IVfrE6sPz5wOxSu9YcfkbTF1ejTczq+EVK96XVqnPyyGszcQqvWJdc6sU5hgfIQ35aIlV2mJ1aRPuudr68SBWaYs1hHet7fcpVk2OlV+9HbFqlljxq7zMmsWqyCerdp0lVkW/vHG1e3ixKvo0NK7g0/a9xceteQcfHkfv7Xymxh1851wBAAAAAAAAAAAAAAAAAAAAAAAAAMAf+wbOkwdCSXzOnAAAAABJRU5ErkJggg==";

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A URL is required"),
    caption: Yup.string().max(
        2200,
        "Caption has reached the maximum number of characters"
    ),
});

const FormikPostUploader = ({navigation}) => {
    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMG);
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = () => {
        const user = firebase.auth().currentUser;
        const unsubscribe = db
            .collection("users")
            .where("owner_uid", "==", user.uid)
            .limit(1)
            .onSnapshot((snapshot) =>
                snapshot.docs.map((doc) => {
                    setCurrentLoggedInUser({
                        username: doc.data().username,
                        profilePicture: doc.data().profile_picture,
                    });
                })
            );

        return unsubscribe;
    };

    useEffect(() => {
        getUsername();
    }, []);

    const uploadPostToFireBase = (imageUrl, caption) => {
        const unsubscribe = db
            .collection("users")
            .doc(firebase.auth().currentUser.email)
            .collection("posts")
            .add({
                imageUrl: imageUrl,
                user: currentLoggedInUser.username,
                profile_picture: currentLoggedInUser.profilePicture,
                owner_uid: firebase.auth().currentUser.uid,
                owner_email: firebase.auth().currentUser.email,
                caption: caption,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                likes_by_users: [],
                comments: [],
            })
            .then(() => navigation.goBack());
        return unsubscribe;
    };

    return (
        <Formik
            initialValues={{ caption: "", imageUrl: "" }}
            onSubmit={(values) =>
                uploadPostToFireBase(values.imageUrl, values.caption)
            }
            validationSchema={uploadPostSchema}
            validationOnMount={true}
        >
            {({
                handleBlur,
                handleChange,
                handleSubmit,
                values,
                errors,
                isValid,
            }) => (
                <>
                    <View
                        style={{
                            margin: 20,
                            justifyContent: "space-between",
                            flexDirection: "row",
                        }}
                    >
                        <Image
                            source={{
                                uri: validUrl.isUri(thumbnailUrl)
                                    ? thumbnailUrl
                                    : PLACEHOLDER_IMG,
                            }}
                            style={{ width: 100, height: 100 }}
                        />

                        <View style={{ flex: 1, marginLeft: 12 }}>
                            <TextInput
                                style={{ color: "white", fontSize: 20 }}
                                placeholder="Write a caption..."
                                placeholderTextColor="gray"
                                multiline={true}
                                onChangeText={handleChange("caption")}
                                onBlur={handleBlur("caption")}
                                value={values.caption}
                            />
                        </View>
                    </View>
                    <Divider width={0.2} orientation="vertical" />
                    <TextInput
                        onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                        style={{ color: "white", fontSize: 18 }}
                        placeholder="Enter Image Url"
                        placeholderTextColor="gray"
                        onChangeText={handleChange("imageUrl")}
                        onBlur={handleBlur("imageUrl")}
                        value={values.imageUrl}
                    />
                    {errors.imageUrl && (
                        <Text style={{ fontSize: 10, color: "red" }}>
                            {errors.imageUrl}
                        </Text>
                    )}

                    <Button
                        onPress={handleSubmit}
                        title="Share"
                        disabled={!isValid}
                    />
                </>
            )}
        </Formik>
    );
};

export default FormikPostUploader;
