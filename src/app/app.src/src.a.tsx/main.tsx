import type { ReactElement } from 'react';
import type { RouteObject } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import '../src.a.css/index.css';

const Layout = lazy(() => import('./tsx.items/layout.tsx'));
const LoginPage = lazy(() => import('./tsx.pages/login-page.tsx'));
const WelcomePage = lazy(() => import('./tsx.pages/welcome-page.tsx'));
const LobbyPage = lazy(() => import('./tsx.pages/lobby-page.tsx'));
const LobbyPagePrev = lazy(() => import('./tsx.pages/lobby-page-prev.tsx'));
const TasksEditorPage = lazy(() => import('./tsx.pages/tasks-editor-page.tsx'));
const UpdatesPage = lazy(() => import('./tsx.pages/updates-page.tsx'));

const withSuspense = (component: ReactElement) => (
  <Suspense>{component}</Suspense>
);

const contentRoutes: RouteObject[] = [
  {
    path: '/', element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/welcome" replace /> },
      { path: 'welcome', element: withSuspense(<WelcomePage />) },
      { path: 'login', element: withSuspense(<LoginPage />) },
      { path: 'lobby:prev', element: withSuspense(<LobbyPagePrev />) },
      { path: 'lobby', element: withSuspense(<LobbyPage />) },
      { path: 'updates', element: withSuspense(<UpdatesPage />) },
      { path: 'tasks-editor', element: withSuspense(<TasksEditorPage />) },
    ],
  },
];

const appRouter = createBrowserRouter(contentRoutes);
const queryClient = new QueryClient();

const RouterRendering = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={appRouter} />
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export default RouterRendering;