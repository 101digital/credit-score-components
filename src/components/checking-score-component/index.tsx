import { images } from "../../assets/images";
import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleProp,
  ViewStyle,
  ImageStyle,
  TextStyle
} from "react-native";
import { ThemeContext, Image, Button } from "react-native-theme-component";
import useMergeStyles from "./theme";
import { CreditContext } from "../../context/credit-context";
import { AnimatedCircularProgress } from "react-native-circular-progress";

export type CheckingScoreComponentStyle = {
  containerStyle?: StyleProp<ViewStyle>;
  mainContainerStyle?: StyleProp<ViewStyle>;
  loadingImageStyle?: StyleProp<ImageStyle>;
  titleTextStyle?: StyleProp<TextStyle>;
  messageTextStyle?: StyleProp<TextStyle>;
  applyContainerStyle?: StyleProp<ViewStyle>;
  scoreTitleTextStyle?: StyleProp<TextStyle>;
  scoreValueTextStyle?: StyleProp<TextStyle>;
};

export type CheckingScoreComponentProps = {
  consentId?: string;
  style?: CheckingScoreComponentStyle;
  goodColor?: string;
  badColor?: string;
  onCancel: () => void;
  onContinue: () => void;
};

const MAX_SCORE = 1000;

const CheckingScoreComponent = (props: CheckingScoreComponentProps) => {
  const { i18n } = useContext(ThemeContext);
  const {
    isCheckingScore,
    creditScore,
    checkCreditScore,
    clearCreditScore,
    clearErrors,
    consentData
  } = useContext(CreditContext);
  const { consentId, style, onCancel, onContinue, goodColor, badColor } = props;
  const styles: CheckingScoreComponentStyle = useMergeStyles(style);

  console.log("Consent Data", consentData);

  useEffect(() => {
    onContinue();
  }, []);

  useEffect(() => {
    checkCreditScore(consentId);
    return () => {
      clearCreditScore();
      clearErrors();
    };
  }, []);

  const _renderMainContent = () => {
    if (isCheckingScore) {
      return (
        <>
          <Image
            style={styles.loadingImageStyle}
            source={images.loading}
            fallbackImage={images.loading}
          />
          <Text style={styles.titleTextStyle}>
            {i18n?.t("credit_check.lbl_credit_pending") ??
              "Credit Check Pending"}
          </Text>
          <Text style={styles.messageTextStyle}>
            {i18n?.t("credit_check.msg_credit_checking") ??
              "Your credit check is processing, please wait until we recieve the information from your bank."}
          </Text>
        </>
      );
    }
    if (creditScore) {
      if (creditScore.ficoRange === "good") {
        return (
          <>
            <AnimatedCircularProgress
              size={190}
              width={20}
              fill={(creditScore.ficoScore / MAX_SCORE) * 100}
              tintColor={goodColor ?? "#21CB59"}
              backgroundColor="#e4f2ff"
              lineCap="round"
              arcSweepAngle={300}
              rotation={210}
            >
              {_ => (
                <View>
                  <Text style={styles.scoreTitleTextStyle}>
                    {i18n?.t("credit_check.lbl_credit_score") ?? "Credit Score"}
                  </Text>
                  <Text style={styles.scoreValueTextStyle}>
                    {creditScore.ficoScore}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.titleTextStyle}>
              {i18n?.t("credit_check.lbl_good_score") ?? "Good Score"}
            </Text>
            <Text style={styles.messageTextStyle}>
              {i18n?.t("credit_check.msg_good_score") ??
                "Congratulations!, you have a good Credit Score.\nPlease “Continue” to fill in the loan application."}
            </Text>
          </>
        );
      }
      if (creditScore.ficoRange === "bad") {
        return (
          <>
            <AnimatedCircularProgress
              size={190}
              width={20}
              fill={(creditScore.ficoScore / MAX_SCORE) * 100}
              tintColor={badColor ?? "#FF3030"}
              backgroundColor="#e4f2ff"
              lineCap="round"
              arcSweepAngle={300}
              rotation={210}
            >
              {_ => (
                <View>
                  <Text style={styles.scoreTitleTextStyle}>
                    {i18n?.t("credit_check.lbl_credit_score") ?? "Credit Score"}
                  </Text>
                  <Text style={styles.scoreValueTextStyle}>
                    {creditScore.ficoScore}
                  </Text>
                </View>
              )}
            </AnimatedCircularProgress>
            <Text style={styles.titleTextStyle}>
              {i18n?.t("credit_check.lbl_low_score") ?? "Low Score"}
            </Text>
            <Text style={styles.messageTextStyle}>
              {i18n?.t("credit_check.msg_low_score") ??
                "Sorry, your Credit Score is too low to continue.\nPlease contact your bank to\nfind out how to increase your Credit Score."}
            </Text>
          </>
        );
      }
    }
    return <View />;
  };

  return (
    <View style={styles.containerStyle}>
      {/*<View style={styles.mainContainerStyle}>{_renderMainContent()}</View>*/}
      <View style={styles.applyContainerStyle}>
        <>
          <Button
            style={{
              secondaryContainerStyle: {
                flex: 1,
                marginRight: 7
              }
            }}
            variant="secondary"
            label={i18n?.t("credit_check.btn_cancel") ?? "Cancel"}
            onPress={onCancel}
          />
          <Button
            style={{
              primaryContainerStyle: {
                flex: 1,
                marginLeft: 7
              }
            }}
            label={i18n?.t("credit_check.btn_continue") ?? "Continue"}
            onPress={onContinue}
          />
        </>
        {/*creditScore?.ficoRange === 'good' ? (
          <>
            <Button
              style={{
                secondaryContainerStyle: {
                  flex: 1,
                  marginRight: 7,
                },
              }}
              variant='secondary'
              label={i18n?.t('credit_check.btn_cancel') ?? 'Cancel'}
              onPress={onCancel}
            />
            <Button
              style={{
                primaryContainerStyle: {
                  flex: 1,
                  marginLeft: 7,
                },
              }}
              label={i18n?.t('credit_check.btn_continue') ?? 'Continue'}
              onPress={onContinue}
            />
          </>
        ) : (
          <Button
            style={{
              primaryContainerStyle: {
                flex: 1,
              },
            }}
            label={i18n?.t('credit_check.btn_back') ?? 'Back'}
            onPress={onCancel}
          />
        )*/}
      </View>
    </View>
  );
};

export default CheckingScoreComponent;
