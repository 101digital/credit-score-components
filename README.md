# credit-score-component

The <b>credit-score-component</b> is a reusable component which provides way to check current credit score then handle next business developed by 101 Digital.

You will need to add some optional modules in android/app/build.gradle, depending on the needs of your app.

## Installation

To add this component to React Native app, run this command:

```
yarn add https://github.com/101digital/credit-score-component.git
```

Make sure you have permission to access this repository
To get more details about how to install private repository, can found here: [https://nts.strzibny.name/using-private-github-repositories-with-yarn-and-npm-in-package-json/]

This lib also required some dependencies. Ignore any dependency if it already existed in your project.

- The Theme Component [react-native-theme-component](https://github.com/101digital/react-native-theme-component): Using for base theme styles

- The Webview [react-native-webview](https://github.com/react-native-webview/react-native-webview): View product information

- Add support GIF image for Android: You will need to add some optional modules in `android/app/build.gradle`, depending on the needs of your app.

```sh
dependencies {

// For animated GIF support
implementation 'com.facebook.fresco:animated-gif:2.0.0'

}
```

## Quick Start

- `CreditService` is initiated should be from `App.ts`

```javascript
import { CreditService } from 'credit-score-component';

CreditService.instance().initClients({
  openBankAuthClient: createAuthorizedApiClient(openBankingAuth), // your open bank auth client
  creditAssessmentClient: createAuthorizedApiClient(creditAssessment), // your credit assessment client
});
```

- Wrapped the app with `CreditProvider`

```javascript
import { CreditProvider } from 'credit-score-component';

const App = () => {
  return (
    <View>
      <CreditProvider>{/* YOUR APP COMPONENTS */}</CreditProvider>
    </View>
  );
};

export default App;
```

### Assets And Multiple Languages

- All icons, images and texts are provided by default. You can use your custom by passing them as a props inside each component

- In order to do multiple languages, you need to pass `i18n` (`i18n` should be configurated in the app level) into `CreditCheckComponent` as a root props. And then, you have to copy and paste all attributes of `credit_check` in [texts](credit-score-component-data.json) into your app locale file. You can also change text value, but DON'T change the key.

### Use component inside screen

You can place components as a React Node inside your React Native screen. All styles, props are provided by default, you can customize them also. There are some required props, you need provide them if components request

Styles, props, components you can find them in API reference

### API Reference

`CreditCheckComponent` to do completely flow to check current credit score before do lending flow

- Root:

| Name                 | Type                | Description                              |
| :------------------- | :------------------ | :--------------------------------------- |
| bankId               | String (Required)   | Current bankId need to check score       |
| bankName             | String (Required)   | Current bankName need to check score     |
| bankLogo             | String (Required)   | Current bankLogo need to check score     |
| isCreditScoreSupport | bool (Required)     | Current bank support credit check or not |
| onCancel             | Function (Required) | Cancel checking                          |
| onContinue           | Function (Required) | Continue next business after checking    |
| onStepChange         | Function (Optional) | Listen step change                       |

- LoginBank: style can be found [here](src/components/login-bank-component/index.tsx)
- CheckScore: style can be found [here](src/components/checking-score-component/index.tsx)

### Examples
