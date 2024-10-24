import React from 'react';
import { Divider, List } from 'antd';
import VirtualList from 'rc-virtual-list';


const CodeCard = ({ codes, middle }) => {

  const ContainerHeight = middle ? 220 : 356;

  return (middle
    ? <List>
      <VirtualList
        data={codes}
        height={ContainerHeight}
        itemHeight={20}
      >
        {(item) => <List.Item
          key={item}
          style={{marginLeft: '20px', marginRight: '20px'}}
        >{
          <><span>{item.reqCode}</span><span>{item.resCode}</span></>
        }</List.Item>}
      </VirtualList>
    </List>
    : <List>
      <VirtualList
        data={codes}
        height={ContainerHeight}
        itemHeight={20}
      //itemKey="email"
      //onScroll={onScroll}
      >
        {(item, idx) => (
          <List.Item key={item || idx}>
            <List.Item.Meta
            //title={<a href="https://ant.design">{item}</a>}
            //description={middle ? item.reqCode : item}
            />
            {middle ? <>{item.reqCode} {item.resCode}</> : item}
          </List.Item>
        )}
      </VirtualList>
    </List>
  )
}

export default React.memo(CodeCard)