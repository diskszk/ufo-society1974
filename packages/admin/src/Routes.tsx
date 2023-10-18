import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import {
  Home,
  SignIn,
  CreateUser,
  Reset,
  EditAlbumDetail,
  EditSong,
  Users,
  Albums,
  CreateAlbum,
  EditAlbum,
} from "./pages";

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route exact path={"/signin"} component={SignIn} />
      <Route exact path={"/reset"} component={Reset} />

      <Auth>
        <Route exact path={"(/)?"} component={Home} />

        {/* Users */}
        <Route exact path={"/users"} component={Users} />
        <Route exact path={"/users/create"} component={CreateUser} />

        {/* Albums */}
        <Route exact path={"/albums"} component={Albums} />
        <Route
          exact
          path={"/albums/(edit|preview)/:id"}
          component={EditAlbum}
        />
        <Route path={"/albums/create"} component={CreateAlbum} />

        {/* AlbumDetail */}
        <Route
          exact
          path={"/albums/edit/:id/detail"}
          component={EditAlbumDetail}
        />
        {/* TODO: BrowseAlbumDetailを作る */}

        {/* Songs */}
        <Route
          exact
          path={"/albums/edit/:id/detail/:songId"}
          component={EditSong}
        />
        <Route
          exact
          path={"/albums/edit/:id/detail/new"}
          component={() => <p>new song</p>}
        />
      </Auth>
    </Switch>
  );
};

export default Routes;
