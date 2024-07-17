import { App } from '../App'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from '../view/home/Home';
import { Chat } from '../view/chat/Chat';

export const Routes = () => {
  const routeForPublic = [
    {
      path:'/',
      element:<App/>,
    },
    {
      path:'/home',
      element:<Home/>
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
