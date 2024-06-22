import React, { useState } from "react";
import {
    BarChart,
    Bar,
    PieChart,
    Pie,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Cell,
} from "recharts";
import Navbar from "./Navbar";

const Analytics = () => {
    const [showCharts, setShowCharts] = useState(false);
    const [libraryId, setLibraryId] = useState("");

    // Hardcoded data
    const data = {
        library_id: "12345",
        book_frequency: {
            "Book A": 5,
            "Book B": 3,
            "Book C": 7,
            "Book D": 2,
            "Book E": 6,
        },
        genre_data: [
            { genre: "Horror", percentage: 20 },
            { genre: "Fantasy", percentage: 25 },
            { genre: "Science Fiction", percentage: 15 },
            { genre: "Romance", percentage: 10 },
            { genre: "Mystery", percentage: 20 },
            { genre: "Non-Fiction", percentage: 10 },
        ],
        reading_levels: [
            { level: "Emergent", value: 10, color: "#008000" }, // Green
            { level: "Early", value: 15, color: "#FF0000" }, // Red
            { level: "Progressive", value: 12, color: "#FFA500" }, // Orange
            { level: "Transitional", value: 8, color: "#FFFFFF" }, // White
            { level: "Fluent", value: 20, color: "#0000FF" }, // Blue
            { level: "Advanced", value: 5, color: "#FFFF00" }, // Yellow
        ],
    };

    const bookFrequencyData = Object.entries(data.book_frequency).map(
        ([book, frequency]) => ({ name: book, frequency })
    );
    const genreData = data.genre_data.map((genreObj) => ({
        name: genreObj.genre,
        value: genreObj.percentage,
    }));
    const readingLevelsData = data.reading_levels.map((levelObj) => ({
        name: levelObj.level,
        value: levelObj.value,
        color: levelObj.color,
    }));

    const handleShowCharts = () => {
        setShowCharts(true);
    };

    const handleDummyData = () => {
        // Generate dummy data (you can replace with actual API call logic)
        setLibraryId("12345");
        setShowCharts(true);
    };

    return (
        <div
            style={{
                backgroundColor: "#f0f0f0",
                minHeight: "100vh",
                padding: "20px",
            }}
        >
            <Navbar />

            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    textAlign: "center",
                }}
            >
                <h1>Analytics for Library ID: {libraryId}</h1>

                <div style={{ marginBottom: "20px" }}>
                    <input
                        type="text"
                        placeholder="Enter Library ID"
                        value={libraryId}
                        onChange={(e) => setLibraryId(e.target.value)}
                        style={{ marginRight: "10px" }}
                    />
                    <button onClick={handleDummyData}>Load Data</button>
                </div>

                {showCharts && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        {/* Book Frequency Bar Chart */}
                        <ResponsiveContainer
                            width="30%"
                            height={300}
                            style={{ marginRight: "20px" }}
                        >
                            <BarChart data={bookFrequencyData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="frequency" fill="#8884d8" />
                            </BarChart>
                        </ResponsiveContainer>

                        {/* Genre Pie Chart */}
                        <ResponsiveContainer
                            width="30%"
                            height={300}
                            style={{ marginRight: "20px" }}
                        >
                            <PieChart>
                                <Pie
                                    data={genreData}
                                    dataKey="value"
                                    nameKey="name"
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    label
                                >
                                    {genreData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={`#${Math.floor(
                                                Math.random() * 16777215
                                            ).toString(16)}`}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>

                        {/* Reading Levels Bar Chart */}
                        <ResponsiveContainer width="30%" height={300}>
                            <BarChart data={readingLevelsData}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="value" fill="#82ca9d">
                                    {readingLevelsData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}
                                        />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Analytics;
