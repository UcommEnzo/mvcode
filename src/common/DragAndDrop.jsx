import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import "./DragAndDrop.css";
import { getCodes } from '../redux/reducers/ActionCreators';
import { useAppDispatch } from '../hooks/redus';

const props = {
  name: 'file',
  multiple: true,
  action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files');
  },
};

const DragDrop = ({ setCodes }) => {

  
  const dispatch = useAppDispatch()

  const beforeUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch(getCodes(e.target.result))
    };
    

    // reader.onload = (e) => {
    //   console.log('file', e)
    //   const stringToArr = e.target.result.split("\r\n")

    //   if(stringToArr[0].length > 17) {
    //     const noDashArr = stringToArr.map(code => code.replace(/[^0-9]/g, ''))
    //     setCodes(noDashArr);
    //   } else {
    //     setCodes(stringToArr);
    //   }
    // };

    reader.readAsText(file);
    return false;
  }

  return (
    <div className='dragdrop_container'>
      < Dragger
        {...props}
        beforeUpload={beforeUpload}
      >
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">Нажать или перетащить файл</p>
      </Dragger >
    </div>
  )
}

export default DragDrop;