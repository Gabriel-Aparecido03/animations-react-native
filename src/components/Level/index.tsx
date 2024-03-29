import { PressableProps, Text, Pressable } from 'react-native';

import { THEME } from '../../styles/theme';
import { styles } from './styles';
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useEffect } from 'react';

const TYPE_COLORS = {
  EASY: THEME.COLORS.BRAND_LIGHT,
  HARD: THEME.COLORS.DANGER_LIGHT,
  MEDIUM: THEME.COLORS.WARNING_LIGHT,
}

type Props = PressableProps & {
  title: string;
  isChecked?: boolean;
  type?: keyof typeof TYPE_COLORS;
}

export function Level({ title, type = 'EASY', isChecked = false, ...rest }: Props) {

  const scale = useSharedValue(1);
  const checked = useSharedValue(1);

  const animatedContainerSytle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      backgroundColor: interpolateColor(checked.value,[0,1],['transparent',COLOR]
      )
    }
  })

  const animatedTextStyle = useAnimatedStyle(()=>{
    return {
       color: interpolateColor(checked.value,[0,1],[ COLOR,THEME.COLORS.GREY_100  ])
    }
  })

  const COLOR = TYPE_COLORS[type];

  function onPressIn() {
    scale.value = withTiming(1.1);
  }

  function onPressOut() {
    scale.value = withTiming(1.1);
  }

  useEffect(() => {
    checked.value = withTiming(isChecked ? 1 : 0,{ duration : 300 })
  }, [isChecked])

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      {...rest}
    >
      <Animated.View style={
        [
          styles.container,
          animatedContainerSytle,
          { borderColor: COLOR, }
        ]
      }>
        <Animated.Text style={
          [
            styles.title,
            animatedTextStyle
          ]}>
          {title}
        </Animated.Text>
      </Animated.View>
    </Pressable>
  );
}