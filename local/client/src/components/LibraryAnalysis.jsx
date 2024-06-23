// src/ChartComponent.js
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Card, Form } from "react-bootstrap";
import { Bar, Line, Pie } from "react-chartjs-2";
import "../App.css";
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
} from "chart.js";

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

function LibraryAnalysis() {
  const [showCharts, setShowCharts] = useState(false);
  const [libraryDetails, setlibraryDetails] = useState({
    schoolId: "12345",
    schoolName: "SchoolName",
    totalBooksCheckedOutCurrent: "1234",
    totalCheckedOuts: "123",
    totalBooks: "123",
  });
  useEffect(() => {
    setShowCharts(true);
  }, []);

  const barChartData = {
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
        backgroundColor: [
          "green",
          "red",
          "orange",
          "white",
          "darkblue",
          "yellow",
        ],
        data: [12, 19, 3, 5, 2, 3],
      },
    ],
  };

  const lineChartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
      {
        label: "Average Level by Month",
        data: [3, 3.5, 4, 4.2, 4.5, 4.8],
        borderColor: "blue",
        fill: false,
      },
    ],
  };

  const pieChartData = {
    labels: ["Fiction", "Non-Fiction", "Science", "Fantasy"],
    datasets: [
      {
        label: "Books by Genre",
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
        data: [30, 25, 20, 25],
      },
    ],
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Title>School Library Details</Card.Title>
                <p>
                  <strong>ID:</strong> {libraryDetails.schoolId}
                </p>
                <p>
                  <strong>Name:</strong> {libraryDetails.schoolName}
                </p>
                <p>
                  <strong>
                    Total Books Checked Out{" "}
                    {libraryDetails.totalBooksCheckedOutCurrent}
                  </strong>
                </p>
                <p>
                  <strong>Total Books </strong> {libraryDetails.totalBooks}
                </p>
                <p>
                  <strong>Total Checked Out</strong>{" "}
                  {libraryDetails.totalCheckedOuts}
                </p>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {showCharts && (
          <>
            <div className="student">
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
    </>
  );
}

export default LibraryAnalysis;
