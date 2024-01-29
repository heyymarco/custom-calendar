import React from 'react';
import './App.css';
import { CustomCalendar } from './components/CustomCalendar';

function App() {
    return (
        <div className="App">
            <CustomCalendar
                from={new Date('2024-01-01')}
                to={new Date('2026-12-31')}
                data={[
                    { from: new Date('2024-01-01'), to: new Date('2024-07-15'), name: 'Utkarsh FD 1' },
                    { from: new Date('2024-01-01'), to: new Date('2025-04-30'), name: 'Shriram FD Plan 2' },
                    { from: new Date('2024-05-01'), to: new Date('2025-04-15'), name: 'Bajaj Fanserv FD 1' },
                    { from: new Date('2024-06-01'), to: new Date('2026-06-15'), name: 'Mahindra FD Plan 2' },
                ]}
            />
        </div>
    );
}

export default App;
