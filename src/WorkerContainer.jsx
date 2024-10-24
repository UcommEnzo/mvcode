import React, { useEffect, useState } from 'react';
import { CopyOutlined, LoadingOutlined, PauseCircleOutlined } from '@ant-design/icons';
import { Button, Input } from 'antd';
import "./worker.css";
import CodeCard from './common/CodeCard';
import { getCodeFunc } from './worker/worker';



const WorkerContainer = ({
  setCodes,
  codes,
  usedCodes,
  setUsedCodes,
  resCode,
  setResCode,
  onResetCodes,
}) => {

  const [letter, setLetter] = useState('a')
  //const [email, setEmail] = useState('talkin2007%40mail.ru')
  const [email, setEmail] = useState('nik29091%40yandex.ru')
  const [letterError, setLetterError] = useState("")
  const [threads, setThreads] = useState(2)
  const [inWork, setInWork] = useState(false)

  //window.navigator.hardwareConcurrency


  const onChangeLetter = (e) => {
    const stringRGEX = /[a-zA-Z]/
    if (stringRGEX.test(e.target.value)) {
      setLetterError('')
      setLetter(e.target.value.toLowerCase())
    } else {
      setLetterError('error')
    }
  }

  const onChangeEmail = (e) => {
    if (!e.target.value.length) {
      setEmail('nik29091%40yandex.ru')
    } else {
      setEmail(e.target.value.replace('@', '%40'))
    }
  }

  const onChangeThreads = (e) => {
    if (!e.target.value.length) {
      setThreads(4)
    } else {
      setThreads(+e.target.value)
    }
  }


  const onStart = () => {

    // const prepCodesForThreads = () => {
    //   const mutableCodes = [...codes]
    //   const codesArr = mutableCodes.slice(0, threads)
    //   codesForThread = [...codesArr]
    //   setUsedCodes([...usedCodes, ...codesArr])
    //   mutableCodes.splice(0, threads)
    //   setCodes(mutableCodes)
    // }

    // async function requstCodesCycle() {

    //   if (codes.length) {
    //     // prepCodesForThreads()
    //     const mutableCodes = [...codes]
    //     const codesArr = mutableCodes.slice(0, threads)
    //     setUsedCodes([...usedCodes, ...codesArr])
    //     mutableCodes.splice(0, threads)
    //     setCodes(mutableCodes)

    //       console.log('Start part!', codesArr);
    //       const promises = codesArr.map((code) => {
    //         return getCodeFunc(code, email, letter)
    //       })
    //       const threadsResCodes = []
    //       const responce = await Promise.all(promises)
    //       responce.forEach((e) => {
    //         const startIdx = e.data.indexOf('<span>Код активации</span>:', 1000)
    //         const code = e.data.slice(startIdx + 34, startIdx + 44)
    //         if (code.slice(-2) == '</') {
    //           threadsResCodes.push(code.slice(0, -2))
    //         } else {
    //           threadsResCodes.push(code)
    //         }
    //       })
    //       setResCode([...resCode, ...threadsResCodes])
    //       console.log('Done part!');
          
    //   } else return
    // }

    async function* asyncGenerator() {
      let i = 0
      const requredIteration = Math.ceil(codes.length / threads)
      while (requredIteration !== i) {
        const start = i * threads
        const end = start + threads
        const codesArr = codes.slice(start, end)
        const nextCodes = codes.slice(end, codes.length) || []
        setCodes(nextCodes)
        //console.log('--mutableCodes2--', qwe)
        setUsedCodes([...usedCodes, ...codesArr])
        //console.log('Start part!', codesArr);
        ++i
        requredIteration !== i ? setInWork(true) : setInWork(false)
        const promises = codesArr.map((code) => {
          return getCodeFunc(code, email, letter)
        })
        yield promises
      }
    }
    
    (async function () {
      for await (let promises of asyncGenerator()) {
        const threadsResCodes = []
          const responce = await Promise.all(promises)
          responce.forEach((e) => {
            const reqCodeStartIdx = e.request.responseURL.indexOf('card=', 0) + 5
            const reqCode = e.request.responseURL.slice(reqCodeStartIdx, reqCodeStartIdx + 17)
            const startIdx = e.data.indexOf('<span>Код активации</span>:', 1000)
            const resCode = e.data.slice(startIdx + 34, startIdx + 44)
            if (resCode.slice(-2) == '</') {
              threadsResCodes.push({reqCode, resCode: resCode.slice(0, -2)})
            } else {
              threadsResCodes.push({reqCode, resCode})
            }
          })
          setResCode(threadsResCodes)
          console.log('Done part!');
      }
    })();

    // for (let i = 0; i <= threads; i++) {
    //   const mutableCodes = [...codes]
    //   codeForThread.push(mutableCodes.shift())
    //   setCodes(mutableCodes)
    //   console.log(mutableCodes.length)
    // }

    //requstCodesCycle()
  }

  //const worker = async (code) => {
  // const worker = (code) => {
  //   if (window.Worker) {
  //     const myWorker = new Worker(new URL("./worker/worker.js", import.meta.url), { type: "module" });
  //     const api = wrap(myWorker);
  //     const qwew = api.someMethod(code)
  //     console.log('qwew-----', qwew)
  //     return qwew
  //     // myWorker.postMessage(code);
  //     // console.log('Message posted to worker');

  //     // myWorker.onmessage = function (e) {
  //     //   console.log('Message received from worker', e);
  //     //   return e
  //     // }
  //   } else {
  //     console.log('Your browser doesn\'t support web workers.');
  //   }
  // }



  const copyText = async () => {
    try {
      const mappedArr = resCode.map((code) => code.reqCode +' '+ code.resCode + "\r\n")
      const arrToString = mappedArr.toString().replace(/[.,]/g, '')
      await window.navigator.clipboard.writeText(arrToString)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='workerContainer'>
      <div className='workerHeader'>
        <div className='deleteButton'>
          <Button
            type="primary"
            block
            onClick={onResetCodes}
          >
            Удалить коды
          </Button>
        </div>
      </div>
      <div className='workerBody'>
        <div className='bodyLeft'>
          <div className=''>
            <h3>Осталось: {codes.length}</h3>
            <CodeCard codes={codes} />
          </div>
        </div>
        <div className='bodyCenter'>
          <div className='codesBlock'>
            <div className=''>
              <h3>Получено: {resCode.length}</h3>
              <CodeCard
                middle
                codes={resCode}
              />
            </div>
          </div>
          <div className='buttonBlock'>
            <Button
              type="primary"
              icon={<CopyOutlined />}
              onClick={copyText}
              style={{ marginTop: '6px' }}
            >
              Скопировать
            </Button>
            <Button
              type="dashed"
              size='large'
              onClick={onStart}
              style={{ marginTop: '10px', height: '60px', width: '120px' }}
            >
              Старт
            </Button>
            <div
              style={{ marginTop: '10px'}}
            >
              Статус: {inWork 
                ? <LoadingOutlined style={{color: 'green'}}/>
                : <PauseCircleOutlined style={{color: 'red'}}/>
              }
            </div>
          </div>
        </div>
        <div className='bodyRight'>
          <div className=''>
            <h3>отработаны: {usedCodes.length}</h3>
            <CodeCard codes={usedCodes} />
          </div>
        </div>
      </div>
      <div className='workerFooter'>

        <div className='letterInput'>
          <Input
            placeholder="Reseller: default = a (a-z)"
            variant="filled"
            status={letterError}
            maxLength={1}
            onChange={onChangeLetter}
          />
        </div>

        <div className='emailInput'>
          <Input
            placeholder={`email, @ => %40`}
            variant="filled"
            onChange={onChangeEmail}
            type='email'
          />
        </div>

        <div className='threadInput'>
          <Input
            placeholder={`потоков: default ${threads}`}
            variant="filled"
            maxLength={1}
            onChange={onChangeThreads}
            type='number'
          />
        </div>
      </div>
    </div>
  )
}

export default WorkerContainer