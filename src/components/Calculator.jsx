import React, { useState } from "react";
import axios from "axios";

const Calculator = () => {
    const [num1, setNum1] = useState("");
    const [num2, setNum2] = useState("");
    const [operation, setOperation] = useState("add");
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleCalculate = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get("https://cicd-1-arun-bhoo27huwq-uc.a.run.app/calculate", {
                params: { operation, num1: parseFloat(num1), num2: parseFloat(num2) }
            });
            setResult(response.data.result);
            setError(null);
        } catch (err) {
            setResult(null);
            setError(err.response ? err.response.data.detail : "Error connecting to the server");
        }
    };

    return (
        <div className="max-w-6xl mx-auto p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">FastAPI Calculator</h2>
            <form onSubmit={handleCalculate} className="space-y-6">
                <div>
                    <label className="block text-base font-medium text-gray-700">Number 1:</label>
                    <input
                        type="number"
                        value={num1}
                        onChange={(e) => setNum1(e.target.value)}
                        required
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md text-lg"
                    />
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700">Operation:</label>
                    <select
                        value={operation}
                        onChange={(e) => setOperation(e.target.value)}
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md text-lg"
                    >
                        <option value="add">Add</option>
                        <option value="subtract">Subtract</option>
                        <option value="multiply">Multiply</option>
                        <option value="divide">Divide</option>
                    </select>
                </div>
                <div>
                    <label className="block text-base font-medium text-gray-700">Number 2:</label>
                    <input
                        type="number"
                        value={num2}
                        onChange={(e) => setNum2(e.target.value)}
                        required
                        className="mt-2 block w-full p-3 border border-gray-300 rounded-md text-lg"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-lg"
                >
                    Calculate
                </button>
            </form>
            {result !== null && (
                <h3 className="mt-6 text-2xl font-semibold text-center">Result: {result}</h3>
            )}
            {error && (
                <h3 className="mt-6 text-red-600 text-center">Error: {error}</h3>
            )}
        </div>
    );
};

export default Calculator;
