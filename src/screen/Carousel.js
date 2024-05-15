import React, { useRef } from 'react';
import { StyleSheet, View, FlatList, Image, Dimensions, Animated } from 'react-native';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const Carousel = ({ data }) => {
  const scrollX = useRef(new Animated.Value(0)).current;

  const renderItem = ({ item, index }) => {
    const inputRange = [(index - 1) * Dimensions.get('window').width, index * Dimensions.get('window').width, (index + 1) * Dimensions.get('window').width];
    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <Animated.View style={{ opacity }}>
        <Image source={item} style={styles.image} resizeMode="cover" />
      </Animated.View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <AnimatedFlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get('window').width}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={styles.contentContainer}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: '100%',
    height: '50%',
  },
  contentContainer: {
    alignItems: 'center',
  },
  image: {
    width: Dimensions.get('window').width + 10 ,
    height: '70%', 
    borderRadius: 10,
  },
});

export default Carousel;
