import logo from "./logo.svg";
import "./App.css";
import AAA from "./AAA";
import BBB from "./BBB";
import { useState, useEffect, useRef } from "react";
// import * as Sentry from "@sentry/react";

function App() {
  const [devices, setDevices] = useState([]);
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
        console.log(' createCache ', data)
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

    const obj = {
      name: 'New_Name',
      greet: function () {
       console.log(this); 
       //{name: "New_Name", greet: ƒ}  
      //  setTimeout(function () {
      //    console.log(this);
      //    //Window {parent: Window, opener: null, top: Window, length: 0, frames: Window, …} 
      //  });
      setTimeout(() => {
        console.log(this) 
      });
      }    
     }
     obj.greet();

    let c = createCache();
    c.set("a", 101);
    console.log(c.get("a"));
  }, []);
  const addsomething = () => {
    console.log(" ref handler test ", AAAHandler);
    let c = createCache();
    console.log(c.get("a"));
    // AAAHandler.current.activefocus();
  };

  const grabDeviceList = () => {
    let videoArr = [];
    navigator.mediaDevices
      .enumerateDevices()
      .then(function (devices) {
        // console.log(devices)
        devices.forEach(function (device) {
          if (device.kind == "videoinput") {
            videoArr.push({
              label: device.label,
              id: device.deviceId,
            });
          }
        });
        setDevices(videoArr);
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
    // const constrains = {
    //   video: true,
    //   audio: true
    //  }
    // navigator.mediaDevices.getUserMedia(constrains)
    //  .then(stream => {
    //   console.log('得到stream的类型是MediaStream')
    //  })

    // const video = document.createElement("video");
    //document.body.appendChild(video)
    const videoConstraints = {};
    videoConstraints.deviceId = { exact: deviceId };
    var constraints = {
      video: videoConstraints,
    };

    const video = document.getElementById("video");
    if (video) {
      console.log("get element video ok");
      // const constrains = {
      //   video: true,
      //   audio: true,
      // };
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

  const clickDevice = (item) => {
    //item.id
    console.log("clickDevice item ", item);
    grabDeviceStream(item.id);
  };

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

      {/* {array.map((item) => {
        return item.status ? (
          <div style={{ color: "blue" }}>{item.name}</div>
        ) : (
          <div style={{ color: "red" }}>{item.name}</div>
        );
      })} */}
      {devices.map((item) => {
        return <div onClick={() => clickDevice(item)}>{item.id}</div>;
      })}

      <div className="testBase">
        {/* <div className="baseA"/> */}
        <div className="baseB"/>
      </div>
    </div>
  );
}

export default App;
