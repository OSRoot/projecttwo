// create an interface for the Error
interface Error {
    name?: string;
    stack?: string;
    message?: string;
    status?: number
};


export default Error