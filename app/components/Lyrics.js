import { useState, useEffect, useRef} from "react";
import ImageZoom from "react-native-image-pan-zoom";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Dimensions
} from 'react-native'

export default function Lyrics ({title, composer, link, song, num}) {
    console.log(Dimensions.get('window').width)
    console.log(Dimensions.get('window').height)
    const imgH = Image.resolveAssetSource(link).height
    const imgW = Image.resolveAssetSource(link).width
    return (
        <View>
            <ImageZoom
                cropWidth={Dimensions.get('window').width}
                cropHeight={Dimensions.get('window').height}
                imageWidth={Dimensions.get('window').width}
                imageHeight={imgH/1.5}
                enableCenterFocus={false}
            >
              <Image source={link} style={{ 
                width: '100%',
                height: undefined,
                aspectRatio: imgW/imgH
              }}/>
            </ImageZoom>
        </View>
    )
}
const styles = StyleSheet.create({
     main : {
        flex: 1,
        border: 0
    }
})
