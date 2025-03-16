import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'

import { replaceQueue, setOrder, setOrderPayment } from '../redux/actions/orderActions'

import { FooterRepeatIcon } from './Interface'
import footerStyles from '../styles/FooterStyles'
import { getOrderDataFromHistory } from '../tools'

export const FooterRepeat = ({ historyList, replaceQueue, setOrder, setOrderPayment }) => {
  const navigation = useNavigation()

  if (historyList.length === 0) return null

  const handleRepeatLastOrder = () => {
    if (historyList.length > 0) {
      let newQueue = {}
      historyList[0]['ITEMS'].map((item) => {
        newQueue[item['PRODUCT_ID']] = {
          id: item['PRODUCT_ID'],
          quantity: item['QUANTITY'],
          reusable: item['REUSABLE'],
        }
      })
      const [newOrder, newOrderPayment] = getOrderDataFromHistory(historyList[0])

      replaceQueue(newQueue)
      setOrder(newOrder)
      setOrderPayment(newOrderPayment)
      navigation.push('Order')
    }
  }

  return (
    <View style={footerStyles.footer}>
      <TouchableOpacity onPress={() => handleRepeatLastOrder()} style={footerStyles.footer_button}>
        <FooterRepeatIcon />
        <Text style={footerStyles.footer_text}>Повторить последний заказ</Text>
      </TouchableOpacity>
    </View>
  )
}

const mapDispatchToProps = {
  replaceQueue,
  setOrder,
  setOrderPayment,
}

const mapStateToProps = (state) => {
  return {
    historyList: state.history.list,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FooterRepeat)
