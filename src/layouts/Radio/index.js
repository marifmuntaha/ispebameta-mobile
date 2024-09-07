import {useEffect, useState} from "react";
import {Text, TouchableOpacity, View} from "react-native";

const Radio = ({data, instrument, result, setResult, setReference, code, setCode, idx}) => {
    const [radioSelected, setRadioSelected] = useState();
    useEffect(() => {
        let value = result && result.filter((value) => {
            return value.instrument === instrument.id
        })
        value.length > 0 && setRadioSelected( value[0].indicator.id)
        value.length > 0 && setReference(value[0].indicator.reference)
    }, [instrument, result]);
    return (
        <View>
            {data && data.map((item) => (
                <View key={item.id}>
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                            let value = result.filter((value) => {
                                return value.instrument !== instrument.id
                            });
                            let codes = [...code]
                            value.push({
                                instrument: instrument.id,
                                name: instrument.name,
                                indicator: item,
                            });
                            setResult(value);
                            setReference(item.reference);
                            codes[instrument.id] = item.code
                            setCode(codes);
                        }}
                        style={{flexDirection: "row", alignItems: 'center', marginRight: 30}}>
                        <View style={{height: 20, width: 20, borderRadius: 10, borderWidth: 2, borderColor: '#161D6F', alignItems: 'center', justifyContent: 'center'}}>
                            {radioSelected === item.id && (
                                <View style={{height: 12, width: 12, borderRadius: 6, backgroundColor: '#161D6F'}}/>
                            )}
                        </View>
                        <Text style={{textAlign: 'left',marginLeft: 10, marginBottom: 10, fontSize: 14, color: '#161D6F'}}>{item.desc}</Text>
                    </TouchableOpacity>
                </View>
            ))}
        </View>
    )
}
export default Radio;