/* @flow */

import React from 'react'
import {FlatList, StyleSheet, ViewLayoutEvent} from 'react-native'
import PropTypes from 'prop-types'
import ImageCell from './ImageCell'

import type { ImageSource } from './ImageBrowser'

type Props = {
  images: Array<ImageSource>,
  onPressImage: Function,
  onLongPressImage: Function,
  displayImageViewer: boolean,
  displayedImageId: ?string,
  numColumns: number,
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
    numColumns: PropTypes.number.isRequired,
    topMargin: PropTypes.number.isRequired,
    selectedImageId: PropTypes.string
  }

  state = {
    width: 0,
    height: 0
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
        width={this.state.width / this.props.numColumns}
        height={this.state.width / this.props.numColumns}
      />
    )
  }

  render() {
    const {images, ...props} = this.props
    return (
      <FlatList
        style={styles.container}
        data={images}
        extraData={{width: this.state.width, ...props}}
        numColumns={this.props.numColumns}
        keyExtractor={(item: ImageSource) => item.id}
        renderItem={this._renderItem}
        horizontal={false}
        onLayout={(event: ViewLayoutEvent) => {
          const {x, y, width, height} = event.nativeEvent.layout
          if (this.state.width !== width || this.state.height !== height) {
            this.setState({width, height})
          }
        }}
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
