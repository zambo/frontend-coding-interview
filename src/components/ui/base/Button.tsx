import React from "react";

interface ButtonProps {
  label: string;
}

const ButtonProps: React.FC<ButtonProps> = (props) => {
  return (
    <div>
      <pre className="bg-yellow-50 text-yellow-950 border border-yellow-200 p-8 my-8">
        {JSON.stringify(props, null, 2)}
      </pre>
    </div>
  );
};

export default ButtonProps;
