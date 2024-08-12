import { Contact } from './contact/Contact';
import { Chat } from './chat/Chat';

export const Home = () => {
  return (
    <div className="flex  gap-2 justify-center lg:gap-0">
      <div className="flex col-span-1 w-screen lg:w-[45%] lg:border-r-4 border-violet-100">
        <Contact />
      </div>
      <div className="hidden lg:flex w-screen">
        <Chat />
      </div>
    </div>
  );
};
