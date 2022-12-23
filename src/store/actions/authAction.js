
import setAuthToken from '../utils/setAuthToken';
import { authActions } from '../authSlice';
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from '../contants'
import axios from 'axios';
export const loadUser = () => {
    return async (dispatch) => {
        if(localStorage[LOCAL_STORAGE_TOKEN_NAME]){
            setAuthToken(localStorage[LOCAL_STORAGE_TOKEN_NAME])
        }
        try{
            const response = await axios.get(`${apiUrl}/auth`)
            console.log(response)
            if(response.data.success){
                dispatch(authActions.setDataAuth({isAuthenticated: true, user: response.data.user,authLoading: false}))
            }
        }catch(err){
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            setAuthToken(null)
            dispatch(authActions.setDataAuth({isAuthenticated: false, user: null,authLoading: false}))
        }
    };
  };

