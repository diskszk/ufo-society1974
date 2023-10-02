import { Switch, Route } from "react-router-dom";
import Auth from "./Auth";
import {
  Home,
  SignIn,
  CreateUser,
  Reset,
  Songs,
  EditSong,
  Users,
  Albums,
  CreateAlbum,
  EditAlbum,
  BrowseAlbum,
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
        <Route path={"/albums/edit/:id"} component={EditAlbum} />
        <Route path={"/albums/browse/:id"} component={BrowseAlbum} />
        <Route path={"/albums/create"} component={CreateAlbum} />

        {/* Songs */}
        <Route exact path={"/albums/detail/:id"} component={Songs} />
        <Route
          exact
          path={"/albums/detail/:id/edit/:songId"}
          component={EditSong}
        />
      </Auth>
    </Switch>
  );
};

export default Routes;
