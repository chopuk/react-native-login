import { Animated, Dimensions, ScrollView, StyleSheet, View } from 'react-native'
import FormHeader from '../components/FormHeader'
import FormSelectorButton from '../components/FormSelectorButton'
import LoginForm from '../components/LoginForm'
import SignupForm from '../components/SignupForm'
import { useRef } from 'react'

export default function HomeScreen( {navigation}) {

  const {width} = Dimensions.get('window')
  const scrollView = useRef()

  const animation = useRef(new Animated.Value(0)).current

  const rightHeaderOpacity = animation.interpolate({
    inputRange: [0, width],
    outputRange: [1, 0]
  })

  const leftHeaderTranslateX = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, 40]
  })
  
  const rightHeaderTranslateY = animation.interpolate({
    inputRange: [0, width],
    outputRange: [0, -20]
  })

  const loginColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,1)', 'rgba(27,27,51,0.4)']
  })
  
  const signupColorInterpolate = animation.interpolate({
    inputRange: [0, width],
    outputRange: ['rgba(27,27,51,0.4)', 'rgba(27,27,51,1)']
  })

  return (
      <View style={{ flex: 1 , paddingTop: 80}}> 
        <View style={{ height: 80 }}>
          <FormHeader 
            leftHeading='Welcome ' 
            rightHeading='Back' 
            subHeading='YouTube Task Manager'
            rightHeaderOpacity={rightHeaderOpacity}
            leftHeaderTranslateX= {leftHeaderTranslateX}
            rightHeaderTranslateY={rightHeaderTranslateY}
          />
        </View>
        <View style={{flexDirection: 'row', paddingHorizontal: 20}}>
          <FormSelectorButton 
            style={styles.borderLeft} 
            label='Login' 
            backgroundColor={loginColorInterpolate}
            onPress={() => scrollView.current.scrollTo({ x: 0 })}
          />
          <FormSelectorButton 
            style={styles.borderRight} 
            label ='Sign Up' 
            backgroundColor={signupColorInterpolate}
            onPress={() => scrollView.current.scrollTo({ x: width })}
          />
        </View>
        <ScrollView
          ref={scrollView}
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: animation}}}],
            {useNativeDriver: false}
          )}
        >
          {/* passing the navigation prop to allow the login form to call the bookslist screen  */}
          <LoginForm navigation={navigation}/> 
          <ScrollView>
            <SignupForm/>
          </ScrollView>
        </ScrollView>
      </View>
  )
}

const styles = StyleSheet.create({
  borderLeft: {
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  borderRight: {
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8
  }
})
