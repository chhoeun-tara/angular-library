import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { isNull } from "util";

@Injectable({
  providedIn: "root",
})
export abstract class MyLibraryService {
  abstract API_URL = "";
  abstract URL_PATH = "";
  header = new HttpHeaders();
  constructor(private _http: HttpClient) {}
  setHeader(header: HttpHeaders) {
    header = header.append("Content-Type", "application/json");
    return header;
  }

  /**
   * lstObjs is contain | path | param | header | body |
   * lstObjs = {
   *  path: ...,
   *  param: ...,
   *  header: ...,
   *  body: ...
   * }
   */

  prepareObj(lstObjs: Object) {
    const options = {};
    let body = {};
    let path = this.URL_PATH;
    if (lstObjs && !isNull(lstObjs)) {
      // ----- Params ------
      let params: HttpParams = new HttpParams();
      if (lstObjs["param"] && !isNull(lstObjs["param"])) {
        for (const key in lstObjs["param"]) {
          if (lstObjs["param"].hasOwnProperty(key)) {
            const element = lstObjs["param"][key];
            params = params.set(key, element);
          }
        }
      }
      options["params"] = params;
      // ----- Headers ------
      let headers: HttpHeaders = new HttpHeaders();
      if (lstObjs["header"] && !isNull(lstObjs["header"])) {
        for (const key in lstObjs["header"]) {
          if (lstObjs["header"].hasOwnProperty(key)) {
            const element = lstObjs["header"][key];
            headers = headers.set(key, element);
          }
        }
      }
      options["headers"] = this.setHeader(headers);
      // ----- Path ------
      path =
        lstObjs["path"] && !isNull(lstObjs["path"])
          ? path + lstObjs["path"]
          : path;
      // ----- Body ------
      body =
        lstObjs["body"] && !isNull(lstObjs["body"]) ? lstObjs["body"] : body;
    }
    return {
      path: path,
      body: body,
      options: options,
    };
  }

  get(lstObjs: Object): Observable<any> {
    const objs = this.prepareObj(lstObjs);
    return this._http.get<any>(this.API_URL + objs.path, objs.options);
  }

  post(lstObjs: Object): Observable<any> {
    const objs = this.prepareObj(lstObjs);
    return this._http.post<any>(
      this.API_URL + objs.path,
      objs.body,
      objs.options
    );
  }

  put(lstObjs: Object): Observable<any> {
    const objs = this.prepareObj(lstObjs);
    return this._http.put(this.API_URL + objs.path, objs.body, objs.options);
  }
}
