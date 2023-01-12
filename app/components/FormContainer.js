import { Dimensions, KeyboardAvoidingView, StyleSheet } from 'react-native'

const FormContainer = ({children}) => {
  return (
    <KeyboardAvoidingView style={styles.container}>
      {children}
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    width: Dimensions.get('window').width
  }
})

export default FormContainer