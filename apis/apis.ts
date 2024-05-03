import { TaskType, TaskSubmtionType } from "@/types/tasks-type";

const baseUrl = "http://localhost:3005";
export const usersEndPoint = "users";
export const tasksEndPoint = "tasks";

// const socketUrl = "ws://localhost:3006";
// const mySocket = new WebSocket(socketUrl);

// ------------------ //

export const get = async (endpoint: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/${endpoint}`);
  const data = await res.json();
  return data;
};

export const getById = async (endpoint: string, id: string): Promise<any> => {
  const res = await fetch(`${baseUrl}/${endpoint}/${id}`);
  const data = await res.json();
  return data;
};

export const getWhere = async (
  endpoint: string,
  value: string
): Promise<any> => {
  const res = await fetch(`${baseUrl}/${endpoint}?${value}`);
  const data = await res.json();
  return data;
};

export const getWhereKeyEqValue = async (
  endpoint: string,
  key: string,
  value: string
): Promise<any> => {
  const res = await fetch(`${baseUrl}/${endpoint}?${key}=${value}`);
  const data = await res.json();
  return data;
};
export const getWhereKeyNotEqValue = async (
  endpoint: string,
  key: string,
  value: string
): Promise<any> => {
  try {
    const res = await fetch(`${baseUrl}/${endpoint}?${key}_ne=${value}`, {
      mode: "cors",
    });

    if (!res.ok) {
      // If the response is not ok (status code other than 2xx), throw an error
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const post = async (endpoint: string, body: any): Promise<any> => {
  const res = await fetch(`${baseUrl}/${endpoint}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

export const patch = async (
  endpoint: string,
  id: string,
  body: any
): Promise<any> => {
  const res = await fetch(`${baseUrl}/${endpoint}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return data;
};

// ------------------ //

// export async function readAllTasksFromSocketServer(): Promise<any[] | TaskType[]> {
//   const message: any[] | TaskType[] = [];
//   return new Promise<any[] | TaskType[]>((resolve) => {
//     mySocket.onopen = async (ev) => {
//       console.log('Socket opened: ', ev);
//       mySocket.send(JSON.stringify({ type: 'read', path: tasksEndPoint }));
//       mySocket.onmessage = async (m) => {
//         console.log('Tasks: ', JSON.parse(m.data)['data']);
//         message.push(...(await JSON.parse(m.data)['data']));
//         resolve(message);
//       };
//     };
//   });
// }

// export async function readAllTasksFromSocketServer(): Promise<any[] | TaskType[]> {
//   const message: any[] | TaskType[] = [];
//   mySocket.onopen = async (ev) => {
//     console.log('Socket opened: ', ev);
//     await mySocket.send(JSON.stringify({ type: 'read', path: 'tasks' }));
//     mySocket.onmessage = async (m) => {
//       console.log('Tasks: ', JSON.parse(m.data)['data']);
//       message.push(...(await JSON.parse(m.data)['data']));
//       return message;
//     };
//   };
//   console.log('messagemessage: ', message);
//   return await message;
// }

// mySocket.send(JSON.stringify({type: 'read', path: 'tasks'}));

// mySocket.onmessage = (m) => {
//     let message = JSON.parse(m.data);
//     console.log('Message: ', message);
// };

// mySocket.onclose = (ev) => {
//     console.log('Socket closed: ', ev);
// };
