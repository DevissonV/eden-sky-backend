import cors from 'cors';
import express from 'express';

export const applyMiddlewares = (app) => {
  app.use(cors());
  app.use(express.json());
};
