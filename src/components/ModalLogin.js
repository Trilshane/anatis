import React, { useEffect, useState } from "react";
import { Alert, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { connect } from "react-redux";
import Modal from "react-native-modal";
import { Form, Field } from "react-final-form";

import {
  hideModalLogin,
  postLogin,
  postRestorePassword,
} from "../redux/actions/appActions";
import { DEBUG_LOGIN } from "../params";

import styles, { colorGrey } from "../styles/Styles";
import modalStyles, {
  modalBackdropColor,
  modalBackdropOpacity,
} from "../styles/ModalStyles";

const ModalLogin = ({
  appState,
  hideModalLogin,
  postLogin,
  postRestorePassword,
}) => {
  const isModalLoginVisible = appState.isModalLoginVisible;

  const [isModalVisible, setIsModalVisible] = useState(false);

  const insets = useSafeAreaInsets();
  const safePaddingBottom = insets.bottom;

  useEffect(() => {
    setIsModalVisible(isModalLoginVisible);
  }, [isModalLoginVisible]);

  const animationTiming = 300;

  const handleHideModal = () => {
    setIsModalVisible(false);
    setTimeout(() => {
      hideModalLogin();
    }, animationTiming);
  };

  const handleRestorePassword = (values) => {
    if (values.login) {
      postRestorePassword({ login: values.login });
    } else {
      Alert.alert("Укажите Логин или EMail");
    }
  };

  const loginFormSubmit = (values) => {
    postLogin({ login: values.login, password: values.password });
  };

  const loginFormValidate = (values) => {
    const errors = {};
    if (!values.login) {
      errors.login = "Обязательное поле";
    }
    if (!values.password) {
      errors.password = "Обязательное поле";
    }
    return errors;
  };

  const loginFormInitialValues = {
    login: DEBUG_LOGIN ? "nchtnn@gmail.com" : "",
    password: DEBUG_LOGIN ? "EC9jDC?J" : "",
  };

  return (
    <Modal
      isVisible={isModalVisible}
      onBackdropPress={() => handleHideModal()}
      onBackButtonPress={() => handleHideModal()}
      avoidKeyboard={true}
      style={modalStyles.modal}
      backdropColor={modalBackdropColor}
      backdropOpacity={modalBackdropOpacity}
      propagateSwipe={true}
      swipeDirection={"down"}
      onSwipeComplete={() => handleHideModal()}
      animationInTiming={animationTiming}
      animationOutTiming={animationTiming}
    >
      <View
        style={{ ...modalStyles.modal_block, paddingBottom: safePaddingBottom }}
      >
        <View style={styles.container}>
          <View style={modalStyles.modalTop}>
            <View style={modalStyles.modalTop_close} />
          </View>
          <Text style={modalStyles.modal_header}>Вход</Text>
          <Text style={modalStyles.modalLogin_text}>
            Если Вы у нас впервые, просто оформите первый заказ в корзине и
            приложение автоматически авторизует Вас.
          </Text>

          <View style={modalStyles.modalLogin_skipLogin}>
            <TouchableOpacity
              onPress={() => handleHideModal()}
              style={styles.buttonWhiteGreen}
            >
              <Text style={styles.buttonWhiteGreen_text}>
                Продолжить как новый пользователь
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={modalStyles.modalLogin_text}>
            Либо используйте Ваш логин и пароль на сайте www.anatis.tj для
            авторизации в приложении:
          </Text>

          <Form
            initialValues={loginFormInitialValues}
            onSubmit={loginFormSubmit}
            validate={loginFormValidate}
            render={({ handleSubmit, values }) => {
              return (
                <>
                  <View style={modalStyles.modalLogin}>
                    <View style={modalStyles.modalLogin_row}>
                      <Field
                        autoCapitalize={"none"}
                        colStyle={styles.textInput_fg}
                        component={InputBlock}
                        name="login"
                        placeholder={"Логин"}
                      />
                    </View>
                    <View style={modalStyles.modalLogin_row}>
                      <Field
                        colStyle={styles.textInput_fg}
                        component={InputBlock}
                        name="password"
                        placeholder={"Пароль"}
                        secureTextEntry={true}
                      />
                    </View>
                  </View>

                  <View style={modalStyles.modalLogin_submit}>
                    <TouchableOpacity
                      onPress={handleSubmit}
                      style={styles.buttonGreen}
                    >
                      <Text style={styles.buttonGreen_text}>Войти</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={modalStyles.modalLogin_restoreWrapper}>
                    <TouchableOpacity
                      onPress={() => handleRestorePassword(values)}
                      hitSlop={{ top: 12, right: 12, bottom: 12, left: 12 }}
                    >
                      <Text style={modalStyles.modalLogin_restoreText}>
                        Забыли пароль?
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

const InputBlock = ({
  autoCapitalize,
  colStyle,
  keyboardType,
  placeholder,
  secureTextEntry,
  input,
  meta,
}) => {
  let style = [styles.textInput, colStyle];
  if (meta.touched && meta.error) style.push(styles.textInput_error);

  return (
    <>
      <TextInput
        autoCapitalize={autoCapitalize}
        keyboardType={keyboardType}
        placeholder={placeholder}
        placeholderTextColor={colorGrey}
        secureTextEntry={secureTextEntry}
        style={style}
        {...input}
      />
      {/*{meta.error && meta.touched && <Text>{meta.error}</Text>}*/}
    </>
  );
};

const mapDispatchToProps = {
  hideModalLogin,
  postLogin,
  postRestorePassword,
};

const mapStateToProps = (state) => {
  return {
    appState: state.app,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalLogin);
