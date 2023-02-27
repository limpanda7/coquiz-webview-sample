import {useEffect} from "react";
import './App.css';

const App = () => {

  useEffect(() => {
    onMessage();
  }, [])

  // 네이티브로부터 메시지 수신
  // message 이벤트에 대한 리스너를 설정합니다.
  // event.data로 메시지에 접근할 수 있습니다. string이기 때문에 JSON으로 파싱해서 사용합니다.
  // 메시지의 type에 따라 어떤 액션을 취할지 작성합니다.
  const onMessage = () => {
    document.addEventListener('message', (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'saveUserInfoSuccess':
          alert(`네이티브에 유저 정보를 저장했습니다. 기기 고유값은 ${message.value} 입니다.`);
          break;
        case 'saveUserInfoFail':
          alert('네이티브에 유저 정보를 저장하지 못했습니다.');
          break;
        default:
          break;
      }
    })
  }

  // 네이티브로 메시지 발송
  // message는 JSON 형태(key-value)입니다.
  // message의 type은 필수, value는 옵셔널 입니다.
  // type은 string 입니다.
  // value는 string 또는 JSON 형태(key-value)입니다.
  // message를 string으로 변환하여 네이티브로 보냅니다.

  // 파라미터는 2개를 받습니다
  // 첫 번째 파라미터: type (string)
  // 두 번째 파라미터: value (string 또는 json)
  function postMessageToApp(type, value) {
    const message = {
      type: type,
      value: value
    }

    const stringMessage = JSON.stringify(message);
    alert(stringMessage + '를 네이티브로 보냅니다.');
    window.ReactNativeWebView.postMessage(stringMessage);
  }

  return (
    <div>
      <h1>CoQuiz Webview Sample</h1>
      <button onClick={() => postMessageToApp('getUserMachin')}>기기 고유값 요청</button>
      <button onClick={() => postMessageToApp('saveUserInfo', {mbId: 'limpanda7', mb_email:'limpanda7@naver.com'})}>회원 정보 저장</button>
    </div>
  );
}

export default App;
