const { request, response } = require("express");
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const allTodos = [{ nome: "create", status: false }];
const todoRoutes = express.Router();

// Create

todoRoutes.post("/todos", async (request, response) => {
  const data = request.body;
  console.log(data);
  const todo = await prisma.todo.create({ data });

  return response.status(201).json(todo);
});

// Read

todoRoutes.get("/todos", async (request, response) => {
  const allData = await prisma.todo.findMany();
  return response.status(200).json(allData);
});

// Update

todoRoutes.put("/todos", async (request, response) => {
  const { name, id, status } = request.body;

  if (!id) {
    return response.status(400).json({ message: "Id não informado" });
  }

  const todoAlreadyExist = await prisma.todo.findUnique({ where: { id } });

  if (!todoAlreadyExist) {
    return response.status(404).json({ message: "Todo not exist" });
  }

  const todo = await prisma.todo.update({
    where: {
      id,
    },
    data: {
      name,
      status,
    },
  });

  return response.status(200).json(todo);
});

////////////////////////////////////////////////Delete

todoRoutes.delete("/todos/:id", async (request, response) => {
  const { id } = request.params;

  const intId = parseInt(id);

  if (!intId) {
    return response.status(400).json({ message: "Id não informado" });
  }

  const todoAlreadyExist = await prisma.todo.findUnique({
    where: { id: intId },
  });

  if (!todoAlreadyExist) {
    return response.status(404).json({ message: "Todo not exist" });
  }

  await prisma.todo.delete({ where: { id: intId } });

  return response.status(200).send;
});

module.exports = todoRoutes;
