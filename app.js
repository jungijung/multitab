//app.js

const express = require('express');
const app = express();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const N_url = 'http://43.201.97.58:3000/pi';
const start_data={'stat':'start'};
const stop_data ={'stat':'stop'};
const filePath='data.json';

app.get('/pi', (req, res) => {
  // 파일 읽기
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }

    // JSON 파싱 및 응답 전송
    try {
      const jsonData = JSON.parse(data);
      res.json(jsonData);
    } catch (parseError) {
      console.error(parseError);
      res.status(500).send('데이터 처리 오류');
    }
  });
});

// POST 요청에 대한 처리
app.post('/pi', (req, res) => {
  const newData = req.body;

  // 파일 읽기
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).send('서버 오류');
    }

    // JSON 파싱
    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (parseError) {
      console.error(parseError);
      return res.status(500).send('데이터 처리 오류');
    }

    // JSON 값 변경
    jsonData = { ...jsonData, ...newData };

    // 파일 쓰기
    fs.writeFile(filePath, JSON.stringify(jsonData), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error(writeErr);
        return res.status(500).send('서버 오류');
      }

      res.send('데이터가 업데이트되었습니다.');
    });
  });
});


app.get('/keyboard', (req, res) => {
  const data = {'type': 'text'}
  res.json(data);
});

app.post('/message', (req, res) => {
  const question = req.body.userRequest.utterance;
  const goMain = '처음으로';
  let data = {
      'version': '2.0',
      'template': {
            'outputs': [{
              'simpleText': {
                'text': '테스트'
              }
            }],
            'quickReplies': [{
              'label': goMain,
              'action': 'message',
              'messageText': goMain
            }]
      }
    }
  if (question === '테스트') {
     data = {
      'version': '2.0',
      'template': {
	    'outputs': [{
	      'simpleText': {
	        'text': '테스트'
	      }
	    }],
	    'quickReplies': [{
	      'label': goMain,
	      'action': 'message',
	      'messageText': goMain
	    }]
      }
    }
  }
   else if (question==='시작'){
	axios.post(N_url ,start_data)


     data = {
      'version': '2.0',
      'template': {
            'outputs': [{
              'simpleText': {
                'text': '시작을 입력하셨습니다\n멀티탭 전원을 차단합니다.'
              }
            }],
            'quickReplies': [{
              'label': goMain,
              'action': 'message',
              'messageText': goMain
            }]
      }
    }

 }
  else if (question==='정지'){
        axios.post(N_url ,stop_data)


     data = {
      'version': '2.0',
      'template': {
            'outputs': [{
              'simpleText': {
                'text': '정지를 입력 하셨습니다\n멀티탭 전원 차단을 중지합니다.'
              }
            }],
            'quickReplies': [{
              'label': goMain,
              'action': 'message',
              'messageText': goMain
            }]
      }
    }

 }

	console.log(data);
  res.json(data);
});

app.listen(3000, () => console.log('node on 3000'));
