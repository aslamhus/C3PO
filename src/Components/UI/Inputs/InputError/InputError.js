import React from "react";

export default function InputError({ error }) {
  if (error) {
    return <div className="input-error">{error}</div>;
  }
}
