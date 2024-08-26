import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import Radio from "../Radio";

const Accordion = ({data, result, setResult, evaluation}) => {
    const [showID, setShowID] = useState(0);
    const [reference, setReference] = useState('')
    const [code, setCode] = useState([]);
    const content = StyleSheet.create({
        container: {
            padding: 20
        },
        box: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: 30,
            width: "100%",
            height: 70,
            backgroundColor: '#E9EAEC',
            marginBottom: 20
        },
        boxContent: {
            flexDirection: "row"
        },
        boxText: {
            marginLeft: 20,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        boxButton: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 20,
            borderColor: "#07F136",
            borderWidth: 3,
            alignSelf: "center",
            alignItems: 'center',
            justifyContent: 'center'
        },
        open: {
            width: "100%",
            backgroundColor: '#E9EAEC',
            borderRadius: 20,
            marginBottom: 20,
        },
        boxOpen: {
            flexDirection: 'row',
            justifyContent: "space-between",
            alignItems: "center",
            height: 70,
        },
        boxContentOpen: {
            flexDirection: "row"
        },
        boxTextOpen: {
            marginLeft: 20,
            alignItems: 'flex-start',
            justifyContent: 'center'
        },
        boxButtonOpen: {
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 20,
            borderColor: "#07F136",
            borderWidth: 3,
            alignSelf: "center",
            alignItems: 'center',
            justifyContent: 'center'
        },
        boxTextContentOpen: {
            marginLeft: 20,
            marginRight: 20,
            marginBottom: 20,
            alignItems: 'flex-start',
            justifyContent: 'center'
        }
    });
    // useEffect(() => {
    //     console.log(result);
    // }, [result]);

    useEffect(() => {
        const value = JSON.parse(evaluation[0].result);
        console.log(value[1])
    }, [evaluation])
    return (
        <View style={{flex: 1}}>
            {data && data.map((item) => (
                <View key={item.id}>
                    {item.id !== showID && (
                        <TouchableOpacity style={{
                            flexDirection: 'row',
                            justifyContent: "space-between",
                            alignItems: "center",
                            borderRadius: 10,
                            width: "100%",
                            height: 'auto',
                            backgroundColor: '#E9EAEC',
                            marginBottom: 20
                        }} onPress={() => {setShowID(item.id);setReference('');}}>
                            <View style={content.boxContent}>
                                <View style={content.boxTextOpen}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F"}}>
                                        POIN {item.name}{item.sub}
                                    </Text>
                                </View>
                            </View>
                            <View style={content.boxButton}>
                                <Text style={{
                                    fontWeight: 'bold',
                                    fontSize: 18,
                                    color: '#07F136'
                                }}>A</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {item.id === showID && (
                        <View>
                            <View style={content.open}>
                                <View style={content.boxOpen}>
                                    <View style={content.boxContentOpen}>
                                        <View style={content.boxTextOpen}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                                color: "#161D6F"
                                            }}>POIN {item.name}{item.sub}</Text>
                                        </View>
                                    </View>
                                    <View style={content.boxButtonOpen}>
                                        <Text style={{
                                            fontWeight: 'bold',
                                            fontSize: 25,
                                            color: '#07F136'
                                        }}>A</Text>
                                    </View>
                                </View>
                                <View style={content.boxTextContentOpen}>
                                    <Text style={{fontSize: 18, color: "#161D6F"}}>{item.desc}</Text>
                                </View>
                            </View>
                            <View style={content.open}>
                                <View style={content.boxOpen}>
                                    <View style={content.boxContentOpen}>
                                        <View style={content.boxTextOpen}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                                color: "#161D6F"
                                            }}>INDIKATOR</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={content.boxTextContentOpen}>
                                    <Radio
                                        data={item.indicators}
                                        instrument={{
                                            id: item.id,
                                            name: item.name
                                        }}
                                        setReference={setReference}
                                        result={result}
                                        setResult={setResult}
                                        code={code}
                                        setCode={setCode}

                                    />
                                </View>
                            </View>
                            <View style={content.open}>
                                <View style={content.boxOpen}>
                                    <View style={content.boxContentOpen}>
                                        <View style={content.boxTextOpen}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                fontSize: 20,
                                                color: "#161D6F"
                                            }}>REKOMENDASI</Text>
                                        </View>
                                    </View>
                                </View>
                                <View style={content.boxTextContentOpen}>
                                    <Text style={{fontSize: 18, color: "#161D6F"}}>{reference}</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </View>
            ))}
        </View>
    )
}
export default Accordion;