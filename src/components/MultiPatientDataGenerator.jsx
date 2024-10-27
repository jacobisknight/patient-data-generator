import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';

const generateRandomDate = (start, end) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
};

const generateRandomString = (length = 8) => {
  return Math.random().toString(36).substring(2, length + 2);
};

const firstNames = ["James", "Mary", "John", "Patricia", "Robert"];
const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones"];

const generateUniqueName = () => {
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return { firstName, lastName, fullName: `${firstName} ${lastName}` };
};

const generateCompletePatientData = (patientId, clientName, patientName) => {
  const now = new Date();
  const encounterId = `enc-${generateRandomString()}`;

  return {
    patientRecord: {
      _id: `${clientName}:${patientId}`,
      patientId,
      clientName,
      processingVersion: {
        rawDataVersion: { $numberLong: now.getTime().toString() },
        parsingVersion: { $numberLong: (now.getTime() + 1000).toString() },
        normalizationVersion: { $numberLong: (now.getTime() + 2000).toString() }
      },
      created: { $numberLong: now.getTime().toString() }
    },
    demographics: {
      clientName,
      patientId,
      mrn: generateRandomString(6),
      ssn: `${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
      patientName: {
        firstName: patientName.firstName,
        middleName: String.fromCharCode(65 + Math.floor(Math.random() * 26)),
        lastName: patientName.lastName,
        prefix: ["Mr.", "Mrs.", "Ms."][Math.floor(Math.random() * 3)],
        suffix: ["", "Jr.", "Sr."][Math.floor(Math.random() * 3)]
      },
      dateOfBirth: { $numberLong: generateRandomDate(new Date(1950, 0, 1), new Date(2000, 11, 31)).getTime().toString() },
      gender: ["male", "female"][Math.floor(Math.random() * 2)],
      address: {
        address1: `${Math.floor(Math.random() * 1000)} Main St`,
        city: ["Anytown", "Springfield", "Riverside"][Math.floor(Math.random() * 3)],
        state: ["NY", "CA", "TX"][Math.floor(Math.random() * 3)],
        zip: Math.floor(Math.random() * 90000 + 10000).toString(),
        phone: `555-${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
        email: `${patientName.firstName.toLowerCase()}.${patientName.lastName.toLowerCase()}@example.com`
      }
    },
    allergy: {
      clientName,
      patientId,
      encounterId,
      substance: ["Peanuts", "Penicillin", "Latex"][Math.floor(Math.random() * 3)],
      status: "Active",
      statusRaw: "active",
      note: "Severe allergy",
      codes: [],
      onSetDate: generateRandomDate(new Date(2010, 0, 1), now).toISOString(),
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    document: {
      clientName,
      patientId,
      documentId: `doc-${generateRandomString()}`,
      encounterId,
      documentTitle: "Progress Note",
      documentStatus: "Active",
      documentType: "Report",
      documentSubtype: "Lab",
      manifestation: "Electronic",
      codes: [],
      author: `Dr. ${generateRandomString()}`,
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      },
      created: { $numberLong: generateRandomDate(new Date(2020, 0, 1), now).getTime().toString() }
    },
    familyHistory: {
      clientName,
      patientId,
      description: ["Diabetes", "Heart Disease", "Cancer"][Math.floor(Math.random() * 3)],
      codes: [],
      relationToPatient: ["Father", "Mother", "Sibling"][Math.floor(Math.random() * 3)],
      status: "Active",
      statusRaw: "active",
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      },
      date: { $numberLong: generateRandomDate(new Date(2020, 0, 1), now).getTime().toString() }
    },
    history: {
      clientName,
      patientId,
      description: "Medical History",
      historyType: "Medical",
      codes: [],
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    imageRecord: {
      clientName,
      patientId,
      documentId: `doc-${generateRandomString()}`,
      encounterId,
      documentSubtype: "X-ray",
      codes: [],
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    medication: {
      clientName,
      patientId,
      description: ["Aspirin", "Lisinopril", "Metformin"][Math.floor(Math.random() * 3)],
      status: "Active",
      statusRaw: "active",
      encounterId,
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    order: {
      clientName,
      patientId,
      orderId: `order-${generateRandomString()}`,
      description: "Blood Test",
      status: "Completed",
      encounterId,
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    problem: {
      clientName,
      patientId,
      encounterId,
      text: ["Hypertension", "Diabetes", "Asthma"][Math.floor(Math.random() * 3)],
      status: "Active",
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    result: {
      clientName,
      patientId,
      encounterId,
      description: "Lab Result",
      value: "Normal",
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    vaccine: {
      clientName,
      patientId,
      description: "COVID-19 Vaccine",
      status: "Completed",
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    },
    vitals: {
      clientName,
      patientId,
      encounterId,
      description: "Blood Pressure",
      value: `${Math.floor(Math.random() * 40 + 100)}/${Math.floor(Math.random() * 20 + 70)}`,
      source: {
        sourceName: "EMR",
        sourceId: `emr-${generateRandomString()}`
      }
    }
  };
};

const MultiPatientDataGenerator = () => {
  const [generatedData, setGeneratedData] = useState(null);
  const [selectedDataType, setSelectedDataType] = useState(null);

  const generateAndDownloadData = (type) => {
    const clientName = "synthetic_client";
    const patients = Array(5).fill().map(() => {
      const patientId = generateRandomString(5);
      const patientName = generateUniqueName();
      return generateCompletePatientData(patientId, clientName, patientName);
    });

    let dataToDownload;
    if (type === 'all') {
      // Create separate files for each data type
      const dataTypes = ['patientRecord', 'demographics', 'allergy', 'document', 
                        'familyHistory', 'history', 'imageRecord', 'medication', 
                        'order', 'problem', 'result', 'vaccine', 'vitals'];
      
      dataTypes.forEach(dataType => {
        const typeData = patients.map(patient => patient[dataType]);
        const blob = new Blob([JSON.stringify(typeData, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `synthetic_${dataType}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      });
      dataToDownload = patients;
    } else {
      dataToDownload = patients.map(patient => patient[type]);
      const blob = new Blob([JSON.stringify(dataToDownload, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `synthetic_${type}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    setGeneratedData(dataToDownload);
    setSelectedDataType(type);
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle>Patient Data Generator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['patientRecord', 'demographics', 'allergy', 'document', 
              'familyHistory', 'history', 'imageRecord', 'medication', 
              'order', 'problem', 'result', 'vaccine', 'vitals', 'all'].map(type => (
              <Button
                key={type}
                onClick={() => generateAndDownloadData(type)}
                className="w-full"
              >
                Generate {type === 'all' ? 'All Types' : type}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {generatedData && (
        <Card className="w-full max-w-4xl">
          <CardHeader>
            <CardTitle>Generated {selectedDataType} Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 p-4 rounded-lg overflow-auto max-h-[500px]">
              <pre className="text-sm whitespace-pre-wrap">
                {JSON.stringify(generatedData, null, 2)}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MultiPatientDataGenerator;