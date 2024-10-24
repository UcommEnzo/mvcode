import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";
import DragDrop from "./common/DragAndDrop";
import WorkerContainer from "./WorkerContainer";
import { useAppDispatch, useAppSelector } from "./hooks/redus";
import { resetAllCodes, setCodes, setResCodes, setUsedCodes } from "./redux/reducers/ActionCreators";

function App() {

  const {fetchingCodes, getCodesError, codes} = useAppSelector(state => state.CodesReducer)
  const {fetchingResCodes, getResCodesError, resCodes} = useAppSelector(state => state.CodesReducer)
  const {fetchingUsedCodes, getUsedCodesError, usedCodes} = useAppSelector(state => state.CodesReducer)

  const dispatch = useAppDispatch()
  const editCodes = (codes) => dispatch(setCodes(codes))
  const addResCode = (codes) => dispatch(setResCodes(codes))
  const addUsedCode = (codes) => dispatch(setUsedCodes(codes))
  const onResetCodes = () => dispatch(resetAllCodes())


  return (
    <div className="container">
      {codes.length || resCodes.length || usedCodes.length
        ? <WorkerContainer
            setCodes={editCodes}
            codes={codes}
            usedCodes={usedCodes}
            setUsedCodes={addUsedCode}
            resCode={resCodes}
            setResCode={addResCode}
            onResetCodes={onResetCodes}
          />
        : <DragDrop />
      }
    </div>
  )
}

export default App;
