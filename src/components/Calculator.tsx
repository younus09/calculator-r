import React, { useState } from "react";
import "../App.css";

interface ButtonProps {
  label: string;
  onClick: (label: string) => void;
  className?: string;
}
const Button: React.FC<ButtonProps> = ({ label, onClick, className = "" }) => (
  <button
    onClick={() => onClick(label)}
    className={`h-16 text-xl font-medium rounded-full transition-all duration-200 active:scale-95 flex items-center justify-center ${className}`}
  >
    {label}
  </button>
);

const Calculator: React.FC = () => {
  // State variables for calculator logic with TS types
  const [currentValue, setCurrentValue] = useState<string>("0");
  const [previousValue, setPreviousValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState<boolean>(false);

  // Perform the actual calculation based on the current operator
  const calculate = (prev: string, current: string, op: string): string => {
    const prevNum = parseFloat(prev);
    const currentNum = parseFloat(current);
    if (isNaN(prevNum) || isNaN(currentNum)) return current;

    switch (op) {
      case "+":
        return (prevNum + currentNum).toString();
      case "-":
        return (prevNum - currentNum).toString();
      case "*":
        return (prevNum * currentNum).toString();
      case "/":
        return currentNum === 0 ? "Error" : (prevNum / currentNum).toString();
      default:
        return current;
    }
  };

  // Handle number button clicks
  const handleDigit = (digit: string): void => {
    if (waitingForNewValue) {
      setCurrentValue(digit);
      setWaitingForNewValue(false);
    } else {
      setCurrentValue(currentValue === "0" ? digit : currentValue + digit);
    }
  };

  // Handle decimal point input
  const handleDecimal = (): void => {
    if (waitingForNewValue) {
      setCurrentValue("0.");
      setWaitingForNewValue(false);
      return;
    }
    if (!currentValue.includes(".")) {
      setCurrentValue(currentValue + ".");
    }
  };

  // Handle operator button clicks (+, -, *, /)
  const handleOperator = (nextOperator: string): void => {
    if (operator && !waitingForNewValue && previousValue !== null) {
      const result = calculate(previousValue, currentValue, operator);
      setCurrentValue(result);
      setPreviousValue(result);
    } else {
      setPreviousValue(currentValue);
    }
    setOperator(nextOperator);
    setWaitingForNewValue(true);
  };

  // Handle equals button
  const handleEqual = (): void => {
    if (!operator || previousValue === null) return;
    const result = calculate(previousValue, currentValue, operator);
    setCurrentValue(result);
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(true);
  };

  // Clear all calculator state
  const handleClear = (): void => {
    setCurrentValue("0");
    setPreviousValue(null);
    setOperator(null);
    setWaitingForNewValue(false);
  };

  // Helper component for reusable buttons

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="w-full max-w-xs bg-gray-900 rounded-[2.5rem] shadow-2xl p-4 flex flex-col gap-4">
        {/* Display Screen */}
        <div className="bg-gray-800 rounded-3xl p-6 h-32 flex flex-col items-end justify-end shadow-inner relative overflow-hidden">
          <div className="text-gray-400 text-sm h-6 mb-1 tracking-wider absolute top-4 right-6">
            {previousValue !== null ? `${previousValue} ${operator || ""}` : ""}
          </div>
          <div
            className="text-white text-5xl font-light tracking-tight truncate w-full text-right"
            style={{ fontSize: currentValue.length > 8 ? "2.5rem" : "3rem" }}
          >
            {currentValue}
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          {/* Row 1 */}
          <Button
            label="C"
            onClick={handleClear}
            className="col-span-3 bg-red-500/10 text-red-500 hover:bg-red-500/20"
          />
          <Button
            label="/"
            onClick={handleOperator}
            className="bg-orange-500 text-white hover:bg-orange-400 shadow-md"
          />

          {/* Row 2 */}
          <Button
            label="7"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="8"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="9"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="*"
            onClick={handleOperator}
            className="bg-orange-500 text-white hover:bg-orange-400 shadow-md"
          />

          {/* Row 3 */}
          <Button
            label="4"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="5"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="6"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="-"
            onClick={handleOperator}
            className="bg-orange-500 text-white hover:bg-orange-400 shadow-md"
          />

          {/* Row 4 */}
          <Button
            label="1"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="2"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="3"
            onClick={handleDigit}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="+"
            onClick={handleOperator}
            className="bg-orange-500 text-white hover:bg-orange-400 shadow-md"
          />

          {/* Row 5 */}
          <Button
            label="0"
            onClick={handleDigit}
            className="col-span-2 bg-gray-800 text-gray-100 hover:bg-gray-700 justify-start pl-8"
          />
          <Button
            label="."
            onClick={handleDecimal}
            className="bg-gray-800 text-gray-100 hover:bg-gray-700"
          />
          <Button
            label="="
            onClick={handleEqual}
            className="bg-orange-500 text-white hover:bg-orange-400 shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default Calculator;
