import { Module } from "@nestjs/common";
import { AlbumsController } from "./albums.controller";
import { AuthModule } from "../auth/auth.module";
import { RoleModule } from "../role/role.module";
import { AlbumsService } from "./albums.service";
import { SongsModule } from "../songs/songs.module";

@Module({
  imports: [AuthModule, RoleModule, SongsModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
})
export class AlbumsModule {}
