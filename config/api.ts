import axios, { Axios, AxiosInstance, AxiosResponse } from "axios";

// const baseUrl : String = 'https://api.tvmaze.com/';

export class Api {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string = 'https://api.tvmaze.com/') {
    this.instance = axios.create({
      baseURL
    });

    this.responseInterceptor();
  }

  private responseInterceptor = () => { 
    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    )
  }

  private handleResponse = ({data}: AxiosResponse) => data;
  
  protected handleError = (error: any) => Promise.reject(error);
}