import './App.css';
import { useState } from 'react';

import Form from './components/Form/Form';
import Table from './components/Table/Table';

function App() {
  const [data, setData] = useState([])

  return (
    <div className="App">
     <div className="App-header"><h1>Know Your Countries</h1></div>
     <div className="App-container">
       <Form setData={setData} />
       <Table data={data} />
     </div>
    </div>
  );
}

export default App;
