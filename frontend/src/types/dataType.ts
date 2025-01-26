import React from "react";

export interface DataType {
  key?: React.Key;
  name: string;
  _id: string;
  description: string;
  price: number;
  category: string;
  countInStock: number;
  actions?: React.ReactNode;
}
