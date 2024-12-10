// Reemplazar por la URL de la API
const URL_API = "http://localhost:3000/posts";

export const getPosts = async () => {
  const response = await fetch(URL_API);
  const data = await response.json();
  return data;
};

export const addPost = async (post) => {
  const response = await fetch(URL_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  const data = await response.json();
  return data;
};

// actualización para la eliminación
export const deletePost = async (id) => {
//try {
  const response = await fetch(`${URL_API}/${id}`, {
    method: "DELETE",
  });

  const result = await response.json();
  return result;
};

export const likePost = async (id) => {
  await fetch(`${URL_API}/like/${id}`, {
    method: "PUT",
  });
};
