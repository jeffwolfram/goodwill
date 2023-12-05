import React, { useState } from 'react';
import './App.css';

 
  




const App = () => {
  const employeeList = ["Jeff Wolfram", "Jacob E", "Jacob F", "Justin", "Tundra"];
  const [selectedName, setSelectedName] = useState('');
  const handleSelectChange = (e) => {
    setSelectedName(e.target.value);
    
  };
  const [buttonData, setButtonData] = useState([
    { name: 'Speakers', broken: 0, ready: 0 },
    { name: 'Soundbar', broken: 0, ready: 0 },
    { name: 'TV', broken: 0, ready: 0 },
    { name: 'Computer Monitor', broken: 0, ready: 0 },
    { name: 'Game Console', broken: 0, ready: 0 },
    { name: 'Video Game', broken: 0, ready: 0 },
    { name: 'AV Player', broken: 0, ready: 0 },
    { name: 'IOT', broken: 0, ready: 0 },
  ]);

  const [totalBroken, setTotalBroken] = useState(0);
  const [totalReady, setTotalReady] = useState(0);

  const [isConfirmationOpen, setConfirmationOpen] = useState(false);

  const openConfirmationDialog = () => {
    setConfirmationOpen(true);
  };

  const closeConfirmationDialog = () => {
    setConfirmationOpen(false);
  };

  const handleButtonClick = (index, type) => {
    const updatedData = [...buttonData];
    updatedData[index][type] += 1;
    setButtonData(updatedData);
    if (type === 'broken') {
      setTotalBroken((prevTotal) => prevTotal + 1)
    } else if (type === 'ready') {
      setTotalReady((prevTotal) => prevTotal + 1);
    }
  };

  const handleResetButtonClick = () => {
    openConfirmationDialog(); 
  };

  const handleReset = () => {
    const resetData = buttonData.map((button) => ({ ...button, broken: 0, ready: 0 }));
    setButtonData(resetData);
    setTotalBroken(0);
    setTotalReady(0);
    closeConfirmationDialog(); 
  };

  return (

    <div className="app-container">
      <div className="button-container">
        <h2>Testing</h2>

        <div>
          {selectedName ? (
            <p>Tester: {selectedName}</p>
          ) : (
            <>
              <label>Employee Name:</label>
              <select value={selectedName} onChange={handleSelectChange}>
                <option value="">Employee Name</option>
                {employeeList.map((name, index) => (
                  <option key={index} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </>
          )}
        </div>

        {buttonData.map((button, index) => (
          <div key={index} className="item-container">
            <span className="item-name">{button.name}</span>
            <button
              className="custom-button"
              onClick={() => handleButtonClick(index, 'broken')}
            >
              Broken ({button.broken})
            </button>
            <button
              className="custom-button"
              onClick={() => handleButtonClick(index, 'ready')}
            >
              Ready ({button.ready})
            </button>
          </div>
        ))}
      </div>
      <div className="result-container">
        <h2>Results:</h2>
        <div className="result-list">
          {buttonData.map((button, index) => (
            <div key={index} className="result-item">
              <span>
                {button.name} - Broken: {button.broken}, Ready: {button.ready}
              </span>
            </div>
          ))}
        </div>
        <div className="table">
          <table>
            <tr>
              <th>Broken</th>
              <th>Ready</th>
            </tr>
            <tr>
              <td>{totalBroken}</td>
              <td>{totalReady}</td>
            </tr>
          </table>
          
        </div>

        <button onClick={handleResetButtonClick}>Reset All</button>
        {isConfirmationOpen && (
          <div className="confirmation-dialog">
            <p>Are you sure you want to reset all counts?</p>
            <button onClick={handleReset}>Yes</button>
            <button onClick={closeConfirmationDialog}>No</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
