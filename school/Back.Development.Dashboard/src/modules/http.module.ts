import axios, { AxiosError, AxiosInstance} from "axios";

class HttpModule {
    public axios: AxiosInstance;
    public axiosDefault: AxiosInstance;
    constructor() {
        this.axios = axios.create({
            headers: this.axiosDefault
        })
    }
}