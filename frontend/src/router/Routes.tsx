import { App } from '../App'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import { Register } from '../container/logs/Register';
import { Contact } from '../container/contact/Contact';
import { Chat } from '../container/chat/Chat';
import { Home } from '../container/Home';

export const Routes = () => {
  const routeForPublic = [
    {
      path:'/',
      element:<App/>,
    },
    {
      path:'/register',
      element:<Register/>
    },
    {
      path:'/home',
      element:<Home/>
    },
    {
      path:'/contact',
      element:<Contact/>
    },
    {
      path: '/chat',
      element:<Chat/>
    }
  ];
  const router = createBrowserRouter(routeForPublic)
  return (
    <RouterProvider router={router}/>
  )
}
