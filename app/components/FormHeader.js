import { Animated, StyleSheet, Text, View } from 'react-native'

const FormHeader = ({
        leftHeading, 
        rightHeading, 
        subHeading,
        leftHeaderTranslateX = 40, 
        rightHeaderTranslateY = -20, 
        rightHeaderOpacity = 0}) => {

  return (
      <>
        <View style={styles.container}>
          <Animated.Text
            style={[
              styles.heading,
              { transform: [{ translateX: leftHeaderTranslateX}] }
            ]}
          >
            {leftHeading}
          </Animated.Text>
          <Animated.Text
            style={[
              styles.heading,
              { opacity: rightHeaderOpacity, transform: [{ translateY: rightHeaderTranslateY}] }
            ]}
          >
            {rightHeading}
          </Animated.Text>
        </View>
        <Text style={styles.subHeading}>{subHeading}</Text>
      </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  heading: {
    fontSize:30,
    fontWeight: 'bold',
    color: '#1b1b33'
  },
  subHeading: {
    fontSize:18,
    textAlign: 'center',
    color: '#1b1b33'
  }
})

export default FormHeader