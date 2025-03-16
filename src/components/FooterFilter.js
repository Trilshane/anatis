import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useRoute } from '@react-navigation/native'
import { connect } from 'react-redux'

import { setFilterList, showModalFilter } from '../redux/actions/catalogActions'
import { FooterFilterIcon } from './Interface'
import footerStyles from '../styles/FooterStyles'
import { getMenuDataByCode } from '../tools'

const FooterFilter = ({ setFilterList, showModalFilter, filter }) => {
  const route = useRoute()

  const handleButtonClick = () => {
    const filterName = getMenuDataByCode(route.params.code).filterName
    setFilterList(filter[filterName])
    showModalFilter()
  }

  return (
    <View style={footerStyles.footer}>
      <TouchableOpacity onPress={() => handleButtonClick()} style={footerStyles.footer_button}>
        <FooterFilterIcon />
        <Text style={footerStyles.footer_text}>Фильтр</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = {
  setFilterList,
  showModalFilter,
}

const mapStateToProps = (state) => {
  return {
    filter: state.catalog.filter,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterFilter)
