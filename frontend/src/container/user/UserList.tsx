import React from "react";

interface User {
  id: string;
  nickname: string;
  image: string;
}

interface UserListProps {
  users: User[];
}

export const UserList: React.FC<UserListProps> = ({ users }) => {
  return (
    <div className="p-2 rounded-xl">
      {users.map((user) => (
        <div
          key={user.id}
          className="bg-violet-100 flex items-center gap-4 p-2 mb-2 rounded-lg"
        >
          <img
            src={user.image}
            alt={user.nickname}
            className="w-12 h-12 rounded-full"
          />
          <span>{user.nickname}</span>
        </div>
      ))}
    </div>
  );
};
