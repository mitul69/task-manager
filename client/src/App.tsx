import React from 'react';
import './App.css';

import TaskList from 'components/Task/TaskList';

const App: React.FC = () => {
  return (
    <div className="App">
      <TaskList />
    </div>
  );
}

export default App;
