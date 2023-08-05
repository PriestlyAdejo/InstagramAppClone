/* eslint-disable react/react-in-jsx-scope */
import {View, Text, Image} from 'react-native';
import colors from '../../theme/colors';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles from './styles';

const FeedPost = () => {
  return (
    <View style={styles.post}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://www.pngkit.com/png/full/126-1262807_instagram-default-profile-picture-png.png',
          }}
          style={styles.userAvatar}
        />
        <Text style={styles.userName}>priestlyadejo</Text>
        <Entypo
          name="dots-three-horizontal"
          size={16}
          style={styles.threeDots}
        />
      </View>
      {/* Content */}
      <Image
        source={{
          uri: 'https://images.pexels.com/photos/17781404/pexels-photo-17781404/free-photo-of-wood-road-landscape-water.jpeg',
        }}
        style={styles.image}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconContainer}>
          <AntDesign
            name={'hearto'}
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Ionicons
            name="chatbubble-outline"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="send"
            size={24}
            style={styles.icon}
            color={colors.black}
          />
          <Feather
            name="bookmark"
            size={24}
            style={{marginLeft: 'auto'}}
            color={colors.black}
          />
        </View>

        <Text style={styles.text}>
          Liked by <Text style={styles.bold}>praiseadejo</Text> and{' '}
          <Text style={styles.bold}>69 others</Text>
        </Text>

        {/* Post Content */}
        <Text style={styles.text}>
          <Text style={styles.bold}>priestlyadejo</Text> Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Alias inventore delectus
          accusantium quia debitis quas perspiciatis dolorum quis ut! Magnam
          dolorem expedita accusantium libero doloribus quia pariatur quo quae
          fuga.
        </Text>

        {/* Comments */}
        <Text>View all 16 comments</Text>
        <View style={styles.comment}>
          <Text style={styles.commentText}>
            <Text style={styles.bold}>dogNiggaxoxo</Text> Lorem ipsum dolor sit
            amet consectetur adipisicing elit.
          </Text>
          <AntDesign
            name={'hearto'}
            size={14}
            style={styles.icon}
            color={colors.black}
          />
        </View>

        {/* Posted Date */}
        <Text>19th December, 2021</Text>
      </View>
    </View>
  );
};

export default FeedPost;
