// src/ChartComponent.js
import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import "../App.css"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

function StudentAnalysis() {
  const [studentId, setStudentId] = useState('');
  const [showCharts, setShowCharts] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleClick = () => {
    if (studentId.trim()) {
      // Mock student details
      const details = {
        studentId: studentId,
        studentName: 'John Doe',
        grade: '5',
        totalBooksCheckedOut: 45
      };
      setStudentDetails(details);
      setShowCharts(true);
    } else {
      alert('Please enter a valid Student ID.');
    }
  };

  const barChartData = {
    labels: ['emergent', 'early', 'progressive', 'transitional', 'fluent', 'advanced'],
    datasets: [
      {
        label: 'Books by Level',
        backgroundColor: ['green', 'red', 'orange', 'white', 'darkblue', 'yellow'],
        data: [12, 19, 3, 5, 2, 3],
      },
    ],
  };

  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        label: 'Average Level by Month',
        data: [3, 3.5, 4, 4.2, 4.5, 4.8],
        borderColor: 'blue',
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ['Fiction', 'Non-Fiction', 'Science', 'Fantasy'],
    datasets: [
      {
        label: 'Books by Genre',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        data: [30, 25, 20, 25],
      },
    ],
  };

  return (
    
    <Container>
      <Row >
        <Col>
          <Card>
            <Card.Body>
              <Card.Title>Enter Student ID</Card.Title>
              <Form.Group controlId="formStudentId">
                <Form.Control
                  type="text"
                  placeholder="Enter Student ID"
                  value={studentId}
                  onChange={handleInputChange}
                />
              </Form.Group>
              <Button className="mt-2" onClick={handleClick}>Enter</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
     
      {showCharts && studentDetails && (
        <>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Card.Title>Student Details</Card.Title>
                  <p><strong>ID:</strong> {studentDetails.studentId}</p>
                  <p><strong>Name:</strong> {studentDetails.studentName}</p>
                  <p><strong>Grade:</strong> {studentDetails.grade}</p>
                  <p><strong>Total Books Checked Out:</strong> {studentDetails.totalBooksCheckedOut}</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className='student'>
          <Row>
            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Books by Level</Card.Title>
                  <Bar data={barChartData} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Average Level by Month</Card.Title>
                  <Line data={lineChartData} />
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card>
                <Card.Body>
                  <Card.Title>Books by Genre</Card.Title>
                  <Pie data={pieChartData} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
          </div>
        </>
      )}
       
    </Container>
   
  );
};

export default StudentAnalysis;
