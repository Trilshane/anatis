import React, { useEffect } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { connect } from 'react-redux'

import styles, { colorAnotherBlue } from '../styles/Styles'

const FullscreenLoading = ({ appState }) => {
  const isFullscreenLoadingVisible = appState.isFullscreenLoadingVisible

  if (isFullscreenLoadingVisible) {
    return (
      <View style={styles.fullscreenLoading}>
        <View style={styles.fullscreenLoading_background} />
        <ActivityIndicator size={'large'} color={colorAnotherBlue} />
      </View>
    )
  } else {
    return <></>
  }
}

const mapDispatchToProps = {}

const mapStateToProps = (state) => {
  return {
    appState: state.app,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FullscreenLoading)
