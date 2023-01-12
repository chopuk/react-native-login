import { useState } from 'react'
import { StyleSheet, Text, TextInput } from 'react-native'
import client from '../api/client'
import { isEmailValid, isValidObjectField, updateError } from '../utils/methods'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'

const LoginForm = (props) => {

  const  [userInfo, setUserInfo] = useState({
    email: '',
    password: '',
  })

  const {email, password} = userInfo

  const [error, setError] = useState('')

  const handleOnChangeText = (value, fieldname)=> {
    setUserInfo({ ...userInfo, [fieldname]: value})
  }

  const login = async () => {

    if (isValidForm()) {

      // call backend to create user
      const res = await client.post('/', {
        query: `
            query {
              login(
                  email: "${email.trim()}",
                  password: "${password}"
                  ) { 
                  userId
                  token
                  tokenExpiration
              }
            } 
          `
      })
      if ( res.data.errors) {
        updateError(res.data.errors[0].message, setError)
      } else {
        console.log(res.data.data)
        props.navigation.navigate('BookList', res.data.data)
      }

    }
    
  }

  const isValidForm = () => {

    // all fields must have a value
    if(!isValidObjectField(userInfo)) 
      return updateError('All fields required!', setError)

    // email must be in a valid format
    if(!isEmailValid(email)) 
      return updateError('Invalid email', setError)

    // password must have 6 or more characters
    if(!password.trim() || password.length < 6 ) 
      return updateError('Password is less than 6 characters!', setError)

    return true

  }

  return (
    <FormContainer>
      {error ? (
        <Text style={{ color: 'red', fontSize:18, textAlign: 'center'}}>
          {error}
        </Text>
      ) : null}
      <FormInput 
        value={email} 
        label='Email' 
        placeholder={'example@email.com'}
        autoCapitalize='none' 
        onChangeText={(value) => handleOnChangeText(value, 'email')}
      />
      <FormInput 
        value={password} 
        label='Password' 
        placeholder={'********'}
        secureTextEntry
        onChangeText={(value) => handleOnChangeText(value, 'password')}
      />
      <FormSubmitButton onPress={login} label='Login'/>
    </FormContainer>
  )
}

const styles = StyleSheet.create({

})

export default LoginForm
