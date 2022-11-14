import React, {useState, useEffect, useLayoutEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { BodyInput, Container, TitleInput, SaveButton, SaveButtonImage, CloseButton, CloseButtonImage, DeleteButton, DeleteButtonText } from "./styles";

export default () => {
    const navigation = useNavigation();
    const route      = useRoute();
    const dispatch   = useDispatch();
    const list       = useSelector(state => state.notes.list);
   
    const [title, setTitle]   = useState("");
    const [body, setBody]     = useState("");
    const [status, setStatus] = useState("new");

    const handleSaveButton = () => {
        if (title != '' && body != '') {
            if (status == 'edit') {
                dispatch({
                    type: 'EDIT_NOTE',
                    payload: {key: route.params.key, title, body}
                });

                navigation.goBack();
            } else {
                dispatch({
                    type: 'ADD_NOTE',
                    payload: {title, body}
                });

                navigation.goBack();
            }
        } else {
            alert("Preencha o titulo e anotação");
        }
    }

    const handleDeleteButton = () => {
        dispatch({
            type: 'DELETE_NOTE', 
            payload: {key: route.params.key}
        });

        navigation.goBack();
    }


    useEffect(()=>{
        if(route.params?.key != undefined && list[route.params.key]) {
            setStatus('edit');
            setTitle(list[route.params.key].title);
            setBody(list[route.params.key].body);
        }
    }, []);

    useLayoutEffect(()=>{
        navigation.setOptions({
            title: status == 'new' ? 'Nova Anotação' : 'Editar Anotação',
            headerLeft: () => (
                <CloseButton
                    onPress={() => navigation.goBack()}
                    underlayColor="transparent"
                >
                  <CloseButtonImage source={require('../../assets/close.png')}/>
               </CloseButton>
            ),
            headerRight: () => (
                <SaveButton
                    onPress={handleSaveButton}
                    underlayColor="transparent"
                >
                    <SaveButtonImage source={require('../../assets/save.png')}/>
                </SaveButton>
            )
        });
    }, [status, title, body]);
    
    return(
       <Container>
           <TitleInput
              value={title}
              onChangeText={e=>setTitle(e)}
              placeholder="Digite o titulo da anotação"
              placeholderTextColor="#ccc"
              autoFocus={true}
           />
           <BodyInput
              value={body}
              onChangeText={e=>setBody(e)}
              placeholder="Digite a anotação"
              placeholderTextColor="#ccc"
              multiline={true}
              textAlignVertical="top"
           />
           {status == 'edit' &&
              <DeleteButton
                onPress={handleDeleteButton}
                underlayColor="#fff"
              >
                <DeleteButtonText>Excluir</DeleteButtonText>
              </DeleteButton>
           }
       </Container>
    )
}