import { Location } from "./location.model";

export class User {
    id: number;
    name: string;
    email: string;
    login: string;
    password: string;
    location: Location;
}
