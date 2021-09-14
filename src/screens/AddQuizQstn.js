import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, ActivityIndicator, ScrollView } from 'react-native';
import BasicButton from "../components/BasicButton";

import firebase from '../FirebaseConfig';
export default function AddQuizQstn({ route: {
    params: {
        quizId,
    } = {},
} = {},
    navigation,
}) {
    const [isLoading, setIsLoading] = useState(false);

    const [qstn, setQstn] = useState("");
    const [correctOption, setCorrectOption] = useState("");
    const [option1, setOption1] = useState("");
    const [option2, setOption2] = useState("");
    const [option3, setOption3] = useState("");

    //function to handle when add btn clicked on
    function handleAddBtnClick() {
        if (quizId) {
            setIsLoading(true);
            const timeStamp = Math.floor(Date.now() / 1000);
            const qstnId = quizId + "_qstn_" + timeStamp;
            //adding question for that quiz in firebase
            const quizDbRef = firebase.app().database().ref('quizes/');
            quizDbRef
                .child(quizId + "/questions/" + qstnId)
                .set({
                    question: qstn,
                    options: [
                        {
                            optionId: qstnId + "_option0",
                            option: correctOption,
                            isAns: true
                        },
                        {
                            optionId: qstnId + "_option1",
                            option: option1,
                            isAns: false
                        },
                        {
                            optionId: qstnId + "_option2",
                            option: option2,
                            isAns: false
                        },
                        {
                            optionId: qstnId + "_option3",
                            option: option3,
                            isAns: false
                        }
                    ]
                },
                    (error) => {
                        setIsLoading(false);
                        navigation.goBack();
                    });
        } else {
            navigation.goBack();
        }
    }

    //When cancel btn is pressed
    function handleCancelBtnClick() {
        navigation.goBack();
    }

    //component rendering
    return (
        <>
        {
            isLoading ?
                <View style={styles.loaderContainer}>
                    <ActivityIndicator style={styles.loader} />
                </View>
                :
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Create Quiz</Text>

            <View style={styles.form}>
                <Text style={styles.label}>Question</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="your question?"
                    value={qstn}
                    onChangeText={(val) => setQstn(val)}
                />
                <View style={styles.divider}></View>
                <View style={styles.divider}></View>

                <Text style={styles.label}>Correct Answer</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="correct answer"
                    value={correctOption}
                    onChangeText={(val) => setCorrectOption(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Option 1</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="option 1"
                    value={option1}
                    onChangeText={(val) => setOption1(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Option 2</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="option 2"
                    value={option2}
                    onChangeText={(val) => setOption2(val)}
                />
                <View style={styles.divider}></View>

                <Text style={styles.label}>Option 3</Text>
                <TextInput
                    style={styles.inputField}
                    placeholder="option 3"
                    value={option3}
                    onChangeText={(val) => setOption3(val)}
                />
                <View style={styles.divider}></View>

                <View style={styles.btnsContainer}>
                    <BasicButton
                        text="Add"
                        customStyle={styles.button}
                        onPress={handleAddBtnClick}
                    />

                    <BasicButton
                        text="Cancel"
                        customStyle={styles.button}
                        onPress={handleCancelBtnClick}
                    />
                </View>
            </View>
        </ScrollView >
          }
          </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 60,
        paddingHorizontal: 30,
    },

    title: {
        fontWeight: '500',
        fontSize: 20,
        letterSpacing: 0.1,
        color: '#2E2E2E',
    },

    divider: {
        paddingVertical: 8,
    },

    form: {
        marginTop: 35,
    },

    label: {
        fontSize: 16,
        lineHeight: 18,
        color: '#666666',
        marginBottom: 3,
    },

    inputField: {
        fontSize: 14,
        borderBottomWidth: 1,
        borderBottomColor: '#BFBFBF',
        paddingVertical: 6,
    },

    btnsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 20,
    },

    button: {
        width: "43%",
    },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
});