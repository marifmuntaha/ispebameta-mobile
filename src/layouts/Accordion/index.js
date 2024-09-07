import {Text, TouchableOpacity, View} from "react-native";
import {useEffect, useState} from "react";
import Radio from "../Radio";

const Accordion = ({data, result, setResult}) => {
    const [showID, setShowID] = useState(0);
    const [reference, setReference] = useState('')
    const [code, setCode] = useState([]);
    useEffect(() => {
        let codes = [];
        result.map((code) => {
            codes[code.indicator.instrument] = code.indicator.code;
        })
        setCode(codes)
    }, [data, result]);
    return (
        <View style={{flex: 1}}>
            {data && data.map((item, idx) => (
                <View key={item.id}>
                    {item.id !== showID && (
                        <TouchableOpacity
                            style={{flex: 3, flexDirection: 'row', justifyContent: "space-between", alignItems: "center", borderRadius: 5, paddingLeft: 10, padding: 10, width: "100%", backgroundColor: '#E9EAEC', marginBottom: 20}}
                            onPress={() => {
                                setShowID(item.id);
                                setReference('');
                            }}>
                            <View style={{flexDirection: "row"}}>
                                <View style={{marginLeft: 10, alignItems: 'flex-start', justifyContent: 'center'}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F"}}>
                                        POIN {item.name}{item.sub}
                                    </Text>
                                </View>
                            </View>
                            <View style={{width: 40, height: 40, borderRadius: 40, marginRight: 10, borderColor: "#07F136", borderWidth: 3, alignSelf: "center", alignItems: 'center', justifyContent: 'center'}}>
                                <Text style={{fontWeight: 'bold', fontSize: 14, color: '#07F136'}}>{code.length > 0 && code[item.id]}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    {item.id === showID && (
                        <View>
                            <TouchableOpacity
                                style={{width: "100%", backgroundColor: '#E9EAEC', borderRadius: 5, marginBottom: 10, padding: 10}}
                                onPress={() => {
                                    setShowID(0);
                                    setReference('');
                                }}>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 10,marginLeft: 10, marginRight: 10}}>
                                    <Text style={{justifyContent: 'center', fontWeight: 'bold', fontSize: 14, color: "#161D6F"}}>POIN {item.name}{item.sub}</Text>
                                    <View style={{width: 40, height: 40, borderRadius: 40, borderColor: "#07F136", borderWidth: 3, alignSelf: "center", alignItems: 'center', justifyContent: 'center'}}>
                                        <Text style={{fontWeight: 'bold', fontSize: 14, color: '#07F136'}}>{code.length > 0 && code[item.id]}</Text>
                                    </View>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginLeft: 10, marginRight: 10}}>
                                    <Text style={{textAlign: 'justify',fontSize: 14, color: "#161D6F"}}>{item.desc}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{width: "100%", backgroundColor: '#E9EAEC', borderRadius: 5, marginBottom: 10, padding: 10}}>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F"}}>INDIKATOR</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                                    <Radio
                                        data={item['indicators']}
                                        instrument={{
                                            id: item.id,
                                            name: item.name
                                        }}
                                        setReference={setReference}
                                        result={result}
                                        setResult={setResult}
                                        code={code}
                                        setCode={setCode}
                                        idx={idx}

                                    />
                                </View>
                            </View>
                            <View style={{width: "100%", backgroundColor: '#E9EAEC', borderRadius: 5, marginBottom: 10, padding: 10}}>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                                    <Text style={{fontWeight: 'bold', fontSize: 14, color: "#161D6F"}}>REKOMENDASI</Text>
                                </View>
                                <View style={{flexDirection: 'row', justifyContent: "space-between", alignItems: "center", marginBottom: 10, marginLeft: 10, marginRight: 10}}>
                                    <Text style={{fontSize: 14, color: "#161D6F", textAlign: 'justify'}}>{reference}</Text>
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