import { App } from '../App'
import { createBrowserRouter, RouterProvider,Navigate } from 'react-router-dom'
import { Register } from '../container/logs/Register';
import { Chat } from '../view/chat/Chat';

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
      path:'/chat',
      element:<Chat/>
    }
  ];
  const router = createBrowserRouter(routeForPublic)
  return (
    <RouterProvider router={router}/>
  )
}
