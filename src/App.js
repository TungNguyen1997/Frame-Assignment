import './App.css';
import { useState } from 'react';
import  TabItemComponent from '../src/TabComponent'
import  Counter from './Counter'
import Table from './Table';
const tabItems = [
  {
    id: 1,
    title: 'Tab 1',
    icon: 'tabitem__icon fas fa-book',
    content: <Counter></Counter>,
  },
  {
    id: 2,
    title: 'Tab 2',
    icon: 'tabitem__icon fas fa-book',
    content: <Table></Table>,
  }
];

function App() {
  const [active, setActive] = useState(0);
  
  return (
    <div className="wrapper">
      <div className="tabs">
        {tabItems.map(({ id, icon, title }) =><TabItemComponent
           key={title}
           icon={icon}
           title={title}
           onItemClicked={() => setActive(id)}
           isActive={active === id}
         />
      )}
      </div>
      <div className="content">
        {tabItems.map(({ id, content }) => 
           active === id ? content : ''
        )}
      </div>
     </div>
  )
}

export default App;
