import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  Dimensions,
  PanResponder,
  Animated,
} from 'react-native';
import {colors} from '../utils';
import RNTextDetector from 'react-native-text-detector';
import {TextBlocks, BottomSheetComponent} from '../components';
import {create} from 'react-native-pixel-perfect';
import {searchImages} from '../services';

const designResolution = {
  width: 1065.1840490798,
  height: 2084.9202453988,
}; //this size is the size that your design is made for (screen size)
const perfectSize = create(designResolution);
export default class PictureScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subtitle: 'placeholder',
      dimensions: {
        width: null,
        heiht: null,
      },
      pan: new Animated.ValueXY(),
      openBottomSheet: false,
      mocks: [
        {
          webSearchUrl:
            'https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=pasta&id=7E7DD689FD91526D89D6CB6C2565A6153BDA01A6&simid=607987765998325160',
          name: 'Pasta Arrabiata Recipe - Laura Vitale - Laura in the ...',
          thumbnailUrl:
            'https://tse3.mm.bing.net/th?id=OIP.N-QLpGKltXAhsvwlLW8SwAHaEK&pid=Api',
          datePublished: '2012-03-15T12:00:00.0000000Z',
          isFamilyFriendly: true,
          contentUrl: 'http://i.ytimg.com/vi/XHKAWWnw4aQ/maxresdefault.jpg',
          hostPageUrl: 'http://www.youtube.com/watch?v=XHKAWWnw4aQ',
          contentSize: '104278 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'www.youtube.com/watch?v=XHKAWWnw4aQ',
          width: 1280,
          height: 720,
          hostPageFavIconUrl:
            'https://www.bing.com/th?id=ODF.FN1SZscHib3IBjZN9FhjNQ&pid=Api',
          hostPageDomainFriendlyName: 'YouTube',
          thumbnail: {
            width: 474,
            height: 266,
          },
          imageInsightsToken:
            'ccid_N+QLpGKl*mid_7E7DD689FD91526D89D6CB6C2565A6153BDA01A6*simid_607987765998325160*thid_OIP.N-QLpGKltXAhsvwlLW8SwAHaEK',
          insightsMetadata: {
            pagesIncludingCount: 13,
            availableSizesCount: 1,
            videoObject: {
              creator: {
                name: 'Laura in the Kitchen',
              },
              duration: 'PT5M13S',
            },
          },
          imageId: '7E7DD689FD91526D89D6CB6C2565A6153BDA01A6',
          accentColor: '892508',
        },
        {
          webSearchUrl:
            'https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=pasta&id=DE0F293B6004B85F05522DBB002D74B02D7E8600&simid=608050249153777524',
          name: 'Minchia che pasta al pomodoro - YouTube',
          thumbnailUrl:
            'https://tse4.mm.bing.net/th?id=OIP.vCEJW594GiStjHfNv_YSGwHaE8&pid=Api',
          datePublished: '2019-11-13T06:45:00.0000000Z',
          isFamilyFriendly: true,
          contentUrl: 'https://i.ytimg.com/vi/82KABQUOodo/maxresdefault.jpg',
          hostPageUrl: 'https://www.youtube.com/watch?v=82KABQUOodo',
          contentSize: '163687 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'https://www.youtube.com/watch?v=82KABQUOodo',
          width: 1296,
          height: 864,
          hostPageFavIconUrl:
            'https://www.bing.com/th?id=ODF.FN1SZscHib3IBjZN9FhjNQ&pid=Api',
          hostPageDomainFriendlyName: 'YouTube',
          thumbnail: {
            width: 474,
            height: 316,
          },
          imageInsightsToken:
            'ccid_vCEJW594*mid_DE0F293B6004B85F05522DBB002D74B02D7E8600*simid_608050249153777524*thid_OIP.vCEJW594GiStjHfNv!_YSGwHaE8',
          insightsMetadata: {
            pagesIncludingCount: 4,
            availableSizesCount: 3,
            videoObject: {
              creator: {
                name: 'The Food Emperor',
              },
              duration: 'PT1M28S',
            },
          },
          imageId: 'DE0F293B6004B85F05522DBB002D74B02D7E8600',
          accentColor: 'BA350E',
        },
        {
          webSearchUrl:
            'https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=pasta&id=C8D77245C0B4E5E84A24F2C8F9761E785D2B0D6F&simid=607986421676706627',
          name: 'The Right Way to Sauce Pasta | Serious Eats',
          thumbnailUrl:
            'https://tse2.mm.bing.net/th?id=OIP.L5NeAG7yveyFjUZfd9xwzQHaFj&pid=Api',
          datePublished: '2017-12-11T00:50:00.0000000Z',
          isFamilyFriendly: true,
          contentUrl:
            'http://www.seriouseats.com/assets_c/2016/02/20160218-finishin-pasta-sauce-10-thumb-1500xauto-429991.jpg',
          hostPageUrl:
            'http://www.seriouseats.com/2016/02/the-right-way-to-sauce-pasta.html',
          contentSize: '309808 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl:
            'www.seriouseats.com/2016/02/the-right-way-to-sauce-pasta.html',
          width: 1500,
          height: 1125,
          hostPageFavIconUrl:
            'https://www.bing.com/th?id=ODF.wMoxQosSEkU2uEcPi9785w&pid=Api',
          hostPageDomainFriendlyName: 'Serious Eats',
          thumbnail: {
            width: 474,
            height: 355,
          },
          imageInsightsToken:
            'ccid_L5NeAG7y*mid_C8D77245C0B4E5E84A24F2C8F9761E785D2B0D6F*simid_607986421676706627*thid_OIP.L5NeAG7yveyFjUZfd9xwzQHaFj',
          insightsMetadata: {
            pagesIncludingCount: 11,
            availableSizesCount: 5,
          },
          imageId: 'C8D77245C0B4E5E84A24F2C8F9761E785D2B0D6F',
          accentColor: 'BF790C',
        },
        {
          webSearchUrl:
            'https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=pasta&id=119302BEF4094175C7EA75E96407B76A51B3472A&simid=607995110390893478',
          name: "Pasta All'Amatriciana Recipe - Cook's Illustrated",
          thumbnailUrl:
            'https://tse1.mm.bing.net/th?id=OIP.f3qH7O4SS3oJb8682xinlAHaHa&pid=Api',
          datePublished: '2013-01-01T12:00:00.0000000Z',
          isFamilyFriendly: true,
          contentUrl:
            'http://d3cizcpymoenau.cloudfront.net/images/legacy/37549/SFS_pasta_amatarica_CLR-12.jpg',
          hostPageUrl:
            'http://cooksillustrated.com/recipes/7276-pasta-allamatriciana',
          contentSize: '218156 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl:
            'cooksillustrated.com/recipes/7276-pasta-allamatriciana',
          width: 800,
          height: 800,
          hostPageDomainFriendlyName: "Cook's Illustrated",
          thumbnail: {
            width: 474,
            height: 474,
          },
          imageInsightsToken:
            'ccid_f3qH7O4S*mid_119302BEF4094175C7EA75E96407B76A51B3472A*simid_607995110390893478*thid_OIP.f3qH7O4SS3oJb8682xinlAHaHa',
          insightsMetadata: {
            pagesIncludingCount: 8,
            availableSizesCount: 4,
          },
          imageId: '119302BEF4094175C7EA75E96407B76A51B3472A',
          accentColor: 'B64015',
        },
        {
          webSearchUrl:
            'https://www.bing.com/images/search?view=detailv2&FORM=OIIRPO&q=pasta&id=433963CD8F784A426B966E4359A5E46611680B72&simid=608037235469583723',
          name: 'Como preparar Pasta Italiana fettuccini con salsa de ...',
          thumbnailUrl:
            'https://tse4.mm.bing.net/th?id=OIP.ZQWN0hAQwqwpq6WYmvHi9gHaFj&pid=Api',
          datePublished: '2014-06-09T12:00:00.0000000Z',
          isFamilyFriendly: true,
          contentUrl: 'https://i.ytimg.com/vi/57U7Jqy0HQE/hqdefault.jpg',
          hostPageUrl: 'http://www.youtube.com/watch?v=57U7Jqy0HQE',
          contentSize: '25366 B',
          encodingFormat: 'jpeg',
          hostPageDisplayUrl: 'www.youtube.com/watch?v=57U7Jqy0HQE',
          width: 480,
          height: 360,
          hostPageFavIconUrl:
            'https://www.bing.com/th?id=ODF.FN1SZscHib3IBjZN9FhjNQ&pid=Api',
          hostPageDomainFriendlyName: 'YouTube',
          thumbnail: {
            width: 474,
            height: 355,
          },
          imageInsightsToken:
            'ccid_ZQWN0hAQ*mid_433963CD8F784A426B966E4359A5E46611680B72*simid_608037235469583723*thid_OIP.ZQWN0hAQwqwpq6WYmvHi9gHaFj',
          insightsMetadata: {
            pagesIncludingCount: 7,
            availableSizesCount: 3,
            videoObject: {
              creator: {
                name: 'Chef Gama Coronado',
              },
              duration: 'PT5M24S',
            },
          },
          imageId: '433963CD8F784A426B966E4359A5E46611680B72',
          accentColor: 'B34518',
        },
      ],
    };
    this.panResponder = PanResponder.create({
      //Step 2
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dy > 0 && gestureState.dy <= 120) {
          Animated.event([
            null,
            {
              dy: this.state.pan.y,
            },
          ])(event, gestureState);
        }
      },
      onPanResponderRelease: (e, gesture) => {
        Animated.spring(
          //Step 1
          this.state.pan, //Step 2
          {toValue: {x: 0, y: 0}}, //Step 3
        ).start();
        if (gesture.dy >= 80) {
          Animated.spring(
            //Step 1 giannilupo
            this.state.pan, //Step 2
            {toValue: {x: 0, y: 900}}, //Step 3
          ).start();
          this.setState({openBottomSheet: false});
          setTimeout(() => props.navigation.goBack(), 300);
        }
      }, //Step 4
    });
  }

  componentDidMount() {
    console.log('COMPONENT DID MOUNT run the OCR to recognize the text');
    this.detectText();
  }

  perfectSize = () => {
    if (this.state.dimensions.width && this.state.dimensions.heiht) {
      console.log(
        'Height and width perfect size',
        this.state.dimensions.heiht,
        this.state.dimensions.width,
      );
      return create({
        width: this.state.dimensions.width,
        height: this.state.dimensions.height - 44 - 34,
      });
    }
  };

  detectText = async () => {
    try {
      console.log(this.props.route.params.imageUri);
      const visionResp = await RNTextDetector.detectFromUri(
        this.props.route.params.imageUri,
      );
      console.log('visionResp', visionResp);
      this.setState({visionResp: visionResp});
    } catch (e) {
      console.warn(e);
    }
  };

  extractInformationFromText() {
    console.log('Extracting Text blocks');
    const {textBlocksContainer} = styles;
    return this.state.visionResp.map(item => {
      return item.lines.map(item => {
        return (
          <TextBlocks
            style={textBlocksContainer}
            width={perfectSize(item.bounding.width)}
            height={perfectSize(item.bounding.height)}
            left={perfectSize(item.bounding.left)}
            top={perfectSize(item.bounding.top)}
            onPress={async () => {
              if (!this.state.mocks) {
                this.setState({items: await searchImages('pasta')});
              }
              this.setState({title: item.text});
              this.setState({openBottomSheet: true});
            }}
          />
        );
      });
    });
  }

  _onLayout = event => {
    var {width, height} = event.nativeEvent.layout;
    console.log('Height and width', height, width);
    this.setState({dimensions: {width, height}});
    console.log('dimensions: ', this.state.dimensions);
  };

  render = () => {
    const {imageUri} = this.props.route.params;
    const {image, container, imageContainer, textBlocksContainer} = styles;
    return (
      <View style={[container]}>
        <SafeAreaView>
          <Animated.View
            {...this.panResponder.panHandlers}
            style={this.state.pan.getLayout()}>
            <View onLayout={this._onLayout}>
              <View style={{flex: 1}}>
                {this.state.visionResp &&
                  this.state.dimensions.width &&
                  this.state.dimensions.height &&
                  this.extractInformationFromText()}
              </View>
              <View style={[imageContainer]}>
                <Image style={image} source={{uri: imageUri}} />
              </View>
            </View>
          </Animated.View>
        </SafeAreaView>
        {
          <BottomSheetComponent
            items={this.state.mocks}
            title={this.state.title}
            subtitle={this.state.subtitle}
            openBottomSheet={this.state.openBottomSheet}
          />
        }
      </View>
    );
  };
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
  },
  container: {
    backgroundColor: colors.black,
  },
  imageContainer: {
    overflow: 'hidden',
    borderRadius: 30,
    zIndex: -1,
  },
  textBlocksContainer: {
    position: 'absolute',
    zIndex: 1,
  },
});
