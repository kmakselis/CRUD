const fetchTodos = async () => {
  const response = await fetch('http://localhost:1337/buckets');
  const todos = await response.json();

  return todos;
};

const createTodo = async ({ title }) => {
  const response = await fetch(
    'http://localhost:1337/buckets',
    {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title,
        completed: false
      })
    }
  );

  const responseData = await response.json();

  return responseData;
};

const updateTodo = async ({ id, ...props }) => {
  const response = await fetch(
    `http://localhost:1337/buckets/${id}`,
    {
      method: 'PATCH',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(props)
    }
  );

  const responseData = await response.json();

  return responseData;
}

const deleteTodo = async (id) => {
  await fetch(`http://localhost:1337/buckets/${id}`, { method: 'DELETE' });
};

const ApiService = {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default ApiService;
