import { StyleSheet, Text, TextInput, View } from 'react-native'

const FormInput = (props) => {

  const { placeholder, label, multiline, editable, numberOfLines, keyboard, error } = props

  const height = numberOfLines ? 35*numberOfLines : 35
  const keyboardType = keyboard ? keyboard : 'default'

  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 2,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>{label}</Text>
        {error ? (
          <Text style={{ color: 'red', fontSize: 16 }}>{error}</Text>
        ) : null }
      </View>
      <TextInput
        style={[styles.input, {height}]}
        keyboardType={keyboardType}
        {...props}
      />
    </>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#1b1b33',
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#afede7'
  }
})

export default FormInput