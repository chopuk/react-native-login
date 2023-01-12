import { StyleSheet, Text } from 'react-native'
import FormContainer from './FormContainer'
import FormInput from './FormInput'
import FormSubmitButton from './FormSubmitButton'

import {Formik} from 'formik'
import * as Yup from 'yup'
import client from '../api/client'

const SignupForm = () => {

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .trim()
      .min(3, 'Invalid name!')
      .required('Name is required!'),
    email: Yup.string().email('Invalid email!').required('Email is required!'),
    password: Yup.string()
      .trim()
      .min(6, 'Password is too short!')
      .required('Password is required!'),
    confirmPassword: Yup.string().equals(
      [Yup.ref('password'), null],
      'Password does not match!'
    )
  });

  const userInfo = {
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  }

  const signUp = async (values,formikActions) => {

    // split fullname
    const [ firstname,lastname ] = values.fullName.split(' ')
   
    // call backend to create user
    const res = await client.post('/', {
      query: `
          mutation {
            createUser(userInput: {
                firstname: "${firstname}"
                lastname: "${lastname}",
                email: "${values.email}",
                password: "${values.password}"
            }) { 
                firstname
                lastname
                email
                _id
            }
          } 
        `
    })

    console.log(res.data)

    formikActions.resetForm()
    formikActions.setSubmitting(false)

  }

  return (
    <FormContainer>
      <Formik 
        initialValues={userInfo} 
        validationSchema={validationSchema}
        onSubmit={signUp}
      >
        {({
          values, 
          errors, 
          touched,
          isSubmitting, 
          handleChange, 
          handleBlur,
          handleSubmit
        }) => {
          const { fullName, email, password, confirmPassword } = values;
          return <>
            <FormInput
              value={fullName}
              error={touched.fullName && errors.fullName}
              onBlur={handleBlur('fullName')}
              label='Full Name' 
              placeholder={'John Doe'}
              onChangeText={handleChange('fullName')}
            />
            <FormInput
              value={email}
              error={touched.email && errors.email}
              autoCapitalize='none' 
              label='Email' 
              placeholder={'example@email.com'}
              onBlur={handleBlur('email')}
              onChangeText={handleChange('email')}
            />
            <FormInput
              value={password}
              error={touched.password && errors.password}
              secureTextEntry 
              label='Password' 
              placeholder={'********'}
              onBlur={handleBlur('password')}
              onChangeText={handleChange('password')}
            />
            <FormInput
              value={confirmPassword}
              error={touched.confirmPassword && errors.confirmPassword}
              secureTextEntry 
              label='Confirm Password' 
              placeholder={'********'}
              onBlur={handleBlur('confirmPassword')}
              onChangeText={handleChange('confirmPassword')}
            />
            <FormSubmitButton 
              onPress={handleSubmit} 
              label='Sign Up'
              submitting={isSubmitting}
            />
          </>
        }}
      </Formik>
      
    </FormContainer>
  )
}

const styles = StyleSheet.create({

})

export default SignupForm