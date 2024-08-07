
import { useEffect, useRef, useState } from 'react';
import { 
  StyleSheet, 
  Text, View ,
  SafeAreaView, 
  TextInput, 
  TouchableOpacity,
  FlatList,
  Keyboard
} from 'react-native';
import { LoginUser } from './components/login/loginUser';
import { TaskList } from './components/task/taskList';
import {firebase} from './src/firebase'
import {AntDesign} from '@expo/vector-icons'


//KeyExtrctor=Pegar o id
export default function App() {

  const inputRef=useRef(null)
  const [user,setUser]=useState(null)
  const [newtask,setNewTask]=useState('')
  const [tasks,setTasks]=useState([])
  const [key,setKey]=useState('')

  useEffect(()=>{
    function getUser() {
    //Buscar tarefas
      if (!user) {
        return
      }

      firebase.database().ref('tarefas').child(user).once('value',(snapshot)=>{
        setTasks([])

        snapshot?.forEach((childItem)=>{
          let data={
            key:childItem.key,
            nome:childItem.val().nome
          }

          setTasks(oldTasks=>[...oldTasks,data])

        })

      })
    }

    getUser()

  },[user])

  function handleAdd() {
    //Adicionar tarefa
    if (newtask==='') {
      return
    }

    //Usuario que editar uma tarefa
    if (key!=='') {
        firebase.database().ref('tarefas').child(user).child(key).update({
          nome:newtask
        })

        .then(()=>{
          //Procurando indice pra alterar
          const taskIndex=tasks.findIndex((item)=>item.key===key)
          const taskClone=tasks
          taskClone[taskIndex].nome=newtask

          setTasks([...taskClone])
        })

        Keyboard.dismiss()
        setNewTask('')
        setKey('')
        return
    }

    let tarefa=firebase.database().ref('tarefas').child(user)
    let chave=tarefa.push().key

    tarefa.child(chave).set({
       nome:newtask
    })

    .then(()=>{
      let data={
        key:chave,
        nome:newtask
      }

      setTasks(oldTasks=>[...oldTasks,data])
    })

    Keyboard.dismiss()
    setNewTask('')
    
  }

  function handleDelite(key) {
    //Deletar tarefa
    firebase.database().ref('tarefas').child(user).child(key).remove()
      .then(()=>{
        const findTasks=tasks.filter(item=>item.key !== key)
        setTasks(findTasks)
      })
  }

  function handleEdite(data) {
    //Editar tarefa
    setKey(data.key)
    setNewTask(data.nome)
    inputRef.current.focus()
  }

  function canselEdite() {
    //Canselar edição
    setKey('')
    setNewTask('')
    Keyboard.dismiss()
  }

  if (!user) {
    return <LoginUser changeStatus={(user)=>setUser(user)}/>
  }

  return (
    <SafeAreaView style={st.container}>

    { key.length>0 &&
      (
        <View style={{flexDirection:'row',marginTop:10}}>
           <TouchableOpacity onPress={()=>canselEdite()} style={{justifyContent:'center'}}>
              <AntDesign name='closecircleo' size={20} color='#FF0000'/>
           </TouchableOpacity>
           <Text style={{marginLeft:5, color:'#FF0000', }}>
            Voçê esta editando uma tarefa
          </Text>
        </View>
      )
    }

      <View style={st.viewInput}>
         <TextInput
            placeholder='O qui vc vai fazer'
            autoFocus={true}
            value={newtask}
            onChangeText={(texto)=>setNewTask(texto)}
            style={st.input}
            ref={inputRef}
         />

         <TouchableOpacity style={st.btn} onPress={()=>handleAdd()}>
            <Text style={st.txt}>+</Text>
         </TouchableOpacity>
      </View>

      <FlatList
          data={tasks}
          keyExtractor={item=>item.key}
          renderItem={({item})=>(
            <TaskList data={item} deletItem={handleDelite} itemEdite={handleEdite}/>
          )}
      />
    </SafeAreaView>
  );
}

const st = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:25,
    paddingHorizontal:10,
    backgroundColor:'#F2f6fc'
  },

  viewInput:{
    flexDirection:'row',
    marginTop:17
  },

  input:{
    flex:1,
    marginBottom:10,
    padding:10,
    backgroundColor:'#FFF',
    borderRadius:4,
    borderWidth:1,
    borderColor:'#141414',
    height:45
  },

  btn:{
     backgroundColor:'#141414',
     height:45,
     alignItems:'center',
     justifyContent:'center',
     marginLeft:5,
     borderRadius:4,
     paddingHorizontal:14
  },

  txt:{
    fontSize:22,
    color:'#FFF'
  }
});
