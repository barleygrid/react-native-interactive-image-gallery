/* @flow */

import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import ImageCell from './ImageCell'

import type { ImageSource } from './ImageBrowser'

type Props = {
  images: Array<ImageSource>,
  onPressImage: Function,
  onLongPressImage: Function,
  displayImageViewer: boolean,
  displayedImageId: ?string,
  selectedImageId: ?string,
  topMargin: number
}

class ImageListContainer extends React.PureComponent<Props> {
  static propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        thumbnail: PropTypes.string.isRequired
      })
    ).isRequired,
    onPressImage: PropTypes.func.isRequired,
    onLongPressImage: PropTypes.func.isRequired,
    displayImageViewer: PropTypes.bool.isRequired,
    displayedImageId: PropTypes.string,
    topMargin: PropTypes.number.isRequired,
    selectedImageId: PropTypes.string
  }

  _renderItem = (item: { item: ImageSource, index: number }) => {
    const { displayImageViewer, displayedImageId } = this.props
    return (
      <ImageCell
        key={`ImageCellId-${item.item.id}`}
        imageId={item.item.id}
        source={{ uri: item.item.thumbnail }}
        onPressImage={this.props.onPressImage}
        onLongPressImage={this.props.onLongPressImage}
        shouldHideDisplayedImage={
          displayImageViewer && displayedImageId === item.item.id
        }
        topMargin={this.props.topMargin}
        selectedImageId={this.props.selectedImageId}
      />
    )
  }

  render() {
    const {images, ...props} = this.props
    return (
      <FlatList
        style={styles.container}
        data={images}
        extraData={props}
        numColumns={2}
        keyExtractor={(item: ImageSource) => item.id}
        renderItem={this._renderItem}
        horizontal={false}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default ImageListContainer
