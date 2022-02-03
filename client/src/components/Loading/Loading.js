import React from "react";

import "./Loading.css";

const Loading = () => {
    return (
        <div className="loading">
            <div className="boxes">
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <div className="box">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <h1 className="loading-text">Loading data</h1>
        </div>
    );
};

export default Loading;
