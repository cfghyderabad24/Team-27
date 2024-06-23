import React from "react";
import {
    HorizontalBarSeries,
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    ChartLabel,
    RadialChart,
} from "react-vis";
import "../Styles/Analytics.css";

const AnalyticsPage = () => {
    // Dummy data (replace with fetched data from backend later)
    const barData = [
        { x: 10, y: "Book A" },
        { x: 20, y: "Book B" },
        { x: 15, y: "Book C" },
        { x: 5, y: "Book D" },
        { x: 8, y: "Book E" },
    ];

    const pieData = [
        { angle: 30, label: "Fiction" },
        { angle: 10, label: "Non-Fiction" },
        { angle: 20, label: "Science" },
        { angle: 15, label: "History" },
        { angle: 25, label: "Biography" },
    ];

    return (
        <div className="analytics-container">
            <div className="box">
                <h2 className="chart-title">Book Name vs Frequency</h2>
                <div className="chart-container">
                    <XYPlot
                        width={600}
                        height={400}
                        margin={{ left: 100 }}
                        yType="ordinal"
                    >
                        <VerticalGridLines />
                        <HorizontalGridLines />
                        <XAxis />
                        <YAxis />
                        <HorizontalBarSeries
                            data={barData.map((d, i) => ({ x: d.x, y: i + 1 }))}
                        />
                        {barData.map((d, i) => (
                            <ChartLabel
                                key={i}
                                text={d.y}
                                x={-90}
                                y={(i + 1) * 60}
                                style={{ textAnchor: "middle" }}
                            />
                        ))}
                        <ChartLabel
                            text="Frequency"
                            className="alt-x-label"
                            includeMargin={false}
                            xPercent={0.5}
                            yPercent={1.06}
                            style={{
                                textAnchor: "middle",
                            }}
                        />
                    </XYPlot>
                </div>
            </div>
            <div className="box">
                <h2 className="chart-title">Popular Genres</h2>
                <div className="chart-container">
                    <RadialChart
                        data={pieData}
                        width={300}
                        height={300}
                        showLabels={true}
                    />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsPage;
