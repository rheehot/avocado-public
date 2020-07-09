/* eslint-disable */
import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'; // userHistory
import axios from 'axios';
import _ from 'lodash';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Main from './components/Main';
import Wordbook from './components/Wordbook';
/* App wordId 추가 */
class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLogin: false,
      userInfo: null,
      currentWord: null,
      wordData: [
        {
          word: { 1: "apple" },
          updatedAt: String(new Date().toUTCString()),
          sentences: {101:'apple is red',102:'apple is expensive',103:'samsung'}
        },
        {
          word: { 2: "banana" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 1: "1", 2: "2" ,11:"11"}
        },
        {
          word: { 3: "3" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 3: "3", 4: "4" ,13:"11"}
        },
        {
          word: { 4: "4" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 5: "5", 6: "6",15:"11" }
        },
        {
          word: { 5: "5" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 7: "7", 8: "8",17:"11" }
        },
        {
          word: { 6: "6" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 9: "9", 10: "10",19:"11" }
        },
        {
          word: { 7: "7" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 11: "11", 12: "12",21:"11" }
        },
        {
          word: { 8: "8" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 13: "13", 14: "14",23:"11" }
        }, {
          word: { 9: "9" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 15: "15", 16: "16",25:"11" }
        }, {
          word: { 10: "10" },
          updatedAt: String(new Date().toUTCString()),
          sentences: { 17: "17", 18: "18",27:"11" }
        }
      ],
      // TODO: 서버로 부터 데이터 받은 후 받은 데이터로 초기화 시켜줘야 함
      // DB 처럼 추가, 삭제되면 wordID 다시 설정해야 함
      // 추가, 삭제 할때마다
      // wordData에서 wordId 를 1~end 까지 재할당
    };
  }

  handleLogin() {
    this.setState({
      isLogin: true,
    });
  }

  handleLogout() {
    this.setState({
      isLogin: false,
    });
  }
  getWordData() {
    // get 요청: 서버로부터 유저와 일치하는 모든 단어/예문을 불러온다.
    axios.get('url').then((res) => {
      this.setState({ wordData: res.data });
    });
  }
  postInputWord(wordDataLength) {
    // post 요청: 유저가 입력한 새로운 단어/예문을 서버에 전송한다.

    // 새로운 단어 추가시
    // wordId 가 1부터 시작하여 wordDataLength 에 +1 하여 post 보냄
    const url = 'http://localhost:8080/words';
    axios
      .post(url, {
        wordId: wordDataLength + 1,
        word: this.state.currentWord,
        sentences: [],
      })
      .then((res) => {
        console.log('post-reponse', res);
      });
  }
  // res.config.data / res.data.data

  updateWordData(word, sentences) {
    // put 요청: 유저가 단어를 수정한 경우, 또는 예문을 수정/추가/삭제한 경우 그 값을 서버에 전송한다.
    axios
      .put('http://localhost:8080/words/sentences', {
        word: word,
        sentences: sentences,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log('updateWordData', e);
      });
  }

  deleteWordData(wordId) {
    // delete 요청: 유저가 단어/예문을 삭제한 경우 서버에 삭제를 요청한다.
    axios.delete('http://localhost:8080/words', {
      data: { wordId: wordId },
      withCredentials: true,
    });
    // wordId 가 배열 index 보다 1 크기 때문에 조정함
    this.state.wordData.splice(wordId - 1, 1);
    this.setState({ wordData: this.state.wordData });
  }

  handleInput = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handleWordCardLength = () => {
    // 단어를 추가, 삭제할 때 마다 wordId 초기화
    _.forEach(this.state.wordData, function (wordObject, index) {
      wordObject.wordId = index + 1;
    });

    this.setState({ wordData: this.state.wordData });
  };

  // 전달인자로 받아서 반영하면 되지 않나??
  addWordData = () => {
    // 더할 때 마다 생성되는 wordId 를 어떻게 만들어야 하나?
    // handleWordid ()
    // 더할때는 추가 뺄때는 감소

    // 맨처음에 data 받을 때도 초기화 시켜줘야 함
    this.state.wordData.push({ word: this.state.currentWord, sentences: [] });
    this.setState({ wordData: this.state.wordData });
  };

  handleSentenceData = (word, sentences, index) => {
    this.state.wordData[index] = {
      word: word,
      sentences: sentences,
    };

    this.setState({ wordData: this.state.wordData });
  };
  componentDidMount() {
    console.log('componentDidMount', this.state);
    this.handleWordCardLength();
  }
  render() {
    console.log('render', this.state);
    const { isLogin, userInfo, wordData, currentWord } = this.state;
    return (
      // route 는 순차적으로 실행된다.
      <div>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              if (isLogin) {
                return <Redirect to="/main" />;
              } else {
                return (
                  <Login
                    isLogin={isLogin}
                    handleLogin={this.handleLogin.bind(this)}
                    handleLogout={this.handleLogout.bind(this)}
                  />
                );
              }
            }}
          />
          <Route exact path="/signup" render={() => <SignUp />} />
          <Route
            exact
            path="/main"
            render={() => (
              <Main
                isLogin={isLogin}
                userInfo={userInfo}
                wordData={wordData}
                currentWord={currentWord}
                handleLogout={this.handleLogout.bind(this)}
                postInputWord={this.postInputWord.bind(this)}
                updateWordData={this.updateWordData.bind(this)}
                deleteWordData={this.deleteWordData.bind(this)}
                handleInput={this.handleInput.bind(this)}
                addWordData={this.addWordData.bind(this)}
                handleSentenceData={this.handleSentenceData.bind(this)}
                handleWordCardLength={this.handleWordCardLength.bind(this)}
              />
            )}
          />
          <Route
            exact
            path="/wordbook"
            render={() => (
              <Wordbook
                userInfo={userInfo}
                wordData={wordData}
                handleLogout={this.handleLogout.bind(this)}
                postInputWord={this.postInputWord.bind(this)}
                updateWordData={this.updateWordData.bind(this)}
                deleteWordData={this.deleteWordData.bind(this)}
                handleSentenceData={this.handleSentenceData.bind(this)}
                updateWordData={this.updateWordData.bind(this)}
                handleWordCardLength={this.handleWordCardLength.bind(this)}
              />
            )}
          />
        </Switch>
      </div>
    );
  }
}
export default App;
