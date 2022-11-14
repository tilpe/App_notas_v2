import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../pages/ListScreen';
import EditNote from '../pages/EditNote';

const Stack = new createStackNavigator(); 

export default () => ( 
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
            backgroundColor: '#222',
        }, 
        headerTintColor: '#fff', 
      }}
    >
        <Stack.Screen name="List" component={ListScreen} />
        <Stack.Screen name="Edit" component={EditNote} />
    </Stack.Navigator>
)