const express = require("express");
const { v4: uuid } = require("uuid");
const app = express();
const repositories = [];

app.use(express.json());

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };
  repositories.push(repository);
  return response.status(201).json(repository).send();
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const updatedRepository = request.body;

  const repository = repositories.find(repository => repository.id === id);
  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }
  
  if(updatedRepository.title) { repository.title = updatedRepository.title };
  if(updatedRepository.url) { repository.url = updatedRepository.url; };
  if(updatedRepository.techs) { repository.techs = updatedRepository.techs; };
  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  repositoryIndex = repositories.findIndex(repository => repository.id === id);
  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repository = repositories.find(repository => repository.id === id);
  if (!repository) {
    return response.status(404).json({ error: "Repository not found" });
  }

  repository.likes = repository.likes+1;
  return response.json(repository);
});

module.exports = app;
