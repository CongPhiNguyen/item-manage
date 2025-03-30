const baseUrl = import.meta.env.VITE_API_ENDPOINT

export const fetchListItem = (page: number, size: number) => {
  return fetch(`${baseUrl}/item?size=${size || 10}&page=${page || 1}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to fetch items');
      }
      return response.json();
    });
}

export const fetchAddItem = (data: any) => {
  return fetch(`${baseUrl}/item`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to add items');
    }
    return response.json();
  });
}


export const fetchDetailItem = (id: string) => {
  return fetch(`${baseUrl}/item/${id}`).then(response => {
    if (!response.ok) {
      throw new Error('Failed to get item detail');
    }
    return response.json();
  });
}

export const fetchDeleteItem = (id: string) => {
  return fetch(`${baseUrl}/item/${id}`, {
    method: 'DELETE'
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to delete item');
    }
    return response.json();
  });
}

export const fetchEditItem = (id: string, data: any) => {
  return fetch(`${baseUrl}/item/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (!response.ok) {
      throw new Error('Failed to edit item');
    }
    return response.json();
  });
}