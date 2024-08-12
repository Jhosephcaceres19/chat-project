import socket from '../socket/socket'; // Importa el socket centralizado

export const fetchUsers = (setUsers: React.Dispatch<React.SetStateAction<any[]>>) => {
  // Usa el socket importado en lugar de crear uno nuevo
  socket.emit('getUsers');

  const handleUserList = (users) => {
    console.log('Received users:', users); // Imprime los usuarios recibidos
    setUsers(users);
  };

  socket.on('userList', handleUserList);

  return () => {
    socket.off('userList', handleUserList); // Desuscribe al evento para evitar fugas de memoria
  };
};
