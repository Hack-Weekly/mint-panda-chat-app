import { useEffect } from 'react';
import './App.css';

import { testCall } from './api/firebase';

const App: React.FC = () => {
  useEffect(() => {
    testCall();
  }, []);
  return (
    <div>
      <h1>Main App Page</h1>
    </div>
  );
};

export default App;
