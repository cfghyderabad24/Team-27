import React, { useState } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Bar, Pie, Line } from "react-chartjs-2";
import axios from "axios";
import "../App.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement
);

function StudentAnalysis() {
  const [studentId, setStudentId] = useState("");
  const [showCharts, setShowCharts] = useState(false);
  const [studentDetails, setStudentDetails] = useState(null);
  const [barChartData, setBarChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  const [lineChartData, setLineChartData] = useState(null);

  const handleInputChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleNewClick = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/studentAnalysis/getDetails/${studentId}`);
      const data = response.data;

      setStudentDetails(data.details);

      const barList = data.barList;
      const pieList = data.pieList;

      setBarChartData({
        labels: [
          "emergent",
          "early",
          "progressive",
          "transitional",
          "fluent",
          "advanced",
        ],
        datasets: [
          {
            label: "Books by Level",
            backgroundColor: ["green", "red", "orange", "white", "darkblue", "yellow"],
            data: Object.values(barList),
          },
        ],
      });

      setPieChartData({
        labels: Object.keys(pieList),
        datasets: [
          {
            label: "Books by Genre",
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
            data: Object.values(pieList),
          },
        ],
      });

      const lineResponse = await axios.get(`http://localhost:3000/studentAnalysis/getLine/${studentId}`);
      const lineData = lineResponse.data;
      const lineMonth = Object.keys(lineData);

      setLineChartData({
        labels: lineMonth,
        datasets: [
          {
            label: "Monthly Data",
            data: Object.values(lineData),
            borderColor: "blue",
            backgroundColor: "lightblue",
            fill: false,
          },
        ],
      });

      setShowCharts(true);
    } catch (e) {
      console.log(e);
      alert("server error");
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Container>
        <Row>
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
                <Button className="mt-2" onClick={handleNewClick}>
                  Enter
                </Button>
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
                    <p>
                      <strong>ID:</strong> {studentDetails.studentId}
                    </p>
                    <p>
                      <strong>Name:</strong> {studentDetails.studentName}
                    </p>
                    <p>
                      <strong>Grade:</strong> {studentDetails.grade}
                    </p>
                    <p>
                      <strong>Total Books Checked Out:</strong> {studentDetails.totalBooksCheckedOut}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <div className="student">
              <Row>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Books by Level</Card.Title>
                      {barChartData && <Bar data={barChartData} />}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Books by Genre</Card.Title>
                      {pieChartData && <Pie data={pieChartData} />}
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={4}>
                  <Card>
                    <Card.Body>
                      <Card.Title>Monthly Data</Card.Title>
                      {lineChartData && <Line data={lineChartData} />}
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default StudentAnalysis;
