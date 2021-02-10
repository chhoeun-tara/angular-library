import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { MyLibraryService } from "../../../my-library/src/public-api";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export abstract class AppService extends MyLibraryService {
  URL_PATH = "/todos";
  API_URL = environment.apiURL;
}
