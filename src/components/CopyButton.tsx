import React, { useState } from "react";

interface CopyButtonProps {
  value: string;
  className?: string;
  label?: string;
}

const CopyButton: React.FC<CopyButtonProps> = ({
  value,
  className = "",
  label = "Copy",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`relative rounded-lg px-4 py-2 text-xs font-semibold transition
                  bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2
                  focus:ring-blue-400 focus:ring-offset-2 ${className}`}
    >
      {copied ? "Copied!" : label}
    </button>
  );
};

export default CopyButton; 