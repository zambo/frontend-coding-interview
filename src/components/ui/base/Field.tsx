import React from "react";

interface FieldProps {
  label: string;
}

const Field: React.FC<FieldProps> = (props) => {
  return (
    <div>
      <pre className="bg-yellow-50 text-yellow-950 border border-yellow-200 p-8 my-8">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default Field;
