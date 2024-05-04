import { lazy, Suspense } from 'react';
import type { ReactElement } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, useLoaderData } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import type { LoaderFunction, LoaderFunctionArgs } from 'react-router-dom';
import { redirect } from 'react-router-dom';

import '../css/index.css';
import LoadingPageContent from './loading-page';
import ErrorsPageContent from './errors-page';

const LoginPage = lazy(() => import('./login-page'));
const WelcomePage = lazy(() => import('./welcome-page'));
const LobbyPage = lazy(() => import('./lobby-page'));
const TasksEditorPage = lazy(() => import('./tasks-editor-page'));
const UpdatesPage = lazy(() => import('./updates-page'));

const API_BASE = '/api';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

interface TasksLoaderData {
  user: User;
  tasks: Task[];
}

class ApiError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

const fetchJson = async <T,>(endpoint: string, init?: RequestInit): Promise<T> => {
  const url = `${API_BASE}${endpoint.startsWith('/') ? endpoint : '/' + endpoint}`;

  const res = await fetch(url, {
    ...init,
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    credentials: 'include',
  });

  if (!res.ok) {
    let errorBody = '';
    try {
      errorBody = await res.text();
    } catch {}

    if (res.status === 401 || res.status === 403) {
      throw new ApiError(res.statusText || 'Auth error', res.status);
    }

    throw new ApiError(`API error: ${res.status} ${errorBody || res.statusText}`, res.status);
  }

  return res.json() as Promise<T>;
};

const fetchUser = () => fetchJson<User>('/user');
const fetchTasks = () => fetchJson<Task[]>('/tasks');

export const contentLoader: LoaderFunction = async ({ request }: LoaderFunctionArgs) => {
  try {
    const [user, tasks] = await Promise.all([fetchUser(), fetchTasks()]);
    return { user, tasks };
  } catch (err) {
    if (err instanceof ApiError) {
      const from = new URL(request.url).pathname;

      if (err.status === 401) {
        return redirect(`/login?from=${encodeURIComponent(from)}`);
      }

      if (err.status === 403) {
        throw new Response('Forbidden', { status: 403 });
      }
    }

    throw err;
  }
};

const withSuspense = (component: ReactElement) => (
  <Suspense fallback={<LoadingPageContent />}>{component}</Suspense>
);

const contentRoutes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorsPageContent />,
    children: [
      { index: true, element: <Navigate to="/welcome" replace /> },
      { path: 'welcome', element: withSuspense(<WelcomePage />) },
      { path: 'login', element: withSuspense(<LoginPage />) },
      { path: 'lobby', element: withSuspense(<LobbyPage />) },
      { path: 'updates', element: withSuspense(<UpdatesPage />) },
      { path: 'tasks-editor', element: withSuspense(<TasksEditorPage />),
        loader: contentLoader,
      },
    ],
  },
  { path: '*', element: <ErrorsPageContent /> },
];

export const useContentData = () =>
  useLoaderData() as TasksLoaderData;

const appRouter = createBrowserRouter(contentRoutes);
const RouterRendering = () => <RouterProvider router={appRouter} />;

export default RouterRendering;