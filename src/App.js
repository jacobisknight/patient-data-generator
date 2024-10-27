import React from 'react';
import MultiPatientDataGenerator from './components/MultiPatientDataGenerator';

function App() {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Patient Data Generator</h1>
        <MultiPatientDataGenerator />
      </div>
    </div>
  );
}

export default App;