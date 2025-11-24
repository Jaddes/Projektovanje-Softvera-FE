export interface AnnualAward {
    id?: number;
    name: string;
    description: string;
    year: number;
    status: AwardStatus;
    votingStartDate: string;
    votingEndDate: string;
}

export enum AwardStatus {
    DRAFT = 0,
    ACTIVE = 1,
    CLOSED = 2
}