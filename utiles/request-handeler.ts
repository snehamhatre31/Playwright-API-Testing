export class RequestHandler {

  private baseUrl: string = '';
  private apipath: string =''
  private queryParams: object = {};
  private apiheaders: object = {};
  private apibody: object = {};

  url(url: string) {
    this.baseUrl = url;
    return this;
  }

   path(path: string) {
    this.apipath = path;
    return this;
  }

  param(param: object) {
    this.queryParams = param;
    return this;
  } 

    header(header: object) {    
    this.apiheaders = header;
    return this;
  }

    body(body: object) {
    this.apibody = body;
    return this;
  }

  geturl() {
    const url = new URL('${this.baseUrl + this.apipath}');
    for(const [key, value] of Object.entries(this.queryParams)) {
      url.searchParams.append(key, value);
    }
    return url.toString();
  }

}