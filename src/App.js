import logo from "./logo.svg";
import "./App.css";
import AAA from "./AAA";
import BBB from "./BBB";
import { useState, useEffect, useRef } from "react";
// import * as Sentry from "@sentry/react";
import {getFunc} from './TestImport'
import {cheapSetFunc} from './TestRequire'
import {cheapModuleSetFunc} from './TestRequireModule'
function App() {
  const [devices, setDevices] = useState([]);
  const [mics, setMic] = useState([]);
  const AAAHandler = useRef();
  console.log("test env is ", process.env.REACT_APP_API_SERVER);
  const [array, setArray] = useState([
    { name: "1", status: true },
    { name: "2", status: true },
  ]);

  const eventHandler = useRef(null);
  const testA = () => {
    console.log("testA");
  };
  const testB = () => {
    console.log("testB");
  };

  function create() {
    let a = 100;
    return function () {
      console.log("aaa ", a);
    };
  }

  function createCache() {
    let data = {}; //闭包中的数据，被隐藏，不被外界访问
    return {
      set(val, key) {
        data[val] = key;
      },
      get(key) {
        console.log(" createCache ", data);
        return data[key];
      },
    };
  }

  useEffect(() => {
    // eventHandler[1001] = testA
    // eventHandler[1002] = testB
    // let fn = create();
    // let a = 200;
    // fn();
    let exArray = Array.of(2,3,3,3,4,5)
    console.log('exArray is ', exArray)
    console.log('getfunc ', getFunc())
    console.log('setfunc ', cheapSetFunc())
    console.log('setfunc ', cheapModuleSetFunc())
    console.log('getfunc ', getFunc())
    // exArray.splice(0,0,101)
    // console.log('exArray is ', exArray)
    // exArray.splice(exArray.length-1,1)
    // console.log('exArray is ', exArray)
    // console.log('[1, 2, [3, 4]].flat() is ',[1, 2, [3, [4,5]]].flat(2))
    // console.log(' import ', bbb)
    // console.log(' import ', aaa)
    // let bxArray = exArray.slice(0,2)
    // console.log('bxArray is ', bxArray)
    // console.log('exArray is ', exArray)
    // bxArray[0] = 101
    // console.log('bxArray is 111 ', bxArray)
    // console.log('exArray is 222 ', exArray)
    // console.log(' judgement array  Object.prototype.toString.call(arg) ', Object.prototype.toString.call(exArray))
    // console.log(' Array of ', Array.of(1,2,3))
    // console.log(' Array of string ', Array.of('123'))
    // console.log(' Array of number ', Array.of(7))
    // let a = [1,2,3]
    // let b = [...a]
    // console.log('b is ', b)
    // b[1] = 101
    // console.log('a is ', a)
    // console.log('b is ', b)

    // const obj = {
    //   name: "New_Name",
    //   greet: function () {
    //     console.log(this);
    //     //{name: "New_Name", greet: ƒ}
    //     //  setTimeout(function () {
    //     //    console.log(this);
    //     //    //Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …}
    //     //  });
    //     setTimeout(() => {
    //       console.log(this);
    //     });
    //   },
    // };
    // obj.greet();

    // let c = createCache();
    // c.set("a", 101);
    // console.log(c.get("a"));
  }, []);
  const addsomething = () => {
    console.log(" ref handler test ", AAAHandler);
    let c = createCache();
    console.log(c.get("a"));
    // AAAHandler.current.activefocus();
  };

  const grabDeviceList = () => {
    let videoArr = [];
    let audioArr = []
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        console.log(devices)
        devices.forEach(function (device) {
          if (device.kind == "videoinput") {
            videoArr.push({
              label: device.label,
              id: device.deviceId,
            });
          } else if (device.kind == "audioinput"){
            audioArr.push({
              label: device.label,
              id: device.deviceId,
            });
          }
        });
        setDevices(videoArr);
        setMic(audioArr)
        return videoArr;
      })
      .catch(function (err) {
        // layer.msg(err.name + ": " + err.message);
        console.log(err.name + ": " + err.message);
      });
    console.log(" videoArr is ", videoArr);
    return videoArr;
  };

  const grabDeviceStream = (deviceId) => {
    const videoConstraints = {};
    videoConstraints.deviceId = { exact: deviceId };
    var constraints = {
      video: videoConstraints,
    };

    const video = document.getElementById("video");
    if (video) {
      console.log("get element video ok");
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        video.srcObject = stream;
        video.play();
      });
    } else {
      console.log("get element video failed");
    }

    // debugger
    // window.Sentry.captureMessage('Something went wrong');
    // window.RSentry.captureMessage()
    // eventHandler[1002]()
    // array.map(item => {
    //   if(item.name === '1'){
    //     item.status = false
    //   }
    // })
    // console.log(' array is ',array)
    // setArray([].concat(array))
  };

  const grabAudioStream = (deviceId) => {
    const videoConstraints = {};
    videoConstraints.deviceId = { exact: deviceId };
    var constraints = {
      audio: videoConstraints,
    };

    const video = document.getElementById("audio");
    const context = new AudioContext()
    if (video) {
      console.log("get element video ok");
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        console.log(' getVoiceSize sum is 111 ')
        video.srcObject = stream;
        video.play();

        const source = context.createMediaStreamSource(stream)
        const analyser = context.createAnalyser()
        source.connect(analyser)
        analyser.fftSize = 32
        let onePick = () => {
          var array = new Uint8Array(analyser.frequencyBinCount);
          analyser.getByteFrequencyData(array); // 将当前的频率数据传入array
          console.log(array);
          requestAnimationFrame(onePick)
         } // 采样函数
         
         
        requestAnimationFrame(onePick) // 开始执行采样
        // let sum = getVoiceSize(analyser)
        // console.log(' getVoiceSize sum is ', sum)
      });
    } else {
      console.log("get element video failed");
    }
  };

  const getVoiceSize  = (analyser) => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(dataArray)
    const data = dataArray.slice(100, 1000)
    const sum = data.reduce((a, b) => a + b)
    return sum
  }

  const clickDevice = (item) => {
    //item.id
    console.log("clickDevice item ", item);
    grabDeviceStream(item.id);
  };

  const clickMices = (item) => {
    grabAudioStream(item.id)
  }

  return (
    <div className="App">
      <div onClick={addsomething}>点我报错</div>
      {/* <div onClick={changesomething}>点我改变</div> */}
      <div>-=================================-</div>
      <div onClick={grabDeviceList}>拉取设备列表</div>
      <div>-=================================-</div>
      <div onClick={grabDeviceStream}>拉取摄像头</div>
      <AAA fref={AAAHandler} />
      {/* <BBB/> */}

      <video id="video" style={{ width: "100px", height: "100px" }} />

      <video id="audio" style={{ width: "100px", height: "100px" }} />

      {/* {array.map((item) => {
        return item.status ? (
          <div style={{ color: "blue" }}>{item.name}</div>
        ) : (
          <div style={{ color: "red" }}>{item.name}</div>
        );
      })} */}
      <div> 摄像头设备 </div>
      {devices.map((item) => {
        return <div onClick={() => clickDevice(item)}>{item.id}</div>;
      })}

      <div>麦克风设备</div>
      {mics.map((item) => {
        return <div onClick={() => clickMices(item)}>{item.id}</div>;
      })}

      <div className="testBase">
        {/* <div className="baseA"/> */}
        <div className="baseB" />
      </div>
    </div>
  );
}

export default App;
