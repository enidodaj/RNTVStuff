import { showMessage } from "react-native-flash-message";

export const showInfoMessage = (message: string) => showMessage({
  type: 'info',
  message,
})