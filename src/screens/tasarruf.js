/* eslint-disable prettier/prettier */
import {border} from 'native-base/lib/typescript/theme/styled-system';
import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 80,
    text: 80,
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 102,
    text: 57,
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 25,
    text: 105,
  },
  {
    id: '4',
    title: 100,
    text: 420,
  },
  {
    id: '5',
    title: 20,
    text: 200,
  },
];

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [deneme, setDeneme] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const selectedPress = index => {
    setSelectedIndex(index);
  };
  const Item = ({title, text, index}) => (
    <SafeAreaView>
      <View
        style={{
          backgroundColor: '#292c2d',
          padding: 7,
          marginVertical: 2,
          marginHorizontal: 5,
          borderRadius: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderWidth: selectedIndex === index ? 2 : 0,
          borderColor: selectedIndex === index ? 'green' : 'gray',
        }}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.text}>{text}</Text>
      </View>
    </SafeAreaView>
  );
  const renderItem = ({item, index}) => (
    <View>
      <TouchableOpacity
        style
        onPress={() => {
          setCurrentIndex(index === currentIndex ? null : index);
          setDeneme(!deneme);
          selectedPress(index);
        }}
        activeOpacity={0.7}>
        <Item title={item.title} index={index} text={item.text} />
        {index === currentIndex && (
          <>
            {}
            <View>
              {item.title < item.text ? (
                <Text style={styles.textAlert}>
                  Bu günlerde çok su kullandınız
                </Text>
              ) : null}
              {item.title > item.text ? (
                <Text style={styles.textAlert}>
                  Bu günlerde az su kullandınız
                </Text>
              ) : null}
              {item.title === item.text ? (
                <Text style={styles.textAlert}>
                  Bu günlerde eşit miktarda su kullandınız
                </Text>
              ) : null}
            </View>
          </>
        )}
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.conta}>
        <Text style={styles.text1}>Geçen Ay Günlük Tüketim</Text>
        <Text style={styles.text1}>Şimdi</Text>
      </View>

      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => `${item.id}-${item.title}`}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  conta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 10,
  },
  item: {
    backgroundColor: '#292c2d',
    padding: 7,
    marginVertical: 2,
    marginHorizontal: 5,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    color: '#a8a8a8',
    textAlign: 'left',
  },
  text: {
    fontSize: 15,
    color: '#a8a8a8',
    textAlign: 'right',
  },
  text1: {
    fontSize: 17,
  },
  textAlert: {
    textAlign: 'center',
    fontSize: 16,
  },
});

export default App;
