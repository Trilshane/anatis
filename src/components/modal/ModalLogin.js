import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { connect } from "react-redux";
import { BottomSheetBackdrop, BottomSheetModal } from "@gorhom/bottom-sheet";
// import TextInputMask from 'react-native-text-input-mask'
import MaskInput from "react-native-mask-input";

import {
  hideModalLogin,
  postLoginPhone,
  postLoginSms,
  resetLoginSmsResponse,
  setModalLoginShownAtOrder,
} from "../../redux/actions/appActions";
import modalStyles, { modalBackdropOpacity } from "../../styles/ModalStyles";
import styles, { colorGrey } from "../../styles/Styles";
import {
  PHONE_MASK,
  PHONE_MASK_PLACEHOLDER,
  SMS_CODE_MASK,
} from "../../params";

const ModalLoginV2 = ({
  appState,
  hideModalLogin,
  postLoginPhone,
  postLoginSms,
  resetLoginSmsResponse,
  setModalLoginShownAtOrder,
}) => {
  const modalRef = useRef(null);

  const snapPoints = useMemo(() => [608], []);

  // useEffect(() => {
  //   presentModal()
  // }, [])

  const closeModal = useCallback(() => {
    modalRef.current?.close();
  }, []);

  const presentModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  // const onAnimateModalSnap = useCallback((fromIndex, toIndex) => {
  //   // console.log('onAnimateModalSnap', fromIndex, toIndex)
  // }, [])

  const onChangeModalSnap = useCallback((index) => {
    // console.log('handleSheetChanges', index)
    if (index === -1) {
      setTimeout(() => {
        hideModalLogin();
      }, 1);
    }
  }, []);

  const BackdropComponent = useCallback(
    (props) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        opacity={modalBackdropOpacity}
        style={modalStyles.modal_backdrop}
      />
    ),
    []
  );

  const HandleComponent = () => {
    return (
      <View style={modalStyles.modalTop}>
        <View style={modalStyles.modalTop_close} />
      </View>
    );
  };

  // Custom
  // Custom
  // Custom

  const navigation = useNavigation();

  const [phone, setPhone] = useState("");
  const [smsCode, setSmsCode] = useState("");
  const [isPhoneAllowed, setIsPhoneAllowed] = useState(false);
  const [isPhoneSubmitted, setIsPhoneSubmitted] = useState(false);

  const isModalLoginShownAtOrder = appState.isModalLoginShownAtOrder;
  const isModalLoginVisible = appState.isModalLoginVisible;
  const loginSmsResponse = appState.loginSmsResponse;

  useEffect(() => {
    console.log("loginSmsResponse", loginSmsResponse);
    if (loginSmsResponse["status"] === "error") {
      setSmsCode("");
    }
    if (loginSmsResponse["newSession"] === true) {
      resetLocalState();
    }
  }, [loginSmsResponse]);

  useEffect(() => {
    if (isModalLoginVisible) {
      resetLocalState();
      resetLoginSmsResponse();
      presentModal();
    } else {
      closeModal();
      if (isModalLoginShownAtOrder) {
        // noinspection JSUnresolvedFunction
        navigation.pop();
        setModalLoginShownAtOrder(false);
      }
    }
  }, [isModalLoginVisible]);

  useEffect(() => {
    if (smsCode.length === 4) {
      submitSmsCode();
    }
  }, [smsCode]);

  const handlePhoneSubmit = () => {
    postLoginPhone({ phone });
    setIsPhoneSubmitted(true);
  };

  const resetLocalState = () => {
    setPhone("");
    setSmsCode("");
    setIsPhoneAllowed(false);
    setIsPhoneSubmitted(false);
  };

  const submitSmsCode = () => {
    postLoginSms({ phone, smsCode });
  };

  return (
    <BottomSheetModal
      backdropComponent={BackdropComponent}
      handleComponent={HandleComponent}
      ref={modalRef}
      index={0}
      snapPoints={snapPoints}
      onChange={onChangeModalSnap}
    >
      <View style={styles.container}>
        <Text style={modalStyles.modal_header}>Вход</Text>
        <Text style={modalStyles.modalLogin_text}>
          Укажите Ваш номер телефона
        </Text>

        <View style={modalStyles.modalLogin_row}>
          <MaskInput
            editable={!isPhoneSubmitted}
            keyboardType={"phone-pad"}
            value={phone}
            mask={PHONE_MASK}
            onChangeText={(masked, unmasked) => {
              setPhone(masked);
              if (unmasked.length === 9) {
                setIsPhoneAllowed(true);
              } else {
                setIsPhoneAllowed(false);
              }
            }}
            placeholder={PHONE_MASK_PLACEHOLDER}
            placeholderTextColor={colorGrey}
            style={styles.textInput}
          />
        </View>

        {isPhoneSubmitted && (
          <View style={modalStyles.modalLogin_row}>
            <MaskInput
              keyboardType={"phone-pad"}
              mask={SMS_CODE_MASK}
              onChangeText={(formatted, extracted) => setSmsCode(formatted)}
              placeholder={"Введите код из SMS"}
              style={styles.textInput}
              value={smsCode}
            />
            {loginSmsResponse.message && (
              <Text style={modalStyles.modalLogin_textError}>
                {loginSmsResponse.message}
              </Text>
            )}
          </View>
        )}

        {isPhoneSubmitted === false && (
          <View style={modalStyles.modalLogin_submit}>
            {isPhoneAllowed ? (
              <TouchableOpacity
                onPress={() => handlePhoneSubmit()}
                style={styles.buttonGreen}
              >
                <Text style={styles.buttonGreen_text}>Подтвердить</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.buttonGray}>
                <Text style={styles.buttonGray_text}>Подтвердить</Text>
              </TouchableOpacity>
            )}
          </View>
        )}
      </View>
    </BottomSheetModal>
  );
};

const mapDispatchToProps = {
  hideModalLogin,
  postLoginPhone,
  postLoginSms,
  resetLoginSmsResponse,
  setModalLoginShownAtOrder,
};

const mapStateToProps = (state) => {
  return {
    appState: state.app,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLoginV2);
