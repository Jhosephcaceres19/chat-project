import { Contact } from './contact/Contact';
import { Chat } from './chat/Chat';

export const Home = () => {
  return (
    <div className="flex  gap-2 ">
      <div className="flex col-span-1 w-[50%]">
        <Contact />
      </div>
      <div className="flex w-[50%]">
        <Chat />
      </div>
    </div>
  );
};
