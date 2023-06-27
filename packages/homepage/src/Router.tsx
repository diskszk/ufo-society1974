import { Routes, Route, HashRouter } from "react-router-dom";
import { Layout } from "./components/common/Layout";
import { AlbumListPage, AlbumDetailPage, UndefinedPage } from "./pages";

export const Router: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AlbumListPage />} />
          <Route path={`/detail/:id`} element={<AlbumDetailPage />} />
          <Route path="*" element={<UndefinedPage />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};
