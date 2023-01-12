import { Animated, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native'

const FormSelectorButton = ({label, backgroundColor, style, onPress}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Animated.View style={[styles.container, style, {backgroundColor}]}>
        <Text style={styles.title}>{label}</Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize:16,
    color: 'white'
  }
})

export default FormSelectorButton