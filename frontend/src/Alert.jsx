import React from "react";

export default function Alert({ errors }) {
  return (
    <div>
      {errors.map((error, index) => (
        <div key={index} className="alert alert-danger" role="alert">
          {error}
        </div>
      ))}
    </div>
  );
}
