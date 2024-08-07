import { useState } from 'react';
import { StyleSheet, Text, View ,SafeAreaView, TextInput, TouchableOpacity} from 'react-native';
import {firebase} from "../../src/firebase"

export function LoginUser({changeStatus}) {

    const [type,setType]=useState('login')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

     function handleLogin() {
      
      if (type==='login') {
        //Fazendo login
        const user=firebase.auth().signInWithEmailAndPassword(email,password)
          .then((value)=>{
             changeStatus(value.user.uid)
          })

          .catch((err)=>{
            console.log(err)
            alert('Algo deu errado')
            return
          })

      }else{
        //Cadastrando
        const user=firebase.auth().createUserWithEmailAndPassword(email,password)
          .then((value)=>{
            changeStatus(value.user.uid)
          })

          .catch((err)=>{
            console.log(err)
            alert('Algo deu errado')
            return
          })
      }
    }

  return (
    <SafeAreaView style={st.container}>
        <TextInput
            placeholder='Email'
            value={email}
            onChangeText={(texto)=>setEmail(texto)}
            style={st.input}
      />

        <TextInput
            placeholder='Password'
            value={password}
            onChangeText={(texto)=>setPassword(texto)}
            style={st.input}
      />

      <TouchableOpacity 
        onPress={()=>handleLogin()} 
        style={[st.btn1, {backgroundColor:type==='login' ? '#3ea6f2' : '#141414'}]}
        >
         <Text style={st.txtBtn}>
            {type==='login' ? 'Acessar' : 'Cadastrar'}
        </Text>
      </TouchableOpacity>


      <TouchableOpacity 
        style={st.btn2}
        onPress={()=>setType(type=>type==='login' ? 'cadastrar' : 'login')}
        >
         <Text style={{ textAlign:'center' }}>
            {type==='login'? 'Criar uma conta' : 'Já possuo uma conta'}
         </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  container: {
    flex:1,
    paddingTop:45,
    backgroundColor:'#F2f6fc',
    paddingHorizontal:10
  },

  input:{
    marginBottom:10,
    backgroundColor:'#FFF',
    borderRadius:5,
    height:45,
    padding:10,
    borderWidth:2,
    borderColor:'#141414'
  },

  btn1:{
    alignItems:'center',
    justifyContent:'center',
    height:45,
    marginBottom:10,
    borderRadius:5
  },

  txtBtn:{
    fontSize:17,
    color:'#FFF'
  }
});