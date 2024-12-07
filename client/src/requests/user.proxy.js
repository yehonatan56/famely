export const saveUser = async (user) => {
  const response = await fetch(`http://localhost:3009/famelys/${user._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  });
  return response.json();
}