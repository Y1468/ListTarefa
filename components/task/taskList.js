
import { AntDesign } from '@expo/vector-icons';
import { SafeAreaView,StyleSheet,Text,TouchableOpacity,TouchableWithoutFeedback, View} from "react-native";

export function TaskList({data,deletItem,itemEdite}) {
    return(
        <SafeAreaView style={st.container}>

            <TouchableOpacity style={{marginRight:10}} onPress={()=>deletItem(data.key)}>
                <AntDesign name='delete' color='#FFF' size={20}/>
            </TouchableOpacity>

            <View style={{paddingRight:10}}>
                <TouchableWithoutFeedback onPress={()=>itemEdite(data)}>
                    <Text style={{color:'#FFF', paddingRight:10}}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </SafeAreaView>
    )
}

const st=StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#121212',
        alignItems:'center',
        marginBottom:10,
        padding:10,
        borderRadius:4
    }
})