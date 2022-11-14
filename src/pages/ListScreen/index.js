import React, { useLayoutEffect } from "react";
import { AddButtonImage, AddButton, Container, NoteList, NoNotes, NoNotesImage, NoNotesText } from "./styles"; 
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import NoteItem from "../../components/NoteItem";

export default () => {
    const navigation =  useNavigation();
    const list = useSelector(state => state.notes.list);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: "Suas notas", 
            headerRight: () => (
                <AddButton
                    underlayColor="transparent" 
                    onPress={()=>navigation.navigate('Edit')}
                >
                    <AddButtonImage
                        source={require('../../assets/more.png')}
                    />
                </AddButton>
            ), 
        })
    }, []);

    const handleNotePress = (index) => {
       navigation.navigate('Edit',{
         key:index
       })
    }

    return(
       <Container>
           {list.length > 0 &&
              <NoteList
                    data={list}
                    renderItem={({item, index})=>(
                        <NoteItem
                            data={item}
                            index={index}
                            onPress={handleNotePress}
                        />
                    )}
                    keyExtract={(item, index)=> index.toString()}
               />
           }

           {list.length == 0 &&
               <NoNotes>
                   <NoNotesImage
                        source={require('../../assets/note.png')}
                   />
                   <NoNotesText>Nenhuma anotação</NoNotesText>
               </NoNotes> 
           }
       </Container>
    )
}