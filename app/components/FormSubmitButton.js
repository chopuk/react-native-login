import { StyleSheet, Text, TouchableOpacity } from 'react-native'

const FormSubmitButton = ({label, submitting, onPress, marginT}) => {

  const backgroundColor = submitting ? 'rgba(24, 80, 232,0.7)' : 'rgba(24, 80, 232,1)'
  const marginTop = marginT ? marginT : 20

  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[styles.container, { backgroundColor }, { marginTop }]}
    >
      <Text style={{fontSize: 18, color:'#fff'}}>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default FormSubmitButton
