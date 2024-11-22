import { Outlet, Route, Routes } from "react-router-dom";
import Connection from "./page/Connection";
import Dashboard from "./page/Dashboard";
import Kanbans from "./page/Kanbans";
import Tasks from "./page/Tasks";
import { Toaster } from "./components/ui/toaster";
import { Layout } from "./components/layout/layout";
import Friend from "./page/Friend";
import Messagerie from "./page/Messagerie";

export default function App() {
  return (
    <>
      <Routes>
        <Route index element={<Connection />} />
        <Route
          element={
            <Layout>
              <Outlet />
            </Layout>
          }
        >
          <Route path="/workspace" element={<Dashboard />} />
          <Route path="/workspace/:workspaceId" element={<Kanbans />} />
          <Route
            path="/workspace/:workspaceId/:elementId"
            element={<Tasks />}
          />
          <Route path="/friend" element={<Friend />} />
          <Route path="/message" element={<Messagerie />} />
          <Route path="/message/:friendId" element={<Messagerie />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
}
