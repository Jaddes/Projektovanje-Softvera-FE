export interface UserProfileDto {
    id: number;
    userId: number;
    name: string;
    surname: string;
    profilePicture?: string;
    biography?: string;
    quote?: string;
}
